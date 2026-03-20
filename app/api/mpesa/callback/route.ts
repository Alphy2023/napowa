import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyTillSignature, encryptPaymentData, decryptPaymentData } from '@/lib/till';
import { sanitizeForLogs } from '@/lib/encryption';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get('x-signature') || '';

    // Verify Till signature
    if (!verifyTillSignature(body, signature)) {
      console.warn('[v0] Invalid Till signature received');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const {
      checkoutRequestId,
      resultCode,
      resultDescription,
      mpesaReceiptNumber,
      mpesaTransactionCode,
      amount,
    } = body;

    // Find the MPesa transaction
    const mpesaTransaction = await prisma.mpesaTransaction.findUnique({
      where: { checkoutRequestId },
      include: { donation: true },
    });

    if (!mpesaTransaction) {
      console.warn('[v0] Transaction not found for checkout:', checkoutRequestId);
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Determine transaction status
    const isSuccess = resultCode === 0;
    const transactionStatus = isSuccess ? 'completed' : 'failed';
    const donationStatus = isSuccess ? 'completed' : 'failed';

    // Update MPesa transaction
    await prisma.mpesaTransaction.update({
      where: { id: mpesaTransaction.id },
      data: {
        status: transactionStatus,
        resultCode,
        resultDescription,
        mpesaReceiptNumber: mpesaReceiptNumber || null,
        mpesaTransactionCode: mpesaTransactionCode || null,
        completedAt: isSuccess ? new Date() : null,
        encryptedCallbackData: encryptPaymentData({
          checkoutRequestId,
          resultCode,
          resultDescription,
          mpesaReceiptNumber,
          mpesaTransactionCode,
          amount,
          timestamp: new Date().toISOString(),
        }),
      },
    });

    // Update donation
    const donationUpdate = await prisma.donation.update({
      where: { id: mpesaTransaction.donationId },
      data: {
        status: donationStatus,
        transactionId: mpesaReceiptNumber || checkoutRequestId,
      },
      include: { donor: true },
    });

    // Log the transaction
    await prisma.adminLog.create({
      data: {
        action: 'mpesa_callback',
        resourceType: 'donation',
        resourceId: donationUpdate.id,
        performedById: 'system',
        changes: {
          status: donationStatus,
          mpesaReceiptNumber,
          resultCode,
        },
      },
    });

    // Send receipt email if successful and email available
    if (isSuccess && donationUpdate.donorEmail) {
      const { sendDonationReceiptEmail } = await import('@/lib/email');
      await sendDonationReceiptEmail(
        donationUpdate.donorEmail,
        donationUpdate.donorName || 'Valued Donor',
        donationUpdate.amount,
        mpesaReceiptNumber || checkoutRequestId,
        new Date().toLocaleString('en-KE')
      );
    }

    console.log(
      '[v0] Till callback processed:',
      sanitizeForLogs({
        checkoutRequestId,
        status: transactionStatus,
        mpesaReceiptNumber,
        amount,
      })
    );

    return NextResponse.json({
      success: true,
      status: transactionStatus,
      message: isSuccess ? 'Payment received' : 'Payment failed',
    });
  } catch (error) {
    console.error('[v0] Callback processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
