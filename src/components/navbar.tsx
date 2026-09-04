"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "./app-context";
import { usePageTransition } from "./PageTransition";
import content from "@/data/content.json";
import { Sun, Moon, Globe } from "lucide-react";
import { gsap } from "gsap";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, theme, toggleTheme } = useApp();
  const { navigateTo } = usePageTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = content[language as "id" | "en"] || content.id;

  const toggleMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Lock scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";

      // Animate overlay entrance
      gsap.fromTo(
        ".nav-overlay-bg",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        ".nav-item-el",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.75, stagger: 0.06, ease: "power4.out", delay: 0.1 }
      );
      gsap.fromTo(
        ".nav-footer-el",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out", delay: 0.3 }
      );
    } else {
      // Unlock scroll
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";

      gsap.to(".nav-overlay-bg", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setIsOpen(false),
      });
    }
  };

  const handleNavClick = (href: string) => {
    if (isOpen) {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      setIsOpen(false);
    }
    navigateTo(href);
  };

  if (!mounted) {
    return (
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-5xl px-4">
        <div className="flex items-center justify-between bg-zinc-900/90 dark:bg-black/90 text-white border border-white/20 rounded-full px-6 py-3 shadow-2xl">
          <span className="font-mono text-lg font-black tracking-widest text-emerald-400">M * U</span>
          <span className="font-mono text-xs font-bold uppercase">Menu</span>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-5xl px-4">
        <div className="flex items-center justify-between bg-zinc-950/85 dark:bg-black/85 backdrop-blur-xl border border-white/20 text-white rounded-full px-6 py-3 shadow-2xl transition-all duration-300">
          
          {/* Logo Brand M * U */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/");
            }}
            className="font-mono text-lg font-black tracking-widest text-emerald-400 hover:text-emerald-300 transition flex items-center gap-2"
          >
            <span>M * U</span>
            <span className="text-[10px] opacity-60 font-sans tracking-normal bg-white/10 px-2 py-0.5 rounded">DEV.PORTFOLIO</span>
          </Link>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher ID | EN */}
            <div className="flex items-center text-[11px] font-mono font-extrabold bg-white/10 rounded-full px-3 py-1 gap-1 border border-white/20">
              <button
                onClick={() => setLanguage("id")}
                className={`transition-colors cursor-pointer px-1 py-0.5 rounded ${
                  language === "id" ? "text-emerald-400 font-black" : "text-white/60 hover:text-white"
                }`}
              >
                ID
              </button>
              <span className="text-white/30">|</span>
              <button
                onClick={() => setLanguage("en")}
                className={`transition-colors cursor-pointer px-1 py-0.5 rounded ${
                  language === "en" ? "text-emerald-400 font-black" : "text-white/60 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer border border-white/20"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-emerald-400" /> : <Moon className="w-4 h-4 text-amber-300" />}
            </button>

            {/* Menu Toggle Button */}
            <button
              onClick={toggleMenu}
              className="font-mono text-xs font-black uppercase px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black transition-transform duration-300 active:scale-95 shadow-[2px_2px_0px_#ffffff] cursor-pointer"
            >
              {isOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      {isOpen && (
        <div className="nav-overlay-bg fixed inset-0 z-[120] bg-zinc-950/98 text-white p-8 md:p-12 flex flex-col justify-between overflow-y-auto">
          {/* Top Bar */}
          <div className="flex justify-between items-center border-b border-white/20 pb-6">
            <span className="font-mono text-xl font-black text-emerald-400 tracking-widest">M * U // NAVIGATION</span>
            <button
              onClick={toggleMenu}
              className="font-mono text-xs font-extrabold px-5 py-2 border border-white/30 rounded-full hover:bg-white/10 transition cursor-pointer"
            >
              CLOSE ✕
            </button>
          </div>

          {/* Main Nav Items Stagger */}
          <div className="my-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-2xl md:text-4xl font-black uppercase tracking-tight">
            <div className="overflow-hidden">
              <button
                onClick={() => handleNavClick("/contact")}
                className="nav-item-el block text-left hover:text-emerald-400 transition transform cursor-pointer"
              >
                ➜ 00. Get in Touch
              </button>
            </div>
            <div className="overflow-hidden">
              <button
                onClick={() => handleNavClick("/projects")}
                className="nav-item-el block text-left hover:text-emerald-400 transition transform cursor-pointer"
              >
                ➜ 01. {t.nav.projects || "Proyek"}
              </button>
            </div>
            <div className="overflow-hidden">
              <button
                onClick={() => handleNavClick("/#experience")}
                className="nav-item-el block text-left hover:text-emerald-400 transition transform cursor-pointer"
              >
                ➜ 02. {t.nav.volunteer || "Volunteer"}
              </button>
            </div>
            <div className="overflow-hidden">
              <button
                onClick={() => handleNavClick("/about")}
                className="nav-item-el block text-left hover:text-emerald-400 transition transform cursor-pointer"
              >
                ➜ 03. {t.nav.about || "Tentang Saya"}
              </button>
            </div>
            <div className="overflow-hidden">
              <button
                onClick={() => handleNavClick("/experience")}
                className="nav-item-el block text-left hover:text-emerald-400 transition transform cursor-pointer"
              >
                ➜ 04. {t.nav.education_experience || "Pendidikan & Pengalaman"}
              </button>
            </div>
            <div className="overflow-hidden">
              <button
                onClick={() => handleNavClick("/tools")}
                className="nav-item-el block text-left hover:text-emerald-400 transition transform cursor-pointer"
              >
                ➜ 05. {t.nav.tools || "Alat & AI"}
              </button>
            </div>
            <div className="overflow-hidden">
              <button
                onClick={() => handleNavClick("/hackathon-recap")}
                className="nav-item-el block text-left hover:text-emerald-400 transition transform cursor-pointer"
              >
                ➜ 06. {t.nav.achievement || "Hackathon & Rekap Nilai"}
              </button>
            </div>
            <div className="overflow-hidden">
              <button
                onClick={() => handleNavClick("/articles")}
                className="nav-item-el block text-left hover:text-emerald-400 transition transform cursor-pointer"
              >
                ➜ 07. {t.nav.articles || "Artikel"}
              </button>
            </div>
            <div className="overflow-hidden">
              <button
                onClick={() => handleNavClick("/faq")}
                className="nav-item-el block text-left hover:text-emerald-400 transition transform cursor-pointer"
              >
                ➜ 08. {t.nav.faq || "FAQ"}
              </button>
            </div>
          </div>

          {/* Footer Staggered Items */}
          <div className="border-t border-white/20 pt-6 flex flex-wrap justify-between items-center gap-4 font-mono text-xs text-white/60">
            <div className="nav-footer-el flex flex-wrap gap-4">
              <span className="text-emerald-400 font-bold">FIND ME:</span>
              <a href={content.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a>
              <a href={content.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a>
              <a href={content.socials.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">TikTok</a>
              <a href={content.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">WhatsApp</a>
            </div>
            <div className="nav-footer-el">
              (C) MUHAMMAD USAMAH // 2026
            </div>
          </div>
        </div>
      )}
    </>
  );
}
