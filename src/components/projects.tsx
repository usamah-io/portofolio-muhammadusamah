"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import HackathonModal from "./hackathon-modal";
import BrowserMockupCard from "./browser-mockup-card";

interface ProjectMetadata {
  image: string;
  domain: string;
  status: string;
  tech: string[];
  liveUrl: string;
  repoUrl: string;
}

const PROJECTS_METADATA: ProjectMetadata[] = [
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
      className="py-24 px-4 w-full max-w-6xl mx-auto relative transition-colors duration-300 text-gray-900 dark:text-white"
    >
      {/* Header Section */}
      <div className="text-center md:text-left mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-[#00FF87]/10 border border-emerald-500/30 dark:border-[#00FF87]/30 text-emerald-600 dark:text-[#00FF87] text-xs font-mono font-bold">
          <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>Portfolio Showcase</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Proyek <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-[#00FF87] dark:to-teal-400">Unggulan</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl">
          {t.subtitle}
        </p>
      </div>

      {/* Grid of Projects using Reusable BrowserMockupCard */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 items-start">
        {t.items.map((project, idx) => {
          const meta = PROJECTS_METADATA[idx];
          const isMainCard = idx === 0;

          return (
            <div key={project.title} ref={addToRefs}>
              <BrowserMockupCard
                domain={meta.domain}
                mediaType="image"
                mediaSrc={meta.image}
                floatingBadge={{
                  text: meta.status,
                  variant: isMainCard ? "neon" : "dark",
                }}
                secondaryBadge={isMainCard ? { text: "Top 4 (86.4)", variant: "neon" } : undefined}
                categoryLabel={project.badge}
                title={project.title}
                description={project.description}
                tags={meta.tech}
                isHighlighted={isMainCard}
                extraAction={
                  isMainCard
                    ? {
                        label: "Galeri & Rekap Nilai ↗",
                        onClick: () => setIsModalOpen(true),
                        icon: (
                          <svg className="w-3.5 h-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        ),
                      }
                    : undefined
                }
                primaryAction={{
                  label: t.btn_demo,
                  href: meta.liveUrl,
                }}
                secondaryAction={{
                  label: t.btn_source,
                  href: meta.repoUrl,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Interactive Hackathon Modal */}
      <HackathonModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}
