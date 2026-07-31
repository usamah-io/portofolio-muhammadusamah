"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import HackathonModal from "./hackathon-modal";

interface ProjectLink {
  liveUrl: string;
  repoUrl: string;
  tech: string[];
}

// Keep raw metadata and URLs in constant array
const PROJECTS_METADATA: ProjectLink[] = [
  {
    tech: ["Next.js 16", "TypeScript", "Google Gemini AI", "Tailwind CSS", "Framer Motion", "Vercel"],
    liveUrl: "https://hekaton-gemini.vercel.app",
    repoUrl: "https://github.com/usamah-io/Hekaton-Gemini2026",
  },
  {
    tech: ["Next.js 16", "Prisma ORM", "TypeScript", "Tailwind CSS", "PostgreSQL", "NextAuth"],
    liveUrl: "https://studee-ten.vercel.app",
    repoUrl: "https://github.com/usamah-io/Studee-x-Python",
  },
  {
    tech: ["TypeScript", "PHP (Blade)", "MySQL", "Tailwind CSS", "Decoupled Architecture"],
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
        { opacity: 0, y: 50, scale: 0.96 },
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
      className="py-24 px-4 w-full max-w-5xl mx-auto relative transition-colors duration-300"
    >
      {/* Header */}
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Proyek <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Unggulan</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm sm:text-base">
          {t.subtitle}
        </p>
      </div>

      {/* Responsive Bento Grid Layout: 2 Columns on Mobile, 3 Columns on Desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 md:gap-6">
        {t.items.map((project, idx) => {
          const meta = PROJECTS_METADATA[idx];
          const isMainCard = idx === 0;

          return (
            <div
              key={project.title}
              ref={addToRefs}
              className={`group relative bg-white dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 sm:p-7 transition-all duration-300 hover:border-emerald-500/60 dark:hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 shadow-sm flex flex-col justify-between transform hover:-translate-y-1.5 ${
                isMainCard ? "col-span-2 md:col-span-2 border-emerald-500/40 dark:border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 via-white to-transparent dark:from-emerald-500/5 dark:via-zinc-900/60" : "col-span-1 md:col-span-1"
              }`}
            >
              <div>
                {/* Badge & Title */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
                  <span className="text-[10px] font-mono font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full transition-colors duration-300">
                    {project.badge}
                  </span>

                  {isMainCard && (
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                      <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="8" r="6" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                      <span>Top 5 Finalist (86.4)</span>
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-2xl font-extrabold text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors mb-2 sm:mb-3 leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5 sm:mb-6 transition-colors duration-300">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                  {meta.tech.map((techItem) => (
                    <span
                      key={techItem}
                      className="text-[10px] sm:text-[11px] font-mono font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/20 px-2.5 py-1 rounded-lg transition-all duration-300 hover:border-emerald-500/40"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Responsive & Inline Flex Row */}
              <div className="flex flex-wrap items-center gap-2 border-t border-zinc-200 dark:border-zinc-800/50 pt-4 mt-2">
                {isMainCard && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-extrabold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-400 transition-all py-2 px-3.5 rounded-xl shadow-md shadow-emerald-500/20 cursor-pointer border border-emerald-300/40 transform hover:scale-105"
                  >
                    <svg className="w-3.5 h-3.5 text-white shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
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
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors py-2 px-3.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800 cursor-pointer"
                  title={t.btn_source}
                >
                  <svg className="w-3.5 h-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                  <span>{t.btn_source}</span>
                </a>
                
                <a
                  href={meta.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-950 bg-emerald-500 hover:bg-emerald-400 transition-colors py-2 px-3.5 rounded-xl shadow-lg shadow-emerald-500/10 cursor-pointer"
                  title={t.btn_demo}
                >
                  <span>{t.btn_demo}</span>
                  <svg className="w-3.5 h-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </a>
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

