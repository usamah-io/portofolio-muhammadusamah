"use client";

import { useState, useEffect, useRef } from "react";
import { useApp } from "@/components/app-context";
import { usePageTransition } from "@/components/PageTransition";
import content from "@/data/content.json";
import CursorImageTrail from "@/components/cursor-image-trail";
import { SHOWCASE_IMAGES, PROJECT_TYPES } from "@/data/showcase";
import {
  getRateLimitStatus,
  setRateLimitTimestamp,
  isOwnerEmail,
  OWNER_EMAIL_ERROR_MESSAGE,
  MIN_LENGTH_ERROR_MESSAGE,
  RATE_LIMIT_MESSAGE,
} from "@/lib/contact-validation";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
  const { language } = useApp();
  const { navigateTo } = usePageTransition();
  const isIndonesian = language === "id";
  const socials = content.socials;
  const formCardRef = useRef<HTMLElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showStatus = (newStatus: { success: boolean; message: string }, durationMs = 4500) => {
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    setStatus(newStatus);
    statusTimerRef.current = setTimeout(() => setStatus(null), durationMs);
  };

  useEffect(() => {
    if (getRateLimitStatus().isRateLimited) setIsRateLimited(true);
    return () => {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypot = String(formData.get("honeypot_website") || "").trim();
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const projectType = String(formData.get("projectType") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const name = `${firstName} ${lastName}`.trim();

    if (honeypot !== "") {
      form.reset();
      return;
    }

    const rateStatus = getRateLimitStatus();
    if (isRateLimited || rateStatus.isRateLimited) {
      setIsRateLimited(true);
      showStatus({
        success: false,
        message: isIndonesian ? RATE_LIMIT_MESSAGE : "You have already sent a message in the last 24 hours.",
      });
      return;
    }

    if (isOwnerEmail(email)) {
      showStatus({
        success: false,
        message: isIndonesian ? OWNER_EMAIL_ERROR_MESSAGE : "Sending messages to your own email address is disabled.",
      });
      return;
    }

    if (message.length < 10) {
      showStatus({
        success: false,
        message: isIndonesian ? MIN_LENGTH_ERROR_MESSAGE : "Message must be at least 10 characters long.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          firstName,
          lastName,
          email,
          phone,
          projectType,
          message,
          honeypot_website: honeypot,
        }),
      });
      const result = await res.json();

      if (res.ok) {
        setRateLimitTimestamp();
        setIsRateLimited(true);
        showStatus({
          success: true,
          message: isIndonesian
            ? RATE_LIMIT_MESSAGE
            : "Thank you! Your message has been sent successfully. I will get back to you soon.",
        });
        form.reset();
      } else {
        showStatus({
          success: false,
          message: result.error || (isIndonesian ? "Gagal mengirim pesan. Silakan coba lagi." : "Failed to send message. Please try again."),
        });
      }
    } catch {
      showStatus({
        success: false,
        message: isIndonesian ? "Terjadi kesalahan jaringan. Silakan coba lagi." : "Network error occurred. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getLocalizedProjectType = (type: string) => {
    if (!isIndonesian) return type;
    switch (type) {
      case "Website Development":
        return "Pengembangan Website";
      case "Web Application":
        return "Aplikasi Web";
      case "UI/UX Design":
        return "Desain UI/UX";
      case "AI Integration":
        return "Integrasi AI";
      case "Collaboration / Other":
        return "Kolaborasi / Lainnya";
      default:
        return type;
    }
  };

  return (
    <main className="contact-page relative min-h-screen w-full pt-28 pb-12 overflow-x-hidden">
      {/* Trailing images background strictly at z-0 */}
      <CursorImageTrail images={SHOWCASE_IMAGES} className="contact-page-trail relative z-0" excludeRef={formCardRef} />

      {/* 2-Column Section anchored in foreground z-10 */}
      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
        {/* Left Column: Let's Connect text & inquiry badges */}
        <div className="space-y-8 pt-4">
          <h1 className="text-5xl sm:text-7xl font-black italic uppercase tracking-tight text-[var(--fg)] leading-none">
            {isIndonesian ? "MARI TERHUBUNG" : "LET'S CONNECT"}
          </h1>
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-[var(--fg)]/80 font-sans">
            {isIndonesian
              ? "Punya ide proyek? Butuh website yang memukau atau aplikasi yang solid? Atau hanya ingin berdiskusi tentang kode dan desain? Kirim pesan, dan mari ciptakan sesuatu yang luar biasa bersama."
              : "Got a project idea? Need a stunning website or a robust app? Or just want to geek out over code and design? Drop me a line, and let's create something extraordinary together."}
          </p>

          <div className="space-y-6 font-mono">
            <div>
              <p className="mb-1.5 inline-block bg-[var(--fg)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--bg)]">
                {isIndonesian ? "PERTANYAAN PROYEK" : "PROJECT INQUIRIES"}
              </p>
              <a
                href={`mailto:${socials.gmail}`}
                className="block text-sm uppercase tracking-wide font-bold text-[var(--fg)] hover:underline"
              >
                {socials.gmail}
              </a>
            </div>

            <div>
              <p className="mb-1.5 inline-block bg-[var(--fg)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--bg)]">
                {isIndonesian ? "CHAT CEPAT" : "QUICK CHAT"}
              </p>
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm uppercase tracking-wide font-bold text-[var(--fg)] hover:underline"
              >
                WhatsApp @uus.code
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateTo("/")}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--fg)]/60 hover:text-[var(--fg)] transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isIndonesian ? "Kembali ke Beranda" : "Back to Home"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Start a Project Form Card */}
        <article
          ref={formCardRef}
          className="contact-form-card relative z-20 rounded-[2rem] border-4 border-[var(--fg)] bg-[color-mix(in_srgb,var(--bg2)_85%,white)] p-6 sm:p-8 shadow-[10px_10px_0_var(--fg)]"
        >
          <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tight text-[var(--fg)]">
            {isIndonesian ? "MULAI PROYEK" : "START A PROJECT"}
          </h2>
          <p className="mt-1 mb-6 text-sm text-[var(--fg)]/75 font-sans">
            {isIndonesian
              ? "Ceritakan visimu, mari wujudkan bersama."
              : "Tell me about your vision and let's make it reality."}
          </p>

          {status && (
            <div
              className={`mb-6 rounded-xl border-2 px-4 py-3 text-xs sm:text-sm font-bold ${
                status.success
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "border-[var(--accent1)] bg-[var(--accent1)]/10 text-[var(--accent1)]"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4 font-mono">
            <input type="text" name="honeypot_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block space-y-1">
                <input
                  name="firstName"
                  required
                  disabled={isRateLimited || submitting}
                  placeholder={isIndonesian ? "Nama depan Anda" : "Your first name"}
                  className="contact-field"
                />
                <span className="contact-label">{isIndonesian ? "Nama Depan" : "First Name"}</span>
              </label>
              <label className="block space-y-1">
                <input
                  name="lastName"
                  required
                  disabled={isRateLimited || submitting}
                  placeholder={isIndonesian ? "Nama belakang Anda" : "Your last name"}
                  className="contact-field"
                />
                <span className="contact-label">{isIndonesian ? "Nama Belakang" : "Last Name"}</span>
              </label>
              <label className="block space-y-1">
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isRateLimited || submitting}
                  placeholder={isIndonesian ? "email@anda.com" : "your@email.com"}
                  className="contact-field"
                />
                <span className="contact-label">{isIndonesian ? "Alamat Email" : "Email Address"}</span>
              </label>
              <label className="block space-y-1">
                <input
                  type="tel"
                  name="phone"
                  disabled={isRateLimited || submitting}
                  placeholder="+62 812 3456 7890"
                  className="contact-field"
                />
                <span className="contact-label">{isIndonesian ? "Nomor Telepon" : "Phone Number"}</span>
              </label>
            </div>

            <label className="block space-y-1">
              <select
                name="projectType"
                required
                disabled={isRateLimited || submitting}
                defaultValue=""
                className="contact-field contact-select"
              >
                <option value="" disabled>
                  {isIndonesian ? "Pilih tipe proyek" : "Select project type"}
                </option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {getLocalizedProjectType(type)}
                  </option>
                ))}
              </select>
              <span className="contact-label">{isIndonesian ? "Tipe Proyek" : "Project Type"}</span>
            </label>

            <label className="block space-y-1">
              <textarea
                name="message"
                required
                minLength={10}
                rows={4}
                disabled={isRateLimited || submitting}
                placeholder={
                  isIndonesian
                    ? "Ceritakan proyek Anda, tujuan, garis waktu, dan anggaran..."
                    : "Tell me about your project, goals, timeline, and budget..."
                }
                className="contact-field min-h-[110px] resize-none"
              />
              <span className="contact-label">{isIndonesian ? "Detail Proyek" : "Project Details"}</span>
            </label>

            <button
              type="submit"
              disabled={isRateLimited || submitting}
              className="contact-submit font-black text-sm uppercase tracking-wider transition hover:opacity-95 active:scale-[0.99]"
            >
              {isRateLimited
                ? isIndonesian
                  ? "Terkunci (1 pesan / 24 jam)"
                  : "Locked (1 msg / 24h)"
                : submitting
                ? isIndonesian
                  ? "Mengirim..."
                  : "Sending..."
                : isIndonesian
                ? "Kirim Pesan"
                : "Send Message"}
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}
