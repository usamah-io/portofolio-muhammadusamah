"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/components/app-context";
import content from "@/data/content.json";
import Typewriter from "@/components/typewriter";

export default function HackathonRecapPage() {
  const { language } = useApp();
  const tData = (content[language] || content["id"]) as typeof content["id"];
  const t = tData.hackathon;

  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredGallery =
    activeCategory === "Semua" || activeCategory === "All"
      ? t.gallery_items
      : t.gallery_items.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-emerald-500 selection:text-zinc-950 font-sans relative overflow-x-hidden transition-colors duration-300">
      {/* Full-Width Grid Pattern Background Overlay (Matches Hero Landing Page) */}
      <div 
        className="absolute top-0 inset-x-0 w-full h-[700px] opacity-75 dark:opacity-60 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" 
      />

      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="pt-28 pb-24 px-4 sm:px-6 w-full max-w-5xl mx-auto relative z-10 space-y-20">
        
        {/* Navigation Breadcrumb & Back Link */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2.5 px-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">Gemini Hackathon 2026</span>
          </div>
        </div>

        {/* Hero Title Section - Unboxed & Freely Floating on Full-Width Grid Background */}
        <div className="text-center space-y-4 max-w-3xl mx-auto py-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shadow-xs">
            <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 017.5 15.375V18.75m9 0h-9M4.5 4.875C4.5 3.563 5.563 2.5 6.875 2.5h10.25C18.438 2.5 19.5 3.563 19.5 4.875v3.375c0 2.9-2.35 5.25-5.25 5.25h-4.5c-2.9 0-5.25-2.35-5.25-5.25V4.875z" />
            </svg>
            <span>Official Achievement Showcase</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight min-h-[1.2em] flex items-center justify-center">
            <Typewriter
              words={["Galeri & Rekap Nilai Resmi"]}
              loop={true}
              typingSpeed={70}
              deletingSpeed={40}
              pauseDuration={2000}
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-200 font-extrabold"
              cursorClassName="text-emerald-500 dark:text-emerald-400 text-3xl sm:text-5xl font-light"
            />
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Highlight Score & Badge Banner */}
        <div className="bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/10 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-xl shadow-emerald-500/5 dark:shadow-[0_0_50px_rgba(16,185,129,0.1)] flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-300">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
              {t.badge}
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-3">
              Sks-Master (Platform Ujian AI Interactive)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
              Platform evaluasi belajar cerdas berbasis Google Gemini API untuk membantu institusi pendidikan mengotomatiskan pembuatan dan analisis soal ujian.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/90 dark:bg-zinc-950/80 border border-emerald-500/40 min-w-[210px] shrink-0 text-center shadow-lg shadow-emerald-500/10 transition-all">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              {t.final_score_label}
            </span>
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 dark:from-emerald-400 dark:to-teal-300 my-1.5 font-mono">
              {t.final_score}
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Skor Akhir Juri
            </span>
          </div>
        </div>

        {/* --- SEKSI 1: TABEL REKAPITULASI NILAI RESMI --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-xs shrink-0">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
                Tabel Rekapitulasi Nilai Resmi
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Rincian bobot dan skor dari lembar penilaian spreadsheet juri
              </p>
            </div>
          </div>

          {/* Mobile Responsive Card Stack View (Shown only on Mobile < 640px) */}
          <div className="sm:hidden space-y-3">
            {t.scores.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="font-extrabold text-sm text-zinc-900 dark:text-white">
                      {item.kriteria}
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {item.keterangan}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs shrink-0">
                    {item.bobot}
                  </span>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-zinc-400">Skor:</span>
                    <span className="font-mono font-extrabold text-xs text-emerald-600 dark:text-emerald-400">
                      {item.skor}/100
                    </span>
                    <div className="w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                        style={{ width: `${item.skor}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] font-mono text-zinc-400 block">Nilai</span>
                    <span className="font-mono font-black text-xs text-zinc-900 dark:text-white">
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
          <div className="hidden sm:block w-full max-w-full overflow-x-auto touch-pan-x overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/50 backdrop-blur-md shadow-xl shadow-emerald-500/5 transition-all">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
              <thead>
                <tr className="bg-zinc-100/80 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800 uppercase tracking-wider text-[10px] sm:text-[11px]">
                  <th className="py-3.5 sm:py-4.5 px-4 sm:px-6">{t.table_headers.criterion}</th>
                  <th className="py-3.5 sm:py-4.5 px-3 sm:px-4 text-center">{t.table_headers.weight}</th>
                  <th className="py-3.5 sm:py-4.5 px-4 sm:px-6 text-center">{t.table_headers.score}</th>
                  <th className="py-3.5 sm:py-4.5 px-4 sm:px-6 text-right">{t.table_headers.weighted}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/80 dark:divide-zinc-800/60 text-zinc-800 dark:text-zinc-200">
                {t.scores.map((item, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/50 dark:hover:bg-zinc-800/40 transition-colors group">
                    <td className="py-4 sm:py-5 px-4 sm:px-6">
                      <div className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.kriteria}
                      </div>
                      <div className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                        {item.keterangan}
                      </div>
                    </td>
                    <td className="py-4 sm:py-5 px-3 sm:px-4 text-center font-mono font-bold">
                      <span className="px-2.5 sm:px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-emerald-600 dark:text-emerald-400 text-xs">
                        {item.bobot}
                      </span>
                    </td>
                    <td className="py-4 sm:py-5 px-4 sm:px-6">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-mono font-extrabold text-base sm:text-lg text-emerald-600 dark:text-emerald-400">
                          {item.skor}
                        </span>
                        <div className="w-24 sm:w-28 bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 sm:h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                            style={{ width: `${item.skor}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 sm:py-5 px-4 sm:px-6 text-right font-mono font-black text-zinc-900 dark:text-white text-base sm:text-lg">
                      {item.nilai.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-emerald-50/80 dark:bg-emerald-950/40 border-t-2 border-emerald-500/40">
                  <td colSpan={3} className="py-4 sm:py-5 px-4 sm:px-6 text-right font-extrabold text-zinc-900 dark:text-white text-xs sm:text-base">
                    TOTAL NILAI AKHIR REKAPITULASI:
                  </td>
                  <td className="py-4 sm:py-5 px-4 sm:px-6 text-right font-mono font-black text-xl sm:text-2xl text-emerald-600 dark:text-emerald-400">
                    {t.final_score}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* External Spreadsheet Link Button */}
          <div className="flex justify-end pt-2">
            <a
              href="https://docs.google.com/spreadsheets/d/1VVHQfvEqWVzb5cl165ivFw7pp-UFCtlxI_-6fqUrr7I/edit?gid=1263546258#gid=1263546258"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm border border-emerald-500/30 hover:border-emerald-500/60 backdrop-blur-md transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-emerald-500/10 cursor-pointer"
            >
              <span>Lihat Lembar Penilaian Resmi (Spreadsheet)</span>
              <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </section>

        {/* --- SEKSI 2: GALERI FOTO DOKUMENTASI --- */}
        <section className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 shadow-xs">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
                  Galeri Dokumentasi Kompetisi
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  Dokumentasi proses pitching, demonstrasi platform, dan pengumuman hasil
                </p>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {t.gallery_categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs ${
                    activeCategory === category
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40"
                      : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredGallery.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img.src)}
                className="group relative bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-lg shadow-emerald-500/5 cursor-pointer transition-all duration-500 hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-500/15 transform hover:-translate-y-1.5 flex flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  <span className="absolute top-4 left-4 text-[10px] font-bold font-mono tracking-wider text-emerald-600 dark:text-emerald-300 bg-white/90 dark:bg-zinc-950/80 border border-emerald-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                    {img.category}
                  </span>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <span className="px-4 py-2.5 rounded-2xl bg-emerald-500 text-zinc-950 text-xs font-bold shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      Lihat Foto Penuh
                    </span>
                  </div>
                </div>

                <div className="p-6 bg-white/95 dark:bg-zinc-900/90 border-t border-zinc-200/80 dark:border-zinc-800/60 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {img.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                      {img.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* --- LIGHTBOX MODAL --- */}
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

      {/* End of content */}
    </main>
  );
}
