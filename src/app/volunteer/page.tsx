"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LayoutGrid, Video, Image as ImageIcon, Images, ArrowLeft, Camera, ShieldCheck, HeartHandshake, ExternalLink } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useApp } from "@/components/app-context";
import content from "@/data/content.json";
import BrowserMockupCard from "@/components/browser-mockup-card";
import VolunteerLightbox, { LightboxMedia } from "@/components/volunteer-lightbox";

export default function VolunteerGalleryPage() {
  const { language } = useApp();
  const t = content[language]?.volunteer || content["id"].volunteer;

  const [activeFilter, setActiveFilter] = useState<"all" | "video" | "image">("all");
  const [selectedMedia, setSelectedMedia] = useState<LightboxMedia | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Filter items based on active filter tab
  const filteredItems = t.items.filter((item) => {
    if (activeFilter === "all") return true;
    const itemType = (item as { type?: string }).type || "video";
    return itemType === activeFilter;
  });

  const videoCount = t.items.filter((i) => ((i as { type?: string }).type || "video") === "video").length;
  const photoCount = t.items.filter((i) => (i as { type?: string }).type === "image").length;

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
    const itemType = (item as { type?: "image" | "video" }).type === "image" ? "image" : "video";
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
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-[#00FF87] transition-all duration-300 py-2.5 px-4 rounded-2xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 shrink-0 text-zinc-400 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-[#00FF87]" />
            <span>Kembali ke Halaman Utama</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-[#00FF87] animate-pulse" />
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-[#00FF87]">
              Dokumentasi Volunteer ({t.items.length} Media)
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-[#00FF87]/10 border border-emerald-500/30 dark:border-[#00FF87]/30 text-emerald-600 dark:text-[#00FF87] text-xs font-mono font-bold">
            <Images className="w-4 h-4 text-emerald-600 dark:text-[#00FF87] shrink-0" />
            <span>Galeri & Dokumentasi Lengkap</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Dokumentasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-[#00FF87] dark:to-teal-400">Relawan Cisarua</span>
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

        {/* Filter Category Tabs with Lucide Icons */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 w-fit">
          <button
            onClick={() => setActiveFilter("all")}
            className={`inline-flex items-center px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-emerald-500 dark:bg-[#00FF87] text-zinc-950 shadow-md shadow-emerald-500/20 dark:shadow-[#00FF87]/20"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
            }`}
          >
            <LayoutGrid className="w-4 h-4 mr-2 shrink-0" />
            <span>{t.filter_all || "Semua Media"} ({t.items.length})</span>
          </button>
          <button
            onClick={() => setActiveFilter("video")}
            className={`inline-flex items-center px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === "video"
                ? "bg-emerald-500 dark:bg-[#00FF87] text-zinc-950 shadow-md shadow-emerald-500/20 dark:shadow-[#00FF87]/20"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
            }`}
          >
            <Video className="w-4 h-4 mr-2 shrink-0" />
            <span>{t.filter_video || "Video Dokumentasi"} ({videoCount})</span>
          </button>
          <button
            onClick={() => setActiveFilter("image")}
            className={`inline-flex items-center px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === "image"
                ? "bg-emerald-500 dark:bg-[#00FF87] text-zinc-950 shadow-md shadow-emerald-500/20 dark:shadow-[#00FF87]/20"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
            }`}
          >
            <ImageIcon className="w-4 h-4 mr-2 shrink-0" />
            <span>{t.filter_photo || "Foto Dokumentasi"} ({photoCount})</span>
          </button>
        </div>

        {/* Filtered List of Browser Mockup Cards */}
        <div ref={containerRef} className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
          {filteredItems.map((item, idx) => {
            const itemType = (item as { type?: "image" | "video" }).type === "image" ? "image" : "video";
            const mediaSource =
              (item as { imageSrc?: string; videoSrc?: string }).imageSrc ||
              (item as { videoSrc?: string }).videoSrc ||
              "";

            return (
              <div key={item.id} ref={addToRefs}>
                <BrowserMockupCard
                  layout="horizontal"
                  domain={item.domain}
                  mediaType={itemType}
                  mediaSrc={mediaSource}
                  floatingBadge={{
                    text: item.badge,
                    variant: itemType === "image" ? "amber" : idx % 3 === 0 ? "neon" : "dark",
                  }}
                  categoryLabel={item.category}
                  title={item.title}
                  description={item.description}
                  tags={item.tags}
                  onMediaClick={() => handleOpenLightbox(item)}
                  primaryAction={{
                    label: itemType === "image" ? t.btn_photo || "Lihat Foto" : t.btn_video || "Tonton Video",
                    onClick: () => handleOpenLightbox(item),
                    icon: itemType === "image" ? (
                      <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <Video className="w-3.5 h-3.5 shrink-0" />
                    ),
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
