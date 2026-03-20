import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const donations = await prisma.donation.findMany({
      select: {
        id: true,
        amount: true,
        currency: true,
        paymentMethod: true,
        status: true,
        donorName: true,
        donorEmail: true,
        transactionId: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      donations,
      total: donations.length,
    });
  } catch (error) {
    console.error('[v0] Donations fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { amount, paymentMethod, donorName, donorEmail, donorPhone, message, anonymous } =
      body;

    if (!amount || !paymentMethod) {
      return NextResponse.json(
        { error: 'Amount and payment method are required' },
        { status: 400 }
      );
    }

    const donation = await prisma.donation.create({
      data: {
        amount,
        currency: 'KES',
        paymentMethod,
        status: 'pending',
        donorName: anonymous ? null : donorName,
        donorEmail: anonymous ? null : donorEmail,
        donorPhone,
        message,
        anonymous: !!anonymous,
      },
    });

    return NextResponse.json(
      {
        success: true,
        donation,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Donation creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
