"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Trophy, Download } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import Typewriter from "./typewriter";

export default function Hero() {
  const { language } = useApp();
  const t = content[language].hero;

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Split words/lines or animate the title
      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll(".reveal-line");
        tl.fromTo(
          lines,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, delay: 0.1 }
        );
      }

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.7"
      );

      tl.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-20 px-4"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 -z-10" />
      
      {/* Dynamic light blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full -z-10 animate-pulse duration-[8000ms]" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" 
      />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6 sm:gap-7 relative z-10">
        
        {/* Bento/Trading UI Bold Typography Header */}
        <h1 
          ref={titleRef}
          className="flex flex-col items-center justify-center text-center gap-2.5 sm:gap-3"
        >
          {/* Badge Highlight Prestasi (Emerald Glassmorphism Theme) */}
          <span className="block overflow-hidden pb-1">
            <span className="reveal-line inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-medium tracking-wide shadow-sm hover:bg-emerald-500/20 transition-all duration-300">
              <Trophy className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 mr-1.5 flex-shrink-0" />
              <span>{t.badge_achievement || "Top 4 Finalis Gemini Hackathon 2026"}</span>
            </span>
          </span>

          {/* Tingkat 1: Nama Utama (Paling Besar) */}
          <span className="block overflow-hidden pb-1">
            <span className="reveal-line block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Muhammad Usamah Abdurrahman
            </span>
          </span>

          {/* Tingkat 2: Animasi Role / Typewriter (Sedang) */}
          <span className="block overflow-hidden pb-1 min-h-[44px] sm:min-h-[52px] flex items-center justify-center">
            <span className="reveal-line block text-xl sm:text-2xl md:text-3xl font-bold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400">
              <Typewriter
                words={[
                  "Full-Stack Developer & Content Creator",
                  "Frontend Engineer & UI Designer",
                  "AI Tooling & Web Solutions Specialist"
                ]}
                typingSpeed={75}
                deletingSpeed={35}
                pauseDuration={2000}
              />
            </span>
          </span>
        </h1>

        {/* Tingkat 3: Deskripsi Paragraf (Paling Kecil & Muted) */}
        <p 
          ref={subtitleRef}
          className="opacity-0 max-w-xl mx-auto text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed"
        >
          {t.subtitle}
        </p>

        {/* CTA Buttons */}
        <div 
          ref={buttonsRef}
          className="opacity-0 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 w-full justify-center"
        >
          <Link
            href="#projects"
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-full px-6 py-3 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 ease-out flex items-center justify-center text-center"
          >
            {t.cta_explore}
          </Link>
          <a
            href="/cv-muhammad-usamah.pdf"
            download="cv-muhammad-usamah.pdf"
            className="group w-full sm:w-auto bg-zinc-900 text-white border border-zinc-700/80 font-medium rounded-full px-6 py-3 shadow-sm hover:border-emerald-500 hover:text-emerald-400 hover:bg-emerald-950/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 transition-all duration-300 ease-out flex items-center justify-center text-center"
          >
            <Download className="w-4 h-4 mr-2 flex-shrink-0 transition-colors duration-300 group-hover:text-emerald-400" />
            <span>{t.cta_download_cv || "Download CV"}</span>
          </a>
          <a
            href={content.socials.github || "https://github.com/usamah-io"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-zinc-900 text-white border border-zinc-700/80 font-medium rounded-full px-6 py-3 shadow-sm hover:border-emerald-500 hover:text-emerald-400 hover:bg-emerald-950/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 transition-all duration-300 ease-out flex items-center justify-center text-center"
          >
            {t.cta_github}
          </a>
        </div>

      </div>
    </section>
  );
}
