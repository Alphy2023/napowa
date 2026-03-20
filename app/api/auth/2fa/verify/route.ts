import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { TwoFactorSchema } from '@/lib/validations';
import { sanitizeForLogs } from '@/lib/encryption';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, otp } = body;

    if (!userId || !otp) {
      return NextResponse.json(
        { error: 'User ID and OTP are required' },
        { status: 400 }
      );
    }

    // Validate OTP format
    const validation = TwoFactorSchema.safeParse({ otp });
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid OTP format' },
        { status: 400 }
      );
    }

    // Get the latest OTP for the user
    const otpRecord = await prisma.twoFactorOtp.findFirst({
      where: {
        userId,
        isUsed: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'OTP expired or not found' },
        { status: 400 }
      );
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 401 }
      );
    }

    // Mark OTP as used
    await prisma.twoFactorOtp.update({
      where: { id: otpRecord.id },
      data: { isUsed: true },
    });

    // Update user 2FA status
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorVerified: true,
        lastTwoFactorAt: new Date(),
      },
    });

    console.log('[v0] 2FA verified for user:', sanitizeForLogs({ userId, email: user.email }));

    return NextResponse.json({
      success: true,
      message: '2FA verification successful',
      user: {
        id: user.id,
        email: user.email,
        twoFactorVerified: user.twoFactorVerified,
      },
    });
  } catch (error) {
    console.error('[v0] 2FA verify error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
