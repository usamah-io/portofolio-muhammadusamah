"use client";

import { useEffect, useRef } from "react";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import { gsap } from "@/lib/gsap";

export default function About() {
  const { language } = useApp();
  const t = content[language as "id" | "en"] || content.id;
  const sectionRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !portraitRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        portraitRef.current,
        { rotation: 6, y: 50 },
        {
          rotation: -2,
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-hero relative w-full max-w-5xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden border-t-2 border-foreground/20"
    >
      <div className="about-hero-bio flex-1 space-y-6 text-center md:text-left">
        <div className="about-hero-header space-y-2">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-foreground">
            Hi, I'm Usamah
          </h2>
        </div>
        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed max-w-xl font-medium">
          {t.about.description}
        </p>
        <p className="font-mono text-xs font-black uppercase tracking-widest text-emerald-500">
          Code / Design / Craft / Repeat
        </p>
      </div>

      {/* Portrait Frame: rotate(6deg), Emerald Border + Zinc Outline */}
      <div
        ref={portraitRef}
        className="about-hero-portrait relative w-48 sm:w-60 h-72 sm:h-84 flex-shrink-0 rounded-2xl overflow-hidden border-4 border-emerald-500 outline outline-4 outline-zinc-800 dark:outline-zinc-200 transform rotate-6 shadow-2xl bg-zinc-950 flex flex-col justify-between p-6 text-white text-center font-mono"
      >
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center font-black text-emerald-400 text-lg">
          MU
        </div>
        <div className="space-y-1">
          <h3 className="font-black text-lg text-white">Muhammad Usamah</h3>
          <p className="text-[11px] text-emerald-400">Full-Stack Dev & Creator</p>
          <p className="text-[10px] text-white/60">Jaz Academy Tasikmalaya</p>
        </div>
      </div>
    </section>
  );
}
