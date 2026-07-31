"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import Typewriter from "./typewriter";

interface HackathonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HackathonModal({ isOpen, onClose }: HackathonModalProps) {
  const { language } = useApp();
  const t = content[language].hackathon;

  const [activeTab, setActiveTab] = useState<"score" | "gallery">("score");
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Handle ESC key press
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

  // Lock background scroll when open
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn transition-all duration-300">
      {/* Backdrop click listener */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Main Modal Window (Auto-Height, No Rigid Scroll Limit, Slide-in Right Animation) */}
      <div className="relative z-10 w-full max-w-4xl h-auto flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-emerald-500/30 text-zinc-900 dark:text-white rounded-3xl shadow-2xl shadow-emerald-500/10 overflow-hidden pointer-events-auto transition-all duration-300 animate-slideInRight">
        
        {/* Modal Header */}
        <div className="relative px-4 py-3.5 sm:px-8 sm:py-5 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/90 dark:bg-zinc-900/60 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 15l-2 5l9-11h-7l2-5l-9 11h7z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] sm:text-xs font-mono font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
                  Gemini Hackathon 2026
                </span>
              </div>
              <h3 className="text-xs sm:text-xl font-extrabold tracking-tight mt-0.5 text-zinc-900 dark:text-white truncate">
                <Typewriter
                  words={["Galeri & Rekap Nilai Resmi"]}
                  loop={true}
                  typingSpeed={70}
                  deletingSpeed={40}
                  pauseDuration={2000}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-200 font-extrabold"
                  cursorClassName="text-emerald-500 dark:text-emerald-400 text-xs sm:text-xl font-light"
                />
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/hackathon-recap"
              onClick={onClose}
              className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 transition-colors shadow-xs"
              title="Buka Halaman Penuh"
            >
              <span>Full Page</span>
              <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </Link>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Top Summary Banner */}
        <div className="bg-gradient-to-r from-emerald-50/50 via-teal-50/30 to-emerald-50/50 dark:from-emerald-950/40 dark:via-zinc-900/60 dark:to-teal-950/40 px-4 py-2.5 sm:px-8 sm:py-3.5 border-b border-zinc-200/80 dark:border-zinc-800/60 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 017.5 15.375V18.75m9 0h-9M4.5 4.875C4.5 3.563 5.563 2.5 6.875 2.5h10.25C18.438 2.5 19.5 3.563 19.5 4.875v3.375c0 2.9-2.35 5.25-5.25 5.25h-4.5c-2.9 0-5.25-2.35-5.25-5.25V4.875z" />
              </svg>
            </div>
            <div>
              <div className="text-[9px] sm:text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Prestasi Resmi
              </div>
              <div className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate max-w-[160px] sm:max-w-none">
                {t.badge}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/90 dark:bg-zinc-900/80 border border-emerald-500/30 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl border-emerald-500/30 shrink-0 shadow-xs">
            <span className="text-[10px] sm:text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Skor:
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-base sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-200">
                {t.final_score}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-zinc-500">/100</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-4 py-2.5 sm:px-8 sm:py-3 bg-zinc-50/80 dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800/60 flex items-center justify-between gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setActiveTab("score")}
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
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
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
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

        {/* Modal Body Content Container (Auto-Height, Presisi, No Cut-Off) */}
        <div className="p-4 sm:p-7 space-y-4 sm:space-y-5">
          {activeTab === "score" ? (
            /* --- TAB 1: REKAPITULASI NILAI --- */
            <div className="space-y-3 sm:space-y-4 animate-fadeIn">
              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Rincian nilai hasil penilaian resmi juri Gemini Hackathon 2026 berdasarkan lembar evaluasi (spreadsheet) kompetisi:
              </div>

              {/* Mobile Responsive Card Stack View (Shown on Mobile < 640px) */}
              <div className="sm:hidden space-y-2">
                {t.scores.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 space-y-1.5 shadow-xs"
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
                        <div className="flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full h-1 overflow-hidden max-w-[90px]">
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
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between shadow-xs mt-1">
                  <span className="text-[11px] font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Total Nilai Akhir:
                  </span>
                  <span className="font-mono font-black text-xs text-emerald-600 dark:text-emerald-400">
                    {t.final_score} / 100
                  </span>
                </div>
              </div>

              {/* Desktop Table View (Shown on sm:block >= 640px) */}
              <div className="hidden sm:block w-full max-w-full overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 backdrop-blur-md shadow-md shadow-emerald-500/5 transition-all">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-zinc-100/80 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800 uppercase tracking-wider text-[11px]">
                      <th className="py-2.5 px-4">{t.table_headers.criterion}</th>
                      <th className="py-2.5 px-4 text-center">{t.table_headers.weight}</th>
                      <th className="py-2.5 px-4 text-center">{t.table_headers.score}</th>
                      <th className="py-2.5 px-4 text-right">{t.table_headers.weighted}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                    {t.scores.map((row, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors">
                        <td className="py-2.5 px-4 font-medium text-zinc-900 dark:text-white">
                          <div>{row.kriteria}</div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal">{row.keterangan}</div>
                        </td>
                        <td className="py-2.5 px-4 text-center font-mono font-semibold text-zinc-600 dark:text-zinc-400">{row.bobot}</td>
                        <td className="py-2.5 px-4 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">{row.skor}/100</td>
                        <td className="py-2.5 px-4 text-right font-mono font-extrabold text-zinc-900 dark:text-white">{row.nilai.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-emerald-500/10 border-t border-emerald-500/30 font-bold text-zinc-900 dark:text-white">
                      <td colSpan={3} className="py-3 px-4 text-right uppercase tracking-wider text-xs">Total Nilai Akhir:</td>
                      <td className="py-3 px-4 text-right font-mono text-base font-black text-emerald-600 dark:text-emerald-400">{t.final_score} / 100</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Action Link to Full Recap Page */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-zinc-200/80 dark:border-zinc-800/60">
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
                  Peringkat 4 dari total 186 tim peserta di ajang Gemini Hackathon 2026.
                </div>
                <Link
                  href="/hackathon-recap"
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-extrabold text-xs shadow-md shadow-emerald-500/20 hover:bg-emerald-400 transition-all cursor-pointer"
                >
                  <span>Buka Halaman Rekapitulasi Lengkap ↗</span>
                </Link>
              </div>
            </div>
          ) : (
            /* --- TAB 2: GALERI DOKUMENTASI FOTO --- */
            <div className="space-y-3 sm:space-y-4 animate-fadeIn">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {t.gallery_categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-emerald-500 text-zinc-950 font-extrabold shadow-sm"
                        : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedImage(item.src)}
                    className="group relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 cursor-pointer shadow-xs"
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-end">
                      <span className="text-[10px] sm:text-xs text-white font-medium truncate">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal for Gallery Fullscreen Preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Documentation Preview"
              fill
              className="object-contain rounded-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
