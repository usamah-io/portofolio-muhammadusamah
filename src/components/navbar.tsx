"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Bell, Trophy, X, ChevronRight } from "lucide-react";
import { useApp } from "./app-context";
import content from "@/data/content.json";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const { language, setLanguage, theme, toggleTheme } = useApp();

  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const moreTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Set mounted on client to prevent hydration mismatch & handle click outside
  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

  const t = content[language];
  const primaryLinks = [
    { label: t.nav.projects, href: "/#projects" },
    { label: t.nav.volunteer || "Volunteer", href: "/#volunteer-section" },
    { label: t.nav.activity || "Aktivitas", href: "/activity" },
  ];

  const aboutDropdownLinks = [
    { label: t.nav.profile_short || "Profil Singkat", href: "/about" },
    { label: t.nav.education_experience || "Pendidikan & Pengalaman", href: "/experience" },
  ];

  const moreDropdownLinks = [
    { label: t.nav.volunteer || "Galeri Volunteer", href: "/volunteer" },
    { label: t.nav.achievement || "Prestasi / Hackathon", href: "/hackathon-recap" },
    { label: t.nav.articles || "Artikel", href: "/articles" },
    { label: t.nav.faq || "FAQ", href: "/faq" },
    { label: "API / Sumber Data", href: "/api-docs" },
  ];

  // SSR / Pre-hydration exact matching fallback structure
  if (!mounted) {
    return (
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
        <div className="flex items-center justify-between bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-850/50 rounded-full px-4 sm:px-6 py-3 shadow-2xl transition-colors duration-300">
          <Link 
            href="/" 
            className="text-zinc-900 dark:text-white font-extrabold tracking-wider text-xs sm:text-base shrink-0"
          >
            DEV<span className="text-emerald-500">.</span>PORTFOLIO
          </Link>
          
          {/* Desktop Right Group */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <Link href="/#projects" className="text-zinc-500 text-sm font-medium">Proyek</Link>
              <Link href="/#stats" className="text-zinc-500 text-sm font-medium">Aktivitas</Link>
              <span className="text-zinc-500 text-sm font-medium">Tentang Saya ▾</span>
              <span className="text-zinc-500 text-sm font-medium">Lainnya ▾</span>
            </nav>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 text-[11px] font-extrabold border-r border-zinc-200 dark:border-zinc-800 pr-2 mr-0.5 text-zinc-400">
                <button className="text-emerald-500! font-black">ID</button>
                <span>|</span>
                <button className="hover:text-zinc-900">EN</button>
              </div>
              <button onClick={toggleTheme} className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer" aria-label="Toggle Theme">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              </button>
              <Link href="/#contact" className="bg-emerald-500 text-zinc-950 text-xs font-bold px-4 py-2 sm:px-5 rounded-full">
                Kontak
              </Link>
            </div>
          </div>

          {/* Mobile Outer Right Group (Fallback) */}
          <div className="flex md:hidden items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="flex items-center gap-1 text-[11px] font-extrabold border-r border-zinc-200 dark:border-zinc-800 pr-2 text-zinc-400">
              <button className="text-emerald-500! font-black">ID</button>
              <span>|</span>
              <button>EN</button>
            </div>
            <button onClick={toggleTheme} className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer" aria-label="Toggle Theme">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            </button>
            <button className="p-2 text-zinc-500 rounded-full bg-zinc-100 dark:bg-zinc-800/50" aria-label="Toggle menu">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="flex items-center justify-between bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-850/50 rounded-full px-4 sm:px-6 py-3 shadow-2xl shadow-black/5 dark:shadow-black/40 transition-colors duration-300">
        
        <Link 
          href="/" 
          className="text-zinc-900 dark:text-white font-extrabold tracking-wider text-xs sm:text-base hover:opacity-80 transition-opacity shrink-0"
        >
          DEV<span className="text-emerald-500">.</span>PORTFOLIO
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 relative">
            {primaryLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-sm font-medium transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Dropdown 1: Tentang Saya ▾ */}
            <div 
              className="relative py-1"
              onMouseEnter={handleAboutEnter}
              onMouseLeave={handleAboutLeave}
            >
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                <span>{t.nav.about || "Tentang Saya"}</span>
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? "rotate-180 text-emerald-500" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Glassmorphic Dropdown Popover */}
              {aboutDropdownOpen && (
                <div 
                  onMouseEnter={handleAboutEnter}
                  onMouseLeave={handleAboutLeave}
                  className="absolute top-full left-0 pt-2 w-60 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-2 flex flex-col gap-1">
                    {aboutDropdownLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setAboutDropdownOpen(false)}
                        className="text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 text-xs font-semibold py-2.5 px-3 rounded-xl hover:bg-emerald-50/50 dark:hover:bg-zinc-800/60 transition-colors flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        <svg className="w-3.5 h-3.5 opacity-60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown 2: Lainnya ▾ */}
            <div 
              className="relative py-1"
              onMouseEnter={handleMoreEnter}
              onMouseLeave={handleMoreLeave}
            >
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                <span>{t.nav.more || "Lainnya"}</span>
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? "rotate-180 text-emerald-500" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Glassmorphic Dropdown Popover */}
              {moreDropdownOpen && (
                <div 
                  onMouseEnter={handleMoreEnter}
                  onMouseLeave={handleMoreLeave}
                  className="absolute top-full right-0 pt-2 w-60 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl p-2 flex flex-col gap-1">
                    {moreDropdownLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMoreDropdownOpen(false)}
                        className="text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 text-xs font-semibold py-2.5 px-3 rounded-xl hover:bg-emerald-50/50 dark:hover:bg-zinc-800/60 transition-colors flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        <svg className="w-3.5 h-3.5 opacity-60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 text-[11px] font-extrabold border-r border-zinc-200 dark:border-zinc-800 pr-2 mr-0.5 text-zinc-400 dark:text-zinc-500">
              <button 
                onClick={() => setLanguage("id")} 
                className={`hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer ${
                  language === "id" ? "text-emerald-500! font-black" : ""
                }`}
              >
                ID
              </button>
              <span>|</span>
              <button 
                onClick={() => setLanguage("en")} 
                className={`hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer ${
                  language === "en" ? "text-emerald-500! font-black" : ""
                }`}
              >
                EN
              </button>
            </div>

            {/* Dropdown Notification Bell (Desktop) */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => {
                  setNotificationOpen(!notificationOpen);
                  setHasUnread(false);
                }}
                className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200 cursor-pointer relative"
                aria-label="Notifikasi Prestasi"
                title="Notifikasi Prestasi"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-[#00FF87] transition-colors" />
                {hasUnread && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-[#00FF87] animate-pulse absolute top-1 right-1 border-2 border-white dark:border-zinc-900" />
                )}
              </button>

              {/* Notification Dropdown Popover */}
              {notificationOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 shadow-2xl rounded-2xl p-4 space-y-3">
                    {/* Top Bar Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-emerald-500/10 dark:bg-[#00FF87]/10 text-emerald-600 dark:text-[#00FF87]">
                          <Trophy className="w-4 h-4" />
                        </span>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-[#00FF87]">
                          🏆 Pencapaian Spesial
                        </span>
                      </div>
                      <button
                        onClick={() => setNotificationOpen(false)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 rounded-md transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Card Item Content */}
                    <div className="space-y-2 bg-gray-50 dark:bg-zinc-900/60 p-3 rounded-xl border border-gray-200/60 dark:border-zinc-800/80">
                      <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-white leading-snug">
                        Top 4 Finalis Gemastik 2026 (Hackathon)
                      </h4>
                      <p className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        Satu-satunya peserta tingkat SMP yang berjuang solo (sendirian) dan berhasil menembus 5 Besar Finalis (Juara 4) dari total 186 tim mahasiswa seluruh Indonesia.
                      </p>
                    </div>

                    {/* Footer CTA Button */}
                    <div className="pt-1 flex items-center justify-end">
                      <Link
                        href="/#projects"
                        onClick={() => setNotificationOpen(false)}
                        className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-zinc-950 bg-emerald-500 hover:bg-emerald-400 dark:bg-[#00FF87] dark:hover:bg-[#00e67a] py-2 px-4 rounded-xl shadow-md transition-all text-center"
                      >
                        <span>Lihat Detail Proyek</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle (Sun/Moon) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              ) : (
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </button>

            {/* Kontak CTA Button */}
            <Link
              href="/contact"
              className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold px-4 py-2 sm:px-5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/10"
            >
              {t.nav.cta}
            </Link>
          </div>
        </div>

        {/* Mobile Outer Controls & Hamburger Button */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Language Switcher ID | EN */}
          <div className="flex items-center gap-1 text-[11px] font-extrabold border-r border-zinc-200 dark:border-zinc-800 pr-2 text-zinc-400 dark:text-zinc-500">
            <button 
              onClick={() => setLanguage("id")} 
              className={`hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer ${
                language === "id" ? "text-emerald-500! font-black" : ""
              }`}
            >
              ID
            </button>
            <span>|</span>
            <button 
              onClick={() => setLanguage("en")} 
              className={`hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer ${
                language === "en" ? "text-emerald-500! font-black" : ""
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Notification Bell */}
          <button
            onClick={() => {
              setNotificationOpen(!notificationOpen);
              setHasUnread(false);
            }}
            className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-all duration-200 cursor-pointer relative"
            aria-label="Notifikasi Prestasi"
            title="Notifikasi Prestasi"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-[#00FF87]" />
            {hasUnread && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-[#00FF87] animate-pulse absolute top-1 right-1 border-2 border-white dark:border-zinc-900" />
            )}
          </button>

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            ) : (
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white rounded-full bg-zinc-100 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
        <div className="md:hidden mt-2 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col gap-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 transition-colors duration-300">
          
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-1">
            {[...primaryLinks, ...aboutDropdownLinks, ...moreDropdownLinks].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-sm font-medium py-3 px-3.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center justify-between min-h-[44px]"
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Action Triggers: CTA */}
          <div className="flex flex-col gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800/80">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-md shadow-emerald-500/10"
            >
              {t.nav.cta}
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}
