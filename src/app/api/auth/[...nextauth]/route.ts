import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ALLOWED_EMAILS = ["muhammadusamahabdurrahman@gmail.com"];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user?.email && ALLOWED_EMAILS.includes(user.email)) {
        return true;
      }
      // Redirect to /admin with explicit AccessDenied error flag for non-admin emails
      return "/admin?error=AccessDenied";
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin",
    error: "/admin",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallbacksecret1234567890",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
