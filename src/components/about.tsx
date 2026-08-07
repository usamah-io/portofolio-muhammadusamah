"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import Typewriter from "./typewriter";

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
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight min-h-[1.2em] flex items-center justify-center md:justify-start">
            <Typewriter
              words={["Profil Singkat & Latar Belakang"]}
              loop={true}
              typingSpeed={70}
              deletingSpeed={40}
              pauseDuration={2500}
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 dark:from-[#00FF87] dark:via-teal-400 dark:to-emerald-300 font-extrabold"
              cursorClassName="text-emerald-500 dark:text-[#00FF87] text-3xl md:text-4xl font-light"
            />
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
    </section>
  );
}
