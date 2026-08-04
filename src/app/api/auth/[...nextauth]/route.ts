import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const ADMIN_EMAIL = "muhammadusamahabdurrahman@gmail.com";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      id: "admin-login",
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminPassword) {
          console.error("CRITICAL: ADMIN_PASSWORD environment variable is not defined!");
          return null;
        }

        const isEmailValid = credentials.email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim();
        const isPasswordValid = credentials.password === adminPassword;

        if (isEmailValid && isPasswordValid) {
          return {
            id: "admin-user",
            name: "Muhammad Usamah Abdurrahman",
            email: ADMIN_EMAIL,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin",
    error: "/admin",
  },
  callbacks: {
    async signIn({ user }) {
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
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

