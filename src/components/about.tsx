"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useApp } from "./app-context";
import content from "@/data/content.json";

export default function About() {
  const { language } = useApp();
  const t = content[language]?.about || {
    title_about: "Tentang Saya",
    subtitle_about: "Mengenal lebih dekat latar belakang, filosofi kerja, dan fokus teknologi saya.",
    description: "Saya adalah seorang Full-Stack Developer & Digital Content Creator muda asal Medan yang saat ini bersekolah di Tasikmalaya, Jawa Barat. Masih mengenyam pendidikan di jenjang SMP dan juga bersekolah di Jaz Academy, saya berfokus pada pengembangan aplikasi web modern berbasis Next.js dan TypeScript, terbiasa membangun platform dengan arsitektur Full-Stack maupun Decoupled Architecture, mengintegrasikan database dengan Prisma ORM, serta membagikan wawasan teknologi melalui konten edukasi video.",
    stats: [
      {
        value: "3+ Proyek Utama",
        label: "Budiman Cendikia, Stry, SKS-Master",
        color: "from-emerald-500 to-teal-400"
      },
      {
        value: "Full-Stack",
        label: "Next.js, TypeScript, PHP, SQL",
        color: "from-teal-400 to-cyan-400"
      },
      {
        value: "AI-Powered",
        label: "Gemini & AntiGravity AI Workflows",
        color: "from-cyan-400 to-blue-500"
      }
    ],
    title_timeline: "Pendidikan & Pengalaman",
    subtitle_timeline: "Jejak langkah akademis dan pengalaman kepemimpinan proyek digital.",
    timeline: [
      {
        type: "Pendidikan",
        title: "Jaz Academy - Muslim Academy For Youth",
        role: "Sekolah Menengah Pertama (SMP)",
        location: "Tasikmalaya, Jawa Barat",
        period: "2024 - Sekarang",
        badge: "SMP - Siswa Aktif"
      },
      {
        type: "Prestasi / Project Lead",
        title: "Gemini Hackathon 2026",
        role: "Lead Developer - SKS-Master (Platform Ujian AI)",
        location: "Remote / Hackathon",
        period: "2026",
        badge: "Hackathon Lead"
      }
    ]
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementsRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-24 px-4 w-full max-w-5xl mx-auto relative transition-colors duration-300"
    >
      {/* --- SUB-SEKSI 1: ABOUT ME (BENTO GRID WITH PROFILE PHOTO) --- */}
      <div className="mb-20">
        <div className="text-center md:text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
            <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{t.title_about}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {t.title_about.split(" ")[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">{t.title_about.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm sm:text-base">
            {t.subtitle_about}
          </p>
        </div>

        {/* Bento Grid 2 Kolom: Foto Profil (Kiri) & Deskripsi Bio + Stats (Kanan) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Kolom Kiri: Container Foto Profil */}
          <div
            ref={addToRefs}
            className="md:col-span-4 relative group rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-900/50 min-h-[320px] md:min-h-[400px] flex flex-col justify-end"
          >
            <Image
              src="/profile-beach.jpg"
              alt="Muhammad Usamah Abdurrahman Profile Photo"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {/* Soft Gradient Overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10 p-5 text-white">
              <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur-md">
                Muhammad Usamah
              </span>
              <h3 className="text-lg font-extrabold mt-2 text-white">
                Full-Stack &amp; Creator
              </h3>
            </div>
          </div>

          {/* Kolom Kanan: Teks Bio Paragraf & Stat Cards */}
          <div className="md:col-span-8 flex flex-col justify-between gap-6">
            
            {/* Main Description Card */}
            <div
              ref={addToRefs}
              className="bg-white dark:bg-zinc-900/50 dark:backdrop-blur-md border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    Software Engineering &amp; Content Creation
                  </span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {t.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "Prisma ORM", "AI Tooling", "Decoupled Arch", "Content Creation"].map((tag) => (
                  <span key={tag} className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 px-3 py-1 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 3 Quick Stat Cards (Berjejer Rapi) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {t.stats.map((stat, idx) => (
                <div
                  key={idx}
                  ref={addToRefs}
                  className="group bg-white dark:bg-zinc-900/50 dark:backdrop-blur-md border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-4 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] shadow-sm flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all">
                      {idx === 0 && (
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                        </svg>
                      )}
                      {idx === 1 && (
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      )}
                      {idx === 2 && (
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className={`text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} tracking-tight`}>
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mt-0.5 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* --- SUB-SEKSI 2: PENDIDIKAN & TRACK RECORD (TIMELINE) --- */}
      <div>
        <div className="text-center md:text-left mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
            <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            <span>{t.title_timeline}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {t.title_timeline.split(" ")[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">{t.title_timeline.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm sm:text-base">
            {t.subtitle_timeline}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 sm:ml-8 space-y-10">
          {t.timeline.map((item, idx) => (
            <div key={idx} ref={addToRefs} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-100 dark:bg-zinc-900 border-2 border-emerald-500 group-hover:bg-emerald-500 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />

              {/* Timeline Card */}
              <div className="bg-white dark:bg-zinc-900/50 dark:backdrop-blur-md border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {item.period}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-1 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <polyline points="17 11 19 13 23 9" />
                  </svg>
                  <span>{item.role}</span>
                </p>

                {"description" in item && item.description && (
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    <svg className="w-3.5 h-3.5 text-zinc-400 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{item.location}</span>
                  </div>

                  {/* Dual Action Buttons (Instagram & Website) */}
                  {("instagram_link" in item || "web_link" in item) && (
                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      {"instagram_link" in item && item.instagram_link && (
                        <a
                          href={item.instagram_link as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white text-xs font-bold border border-zinc-200 dark:border-zinc-700/80 transition-all duration-300 shadow-xs cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                          <span>Instagram</span>
                        </a>
                      )}

                      {"web_link" in item && item.web_link && (
                        <a
                          href={item.web_link as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-450 text-zinc-950 text-xs font-bold transition-all duration-300 shadow-md shadow-emerald-500/10 cursor-pointer"
                        >
                          <span>{"web_label" in item ? (item.web_label as string) : "Kunjungi Situs"}</span>
                          <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
