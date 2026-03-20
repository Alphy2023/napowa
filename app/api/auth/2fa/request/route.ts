import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateOTP, sanitizeForLogs } from '@/lib/encryption';
import { send2FAEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if 2FA is enabled for this user
    if (!user.twoFactorEnabled) {
      return NextResponse.json(
        { error: '2FA is not enabled for this account' },
        { status: 400 }
      );
    }

    // Delete previous OTPs
    await prisma.twoFactorOtp.deleteMany({
      where: { userId },
    });

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in database
    const otpRecord = await prisma.twoFactorOtp.create({
      data: {
        userId,
        otp,
        expiresAt,
        isUsed: false,
      },
    });

    // Send OTP via email
    const emailSent = await send2FAEmail(user.email, otp);

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send OTP email' },
        { status: 500 }
      );
    }

    // Log action
    console.log('[v0] 2FA OTP requested for user:', sanitizeForLogs({ userId, email: user.email }));

    return NextResponse.json({
      success: true,
      message: 'OTP sent to your email',
      expiresIn: 600, // 10 minutes in seconds
    });
  } catch (error) {
    console.error('[v0] 2FA request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
