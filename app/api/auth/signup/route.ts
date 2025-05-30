// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/schemas/auth.schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Zod validation
    const result = signupSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phone,
      idNumber,
      county,
      memberType,
      rank,
      station,
      serviceNumber,
      agreeTerms,
    } = body;

    if (!agreeTerms) {
      return NextResponse.json({ message: "You must agree to the terms" }, 
        { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match" },
         { status: 400 });
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json({ message: "Email already taken." },
         { status: 400 });
    }
    // check for phone or id number
    const existingProfile = await prisma.userProfile.findFirst({
      where: {
        OR: [
          { phone: phone },
          { idNumber: idNumber },
        ],
      },
    });
    if (existingProfile) {
      return NextResponse.json({
        message: "Phone number or ID number already in use.",
      }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
      // Find the 'user' role first
    const userRole = await prisma.role.findUnique({
      where: { name: "member" },
    });
    if (!userRole) {
      return NextResponse.json({ message: "Default member role not found." },
         { status: 500 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roleId:userRole.id,
        profile: {
          create: {
            firstName,
            lastName,
            phone,
            idNumber,
            county,
            memberType,
            rank,
            station,
            serviceNumber,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return NextResponse.json({
      message: "Registration successful. You can login now.",
      user: {
        id: user.id,
        email: user.email,
        profile: user.profile,
      },
    },{status:201});
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
