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
  callbacks: {
    async signIn() {
      // Allow all sign-in attempts without throwing AccessDenied errors
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.isAdmin = user.email === ADMIN_EMAIL;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        (session.user as any).isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallbacksecret1234567890",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
