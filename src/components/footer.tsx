"use client";

import { useEffect, useRef } from "react";
import { usePageTransition } from "./PageTransition";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import { ScrollTrigger } from "@/lib/gsap";
import { SHOWCASE_IMAGES } from "@/data/showcase";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { navigateTo } = usePageTransition();
  const { language } = useApp();
  const isIndonesian = language === "id";

  const footerRef = useRef<HTMLElement>(null);
  const explosionRef = useRef<HTMLDivElement>(null);
  const explodedRef = useRef(false);

  useEffect(() => {
    const footer = footerRef.current;
    const layer = explosionRef.current;
    if (!footer || !layer) return;

    const gravity = 0.22;
    const friction = 0.985;
    const particles: Array<{
      el: HTMLImageElement;
      x: number;
      y: number;
      vx: number;
      vy: number;
      rot: number;
      vr: number;
    }> = [];
    let raf = 0;
    let startTime = 0;
    const DURATION = 1600;
    const FADE_START = 800;

    const seed = () => {
      layer.innerHTML = "";
      particles.length = 0;
      const cx = layer.clientWidth / 2;
      const cy = layer.clientHeight * 0.42;
      SHOWCASE_IMAGES.forEach((src) => {
        const el = document.createElement("img");
        el.src = src;
        el.alt = "";
        el.className = "explosion-particle-img";
        el.style.width = "72px";
        el.style.height = "88px";
        el.style.maxWidth = "72px";
        el.style.objectFit = "cover";
        el.style.opacity = "1";
        layer.appendChild(el);
        particles.push({
          el,
          x: cx - 36,
          y: cy,
          vx: (Math.random() - 0.5) * 14,
          vy: -10 - Math.random() * 8,
          rot: (Math.random() - 0.5) * 20,
          vr: (Math.random() - 0.5) * 10,
        });
      });
    };

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      let opacity = 1;
      let scale = 1;
      if (elapsed > FADE_START) {
        const progress = Math.min(1, (elapsed - FADE_START) / (DURATION - FADE_START));
        opacity = 1 - progress;
        scale = 1 - progress * 0.4;
      }

      particles.forEach((p) => {
        p.vy += gravity;
        p.vx *= friction;
        p.vy *= friction;
        p.vr *= friction;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg) scale(${scale})`;
        p.el.style.opacity = `${opacity}`;
      });

      if (elapsed < DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        layer.innerHTML = "";
      }
    };

    const burst = () => {
      if (explodedRef.current) return;
      explodedRef.current = true;
      seed();
      cancelAnimationFrame(raf);
      startTime = 0;
      raf = requestAnimationFrame(tick);
    };

    const reset = () => {
      explodedRef.current = false;
      cancelAnimationFrame(raf);
      if (layer) layer.innerHTML = "";
    };

    const trigger = ScrollTrigger.create({
      trigger: footer,
      start: "top 88%",
      end: "bottom top",
      onEnter: burst,
      onEnterBack: burst,
      onLeave: reset,
      onLeaveBack: reset,
    });

    return () => {
      trigger.kill();
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (href.includes("#")) {
      const id = href.split("#")[1];
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigateTo(href);
  };

  return (
    <footer ref={footerRef} id="contact" className="site-footer relative w-full px-4 sm:px-6 py-12 space-y-12 max-w-6xl mx-auto">
      {/* Prominent Contact CTA Section ("Get in touch") -> Navigates to /contact */}
      <section className="contact-cta w-full bg-emerald-500 dark:bg-[#00FF87] text-zinc-950 rounded-[2em] border-4 border-foreground p-8 sm:p-14 text-center space-y-4 shadow-2xl transition transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer group">
        <a href="/contact" onClick={go("/contact")} className="block w-full h-full">
          <div className="contact-text-small font-mono text-xs sm:text-sm font-black uppercase tracking-widest opacity-80 flex items-center justify-center gap-2">
            <span>{isIndonesian ? "Mari bangun sesuatu yang luar biasa bersama" : "Let's build something amazing together"}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          <div className="contact-text-large pt-2">
            <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none group-hover:underline">
              {isIndonesian ? "Hubungi Saya" : "Get in touch"}
            </h1>
          </div>
        </a>
      </section>

      {/* Main Footer Shell (Clean without embedded form) */}
      <div className="footer-shell relative z-[1] mx-auto max-w-6xl overflow-hidden rounded-[2em] bg-[var(--fg)] text-[var(--bg)] px-5 py-8 sm:px-10 sm:py-12 space-y-10 border-4 border-foreground">
        <span className="footer-mark footer-mark-tl" />
        <span className="footer-mark footer-mark-tr" />
        <span className="footer-mark footer-mark-bl" />
        <span className="footer-mark footer-mark-br" />

        <div ref={explosionRef} className="explosion-container" aria-hidden="true" />

        <h2 className="footer-name relative z-[2] text-center font-black italic uppercase tracking-tight text-[clamp(2rem,6vw,4.5rem)] leading-none">
          Muhammad Usamah
        </h2>

        <div className="relative z-[2] mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs sm:text-sm border-t border-current/20 pt-8">
          <div className="footer-col">
            <p className="footer-col-title">{isIndonesian ? "Jelajahi" : "Explore"}</p>
            <a href="/" onClick={go("/")}>{isIndonesian ? "Beranda" : "Home"}</a>
            <a href="/#projects" onClick={go("/#projects")}>{isIndonesian ? "Proyek" : "Projects"}</a>
            <a href="/#experience" onClick={go("/#experience")}>{isIndonesian ? "Pengalaman" : "Volunteer"}</a>
            <a href="/hackathon-recap" onClick={go("/hackathon-recap")}>{isIndonesian ? "Rekap Hackathon" : "Hackathon Recap"}</a>
            <a href="/about" onClick={go("/about")}>{isIndonesian ? "Tentang" : "About"}</a>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">{isIndonesian ? "Koneksi" : "Connect"}</p>
            <a href={content.socials.github} target="_blank" rel="noopener noreferrer">Github</a>
            <a href={content.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={content.socials.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href={content.socials.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={`mailto:${content.socials.gmail}`}>Gmail</a>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">{isIndonesian ? "Lainnya" : "Extras"}</p>
            <a href="/articles" onClick={go("/articles")}>{isIndonesian ? "Artikel" : "Articles"}</a>
            <a href="/tools" onClick={go("/tools")}>{isIndonesian ? "Alat & AI" : "Tools & AI"}</a>
            <a href="/faq" onClick={go("/faq")}>FAQ</a>
            <a href="/experience" onClick={go("/experience")}>{isIndonesian ? "Edukasi" : "Education"}</a>
          </div>
        </div>

        <p className="relative z-[2] mt-6 text-center font-mono text-[11px] tracking-widest text-[var(--bg)]/55">
          (C) — MUHAMMAD USAMAH // 2026
        </p>
      </div>
    </footer>
  );
}
