import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { MpesaCheckoutSchema } from '@/lib/validations';
import { initiateTillCheckout, encryptPaymentData } from '@/lib/till';
import { createChecksum, sanitizeForLogs } from '@/lib/encryption';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = MpesaCheckoutSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: validation.error.issues },
        { status: 400 }
      );
    }

    const { phoneNumber, amount, tillNumber, description } = validation.data;

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        amount,
        currency: 'KES',
        paymentMethod: 'mpesa',
        status: 'pending',
        donorPhone: phoneNumber,
        message: description || 'Online donation via QR code',
        anonymous: true,
      },
    });

    // Initiate Till checkout
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`;
    const tillResponse = await initiateTillCheckout({
      amount,
      phoneNumber,
      description: 'NAPOWA Donation',
      referenceId: donation.id,
      callbackUrl,
    });

    if (!tillResponse.success) {
      // Update donation status to failed
      await prisma.donation.update({
        where: { id: donation.id },
        data: { status: 'failed' },
      });

      return NextResponse.json(
        { error: tillResponse.error || 'Failed to initiate checkout' },
        { status: 400 }
      );
    }

    // Create MPesa transaction record
    const expiryTime = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    const mpesaTransaction = await prisma.mpesaTransaction.create({
      data: {
        donationId: donation.id,
        userId: 'anonymous',
        tillNumber,
        checkoutRequestId: tillResponse.checkoutRequestId,
        amount,
        phoneNumber,
        status: 'pending',
        expiresAt: expiryTime,
        initiatedAt: new Date(),
      },
    });

    // Update donation with Till data
    const paymentData = {
      checkoutRequestId: tillResponse.checkoutRequestId,
      phoneNumber,
      timestamp: new Date().toISOString(),
    };

    const encryptedData = encryptPaymentData(paymentData);
    const checksum = createChecksum(encryptedData);

    await prisma.donation.update({
      where: { id: donation.id },
      data: {
        paymentReference: tillResponse.checkoutRequestId,
        encryptedPaymentData: encryptedData,
        checksum,
        qrCodeUrl: tillResponse.qrCode,
        qrCodeExpiry: expiryTime,
      },
    });

    console.log(
      '[v0] Till checkout initiated:',
      sanitizeForLogs({
        donationId: donation.id,
        checkoutRequestId: tillResponse.checkoutRequestId,
        amount,
      })
    );

    return NextResponse.json({
      success: true,
      donation: {
        id: donation.id,
        amount: donation.amount,
        status: donation.status,
      },
      checkout: {
        checkoutRequestId: tillResponse.checkoutRequestId,
        qrCode: tillResponse.qrCode,
        expiresAt: expiryTime,
      },
    });
  } catch (error) {
    console.error('[v0] Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
