"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import HackathonModal from "./hackathon-modal";

interface ProjectLink {
  image: string;
  domain: string;
  status: string;
  tech: string[];
  liveUrl: string;
  repoUrl: string;
}

// Metadata with authentic project screenshots
const PROJECTS_METADATA: ProjectLink[] = [
  {
    image: "/assets/projects/sks-master.png",
    domain: "sks-master.vercel.app",
    status: "Hackathon Winner",
    tech: ["Next.js 16", "TypeScript", "Google Gemini AI", "Tailwind CSS", "Vercel"],
    liveUrl: "https://hekaton-gemini.vercel.app",
    repoUrl: "https://github.com/usamah-io/Hekaton-Gemini2026",
  },
  {
    image: "/assets/projects/studee.png",
    domain: "studee-ten.vercel.app",
    status: "Production App",
    tech: ["Next.js 16", "Prisma ORM", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    liveUrl: "https://studee-ten.vercel.app",
    repoUrl: "https://github.com/usamah-io/Studee-x-Python",
  },
  {
    image: "/assets/projects/budiman-cendikia.png",
    domain: "budimancendikia.sch.id",
    status: "School Portal",
    tech: ["TypeScript", "PHP (Blade)", "MySQL", "Tailwind CSS"],
    liveUrl: "https://budimancendikia.sch.id",
    repoUrl: "https://github.com/budimancendikia304/budiman-cendikia",
  },
];

export default function Projects() {
  const { language } = useApp();
  const t = content[language].projects;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Auto-open Welcome Popup on initial page mount (session-based)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeenPopup = sessionStorage.getItem("hasSeenWelcomeHackathonPopup");
      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setIsModalOpen(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasSeenWelcomeHackathonPopup", "true");
    }
  };

  // GSAP ScrollTrigger entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
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
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-24 px-4 w-full max-w-6xl mx-auto relative transition-colors duration-300"
    >
      {/* Header Section */}
      <div className="text-center md:text-left mb-12 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>Portfolio Showcase</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
          Proyek <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Unggulan</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl">
          {t.subtitle}
        </p>
      </div>

      {/* Vercel Dashboard Grid: 1 Column on Mobile, 2 Columns on Tablet, 3 Columns on Large Screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {t.items.map((project, idx) => {
          const meta = PROJECTS_METADATA[idx];
          const isMainCard = idx === 0;

          return (
            <div
              key={project.title}
              ref={addToRefs}
              className={`group relative bg-white dark:bg-zinc-950/80 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between transform hover:-translate-y-1.5 ${
                isMainCard ? "border-emerald-500/40 dark:border-emerald-500/30" : ""
              }`}
            >
              {/* Vercel Card Top Header: Browser Window Mockup Frame */}
              <div className="bg-zinc-100/90 dark:bg-zinc-900/90 border-b border-zinc-200/80 dark:border-zinc-800/80 px-3.5 py-2 flex items-center justify-between gap-2 z-10 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-950 px-2.5 py-0.5 rounded-md border border-zinc-200/60 dark:border-zinc-800/60 truncate max-w-[160px] sm:max-w-[190px]">
                  https://{meta.domain}
                </div>
                <div className="w-4" />
              </div>

              {/* Authentic Screenshot Preview Image Area (NO AI GENERATED IMAGES) */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-950 group">
                <Image
                  src={meta.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-70" />
                
                {/* Floating Status Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold text-zinc-200 bg-zinc-950/80 backdrop-blur-md border border-zinc-700/80 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{meta.status}</span>
                  </span>
                </div>

                {isMainCard && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-mono font-bold text-zinc-950 bg-emerald-400 border border-emerald-300 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <span>Top 4 (86.4)</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Vercel Card Body Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-2 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Vercel Style Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {meta.tech.map((tItem) => (
                      <span
                        key={tItem}
                        className="text-[10px] font-mono font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 px-2.5 py-0.5 rounded-md"
                      >
                        {tItem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Responsive & Inline Flex Row */}
                <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-wrap items-center gap-2 mt-4">
                  {isMainCard && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full text-center inline-flex items-center justify-center gap-1.5 text-xs font-extrabold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-all py-2 px-3 rounded-xl shadow-md shadow-emerald-500/20 cursor-pointer border border-emerald-300/40 transform hover:scale-[1.02] mb-1 sm:mb-0"
                    >
                      <svg className="w-3.5 h-3.5 text-zinc-950 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <span>Galeri & Rekap Nilai ↗</span>
                    </button>
                  )}

                  <a
                    href={meta.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors py-2 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 cursor-pointer min-h-[36px]"
                    title={t.btn_source}
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                    <span>{t.btn_source}</span>
                  </a>
                  
                  <a
                    href={meta.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-950 bg-emerald-500 hover:bg-emerald-400 transition-colors py-2 px-3 rounded-xl shadow-lg shadow-emerald-500/10 cursor-pointer min-h-[36px]"
                    title={t.btn_demo}
                  >
                    <span>{t.btn_demo}</span>
                    <svg className="w-3.5 h-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Hackathon Modal */}
      <HackathonModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}
