import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authorization
    const session = request.headers.get('authorization');
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const members = await prisma.user.findMany({
      where: {
        role: {
          name: {
            not: 'superadmin',
          },
        },
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        isFirstLogin: true,
        twoFactorVerified: true,
        lastLoginAt: true,
        isLockedOut: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      members,
      total: members.length,
    });
  } catch (error) {
    console.error('[v0] Members list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
