"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Bell, Award, X, ArrowUpRight, Trophy } from "lucide-react";

export default function FloatingNotificationWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDismissedState = sessionStorage.getItem("gemastik_widget_dismissed");
    if (handleDismissedState === "true") {
      setIsDismissed(true);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDismissWidget = () => {
    setIsDismissed(true);
    sessionStorage.setItem("gemastik_widget_dismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <div ref={widgetRef} className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* 1. Pop-up Notification Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 shadow-2xl rounded-2xl p-4 sm:p-5 space-y-3.5 animate-in fade-in slide-in-from-bottom-4 duration-300 transition-all">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-gray-200/80 dark:border-zinc-800/90 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-emerald-500/10 dark:bg-[#00FF87]/10 text-emerald-600 dark:text-[#00FF87] flex items-center justify-center">
                <Award className="w-4 h-4 shrink-0 text-emerald-600 dark:text-[#00FF87]" />
              </span>
              <span className="text-xs font-mono font-bold tracking-wider text-emerald-600 dark:text-[#00FF87]">
                Top 4 Finalis (Juara 4)
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Tutup Notifikasi"
              title="Tutup Notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Headline & Body Text */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
              <h4 className="text-sm font-extrabold text-gray-900 dark:text-white leading-snug">
                Gemastik 2026 - Hackathon National
              </h4>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pl-6">
              Satu-satunya peserta tingkat SMP yang berjuang solo dan berhasil menembus 5 Besar Finalis (Juara 4) bersaing dengan 186+ tim mahasiswa dari seluruh Indonesia.
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-1 flex items-center justify-between gap-2">
            <button
              onClick={handleDismissWidget}
              className="text-[11px] font-medium text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Jangan Tampilkan Lagi
            </button>

            <Link
              href="/#projects"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-1 text-xs font-bold text-zinc-950 bg-emerald-500 hover:bg-emerald-400 dark:bg-[#00FF87] dark:hover:bg-[#00e67a] py-2 px-3.5 rounded-xl shadow-md shadow-emerald-500/10 dark:shadow-[#00FF87]/20 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>Lihat Detail Proyek</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      )}

      {/* 2. Floating Circle Button (FAB) */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasUnread(false);
        }}
        className="relative group p-3.5 rounded-full bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-2xl hover:border-emerald-500/50 dark:hover:border-[#00FF87]/50 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-[#00FF87] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Floating Notifikasi Prestasi"
        title="Prestasi Gemastik 2026"
      >
        <Bell className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />

        {/* Pulsing Unread Dot */}
        {hasUnread && (
          <span className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-[#00FF87] animate-pulse absolute top-0.5 right-0.5 border-2 border-white dark:border-[#111111]" />
        )}
      </button>
    </div>
  );
}
