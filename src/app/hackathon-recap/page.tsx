"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, FileText, ExternalLink, Eye, X, Trophy, CheckCircle2, ArrowLeft } from "lucide-react";
import { useApp } from "@/components/app-context";
import content from "@/data/content.json";
import Typewriter from "@/components/typewriter";

export default function HackathonRecapPage() {
  const { language } = useApp();
  const tData = (content[language] || content["id"]) as typeof content["id"];
  const t = tData.hackathon;

  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const mainCertificateSrc = "/assets/datakeseluruhan peserta.png";

  const filteredGallery =
    activeCategory === "Semua" || activeCategory === "All"
      ? t.gallery_items
      : t.gallery_items.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-transparent text-zinc-900 dark:text-white selection:bg-emerald-500 selection:text-zinc-950 font-sans relative z-10 overflow-x-hidden transition-colors duration-300">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="pt-28 pb-24 px-4 sm:px-6 w-full max-w-5xl mx-auto relative z-10 space-y-16">
        
        {/* Navigation Breadcrumb & Back Link */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2.5 px-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">Gemini Hackathon 2026</span>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto py-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shadow-xs">
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
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

        {/* --- CERTIFICATE FIRST HERO MEDIA PREVIEW --- */}
        <section className="bg-white/90 dark:bg-zinc-900/80 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-emerald-500/10 space-y-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-extrabold">
                <Trophy className="w-3.5 h-3.5" />
                <span>{t.badge || "Top 4 Gemini Hackathon 2026"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
                Sks-Master (Platform Ujian AI Interactive)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
                Platform evaluasi belajar cerdas berbasis Google Gemini API untuk membantu institusi pendidikan mengotomatiskan pembuatan dan analisis soal ujian.
              </p>
            </div>

            {/* Score Pill */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-emerald-500/40 min-w-[200px] shrink-0 text-center shadow-md">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {t.final_score_label || "Skor Akhir Juri"}
              </span>
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 my-1 font-mono">
                {t.final_score}
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-0.5 rounded-full border border-emerald-500/20">
                Peringkat 4 Nasional
              </span>
            </div>
          </div>

          {/* Certificate Image Hero Preview Container */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
                <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Sertifikat & Lembar Penilaian Utama</span>
              </div>
              <button
                onClick={() => setSelectedImage(mainCertificateSrc)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Buka Layar Penuh</span>
              </button>
            </div>

            <div
              onClick={() => setSelectedImage(mainCertificateSrc)}
              className="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-xl group cursor-pointer bg-zinc-950"
            >
              <Image
                src={mainCertificateSrc}
                alt="Sertifikat Rekap Nilai Resmi SKS Master Gemini Hackathon 2026"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

              {/* Action Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                <span className="px-5 py-3 rounded-2xl bg-emerald-500 text-zinc-950 text-xs sm:text-sm font-extrabold shadow-2xl flex items-center gap-2.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>Lihat Sertifikat Full-Size</span>
                </span>
              </div>
            </div>

            {/* Formal Action Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedImage(mainCertificateSrc)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs sm:text-sm shadow-md hover:bg-emerald-400 transition-all cursor-pointer"
              >
                <Award className="w-4 h-4 shrink-0" />
                <span>Lihat Sertifikat</span>
              </button>

              <a
                href="https://docs.google.com/spreadsheets/d/1VVHQfvEqWVzb5cl165ivFw7pp-UFCtlxI_-6fqUrr7I/edit?gid=1263546258#gid=1263546258"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 border border-slate-300 dark:border-zinc-700 font-bold text-xs sm:text-sm shadow-sm hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>Lembar Penilaian (Spreadsheet)</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60 ml-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* --- SEKSI 1: TABEL REKAPITULASI NILAI RESMI --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-xs shrink-0">
              <FileText className="w-5 h-5" />
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

          {/* Mobile Responsive Card Stack View */}
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

          {/* Desktop Table View */}
          <div className="hidden sm:block w-full max-w-full overflow-x-auto touch-pan-x overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/50 backdrop-blur-md shadow-xl shadow-emerald-500/5 transition-all">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider">
                  <th className="py-4 px-4 sm:px-6 font-bold">Kriteria Penilaian</th>
                  <th className="py-4 px-3 sm:px-4 text-center font-bold">Bobot</th>
                  <th className="py-4 px-4 sm:px-6 text-center font-bold">Skor Juri</th>
                  <th className="py-4 px-4 sm:px-6 text-right font-bold">Nilai Akhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-xs sm:text-sm">
                {t.scores.map((item, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 sm:py-5 px-4 sm:px-6 font-medium text-zinc-900 dark:text-zinc-100">
                      <div className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white">
                        {item.kriteria}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-md leading-relaxed">
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
              <FileText className="w-4 h-4 shrink-0" />
              <span>Lihat Lembar Penilaian Resmi (Spreadsheet)</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60" />
            </a>
          </div>
        </section>

        {/* --- SEKSI 2: GALERI FOTO DOKUMENTASI --- */}
        <section className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 shadow-xs">
                <FileText className="w-5 h-5" />
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
                      <Eye className="w-4 h-4 shrink-0" />
                      <span>Lihat Sertifikat / Foto</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className="font-extrabold text-base text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {img.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {img.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* --- CLEAN IMAGE LIGHTBOX MODAL --- */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 cursor-pointer"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-[210] border border-white/20 shadow-xl"
            aria-label="Tutup Preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[85vh] aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/20"
          >
            <Image
              src={selectedImage}
              alt="Full Resolution Preview"
              fill
              priority
              sizes="100vw"
              className="object-contain bg-black"
            />
          </div>
        </div>
      )}
    </main>
  );
}
