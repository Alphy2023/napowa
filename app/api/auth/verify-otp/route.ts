import { NextResponse } from "next/server";
import { getOtpForUser, deleteOtp } from "@/lib/otp"; 
import { encode } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId, otp } = await req.json();

  const expectedOtp = await getOtpForUser(userId);
  if (!expectedOtp || expectedOtp !== otp) {
    return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 401 });
  }

  await deleteOtp(userId); // Optional

  const user = await prisma.user.findUnique({ where: { id: userId } });
  const token = await encode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: {
      sub: user!.id,
      email: user!.email,
    },
  });

  return NextResponse.json({ token }, { status: 200 });
}
