"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("announcement_banner_dismissed");
    if (isDismissed !== "true") {
      // Short delay before appearing for smooth slide-up entry
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("announcement_banner_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100%-2rem)] sm:w-[360px] animate-fadeIn transition-all duration-500">
      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-emerald-500/40 text-zinc-900 dark:text-white p-4 sm:p-5 rounded-2xl shadow-2xl shadow-emerald-500/10 flex flex-col gap-3 relative overflow-hidden group">
        {/* Top Glow Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400" />

        {/* Header with Badge & Close Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <svg className="w-4 h-4 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="8" r="6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </span>
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              Achievement
            </span>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Tutup Widget"
            title="Tutup Widget"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Headline & Summary Text */}
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white leading-snug">
            Tim Sks-Master Top 4 Hackathon <span className="text-emerald-600 dark:text-emerald-400 font-mono">(Skor 86,4)</span>
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Berhasil memenangkan Top 4 Finalis di Gemini Innovation Hackathon 2026.
          </p>
        </div>

        {/* CTA Link Button */}
        <div className="pt-1 flex items-center justify-end">
          <Link
            href="/hackathon-recap"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 text-xs font-bold transition-all transform hover:scale-[1.02] shadow-xs cursor-pointer"
          >
            <span>Lihat Galeri</span>
            <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
