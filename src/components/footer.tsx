"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { motion } from "framer-motion";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import {
  getRateLimitStatus,
  setRateLimitTimestamp,
  isOwnerEmail,
  OWNER_EMAIL_ERROR_MESSAGE,
  MIN_LENGTH_ERROR_MESSAGE,
  RATE_LIMIT_MESSAGE,
} from "@/lib/contact-validation";

export default function Footer() {
  const { language } = useApp();
  const t = content[language].footer;
  const { socials } = content;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const textBannerRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string, durationMs: number = 4500) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, durationMs);
  };

  // Check rate limit on mount (do NOT auto-show toast on page refresh)
  useEffect(() => {
    const rateStatus = getRateLimitStatus();
    if (rateStatus.isRateLimited) {
      setIsRateLimited(true);
    }
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // ScrollTrigger scrub animation tied to scroll position (scroll down -> slide in, scroll back -> slide back)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textBannerRef.current) {
        gsap.fromTo(
          textBannerRef.current,
          { x: "-15%", opacity: 0.15 },
          {
            x: "0%",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: textBannerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socials.gmail);
      setCopied(true);
      showToast(t.email_copied, 3000);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const honeypot = (formData.get("honeypot_website") as string || "").trim();
    const name = (formData.get("name") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();

    // 1. Honeypot check (anti-bot)
    if (honeypot !== "") {
      form.reset();
      return;
    }

    // 2. Rate limit check (Max 1 message per 24 hours per user)
    const rateStatus = getRateLimitStatus();
    if (isRateLimited || rateStatus.isRateLimited) {
      setIsRateLimited(true);
      showToast(RATE_LIMIT_MESSAGE);
      return;
    }

    // 3. Self Email Validation (Owner email check)
    if (isOwnerEmail(email)) {
      showToast(OWNER_EMAIL_ERROR_MESSAGE);
      return;
    }

    // 4. Message length check (min 10 chars)
    if (message.length < 10) {
      showToast(MIN_LENGTH_ERROR_MESSAGE);
      return;
    }

    setFormSubmitted(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message, honeypot_website: honeypot }),
      });

      const result = await res.json();

      if (res.ok) {
        setRateLimitTimestamp();
        setIsRateLimited(true);
        showToast(RATE_LIMIT_MESSAGE);
        form.reset();
      } else {
        showToast(result.error || "Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch (err) {
      showToast("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <footer
      ref={containerRef}
      id="contact"
      className="border-t border-zinc-200 dark:border-zinc-900 bg-zinc-100/50 dark:bg-zinc-950/80 backdrop-blur-md pt-0 pb-12 relative overflow-hidden transition-colors duration-300"
    >
      {/* Scroll-Scrubbed "LET'S TALK" Text Banner (Maju saat scroll turun, mundur saat scroll naik) */}
      <div className="w-full overflow-hidden select-none pointer-events-none pt-8 pb-4">
        <div
          ref={textBannerRef}
          className="w-full text-center whitespace-nowrap text-[12vw] sm:text-[14vw] font-black text-zinc-300 dark:text-zinc-800/80 uppercase tracking-tighter leading-none select-none"
        >
          LET'S TALK • LET'S TALK
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Info Card */}
        <div className="flex flex-col justify-between gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {t.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400">
                {t.title_sub}
              </span>
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mt-4 max-w-md text-sm sm:text-base leading-relaxed font-medium">
              {t.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {/* Direct Email with Copy Button */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                onClick={handleCopyEmail}
                className="group flex items-center gap-3 bg-white dark:bg-zinc-900/80 border border-slate-300/80 dark:border-zinc-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 w-full shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:border-emerald-500 transition-all duration-300 shrink-0">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors duration-300">{t.email_label}</div>
                  <div className="text-sm font-bold text-slate-950 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 truncate">{socials.gmail}</div>
                </div>
                <span className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-4 py-2 rounded-xl transition-colors shrink-0 text-xs shadow-md">
                  {copied ? t.email_copied : t.email_action}
                </span>
              </button>
            </div>

            {/* WhatsApp Link */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white dark:bg-zinc-900/80 border border-slate-300/80 dark:border-zinc-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 w-full shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:border-emerald-500 transition-all duration-300 shrink-0">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors duration-300">{t.wa_label}</div>
                  <div className="text-sm font-bold text-slate-950 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 truncate">0815-3289-6727</div>
                </div>
                <span className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-4 py-2 rounded-xl transition-colors shrink-0 text-xs shadow-md">
                  Chat
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-zinc-900/50 border border-slate-300/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors duration-300">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Honeypot Field */}
            <input
              type="text"
              name="honeypot_website"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 min-w-0">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider">{t.form_name}</label>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={isRateLimited || formSubmitted}
                  placeholder="John Doe"
                  className="w-full overflow-x-auto whitespace-nowrap bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 focus:border-emerald-500/50 text-slate-950 dark:text-white rounded-xl px-4 py-2.5 text-sm sm:text-base focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                />
              </div>
              <div className="space-y-1.5 min-w-0">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider">{t.form_email}</label>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isRateLimited || formSubmitted}
                  placeholder="john@example.com"
                  className="w-full overflow-x-auto whitespace-nowrap bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 focus:border-emerald-500/50 text-slate-950 dark:text-white rounded-xl px-4 py-2.5 text-sm sm:text-base focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider">{t.form_message}</label>
              <textarea
                rows={4}
                name="message"
                required
                minLength={10}
                disabled={isRateLimited || formSubmitted}
                placeholder="Let's build a new project (minimal 10 karakter)..."
                className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 focus:border-emerald-500/50 text-slate-950 dark:text-white rounded-xl px-4 py-2.5 text-sm sm:text-base focus:outline-none transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              />
            </div>
            
            <button
              type="submit"
              disabled={isRateLimited || formSubmitted}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 disabled:cursor-not-allowed text-zinc-950 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isRateLimited ? (
                <span>Terkunci (Maks 1 Pesan/24 Jam)</span>
              ) : formSubmitted ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Mengirim...</span>
                </div>
              ) : (
                <>
                  <span>{t.form_submit}</span>
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-zinc-200 dark:border-zinc-900/60 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto text-xs text-zinc-700 dark:text-zinc-400 font-medium">
        
        {/* Social Icons with High Contrast Hover Effect */}
        <div className="flex items-center gap-4">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2.5 bg-white dark:bg-zinc-900 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-800 rounded-full transition-all duration-300 scale-100 hover:scale-105 cursor-pointer shadow-xs"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
          </a>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2.5 bg-white dark:bg-zinc-900 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-800 rounded-full transition-all duration-300 scale-100 hover:scale-105 cursor-pointer shadow-xs"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
          </a>
          <a
            href={socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2.5 bg-white dark:bg-zinc-900 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-800 rounded-full transition-all duration-300 scale-100 hover:scale-105 cursor-pointer shadow-xs"
            aria-label="TikTok"
          >
            <svg className="w-4 h-4 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
          </a>
        </div>

        {/* Copyright & API Link */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center md:text-left text-zinc-800 dark:text-zinc-300 font-semibold">
          <p suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Muhammad Usamah Abdurrahman. All Rights Reserved.
          </p>
          <span className="hidden sm:inline text-zinc-400 dark:text-zinc-600">•</span>
          <a
            href="/api-docs"
            className="text-xs font-bold text-zinc-600 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-400 underline underline-offset-4 transition-colors"
          >
            API / Sumber Data
          </a>
        </div>

        {/* Watermark */}
        <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-300 font-medium">
          <span>{t.watermark}</span>
          <span className="font-extrabold text-zinc-950 dark:text-white bg-zinc-200/80 dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-zinc-300/80 dark:border-zinc-700/60 transition-colors">Vercel</span>
        </div>
      </div>

      {/* Floating Toast Notification with Auto-Dismiss and Manual Close (X) Button */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[300] bg-emerald-500 text-zinc-950 font-bold px-4 py-3 rounded-2xl shadow-2xl shadow-emerald-500/20 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300 border border-emerald-400">
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-emerald-600/30 rounded-lg transition-colors cursor-pointer text-zinc-950 shrink-0"
            aria-label="Tutup Notifikasi"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </footer>
  );
}
