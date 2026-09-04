"use client";

import { useApp } from "./app-context";
import content from "@/data/content.json";

export default function Hero() {
  const { language } = useApp();
  const t = content[language as "id" | "en"] || content.id;

  return (
    <section className="hero relative pt-24 pb-12 flex flex-col items-center justify-center min-h-[70vh] px-4 overflow-hidden">
      {/* Dual Text Offset Headers */}
      <div className="hero-header-wrapper relative w-full max-w-5xl text-center select-none">
        <div className="hero-header hero-header-1 relative z-10 transform -translate-x-[2%]">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] font-black uppercase tracking-tighter leading-none text-foreground">
            Usamah
          </h1>
        </div>
        <div className="hero-header hero-header-2 relative z-0 transform translate-x-[8%] -mt-8 sm:-mt-14 md:-mt-20 opacity-25">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] font-black uppercase tracking-tighter leading-none text-foreground">
            Usamah
          </h1>
        </div>
      </div>

      {/* Subtitle Description */}
      <div className="mt-8 text-center max-w-2xl space-y-2 px-4">
        <h2 className="font-mono text-base sm:text-xl font-black uppercase text-emerald-500 tracking-tight">
          {t.hero.title_1} & {t.hero.title_2}
        </h2>
        <p className="text-xs sm:text-sm text-foreground/75 font-medium leading-relaxed">
          {t.hero.subtitle}
        </p>
      </div>

      {/* Hero Footer Bar (5 Glyphs | Fetch Resume | Showcase Mode: ON) */}
      <div className="hero-footer w-full max-w-5xl flex flex-wrap justify-between items-center border-t-2 border-foreground/30 pt-6 mt-16 font-mono text-xs text-foreground/80 gap-4">
        <div className="hero-footer-symbols flex gap-1 tracking-widest text-emerald-500 font-bold">
          /// /// ///
        </div>
        <div className="hero-footer-scroll-down text-center font-bold">
          <a
            href="https://drive.google.com/drive/folders/1rk-Ss1gvLCvrbTm2c59Vr_gK-a0Pg-U4?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-link hover:underline text-foreground uppercase tracking-wider bg-foreground/10 px-4 py-2 rounded-full border border-foreground/20 transition hover:bg-emerald-500 hover:text-black hover:border-emerald-500"
          >
            Fetch // Resume
          </a>
        </div>
        <div className="hero-footer-tags text-right font-bold uppercase tracking-wider text-emerald-500">
          Showcase Mode: ON
        </div>
      </div>
    </section>
  );
}
