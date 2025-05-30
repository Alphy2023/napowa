import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { getCurrentUser } from "@/lib/session";
import { NotificationSettingsSchema } from '@/schemas/notificationSettings.schema';

// ✅ GET: Read the user's notification settings
export async function GET(request: Request) {
  try {
      const user = await getCurrentUser(request);
      if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }


    const settings = await prisma.userNotificationSetting.findUnique({
      where: { userId: user?.id },
    });

    if (!settings) {
      return NextResponse.json(
        { message: 'No notification settings found. Use POST to create them.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: settings }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch notification settings:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// ✅ POST: Create user notification settings (if they don't exist yet)
export async function POST(request: Request) {
    const user = await getCurrentUser(request);
    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    // const { permissions } = user;

    // if (!permissions['events']?.includes('create')) {
    //   return res.status(403).json({ message: 'Forbidden' });
    // }

  try {
    const body = await request.json();
    const validatedData = NotificationSettingsSchema.parse(body);

    const existing = await prisma.userNotificationSetting.findUnique({
      where: { userId: user?.id },
    });

    if (existing) {
      return NextResponse.json(
        { message: 'Settings already exist. Use PUT to update.' },
        { status: 409 }
      );
    }

    const newSettings = await prisma.userNotificationSetting.create({
      data: {
        ...validatedData,
        userId: user?.id,
      } as Prisma.UserNotificationSettingCreateInput,
    });

    return NextResponse.json(
      { message: 'Notification settings created', data: newSettings },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating notification settings:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// ✅ PUT: Update existing user notification settings
export async function PUT(request: Request) {
    const user = await getCurrentUser(request);
    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

  try {
    const body = await request.json();
    const validatedData = NotificationSettingsSchema.parse(body);

    const existing = await prisma.userNotificationSetting.findUnique({
      where: { userId: user?.id },
    });

    if (!existing) {
      return NextResponse.json(
        { message: 'No settings found. Use POST to create them.' },
        { status: 404 }
      );
    }

    const updatedSettings = await prisma.userNotificationSetting.update({
      where: { userId: user?.id },
      data: validatedData as Prisma.UserNotificationSettingUpdateInput,
    });

    return NextResponse.json(
      { message: 'Notification settings updated', data: updatedSettings },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    console.error('Error updating notification settings:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
