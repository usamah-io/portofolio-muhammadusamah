"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Typewriter from "@/components/typewriter";
import { useApp } from "@/components/app-context";
import content from "@/data/content.json";

export default function ExperiencePage() {
  const { language } = useApp();
  const isIndonesian = language === "id";
  const tAbout = content[language]?.about || content["id"].about;
  const timeline = tAbout.timeline;

  return (
    <main className="min-h-screen bg-transparent text-zinc-900 dark:text-white selection:bg-emerald-500 selection:text-zinc-950 font-sans relative z-10 overflow-x-hidden transition-colors duration-300">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="pt-28 pb-20 px-4 sm:px-6 w-full max-w-5xl mx-auto relative z-10 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">
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
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">Pendidikan & Karir</span>
          </div>
        </div>

        {/* Dedicated Section Header */}
        <div className="text-center md:text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            <span>Pendidikan & Karir</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight min-h-[1.2em] flex items-center justify-center md:justify-start">
            <Typewriter
              words={["Pendidikan & Rekam Jejak Karir"]}
              loop={true}
              typingSpeed={70}
              deletingSpeed={40}
              pauseDuration={2500}
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 dark:from-[#00FF87] dark:via-teal-400 dark:to-emerald-300 font-extrabold"
              cursorClassName="text-emerald-500 dark:text-[#00FF87] text-3xl sm:text-5xl font-light"
            />
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Jejak langkah akademis, kepemimpinan proyek digital, serta pencapaian kompetisi pengembangan aplikasi.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 sm:ml-8 space-y-10 pt-4">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-100 dark:bg-zinc-900 border-2 border-emerald-500 group-hover:bg-emerald-500 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />

              {/* Timeline Card */}
              <div className="bg-white dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700/60">
                    {item.period}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    {item.role}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
