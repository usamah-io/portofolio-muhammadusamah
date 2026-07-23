"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "./app-context";
import content from "@/data/content.json";

interface ProjectLink {
  liveUrl: string;
  repoUrl: string;
  tech: string[];
}

// Keep raw metadata and URLs in constant array
const PROJECTS_METADATA: ProjectLink[] = [
  {
    tech: ["Next.js", "TypeScript", "Google Gemini API", "Vercel"],
    liveUrl: "https://hekaton-gemini.vercel.app",
    repoUrl: "https://github.com/usamah-io/Hekaton-Gemini2026",
  },
  {
    tech: ["Next.js", "Prisma ORM", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://studee-ten.vercel.app",
    repoUrl: "https://github.com/usamah-io/Studee-x-Python",
  },
  {
    tech: ["TypeScript", "PHP (Blade)", "SQL", "Decoupled Architecture"],
    liveUrl: "https://budimancendikia.sch.id",
    repoUrl: "https://github.com/budimancendikia304/budiman-cendikia",
  },
];

export default function Projects() {
  const { language } = useApp();
  const t = content[language].projects;

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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
          {t.title.split(" ")[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">{t.title.substring(t.title.indexOf(" ") + 1)}</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm sm:text-base">
          {t.subtitle}
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {t.items.map((project, idx) => {
          const meta = PROJECTS_METADATA[idx];
          const isMainCard = idx === 0;

          return (
            <div
              key={project.title}
              ref={addToRefs}
              className={`group relative bg-white dark:bg-zinc-900/50 dark:backdrop-blur-md border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.06)] shadow-sm hover:shadow-md flex flex-col justify-between transform hover:scale-[1.01] ${
                isMainCard ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <div>
                {/* Badge & Title */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="text-[10px] font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full transition-colors duration-300">
                    {project.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors mb-3">
                  {project.title}
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 transition-colors duration-300">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {meta.tech.map((techItem) => (
                    <span
                      key={techItem}
                      className="text-[11px] text-zinc-600 dark:text-zinc-400 font-mono bg-zinc-100 dark:bg-zinc-950/60 px-2.5 py-1 border border-zinc-200 dark:border-zinc-850/50 rounded-md transition-colors duration-300"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 border-t border-zinc-200 dark:border-zinc-800/50 pt-4 mt-2">
                <a
                  href={meta.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors py-2.5 px-4 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-transparent hover:border-zinc-250 dark:hover:border-zinc-800"
                >
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                  {t.btn_source}
                </a>
                <a
                  href={meta.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-bold text-zinc-950 bg-emerald-500 hover:bg-emerald-450 transition-colors py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-500/10"
                >
                  {t.btn_demo}
                  <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
