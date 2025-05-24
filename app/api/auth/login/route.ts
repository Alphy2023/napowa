// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";

// Simulated DB user
const mockUser = {
  id: "123",
  email: "test@gmail.com",
  password: "password",
};

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  // Simulated login check
  if (email === mockUser.email && password === mockUser.password) {
    const token = await encode({
      secret: process.env.NEXTAUTH_SECRET!,
      token: {
        sub: mockUser.id,
        email: mockUser.email,
      },
    });

    return NextResponse.json({ token });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
