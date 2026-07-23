"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "./app-context";
import content from "@/data/content.json";

export default function Footer() {
  const { language } = useApp();
  const t = content[language].footer;
  const { socials } = content;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const textBannerRef = useRef<HTMLDivElement>(null);

  // ScrollTrigger animation for the giant "LET'S TALK" text
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textBannerRef.current) {
        gsap.fromTo(
          textBannerRef.current,
          { x: "-15%", opacity: 0.1 },
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
      setToastMessage(t.email_copied);
      setTimeout(() => {
        setCopied(false);
        setToastMessage(null);
      }, 3000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    setFormSubmitted(true);

    try {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xoqgqpze";
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setToastMessage("Pesan berhasil terkirim langsung ke email Usamah!");
        form.reset();
      } else {
        setToastMessage("Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch (err) {
      setToastMessage("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setFormSubmitted(false);
      setTimeout(() => {
        setToastMessage(null);
      }, 5000);
    }
  };

  return (
    <footer
      ref={containerRef}
      id="contact"
      className="border-t border-zinc-200 dark:border-zinc-900 bg-zinc-100/50 dark:bg-zinc-950/80 backdrop-blur-md pt-24 pb-12 px-4 relative overflow-hidden transition-colors duration-300"
    >
      {/* Giant Let's Talk Text Banner */}
      <div 
        ref={textBannerRef}
        className="w-full select-none pointer-events-none whitespace-nowrap overflow-hidden text-[10vw] sm:text-[12vw] font-black text-zinc-200 dark:text-zinc-900/60 uppercase tracking-tighter leading-none mb-16 text-center select-none"
      >
        LET'S TALK • LET'S TALK
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Info Card */}
        <div className="flex flex-col justify-between gap-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {t.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                {t.title_sub}
              </span>
            </h2>
            <p className="text-zinc-650 dark:text-zinc-400 mt-4 max-w-md text-sm sm:text-base leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {/* Direct Email with Copy Button */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                onClick={handleCopyEmail}
                className="group flex items-center gap-3 bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 w-full shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 transition-colors duration-300">{t.email_label}</div>
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-colors duration-300 truncate">{socials.gmail}</div>
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
                className="group flex items-center gap-3 bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 w-full shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 transition-colors duration-300">{t.wa_label}</div>
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-colors duration-300 truncate">0815-3289-6727</div>
                </div>
                <span className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-4 py-2 rounded-xl transition-colors shrink-0 text-xs shadow-md">
                  Chat
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors duration-300">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{t.form_name}</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500/50 text-zinc-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{t.form_email}</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500/50 text-zinc-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{t.form_message}</label>
              <textarea
                rows={4}
                name="message"
                required
                placeholder="Let's build a new project..."
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500/50 text-zinc-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
              />
            </div>
            
            <button
              type="submit"
              disabled={formSubmitted}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              {formSubmitted ? (
                <span>{t.form_success}</span>
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
      <div className="border-t border-zinc-200 dark:border-zinc-900/60 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto text-xs text-zinc-500">
        
        {/* Social Icons with GSAP Hover Effect */}
        <div className="flex items-center gap-4">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 rounded-full transition-all duration-300 scale-100 hover:scale-105"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
          </a>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 rounded-full transition-all duration-300 scale-100 hover:scale-105"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
          </a>
          <a
            href={socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 rounded-full transition-all duration-300 scale-100 hover:scale-105"
            aria-label="TikTok"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center md:text-left" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} Muhammad Usamah Abdurrahman. All Rights Reserved.
        </p>

        {/* Watermark */}
        <div className="flex items-center gap-1">
          <span>{t.watermark}</span>
          <span className="font-bold text-zinc-800 dark:text-zinc-300 transition-colors">Vercel</span>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-zinc-950 font-bold px-4 py-2.5 rounded-xl shadow-xl shadow-emerald-500/10 text-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          {toastMessage}
        </div>
      )}
    </footer>
  );
}
