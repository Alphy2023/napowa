import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { CreateMemberSchema } from '@/lib/validations';
import { hashPassword, generateSecureToken, sanitizeForLogs } from '@/lib/encryption';
import { sendMemberCreationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authorization
    const session = request.headers.get('authorization');
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate input
    const validation = CreateMemberSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: validation.error.issues },
        { status: 400 }
      );
    }

    const { email, firstName, lastName, roleId } = validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Generate temporary password
    const tempPassword = generateSecureToken().substring(0, 12);
    const hashedPassword = await hashPassword(tempPassword);

    // Generate password reset token
    const resetToken = generateSecureToken();
    const resetTokenHash = await hashPassword(resetToken);
    const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roleId,
        isFirstLogin: true,
        twoFactorEnabled: true,
        twoFactorVerified: false,
        createdByAdmin: 'admin-id', // Replace with actual admin ID from session
        profile: {
          create: {
            firstName,
            lastName,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    // Create password reset token
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: resetTokenHash,
        expiresAt: resetTokenExpiry,
        isUsed: false,
      },
    });

    // Send welcome email with password reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;
    
    const emailSent = await sendMemberCreationEmail(
      email,
      firstName,
      tempPassword,
      resetLink
    );

    // Log admin action
    await prisma.adminLog.create({
      data: {
        action: 'create_user',
        resourceType: 'user',
        resourceId: user.id,
        performedById: 'admin-id',
        targetUserId: user.id,
        changes: {
          email,
          firstName,
          lastName,
          roleId,
          twoFactorEnabled: true,
        },
        ipAddress: request.ip,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Member created successfully. ${emailSent ? 'Welcome email sent.' : 'Email sending failed but account created.'}`,
        user: {
          id: user.id,
          email: user.email,
          name: `${user.profile?.firstName} ${user.profile?.lastName}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Member creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
