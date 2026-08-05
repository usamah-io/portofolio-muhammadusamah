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

  // Limit items on main landing page section to top 3
  const featuredItems = t.items.slice(0, 3);

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
      {/* Header Section with Top Right CTA Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-zinc-200/80 dark:border-zinc-800/60 pb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-[#00FF87]/10 border border-emerald-500/30 dark:border-[#00FF87]/30 text-emerald-600 dark:text-[#00FF87] text-xs font-mono font-bold">
            <Video className="w-4 h-4 text-emerald-600 dark:text-[#00FF87] shrink-0" />
            <span>Volunteer Showcase</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            Dokumentasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-[#00FF87] dark:to-teal-400">Volunteer & Komunitas</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* CTA "Lihat Lainnya" Button on Top Right */}
        <div className="shrink-0">
          <Link
            href="/volunteer"
            className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-black text-zinc-950 bg-emerald-500 hover:bg-emerald-400 dark:bg-[#00FF87] dark:hover:bg-[#00e67a] transition-all px-5 py-3 rounded-xl shadow-lg shadow-emerald-500/10 dark:shadow-[#00FF87]/20 border border-emerald-400/40 dark:border-[#00FF87]/50 transform hover:scale-[1.02]"
          >
            <span>{t.btn_view_all || "Lihat Lainnya"}</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-950 shrink-0" />
          </Link>
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

      {/* 2. List of Featured Volunteer Browser Mockup Cards */}
      <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
        {featuredItems.map((item, idx) => {
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
                  variant: idx === 0 ? "neon" : "dark",
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

      {/* 3. LIGHTBOX MODAL */}
      <VolunteerLightbox
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </section>
  );
}
