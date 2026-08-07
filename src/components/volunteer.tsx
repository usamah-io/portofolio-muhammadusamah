"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Video, ArrowUpRight, Image as ImageIcon, HeartHandshake, ShieldCheck, Camera, ExternalLink } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import BrowserMockupCard from "./browser-mockup-card";
import VolunteerLightbox, { LightboxMedia } from "./volunteer-lightbox";

export default function Volunteer() {
  const { language } = useApp();
  const t = content[language]?.volunteer || content["id"].volunteer;

  const [selectedMedia, setSelectedMedia] = useState<LightboxMedia | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Focus exclusively on top 2 Photo Documentations
  const photoItems = t.items.filter((item) => (item as { type?: string }).type === "image");
  const featuredPhotoItems = photoItems.length >= 2 ? photoItems.slice(0, 2) : t.items.slice(0, 2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
    <section
      id="volunteer"
      ref={containerRef}
      className="py-24 px-4 w-full max-w-6xl mx-auto relative transition-colors duration-300 text-zinc-900 dark:text-white"
    >
      {/* Header Section */}
      <div className="mb-8 border-b border-zinc-200/80 dark:border-zinc-800/60 pb-8 text-center md:text-left">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-[#00FF87]/10 border border-emerald-500/30 dark:border-[#00FF87]/30 text-emerald-600 dark:text-[#00FF87] text-xs font-mono font-bold">
            <Camera className="w-4 h-4 text-emerald-600 dark:text-[#00FF87] shrink-0" />
            <span>Dokumentasi Foto Lapangan</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            Dokumentasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-[#00FF87] dark:to-teal-400">Volunteer Cisarua</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* 1. STATS IMPACT COUNTER (Above Grid) */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-10">
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

      {/* 2. Grid of 2 Featured Portrait Photo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
        {featuredPhotoItems.map((item, idx) => {
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

      {/* 3. LIGHTBOX MODAL */}
      <VolunteerLightbox
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </section>
  );
}
