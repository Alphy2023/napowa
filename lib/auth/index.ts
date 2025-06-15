// lib/auth.ts
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { decode } from "next-auth/jwt";
import prisma from "../prisma";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        const token = credentials?.token;
        if (!token) return null;

        const decoded = await decode({
          token,
          secret: process.env.NEXTAUTH_SECRET!,
        });

        if (!decoded || !decoded.sub) return null;

        // fetch full info
          const user = await prisma.user.findUnique({
            where: { id:decoded.sub },
            include: {
              profile:true,
              role:true,
              blogs: true,
              events: true,
              sentMessages: true,
              receivedMessages: true,
              groupMemberships: true,
              notifications: true,
              meetingParticipants: true,
              settings: true,
            },
          });

      return {
        id: user?.id,
        email: user?.email,
        // role: user?.role,
        role: user?.role.name,
        permissions: user?.role?.permissions || [],
        settings: user?.settings,
        profile:user?.profile,
      };

      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // token.id = user.id;
        // token.email = user.email;
         const cleanUser = JSON.parse(JSON.stringify(user));
         token.user = cleanUser; // store the full cleaned user object
      }
      return token;
    },
    async session({ session, token }) {
      // if (token) {
      //   session.user.id = token.id as string;
      //   session.user.email = token.email as string;
      // }
       if (token?.user) {
          session.user = token.user as any; // spread entire user from token
        }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
