import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ADMIN_EMAIL = "muhammadusamahabdurrahman@gmail.com";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/admin",
    error: "/admin",
  },
  callbacks: {
    async signIn({ user }) {
      // Allow sign-in so session can be established and handled in admin UI
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const normalizedEmail = user.email.toLowerCase().trim();
        token.email = normalizedEmail;
        token.isAdmin = normalizedEmail === ADMIN_EMAIL.toLowerCase().trim();
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.email = (token.email as string) || session.user.email;
        (session.user as any).isAdmin = token.isAdmin || (session.user.email?.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim());
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallbacksecret1234567890",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

