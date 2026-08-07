"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useApp } from "./app-context";
import content from "@/data/content.json";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const { language, setLanguage, theme, toggleTheme } = useApp();

  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const moreTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Set mounted on client to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    return () => {
      if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
      if (moreTimeoutRef.current) clearTimeout(moreTimeoutRef.current);
    };
  }, []);

  const handleAboutEnter = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    setAboutDropdownOpen(true);
  };

  const handleAboutLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 200);
  };

  const handleMoreEnter = () => {
    if (moreTimeoutRef.current) clearTimeout(moreTimeoutRef.current);
    setMoreDropdownOpen(true);
  };

  const handleMoreLeave = () => {
    moreTimeoutRef.current = setTimeout(() => {
      setMoreDropdownOpen(false);
    }, 200);
  };

  const t = content[language as "id" | "en"] || content.id;

  // New Ordered Direct Links: 1. Proyek, 2. Volunteer, 3. Alat & AI
  const primaryLinks = [
    { label: t.nav.projects || "Proyek", href: "/projects" },
    { label: t.nav.volunteer || "Volunteer", href: "/volunteer" },
    { label: t.nav.tools || "Alat & AI", href: "/tools" },
  ];

  // Dropdown 1: Tentang Saya (Profil Singkat, Pendidikan & Pengalaman)
  const aboutDropdownLinks = [
    { label: t.nav.profile_short || "Profil Singkat", href: "/about" },
    { label: t.nav.education_experience || "Pendidikan & Pengalaman", href: "/experience" },
  ];

  // Dropdown 2: Prestasi (Hackathon & Rekap Nilai, Artikel, FAQ)
  const moreDropdownLinks = [
    { label: t.nav.achievement || "Hackathon & Rekap Nilai", href: "/hackathon-recap" },
    { label: t.nav.articles || "Artikel", href: "/articles" },
    { label: t.nav.faq || "FAQ", href: "/faq" },
  ];

  // Clear Glassmorphism 3D Raised Capsule Active State Indicator
  const activeGlassPill =
    "bg-white/90 dark:bg-zinc-800/90 text-emerald-600 dark:text-emerald-400 font-extrabold shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] shadow-md shadow-black/10 dark:shadow-black/50 border border-slate-300/80 dark:border-zinc-700/80 rounded-full px-3.5 py-1.5 transition-all duration-300 transform scale-102 flex items-center gap-1.5";

  const inactiveGlassPill =
    "text-slate-900 hover:text-black dark:text-zinc-200 dark:hover:text-white font-semibold hover:bg-white/50 dark:hover:bg-white/10 rounded-full px-3.5 py-1.5 transition-all duration-300 flex items-center gap-1.5";

  const isAboutGroupActive = ["/about", "/experience"].includes(pathname);
  const isMoreGroupActive = ["/hackathon-recap", "/articles", "/faq"].includes(pathname);

  // Smooth Scroll handler for Contact CTA
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/#contact";
    }
  };

  // SSR / Pre-hydration fallback structure with Clear Crystal Glass capsule
  if (!mounted) {
    return (
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-5xl px-4">
        <div className="flex items-center justify-between bg-white/70 dark:bg-black/65 backdrop-blur-3xl border-t border-l border-white/80 dark:border-white/20 border-b border-r border-black/10 dark:border-white/10 rounded-full px-4 sm:px-6 py-3 shadow-2xl shadow-black/10 dark:shadow-black/70 transition-all duration-300">
          <Link 
            href="/" 
            className="text-slate-950 dark:text-white font-extrabold tracking-wider text-xs sm:text-base shrink-0"
          >
            DEV<span className="text-emerald-500">.</span>PORTFOLIO
          </Link>
          
          {/* Desktop Right Group */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-5">
              <Link href="/projects" className="text-slate-800 dark:text-zinc-300 text-sm font-semibold">Proyek</Link>
              <Link href="/volunteer" className="text-slate-800 dark:text-zinc-300 text-sm font-semibold">Volunteer</Link>
              <Link href="/tools" className="text-slate-800 dark:text-zinc-300 text-sm font-semibold">Alat & AI</Link>
              <span className="text-slate-800 dark:text-zinc-300 text-sm font-semibold">Tentang Saya ▾</span>
              <span className="text-slate-800 dark:text-zinc-300 text-sm font-semibold">Prestasi ▾</span>
            </nav>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 text-[11px] font-extrabold border-r border-slate-300 dark:border-zinc-800 pr-2 mr-0.5 text-slate-600 dark:text-zinc-400">
                <button className="text-emerald-600 dark:text-emerald-400 font-black">ID</button>
                <span>|</span>
                <button className="hover:text-slate-950">EN</button>
              </div>
              <button onClick={toggleTheme} className="p-2 rounded-full text-slate-800 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer" aria-label="Toggle Theme">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              </button>
              <Link href="#contact" className="bg-white/80 dark:bg-white/10 text-slate-950 dark:text-white border border-white/90 dark:border-white/20 text-xs font-extrabold px-4 py-2 sm:px-5 rounded-full shadow-xs">
                Kontak
              </Link>
            </div>
          </div>

          {/* Mobile Outer Right Group */}
          <div className="flex md:hidden items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="flex items-center gap-1 text-[11px] font-extrabold border-r border-slate-300 dark:border-zinc-800 pr-2 text-slate-600">
              <button className="text-emerald-600 dark:text-emerald-400 font-black">ID</button>
              <span>|</span>
              <button>EN</button>
            </div>
            <button onClick={toggleTheme} className="p-1.5 rounded-full text-slate-800 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer" aria-label="Toggle Theme">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            </button>
            <button className="p-2 text-slate-800 rounded-full bg-white/60 dark:bg-zinc-800/50" aria-label="Toggle menu">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Mobile Full-Screen Backdrop Blur Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 z-[80] bg-slate-950/40 dark:bg-black/75 backdrop-blur-md animate-in fade-in duration-300 cursor-pointer"
          aria-label="Close mobile menu backdrop"
        />
      )}

      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-5xl px-4">
        {/* Clear Crystal Glassmorphism Full Rounded Pill Container */}
        <div className="flex items-center justify-between bg-white/70 dark:bg-black/65 backdrop-blur-3xl border-t border-l border-white/80 dark:border-white/20 border-b border-r border-black/10 dark:border-white/10 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-2xl shadow-black/10 dark:shadow-black/70 ring-1 ring-white/40 dark:ring-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300">
          
          {/* Brand Logo (Far Left) */}
          <Link 
            href="/" 
            className="text-slate-950 dark:text-white font-extrabold tracking-wider text-xs sm:text-base hover:opacity-80 transition-opacity shrink-0 flex items-center gap-1"
          >
            DEV<span className="text-emerald-500">.</span>PORTFOLIO
          </Link>

          {/* Desktop Navigation Group */}
          <div className="hidden md:flex items-center gap-4 lg:gap-5">
            <nav className="flex items-center gap-1.5 lg:gap-2 relative">
              {/* Direct Links: 1. Proyek, 2. Volunteer, 3. Alat & AI */}
              {primaryLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm ${isActive ? activeGlassPill : inactiveGlassPill}`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              {/* Dropdown 1: Tentang Saya ▾ */}
              <div 
                className="relative py-1"
                onMouseEnter={handleAboutEnter}
                onMouseLeave={handleAboutLeave}
              >
                <button
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  className={`text-sm cursor-pointer ${isAboutGroupActive ? activeGlassPill : inactiveGlassPill}`}
                >
                  <span>{t.nav.about || "Tentang Saya"}</span>
                  <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? "rotate-180 text-emerald-500" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Clear Crystal Frosted Glass Dropdown Popover */}
                {aboutDropdownOpen && (
                  <div 
                    onMouseEnter={handleAboutEnter}
                    onMouseLeave={handleAboutLeave}
                    className="absolute top-full left-0 pt-2 w-max min-w-[220px] z-[110] animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="rounded-3xl bg-white/75 dark:bg-black/75 backdrop-blur-3xl border-t border-l border-white/90 dark:border-white/20 border-b border-r border-black/10 dark:border-white/10 shadow-2xl shadow-black/15 dark:shadow-black/80 ring-1 ring-white/50 dark:ring-white/10 p-2.5 flex flex-col gap-1">
                      {aboutDropdownLinks.map((item) => {
                        const isSubActive = pathname === item.href;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setAboutDropdownOpen(false)}
                            className={`text-xs font-bold py-2.5 px-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 whitespace-nowrap ${
                              isSubActive
                                ? "bg-white/90 dark:bg-zinc-800/90 text-emerald-600 dark:text-emerald-400 border border-slate-300/80 dark:border-zinc-700/80 shadow-xs font-extrabold"
                                : "text-slate-900 hover:text-emerald-600 dark:text-zinc-100 dark:hover:text-emerald-400 hover:bg-white/60 dark:hover:bg-white/10"
                            }`}
                          >
                            <span className="whitespace-nowrap">{item.label}</span>
                            <svg className={`w-3.5 h-3.5 shrink-0 ${isSubActive ? "text-emerald-500 opacity-100" : "opacity-60"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Dropdown 2: Prestasi ▾ */}
              <div 
                className="relative py-1"
                onMouseEnter={handleMoreEnter}
                onMouseLeave={handleMoreLeave}
              >
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`text-sm cursor-pointer ${isMoreGroupActive ? activeGlassPill : inactiveGlassPill}`}
                >
                  <span>{t.nav.more || "Prestasi"}</span>
                  <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? "rotate-180 text-emerald-500" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Clear Crystal Frosted Glass Dropdown Popover */}
                {moreDropdownOpen && (
                  <div 
                    onMouseEnter={handleMoreEnter}
                    onMouseLeave={handleMoreLeave}
                    className="absolute top-full right-0 pt-2 w-max min-w-[220px] z-[110] animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="rounded-3xl bg-white/75 dark:bg-black/75 backdrop-blur-3xl border-t border-l border-white/90 dark:border-white/20 border-b border-r border-black/10 dark:border-white/10 shadow-2xl shadow-black/15 dark:shadow-black/80 ring-1 ring-white/50 dark:ring-white/10 p-2.5 flex flex-col gap-1">
                      {moreDropdownLinks.map((item) => {
                        const isSubActive = pathname === item.href;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMoreDropdownOpen(false)}
                            className={`text-xs font-bold py-2.5 px-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 whitespace-nowrap ${
                              isSubActive
                                ? "bg-white/90 dark:bg-zinc-800/90 text-emerald-600 dark:text-emerald-400 border border-slate-300/80 dark:border-zinc-700/80 shadow-xs font-extrabold"
                                : "text-slate-900 hover:text-emerald-600 dark:text-zinc-100 dark:hover:text-emerald-400 hover:bg-white/60 dark:hover:bg-white/10"
                            }`}
                          >
                            <span className="whitespace-nowrap">{item.label}</span>
                            <svg className={`w-3.5 h-3.5 shrink-0 ${isSubActive ? "text-emerald-500 opacity-100" : "opacity-60"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Utility Group */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="flex items-center gap-1 text-[11px] font-extrabold border-r border-slate-300/80 dark:border-zinc-800 pr-2 mr-0.5 text-slate-600 dark:text-zinc-400">
                <button 
                  onClick={() => setLanguage("id")} 
                  className={`hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer px-1 py-0.5 rounded ${
                    language === "id" ? "text-emerald-600 dark:text-emerald-400! font-black" : ""
                  }`}
                >
                  ID
                </button>
                <span>|</span>
                <button 
                  onClick={() => setLanguage("en")} 
                  className={`hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer px-1 py-0.5 rounded ${
                    language === "en" ? "text-emerald-600 dark:text-emerald-400! font-black" : ""
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-800 hover:text-black dark:text-zinc-300 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                ) : (
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                )}
              </button>

              {/* Clear Crystal Glass 3D "Kontak" CTA Button */}
              <a
                href="#contact"
                onClick={handleContactClick}
                className="text-xs font-extrabold px-4 py-2 sm:px-5 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 text-slate-950 dark:text-white bg-white/70 dark:bg-white/10 hover:bg-white/90 dark:hover:bg-white/20 backdrop-blur-xl border-t border-l border-white/90 dark:border-white/30 border-b border-r border-black/10 dark:border-white/10 ring-1 ring-white/60 dark:ring-white/20 shadow-md cursor-pointer"
              >
                {t.nav.cta}
              </a>
            </div>
          </div>

          {/* Mobile Outer Right Group */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="flex items-center gap-1 text-[11px] font-extrabold border-r border-slate-300 dark:border-zinc-800 pr-2 text-slate-600 dark:text-zinc-400">
              <button 
                onClick={() => setLanguage("id")} 
                className={`hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer ${
                  language === "id" ? "text-emerald-600 dark:text-emerald-400! font-black" : ""
                }`}
              >
                ID
              </button>
              <span>|</span>
              <button 
                onClick={() => setLanguage("en")} 
                className={`hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer ${
                  language === "en" ? "text-emerald-600 dark:text-emerald-400! font-black" : ""
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-800 hover:text-black dark:text-zinc-300 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              ) : (
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-800 hover:text-black dark:text-zinc-300 dark:hover:text-white rounded-full bg-white/70 dark:bg-white/10 hover:bg-white/90 dark:hover:bg-white/20 transition-colors cursor-pointer shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center border border-white/80 dark:border-white/20 shadow-xs"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              ) : (
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown Drawer */}
        {isOpen && (
          <div className="md:hidden mt-2.5 bg-white/80 dark:bg-black/80 backdrop-blur-3xl border-t border-l border-white/80 dark:border-white/20 border-b border-r border-black/10 dark:border-white/10 rounded-3xl p-4 flex flex-col gap-3 shadow-2xl shadow-black/15 dark:shadow-black/80 ring-1 ring-white/40 dark:ring-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
            
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-1.5">
              {primaryLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-bold py-2.5 px-3.5 rounded-2xl transition-all flex items-center justify-between min-h-[44px] ${
                      isActive
                        ? "bg-white/90 dark:bg-zinc-800/90 text-emerald-600 dark:text-emerald-400 border border-slate-300/80 dark:border-zinc-700 shadow-xs"
                        : "text-slate-900 hover:text-black dark:text-zinc-200 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10"
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <div className="my-1 border-t border-slate-300/60 dark:border-zinc-800/60" />

              {/* Group 1: Tentang Saya */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className={`w-full text-sm font-bold py-2.5 px-3.5 rounded-2xl transition-all flex items-center justify-between min-h-[44px] cursor-pointer ${
                    isAboutGroupActive
                      ? "bg-white/90 dark:bg-zinc-800/90 text-emerald-600 dark:text-emerald-400 border border-slate-300/80 dark:border-zinc-700"
                      : "text-slate-900 hover:text-black dark:text-zinc-200 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10"
                  }`}
                >
                  <span>{t.nav.about || "Tentang Saya"}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      mobileAboutOpen ? "rotate-180 text-emerald-500" : "text-slate-500 dark:text-zinc-400"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {mobileAboutOpen && (
                  <div className="pl-3 ml-3.5 mt-1 border-l-2 border-emerald-500/40 dark:border-emerald-500/30 flex flex-col gap-1 py-1 animate-in fade-in duration-200">
                    {aboutDropdownLinks.map((subLink) => {
                      const isSubActive = pathname === subLink.href;
                      return (
                        <Link
                          key={subLink.label}
                          href={subLink.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-xs font-semibold py-2 px-3 rounded-xl transition-all flex items-center justify-between ${
                            isSubActive
                              ? "bg-white/90 dark:bg-zinc-800/90 text-emerald-600 dark:text-emerald-400 font-extrabold border border-slate-300/80 dark:border-zinc-700"
                              : "text-slate-900 hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400 hover:bg-white/60 dark:hover:bg-white/10"
                          }`}
                        >
                          <span>{subLink.label}</span>
                          <svg className="w-3.5 h-3.5 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="my-1 border-t border-slate-300/60 dark:border-zinc-800/60" />

              {/* Group 2: Prestasi */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                  className={`w-full text-sm font-bold py-2.5 px-3.5 rounded-2xl transition-all flex items-center justify-between min-h-[44px] cursor-pointer ${
                    isMoreGroupActive
                      ? "bg-white/90 dark:bg-zinc-800/90 text-emerald-600 dark:text-emerald-400 border border-slate-300/80 dark:border-zinc-700"
                      : "text-slate-900 hover:text-black dark:text-zinc-200 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10"
                  }`}
                >
                  <span>{t.nav.more || "Prestasi"}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      mobileMoreOpen ? "rotate-180 text-emerald-500" : "text-slate-500 dark:text-zinc-400"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {mobileMoreOpen && (
                  <div className="pl-3 ml-3.5 mt-1 border-l-2 border-emerald-500/40 dark:border-emerald-500/30 flex flex-col gap-1 py-1 animate-in fade-in duration-200">
                    {moreDropdownLinks.map((subLink) => {
                      const isSubActive = pathname === subLink.href;
                      return (
                        <Link
                          key={subLink.label}
                          href={subLink.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-xs font-semibold py-2 px-3 rounded-xl transition-all flex items-center justify-between ${
                            isSubActive
                              ? "bg-white/90 dark:bg-zinc-800/90 text-emerald-600 dark:text-emerald-400 font-extrabold border border-slate-300/80 dark:border-zinc-700"
                              : "text-slate-900 hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400 hover:bg-white/60 dark:hover:bg-white/10"
                          }`}
                        >
                          <span>{subLink.label}</span>
                          <svg className="w-3.5 h-3.5 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile CTA */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-300/60 dark:border-zinc-800/60">
              <a
                href="#contact"
                onClick={handleContactClick}
                className="w-full text-center text-xs font-extrabold py-3 px-4 rounded-2xl transition-all duration-300 text-slate-950 dark:text-white bg-white/80 dark:bg-white/15 border border-white/90 dark:border-white/20 shadow-md cursor-pointer"
              >
                {t.nav.cta}
              </a>
            </div>

          </div>
        )}
      </header>
    </>
  );
}
