import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import Navbar from "@/components/navbar";
import ConditionalFooter from "@/components/conditional-footer";
import { AppProvider } from "@/components/app-context";
import { AuthProvider } from "@/components/auth-provider";
import CustomCursor from "@/components/CustomCursor";
import GridSpotlightBackground from "@/components/GridSpotlightBackground";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://portofolio-usamah.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Muhammad Usamah - Full-Stack & AI Developer",
  description: "Portofolio resmi Muhammad Usamah Abdurrahman - Creative Full-Stack & AI Developer. Menampilkan proyek web modern, integrasi AI, dan pengalaman kompetisi.",
  openGraph: {
    title: "Muhammad Usamah - Full-Stack & AI Developer",
    description: "Portofolio resmi Muhammad Usamah Abdurrahman - Creative Full-Stack & AI Developer. Menampilkan proyek web modern, integrasi AI, dan pengalaman kompetisi.",
    url: siteUrl,
    siteName: "Muhammad Usamah Portfolio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/profile-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Usamah - Full-Stack & AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Usamah - Full-Stack & AI Developer",
    description: "Portofolio resmi Muhammad Usamah Abdurrahman - Creative Full-Stack & AI Developer.",
    images: ["/profile-v2.jpg"],
  },
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
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300 transition-colors duration-300 relative"
      >
        <AppProvider>
          <AuthProvider>
            <SmoothScroll>
              <GridSpotlightBackground />
              <CustomCursor />
              <Navbar />
              <div className="flex flex-col flex-1 relative pt-28">
                {children}
              </div>
              <ConditionalFooter />
            </SmoothScroll>
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
