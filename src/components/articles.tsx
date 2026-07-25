"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "./app-context";
import content from "@/data/content.json";

export default function Articles() {
  const { language } = useApp();
  const t = content[language].articles;

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // GSAP Entrance Animation
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
  }, [t.items]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Limit content display to max 6 elements
  const displayedItems = (t.items || []).slice(0, 6);

  return (
    <section
      ref={containerRef}
      className="py-24 px-4 w-full max-w-5xl mx-auto relative transition-colors duration-300"
    >
      {/* Header */}
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {t.title.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            {t.title.split(" ").slice(-1)[0]}
          </span>
        </h2>
        <p className="text-zinc-650 dark:text-zinc-400 mt-2 text-sm sm:text-base">
          {t.subtitle}
        </p>
      </div>

      {/* Responsive Grid Layout: 2 Columns on Mobile, 3 Columns on Desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 md:gap-6">
        {displayedItems.map((item, idx) => {
          const isVideo = (item.platform || "").toLowerCase().includes("tiktok") || (item.platform || "").toLowerCase().includes("instagram");

          return (
            <div
              key={item.id || item.title || idx}
              ref={addToRefs}
              className="group relative bg-white dark:bg-zinc-900/50 dark:backdrop-blur-md border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.06)] shadow-sm hover:shadow-md flex flex-col justify-between transform hover:scale-[1.01]"
            >
              <div>
                {/* Meta info / Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-3">
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-colors duration-300 truncate self-start">
                    {item.tag}
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-zinc-550 dark:text-zinc-400 font-mono bg-zinc-100 dark:bg-zinc-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-colors duration-300 self-start sm:self-auto">
                    {item.platform}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-base font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors mb-3 sm:mb-6 leading-snug line-clamp-3 sm:line-clamp-none">
                  {item.title}
                </h3>
              </div>

              {/* Responsive Action Button */}
              <div className="border-t border-zinc-200 dark:border-zinc-800/55 pt-3 sm:pt-4 mt-2">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1 sm:gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white text-[10px] sm:text-xs font-bold py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <span className="truncate">{isVideo ? t.watch_video : t.read_more}</span>
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
