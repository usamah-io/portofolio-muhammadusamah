"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useApp } from "./app-context";
import content from "@/data/content.json";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, theme, toggleTheme } = useApp();
  const { data: session } = useSession();

  // Set mounted on client to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const t = content[language];
  const navLinks = [
    { label: t.nav.stats, href: "#stats" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.articles, href: "#articles" },
    { label: t.nav.faq, href: "#faq" },
  ];

  const isAdmin = session?.user?.email === "muhammadusamahabdurrahman@gmail.com";

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
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <Link href="#stats" className="text-zinc-500 text-sm font-medium">Statistik</Link>
              <Link href="#projects" className="text-zinc-500 text-sm font-medium">Proyek</Link>
              <Link href="#articles" className="text-zinc-500 text-sm font-medium">Artikel</Link>
              <Link href="#faq" className="text-zinc-500 text-sm font-medium">FAQ</Link>
            </nav>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 text-[11px] font-extrabold border-r border-zinc-200 dark:border-zinc-800 pr-2 mr-0.5 text-zinc-400">
                <button className="text-emerald-500! font-black">ID</button>
                <span>|</span>
                <button className="hover:text-zinc-900">EN</button>
              </div>
              <div className="flex items-center pl-1">
                <Link href="/admin" className="text-xs font-bold text-zinc-650 hover:text-emerald-600 transition-colors">
                  Masuk
                </Link>
              </div>
              <button className="p-2 rounded-full text-zinc-500" aria-label="Toggle Theme">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              </button>
              <Link href="#contact" className="bg-emerald-500 text-zinc-950 text-xs font-bold px-4 py-2 sm:px-5 rounded-full">
                Mari Bicara
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
            <button className="p-1.5 rounded-full text-zinc-500" aria-label="Toggle Theme">
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
      {/* Desktop & Mobile Pill Navbar Container */}
      <div className="flex items-center justify-between bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-850/50 rounded-full px-4 sm:px-6 py-3 shadow-2xl shadow-black/5 dark:shadow-black/40 transition-colors duration-300">
        
        {/* Logo (Always visible on Left) */}
        <Link 
          href="/" 
          className="text-zinc-900 dark:text-white font-extrabold tracking-wider text-xs sm:text-base hover:opacity-80 transition-opacity shrink-0"
        >
          DEV<span className="text-emerald-500">.</span>PORTFOLIO
        </Link>

        {/* Desktop Only Navigation Links & Action Buttons */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-sm font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher ID | EN */}
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

            {/* Admin / Dashboard Trigger */}
            <div className="flex items-center pl-1">
              {session ? (
                <Link 
                  href="/admin" 
                  className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span>{isAdmin ? "Usamah" : "Dashboard"}</span>
                </Link>
              ) : (
                <Link 
                  href="/admin" 
                  className="text-xs font-bold text-zinc-655 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Masuk
                </Link>
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

            {/* Let's Talk CTA */}
            <Link
              href="#contact"
              className="bg-emerald-500 hover:bg-emerald-455 text-zinc-950 text-xs font-bold px-4 py-2 sm:px-5 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/10"
            >
              {t.nav.cta}
            </Link>
          </div>
        </div>

        {/* Mobile Outer Controls & Hamburger Button (Right side on Mobile) */}
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

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-200 cursor-pointer"
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
            className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white rounded-full bg-zinc-100 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
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
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white text-sm font-medium py-2 px-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Triggers: Admin/Masuk & CTA (Only Nav Links, Masuk, and Mari Bicara in Drawer) */}
          <div className="flex flex-col gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800/80">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
            >
              {session && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
              <span>{session ? (isAdmin ? "Usamah" : "Dashboard") : "Masuk"}</span>
            </Link>

            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-emerald-500 hover:bg-emerald-600 text-zinc-950 text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-md shadow-emerald-500/10"
            >
              {t.nav.cta}
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}
