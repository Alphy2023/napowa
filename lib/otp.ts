// lib/otp.ts
import { prisma } from "@/lib/prisma";

/** Store OTP in DB for 10 mins */
export async function storeOtpInDBOrCache(userId: string, otp: string) {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Delete any old OTPs
  await prisma.twofactorOtp.deleteMany({ where: { userId } });

  // Save new one
  await prisma.twofactorOtp.create({
    data: {
      userId,
      otp,
      expiresAt,
    },
  });
}

/** Get the OTP for a user */
export async function getOtpForUser(userId: string) {
  const record = await prisma.twofactorOtp.findFirst({
    where: {
      userId,
      expiresAt: {
        gte: new Date(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return record?.otp || null;
}

/** Delete OTP after use */
export async function deleteOtp(userId: string) {
  await prisma.twofactorOtp.deleteMany({ where: { userId } });
}
