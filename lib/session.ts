'use server';

import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/lib/auth"; 
import { getSession } from "next-auth/react";

export async function getCurrentUser(req?: Request | any) {
  if (typeof window === "undefined") {
    // If using middleware or API route, use getToken
    if (req?.headers) {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token) return null;
      return {
        id: token.id as string,
        email: token.email as string,
      };
    }

    // For other server-side (e.g., getServerSideProps or route handlers)
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;
    return session.user;
  }

  // ✅ Client-side
  const session = await getSession(); // from next-auth/react
  if (!session?.user) return null;
  return session.user;
}
