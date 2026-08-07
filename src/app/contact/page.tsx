"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import content from "@/data/content.json";
import {
  getRateLimitStatus,
  setRateLimitTimestamp,
  isOwnerEmail,
  OWNER_EMAIL_ERROR_MESSAGE,
  MIN_LENGTH_ERROR_MESSAGE,
  RATE_LIMIT_MESSAGE,
} from "@/lib/contact-validation";

export default function ContactPage() {
  const socials = content.socials;
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const statusTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showStatus = (newStatus: { success: boolean; message: string }, durationMs: number = 4500) => {
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    setStatus(newStatus);
    statusTimerRef.current = setTimeout(() => {
      setStatus(null);
    }, durationMs);
  };

  useEffect(() => {
    const rateStatus = getRateLimitStatus();
    if (rateStatus.isRateLimited) {
      setIsRateLimited(true);
    }
    return () => {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(socials.gmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypot = (formData.get("honeypot_website") as string || "").trim();
    const name = (formData.get("name") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();

    // 1. Honeypot check (anti-bot): fail silently if hidden field is filled
    if (honeypot !== "") {
      form.reset();
      return;
    }

    // 2. Rate limit check (Max 1 message per 24 hours per user)
    const rateStatus = getRateLimitStatus();
    if (isRateLimited || rateStatus.isRateLimited) {
      setIsRateLimited(true);
      showStatus({
        success: false,
        message: RATE_LIMIT_MESSAGE,
      });
      return;
    }

    // 3. Self Email Validation (Owner email check)
    if (isOwnerEmail(email)) {
      showStatus({
        success: false,
        message: OWNER_EMAIL_ERROR_MESSAGE,
      });
      return;
    }

    // 4. Message length check (min 10 chars)
    if (message.length < 10) {
      showStatus({
        success: false,
        message: MIN_LENGTH_ERROR_MESSAGE,
      });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, honeypot_website: honeypot }),
      });

      const result = await res.json();

      if (res.ok) {
        setRateLimitTimestamp();
        setIsRateLimited(true);
        showStatus({
          success: true,
          message: RATE_LIMIT_MESSAGE,
        });
        form.reset();
      } else {
        showStatus({
          success: false,
          message: result.error || "Gagal mengirim pesan. Silakan coba lagi atau hubungi via WhatsApp.",
        });
      }
    } catch {
      showStatus({
        success: false,
        message: "Terjadi kesalahan jaringan. Silakan coba lagi.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-transparent text-zinc-900 dark:text-white font-sans relative z-10 overflow-x-hidden transition-colors duration-300">
      {/* Background Glow Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="pt-28 pb-20 px-4 sm:px-6 w-full max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2.5 px-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Kembali ke Halaman Utama</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">Hubungi Saya</span>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center md:text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Pusat Kontak & Media Sosial</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Mari Buat Sesuatu Yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Luar Biasa</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Punya ide proyek menarik, pertanyaan seputar koding, atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya via media sosial atau form di bawah!
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Instagram Card (@uus.code) */}
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 hover:border-emerald-500/50 p-5 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col justify-between gap-4 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-md">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                ↗
              </span>
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-zinc-400 uppercase">Instagram</div>
              <div className="text-lg font-extrabold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                @uus.code
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                Konten koding, tips Next.js & TypeScript, serta update proyek web modern.
              </p>
            </div>
          </a>

          {/* TikTok Card */}
          <a
            href={socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 hover:border-emerald-500/50 p-5 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col justify-between gap-4 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="p-3 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-md">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                ↗
              </span>
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-zinc-400 uppercase">TikTok</div>
              <div className="text-lg font-extrabold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                @ig_usamaahhhh
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                Video dokumentasi pembuatan web, review teknologi, dan keseruan koding.
              </p>
            </div>
          </a>

          {/* WhatsApp Direct Chat Card */}
          <a
            href={socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 hover:border-emerald-500/50 p-5 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col justify-between gap-4 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="p-3 rounded-2xl bg-emerald-500 text-zinc-950 shadow-md">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                ↗
              </span>
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-zinc-400 uppercase">WhatsApp</div>
              <div className="text-lg font-extrabold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                Chat Langsung
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                Respon cepat untuk diskusi proyek atau konsultasi langsung.
              </p>
            </div>
          </a>

          {/* Email Copy Card */}
          <button
            onClick={handleCopyEmail}
            className="group bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 hover:border-emerald-500/50 p-5 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col justify-between gap-4 text-left cursor-pointer"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="p-3 rounded-2xl bg-teal-500 text-zinc-950 shadow-md">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                {copied ? "Copied!" : "Copy"}
              </span>
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-zinc-400 uppercase">Direct Email</div>
              <div className="text-base font-extrabold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors truncate">
                {socials.gmail}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                Klik untuk menyalin alamat email ke clipboard.
              </p>
            </div>
          </button>
        </div>

        {/* Direct Contact Form Container */}
        <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div>
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              Kirim Pesan Langsung
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Isi form di bawah ini untuk mengontak saya secara cepat via server pesan portofolio.
            </p>
          </div>

          {status && (
            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold border flex items-center justify-between gap-3 animate-in fade-in duration-300 ${
                status.success
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
              }`}
            >
              <span>{status.message}</span>
              <button
                type="button"
                onClick={() => setStatus(null)}
                className="p-1 hover:bg-zinc-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
                aria-label="Tutup Pesan"
              >
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Honeypot field (hidden from real users, tricks spam bots) */}
            <input
              type="text"
              name="honeypot_website"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Nama Anda
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={isRateLimited || submitting}
                  placeholder="Muhammad Rizky"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500/50 text-zinc-900 dark:text-white rounded-2xl px-4 py-3 text-sm focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Email Anda
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isRateLimited || submitting}
                  placeholder="rizky@example.com"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500/50 text-zinc-900 dark:text-white rounded-2xl px-4 py-3 text-sm focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Pesan / Pertanyaan
              </label>
              <textarea
                rows={5}
                name="message"
                required
                minLength={10}
                disabled={isRateLimited || submitting}
                placeholder="Tuliskan pesan atau ide proyek Anda di sini (minimal 10 karakter)..."
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:border-emerald-500/50 text-zinc-900 dark:text-white rounded-2xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isRateLimited || submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-450 hover:to-teal-350 text-zinc-950 font-extrabold text-sm shadow-md shadow-emerald-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>
                  {isRateLimited
                    ? "Terkunci (Maks 1 Pesan/24 Jam)"
                    : submitting
                    ? "Mengirim Pesan..."
                    : "Kirim Pesan Langsung"}
                </span>
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
