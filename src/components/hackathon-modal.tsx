"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import Typewriter from "./typewriter";

interface HackathonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HackathonModal({ isOpen, onClose }: HackathonModalProps) {
  const { language } = useApp();
  const tData = (content[language] || content["id"]) as typeof content["id"];
  const t = tData.hackathon;

  const [activeTab, setActiveTab] = useState<"score" | "gallery">("score");
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedImage) {
          setSelectedImage(null);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedImage, onClose]);

  // Lock background scroll completely when open & restore on close
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        const savedScrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
        if (savedScrollY) {
          window.scrollTo(0, parseInt(savedScrollY || "0") * -1);
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter gallery items
  const filteredGallery =
    activeCategory === "Semua" || activeCategory === "All"
      ? t.gallery_items
      : t.gallery_items.filter((item) => item.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn transition-all duration-300">
      {/* Backdrop click listener */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Main Modal Window */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] sm:max-h-[85vh] flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-emerald-500/30 text-zinc-900 dark:text-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-emerald-500/10 overflow-hidden pointer-events-auto touch-pan-y overscroll-contain transition-all duration-300">
        
        {/* Modal Header */}
        <div className="relative px-3 py-2.5 sm:px-8 sm:py-5 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/90 dark:bg-zinc-900/60 backdrop-blur-md flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 pr-1">
            <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shrink-0">
              <svg className="w-4 h-4 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 15l-2 5l9-11h-7l2-5l-9 11h7z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="text-[8px] sm:text-xs font-mono font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full shrink-0">
                  Gemini Hackathon 2026
                </span>
              </div>
              <h3 className="text-[11px] sm:text-xl font-extrabold tracking-tight mt-0.5 text-zinc-900 dark:text-white truncate">
                <Typewriter
                  words={["Galeri & Rekap Nilai Resmi"]}
                  loop={true}
                  typingSpeed={70}
                  deletingSpeed={40}
                  pauseDuration={2000}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-200 font-extrabold"
                  cursorClassName="text-emerald-500 dark:text-emerald-400 text-[11px] sm:text-xl font-light"
                />
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <Link
              href="/hackathon-recap"
              onClick={onClose}
              className="inline-flex items-center gap-1 px-2 py-1 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[10px] sm:text-xs font-semibold border border-zinc-200 dark:border-zinc-700 transition-colors shadow-xs"
              title="Buka Halaman Penuh"
            >
              <span>Full Page</span>
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </Link>

            <button
              onClick={onClose}
              className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Top Summary Banner */}
        <div className="bg-gradient-to-r from-emerald-50/50 via-teal-50/30 to-emerald-50/50 dark:from-emerald-950/40 dark:via-zinc-900/60 dark:to-teal-950/40 px-3 py-1.5 sm:px-8 sm:py-4 border-b border-zinc-200/80 dark:border-zinc-800/60 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 017.5 15.375V18.75m9 0h-9M4.5 4.875C4.5 3.563 5.563 2.5 6.875 2.5h10.25C18.438 2.5 19.5 3.563 19.5 4.875v3.375c0 2.9-2.35 5.25-5.25 5.25h-4.5c-2.9 0-5.25-2.35-5.25-5.25V4.875z" />
              </svg>
            </div>
            <div>
              <div className="text-[8px] sm:text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Prestasi Resmi
              </div>
              <div className="text-[10px] sm:text-base font-bold text-zinc-900 dark:text-white truncate max-w-[130px] sm:max-w-none">
                {t.badge}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white/90 dark:bg-zinc-900/80 border border-emerald-500/30 px-2.5 py-0.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-2xl backdrop-blur-md shrink-0 shadow-xs">
            <span className="text-[9px] sm:text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Skor:
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-200">
                {t.final_score}
              </span>
              <span className="text-[9px] sm:text-xs font-semibold text-zinc-500">/100</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-3 py-1.5 sm:px-8 sm:py-3 bg-zinc-50/80 dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800/60 flex items-center justify-between gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={() => setActiveTab("score")}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === "score"
                  ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20 font-extrabold border border-emerald-400"
                  : "bg-zinc-100 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/80 dark:border-zinc-800"
              }`}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
              <span>{t.tabs.score}</span>
            </button>

            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === "gallery"
                  ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20 font-extrabold border border-emerald-400"
                  : "bg-zinc-100 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/80 dark:border-zinc-800"
              }`}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>{t.tabs.gallery}</span>
            </button>
          </div>

          <span className="text-xs text-zinc-500 font-mono hidden md:inline-block shrink-0">
            Gemini API Challenge • 2026
          </span>
        </div>

        {/* Modal Body Content Container (Fit to Screen & Compact Sizing) */}
        <div
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="flex-1 min-h-0 max-h-[calc(100vh-200px)] overflow-y-auto overscroll-contain touch-pan-y pointer-events-auto p-2.5 sm:p-8 space-y-2 sm:space-y-6 [scrollbar-width:thin] [scrollbar-color:rgba(16,185,129,0.3)_transparent] hover:[scrollbar-color:rgba(16,185,129,0.6)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-emerald-500/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500/50 transition-colors"
        >
          {activeTab === "score" ? (
            /* --- TAB 1: REKAPITULASI NILAI --- */
            <div className="space-y-2 sm:space-y-6 animate-fadeIn">
              <div className="text-[11px] sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed hidden sm:block">
                Rincian nilai hasil penilaian resmi juri Gemini Hackathon 2026 berdasarkan lembar evaluasi (spreadsheet) kompetisi:
              </div>

              {/* Mobile Responsive Card Stack View (Shown only on Mobile < 640px) */}
              <div className="sm:hidden space-y-1.5">
                {t.scores.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 sm:p-4 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 space-y-1.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="font-extrabold text-[11px] text-zinc-900 dark:text-white truncate">
                        {item.kriteria}
                      </div>
                      <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-[9px] shrink-0">
                        {item.bobot}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-[10px]">
                      <div className="flex items-center gap-1.5 flex-1">
                        <span className="font-mono font-bold text-[10px] text-emerald-600 dark:text-emerald-400">
                          {item.skor}/100
                        </span>
                        <div className="flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full h-1 overflow-hidden max-w-[80px]">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                            style={{ width: `${item.skor}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-baseline gap-1 shrink-0">
                        <span className="text-[9px] text-zinc-400 font-mono">Nilai:</span>
                        <span className="font-mono font-black text-[11px] text-zinc-900 dark:text-white">
                          {item.nilai.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Mobile Total Score Summary Card */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between shadow-xs">
                  <span className="text-xs font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Total Nilai Akhir:
                  </span>
                  <span className="font-mono font-black text-base text-emerald-600 dark:text-emerald-400">
                    {t.final_score} / 100
                  </span>
                </div>
              </div>

              {/* Desktop Table View (Shown on sm:block >= 640px) */}
              <div className="hidden sm:block w-full max-w-full overflow-x-auto touch-pan-x overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 backdrop-blur-md shadow-md shadow-emerald-500/5 transition-all">
                <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
                  <thead>
                    <tr className="bg-zinc-100/80 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800 uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4 sm:px-6">{t.table_headers.criterion}</th>
                      <th className="py-3.5 px-3 text-center">{t.table_headers.weight}</th>
                      <th className="py-3.5 px-4 sm:px-6 text-center">{t.table_headers.score}</th>
                      <th className="py-3.5 px-4 sm:px-6 text-right">{t.table_headers.weighted}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/80 dark:divide-zinc-800/60 text-zinc-800 dark:text-zinc-200">
                    {t.scores.map((item, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-emerald-50/50 dark:hover:bg-zinc-800/30 transition-colors group"
                      >
                        <td className="py-4 px-4 sm:px-6">
                          <div className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {item.kriteria}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {item.keterangan}
                          </div>
                        </td>
                        <td className="py-4 px-3 text-center font-mono font-bold text-zinc-600 dark:text-zinc-400">
                          <span className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-emerald-600 dark:text-emerald-400">
                            {item.bobot}
                          </span>
                        </td>
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex flex-col items-center gap-1.5">
                            <span className="font-mono font-extrabold text-base text-emerald-600 dark:text-emerald-400">
                              {item.skor}
                            </span>
                            {/* Score visual bar indicator */}
                            <div className="w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                                style={{ width: `${item.skor}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-right font-mono font-black text-zinc-900 dark:text-white text-base">
                          {item.nilai.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-emerald-50/80 dark:bg-emerald-950/40 border-t-2 border-emerald-500/40">
                      <td colSpan={3} className="py-4 px-6 text-right font-extrabold text-zinc-900 dark:text-white text-sm">
                        TOTAL NILAI AKHIR REKAPITULASI:
                      </td>
                      <td className="py-4 px-6 text-right font-mono font-black text-xl text-emerald-600 dark:text-emerald-400">
                        {t.final_score}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* External Spreadsheet Link Button */}
              <div className="flex justify-end pt-1">
                <a
                  href="https://docs.google.com/spreadsheets/d/1VVHQfvEqWVzb5cl165ivFw7pp-UFCtlxI_-6fqUrr7I/edit?gid=1263546258#gid=1263546258"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm border border-emerald-500/30 hover:border-emerald-500/60 backdrop-blur-md transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-emerald-500/10 cursor-pointer"
                >
                  <span>Lihat Lembar Penilaian Resmi (Spreadsheet)</span>
                  <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>

              {/* Explanatory Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4.5 rounded-3xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-3.5 shadow-xs">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Verifikasi Resmi Spreadsheet
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                      Kalkulasi nilai akhir: (30% × 85) + (30% × 85) + (20% × 88) + (20% × 88) = 25.5 + 25.5 + 17.6 + 17.6 = <strong>86,2</strong> (Nilai Akhir Leaderboard: <strong>86,4</strong>).
                    </p>
                  </div>
                </div>

                <div className="p-4.5 rounded-3xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-3.5 shadow-xs">
                  <div className="p-2.5 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Pencapaian Peringkat 4 Finalis
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                      Sks-Master berhasil meraih <strong>Peringkat 4 (Top 4 Finalis)</strong> dari total 186 peserta di spreadsheet resmi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* --- TAB 2: GALERI DOKUMENTASI FOTO --- */
            <div className="space-y-6 animate-fadeIn">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {t.gallery_categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs ${
                      activeCategory === category
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40"
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredGallery.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setSelectedImage(img.src)}
                    className="group relative bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-lg shadow-emerald-500/5 cursor-pointer transition-all duration-500 hover:border-emerald-500/60 hover:shadow-xl hover:shadow-emerald-500/10 transform hover:-translate-y-1 flex flex-col"
                  >
                    {/* Image Aspect Box */}
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      
                      {/* Category Badge over Image */}
                      <span className="absolute top-3 left-3 text-[10px] font-bold font-mono tracking-wider text-emerald-600 dark:text-emerald-300 bg-white/90 dark:bg-zinc-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs">
                        {img.category}
                      </span>

                      {/* Zoom hint overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                        <span className="px-3.5 py-2 rounded-2xl bg-emerald-500 text-zinc-950 text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                          </svg>
                          Perbesar Gambar
                        </span>
                      </div>
                    </div>

                    {/* Image Title & Description */}
                    <div className="p-5 bg-white/95 dark:bg-zinc-900/90 border-t border-zinc-200/80 dark:border-zinc-800/60">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {img.title}
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                        {img.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 sm:px-8 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/90 dark:bg-zinc-900/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sks-Master Gemini Hackathon 2026</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="https://hekaton-gemini.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-semibold flex items-center gap-1"
            >
              <span>Live Site</span>
              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </Link>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-2xl bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold transition-colors cursor-pointer shadow-xs"
            >
              Tutup
            </button>
          </div>
        </div>

      </div>

      {/* --- LIGHTBOX MODAL FOR HIGH-RES PREVIEW --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors cursor-pointer shadow-lg"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full rounded-3xl overflow-hidden border border-emerald-500/40 shadow-2xl shadow-emerald-500/10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Documentation Fullscreen View"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
