import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AppProvider } from "@/components/app-context";
import { AuthProvider } from "@/components/auth-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DEV.PORTFOLIO | Creative Developer Portfolio",
  description: "Modern developer portfolio built with Next.js, Tailwind CSS, GSAP, and Lenis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300 transition-colors duration-300">
        <AppProvider>
          <AuthProvider>
            <SmoothScroll>
              <Navbar />
              <div className="flex flex-col flex-1 relative pt-28">
                {children}
              </div>
              <Footer />
            </SmoothScroll>
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
