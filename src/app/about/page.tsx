"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useApp } from "@/components/app-context";
import About from "@/components/about";

export default function AboutPage() {
  const { language } = useApp();
  const isIndonesian = language === "id";

  return (
    <main className="min-h-screen bg-transparent text-zinc-900 dark:text-white selection:bg-emerald-500 selection:text-zinc-950 font-sans relative z-10 overflow-x-hidden transition-colors duration-300">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="pt-28 pb-16 px-4 sm:px-6 w-full max-w-5xl mx-auto relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md shrink-0 whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>{isIndonesian ? "Kembali" : "Back"}</span>
            <span className="hidden sm:inline">{isIndonesian ? " ke Beranda" : " to Home"}</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">Profil &amp; Bio Lengkap</span>
          </div>
        </div>

        {/* Main About Component */}
        <About />
      </div>
    </main>
  );
}
