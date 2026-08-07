"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LayoutGrid, Video, Image as ImageIcon, Images, ArrowLeft, Camera, ShieldCheck, HeartHandshake, ExternalLink } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useApp } from "@/components/app-context";
import content from "@/data/content.json";
import Typewriter from "@/components/typewriter";
import BrowserMockupCard from "@/components/browser-mockup-card";
import VolunteerLightbox, { LightboxMedia } from "@/components/volunteer-lightbox";

export default function VolunteerGalleryPage() {
  const { language } = useApp();
  const t = content[language]?.volunteer || content["id"].volunteer;
  const isIndonesian = language === "id";

  const [activeFilter, setActiveFilter] = useState<"all" | "image">("all");
  const [selectedMedia, setSelectedMedia] = useState<LightboxMedia | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Focus filter items on Photo Documentations
  const photoItems = t.items.filter((item) => (item as { type?: string }).type === "image");
  const filteredItems = photoItems.length > 0 ? photoItems : t.items.slice(0, 2);
  const photoCount = photoItems.length;

  useEffect(() => {
    cardsRef.current = [];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeFilter]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const handleOpenLightbox = (item: (typeof t.items)[0]) => {
    const itemType = "image";
    const mediaSource =
      (item as { imageSrc?: string; videoSrc?: string }).imageSrc ||
      (item as { videoSrc?: string }).videoSrc ||
      "";

    setSelectedMedia({
      id: item.id,
      type: itemType,
      title: item.title,
      category: item.category,
      domain: item.domain,
      description: item.description,
      mediaSrc: mediaSource,
      detailUrl: item.detailUrl,
    });
  };

  return (
    <main className="min-h-screen bg-transparent text-zinc-900 dark:text-white selection:bg-emerald-500 selection:text-zinc-950 font-sans relative z-10 overflow-x-hidden transition-colors duration-300">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="pt-28 pb-20 px-4 sm:px-6 w-full max-w-6xl mx-auto relative z-10 space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-[#00FF87] transition-all duration-300 py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md shrink-0 whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-zinc-400 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-[#00FF87]" />
            <span>{isIndonesian ? "Kembali" : "Back"}</span>
            <span className="hidden sm:inline">{isIndonesian ? " ke Beranda" : " to Home"}</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-[#00FF87] animate-pulse" />
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-[#00FF87]">
              Dokumentasi Volunteer ({photoCount} Foto)
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-[#00FF87]/10 border border-emerald-500/30 dark:border-[#00FF87]/30 text-emerald-600 dark:text-[#00FF87] text-xs font-mono font-bold">
            <Images className="w-4 h-4 text-emerald-600 dark:text-[#00FF87] shrink-0" />
            <span>Galeri Foto Lapangan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white min-h-[1.2em] flex items-center justify-center md:justify-start">
            <Typewriter
              words={["Dokumentasi & Aksi Volunteer"]}
              loop={true}
              typingSpeed={70}
              deletingSpeed={40}
              pauseDuration={2500}
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 dark:from-[#00FF87] dark:via-teal-400 dark:to-emerald-300 font-extrabold"
              cursorClassName="text-emerald-500 dark:text-[#00FF87] text-3xl sm:text-4xl md:text-5xl font-light"
            />
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* STATS IMPACT COUNTER */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 my-6">
          <div className="bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/40 dark:hover:border-[#00FF87]/40 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col justify-between transition-all group shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xl sm:text-3xl font-black text-emerald-600 dark:text-[#00FF87] group-hover:scale-105 transition-transform">
                12+
              </span>
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-[#00FF87] transition-colors" />
            </div>
            <div className="text-[10px] sm:text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-1">
              Dokumentasi Lapangan
            </div>
          </div>

          <div className="bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/40 dark:hover:border-[#00FF87]/40 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col justify-between transition-all group shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xl sm:text-3xl font-black text-emerald-600 dark:text-[#00FF87] group-hover:scale-105 transition-transform">
                1
              </span>
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-[#00FF87] transition-colors" />
            </div>
            <div className="text-[10px] sm:text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-1">
              Aksi Tanggap Cisarua
            </div>
          </div>

          <div className="bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/40 dark:hover:border-[#00FF87]/40 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col justify-between transition-all group shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-2xl font-black text-emerald-600 dark:text-[#00FF87] group-hover:scale-105 transition-transform truncate">
                Relawan
              </span>
              <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-[#00FF87] transition-colors" />
            </div>
            <div className="text-[10px] sm:text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-1">
              Peran & Kontribusi Posko
            </div>
          </div>
        </div>

        {/* 3D Glassmorphism Full Rounded Pill Filter Tabs */}
        <div className="flex flex-row items-center justify-center md:justify-start gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/85 backdrop-blur-2xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-xl shadow-black/5 dark:shadow-black/50 ring-1 ring-black/5 dark:ring-white/10 w-fit mx-auto md:mx-0 whitespace-nowrap flex-nowrap shrink-0">
          <button
            onClick={() => setActiveFilter("all")}
            className={`inline-flex flex-row items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-extrabold transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
              activeFilter === "all"
                ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/30 scale-[1.02]"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">{t.filter_all || "Semua"} ({photoCount})</span>
          </button>

          <button
            onClick={() => setActiveFilter("image")}
            className={`inline-flex flex-row items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-extrabold transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
              activeFilter === "image"
                ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/30 scale-[1.02]"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="whitespace-nowrap">{t.filter_photo || "Foto"} ({photoCount})</span>
          </button>
        </div>

        {/* Filtered Grid of 2 Photo Browser Mockup Cards */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
          {filteredItems.map((item, idx) => {
            const itemType = "image";
            const mediaSource =
              (item as { imageSrc?: string; videoSrc?: string }).imageSrc ||
              (item as { videoSrc?: string }).videoSrc ||
              "";

            return (
              <div key={item.id} ref={addToRefs} className="h-full">
                <BrowserMockupCard
                  layout="vertical"
                  domain={item.domain}
                  mediaType={itemType}
                  mediaSrc={mediaSource}
                  aspectRatio="aspect-[3/4]"
                  floatingBadge={{
                    text: item.badge,
                    variant: idx === 0 ? "neon" : "dark",
                  }}
                  categoryLabel={item.category}
                  title={item.title}
                  description={item.description}
                  tags={item.tags}
                  onMediaClick={() => handleOpenLightbox(item)}
                  primaryAction={{
                    label: "Lihat Foto Dokumentasi",
                    onClick: () => handleOpenLightbox(item),
                    icon: <ImageIcon className="w-3.5 h-3.5 shrink-0" />,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <VolunteerLightbox
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </main>
  );
}
