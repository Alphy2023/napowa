import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { QRCodeDonationSchema } from '@/lib/validations';
import { generateTillQRData, encryptPaymentData } from '@/lib/till';
import { createChecksum } from '@/lib/encryption';
import QRCode from 'qrcode';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = QRCodeDonationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: validation.error.issues },
        { status: 400 }
      );
    }

    const { amount, currency, paymentReference } = validation.data;

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        amount,
        currency,
        paymentMethod: 'mpesa',
        status: 'pending',
        anonymous: true,
        message: 'QR Code donation',
      },
    });

    // Generate QR code data
    const qrData = generateTillQRData(
      amount,
      donation.id,
      `NAPOWA Donation - KES ${amount}`
    );

    // Generate QR code image
    const qrCodeImage = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 1,
      width: 300,
    });

    // Encrypt QR data for storage
    const encryptedQRData = encryptPaymentData(JSON.parse(qrData));
    const checksum = createChecksum(encryptedQRData);

    // Calculate expiry (15 minutes from now)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Update donation with QR code details
    const updatedDonation = await prisma.donation.update({
      where: { id: donation.id },
      data: {
        qrCodeData: encryptedQRData,
        qrCodeUrl: qrCodeImage,
        qrCodeExpiry: expiresAt,
        paymentReference: paymentReference || donation.id,
        checksum,
      },
    });

    console.log('[v0] QR code generated for donation:', donation.id);

    return NextResponse.json({
      success: true,
      donation: {
        id: updatedDonation.id,
        amount: updatedDonation.amount,
        currency: updatedDonation.currency,
        status: updatedDonation.status,
        qrCodeUrl: updatedDonation.qrCodeUrl,
        qrCodeExpiry: updatedDonation.qrCodeExpiry,
        paymentReference: updatedDonation.paymentReference,
      },
    });
  } catch (error) {
    console.error('[v0] QR code generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve QR code by donation ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const donationId = searchParams.get('id');

    if (!donationId) {
      return NextResponse.json(
        { error: 'Donation ID is required' },
        { status: 400 }
      );
    }

    const donation = await prisma.donation.findUnique({
      where: { id: donationId },
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        qrCodeUrl: true,
        qrCodeExpiry: true,
        paymentReference: true,
      },
    });

    if (!donation) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }

    // Check if QR code has expired
    if (donation.qrCodeExpiry && new Date() > donation.qrCodeExpiry) {
      return NextResponse.json(
        { error: 'QR code has expired', donation },
        { status: 410 }
      );
    }

    return NextResponse.json({
      success: true,
      donation,
    });
  } catch (error) {
    console.error('[v0] QR code retrieval error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
