"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import VolunteerLightbox, { LightboxMedia } from "./volunteer-lightbox";
import { Camera, Video, ArrowDown, Award, Filter, Sparkles, Layers } from "lucide-react";

type FilterCategory = "ALL" | "VOLUNTEER" | "COMPETITION" | "HACKATHON" | "COMMUNITY";

const THEME_STYLES = {
  coral: {
    bgColor: "bg-[#ed6a5a] text-zinc-950 border-zinc-950",
    accentTag: "bg-black/10 text-zinc-950 border-zinc-950/20",
    btnClass: "bg-zinc-950 text-white hover:bg-zinc-800 shadow-md",
  },
  yellow: {
    bgColor: "bg-[#f4f1bb] text-zinc-950 border-zinc-950",
    accentTag: "bg-black/10 text-zinc-950 border-zinc-950/20",
    btnClass: "bg-zinc-950 text-white hover:bg-zinc-800 shadow-md",
  },
  sage: {
    bgColor: "bg-[#9bc1bc] text-zinc-950 border-zinc-950",
    accentTag: "bg-black/10 text-zinc-950 border-zinc-950/20",
    btnClass: "bg-zinc-950 text-white hover:bg-zinc-800 shadow-md",
  },
  dark: {
    bgColor: "bg-[#141414] text-white border-white/20",
    accentTag: "bg-white/10 text-emerald-400 border-white/20",
    btnClass: "bg-emerald-500 text-black hover:bg-emerald-400 font-black shadow-md",
  },
};

export default function Volunteer() {
  const { language } = useApp();
  const t = content[language as "id" | "en"] || content.id;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedMedia, setSelectedMedia] = useState<LightboxMedia | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("ALL");

  const expData = t.experience || (content.id as any).experience;
  const rawCards = expData?.cards || [];
  const rawVolunteerItems = (t.volunteer && t.volunteer.items) || [];

  // Prepare playlist of Cisarua videos
  const cisaruaVideos = useMemo(() => {
    return rawVolunteerItems
      .filter((i: any) => i.id?.startsWith("vol-") && !["vol-han-tasik", "vol-11", "vol-12"].includes(i.id))
      .map((i: any, index: number) => ({
        id: i.id,
        label: `Video ${String(index + 1).padStart(2, "0")}: ${i.category || i.badge || "Dokumentasi"}`,
        videoSrc: i.videoSrc,
        detailUrl: i.detailUrl,
        description: i.description,
      }));
  }, [rawVolunteerItems]);

  // Filter cards by category
  const filteredCards = useMemo(() => {
    return rawCards.filter((card: any) => {
      if (activeFilter === "ALL") return true;
      const cat = card.category?.toUpperCase();
      const secCat = card.secondary_category?.toUpperCase();
      return cat === activeFilter || secCat === activeFilter;
    });
  }, [rawCards, activeFilter]);

  // Counts for each filter button
  const filterCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      ALL: rawCards.length,
      VOLUNTEER: 0,
      COMPETITION: 0,
      HACKATHON: 0,
      COMMUNITY: 0,
    };
    rawCards.forEach((c: any) => {
      const cat = c.category?.toUpperCase();
      const secCat = c.secondary_category?.toUpperCase();
      if (cat === "VOLUNTEER" || secCat === "VOLUNTEER") counts.VOLUNTEER++;
      if (cat === "COMPETITION" || secCat === "COMPETITION") counts.COMPETITION++;
      if (cat === "HACKATHON" || secCat === "HACKATHON") counts.HACKATHON++;
      if (cat === "COMMUNITY" || secCat === "COMMUNITY") counts.COMMUNITY++;
    });
    return counts;
  }, [rawCards]);

  const filterOptions: { key: FilterCategory; label: string }[] = [
    { key: "ALL", label: expData.filter_all || "Semua" },
    { key: "VOLUNTEER", label: expData.filter_volunteer || "Volunteer" },
    { key: "COMPETITION", label: expData.filter_competition || "Kompetisi" },
    { key: "HACKATHON", label: expData.filter_hackathon || "Hackathon" },
    { key: "COMMUNITY", label: expData.filter_community || "Komunitas" },
  ];

  // GSAP Stacking Animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cardEls = sectionRef.current?.querySelectorAll(".service-card");
      if (!cardEls || cardEls.length <= 1) return;

      cardEls.forEach((card, index) => {
        if (index === cardEls.length - 1) return;

        gsap.to(card, {
          scale: 0.93,
          opacity: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: cardEls[index + 1],
            start: "top top+=140",
            end: "top top+=40",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    // Refresh ScrollTrigger when filter updates card layout
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [activeFilter, filteredCards.length]);

  const handleOpenCard = (card: any) => {
    if (card.id === "exp-cisarua-disaster") {
      // Cisarua disaster response: provide all 10 video options + cover photo
      setSelectedMedia({
        id: card.id,
        type: "video",
        title: card.title,
        category: card.category || "VOLUNTEER",
        domain: "drive.google.com / volunteer",
        description: card.desc,
        mediaSrc: cisaruaVideos[0]?.videoSrc || card.image_src,
        detailUrl: cisaruaVideos[0]?.detailUrl || card.image_src,
        videoOptions: cisaruaVideos,
      });
      return;
    }

    if (card.media) {
      setSelectedMedia({
        id: card.media.id || card.id,
        type: (card.media.type || card.type) as "image" | "video",
        title: card.media.title || card.title,
        category: card.media.category || card.category,
        domain: card.media.domain || "iamusamah.vercel.app",
        description: card.media.description || card.desc,
        mediaSrc: card.media.mediaSrc || card.image_src,
        detailUrl: card.media.detailUrl,
        certificateSrc: card.media.certificateSrc,
      });
      return;
    }

    // Fallback
    setSelectedMedia({
      id: card.id,
      type: card.type || "image",
      title: card.title,
      category: card.category || "EXPERIENCE",
      domain: "iamusamah.vercel.app",
      description: card.desc,
      mediaSrc: card.image_src,
      detailUrl: card.image_src,
    });
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="experience"
        className="services relative w-full max-w-5xl mx-auto px-4 py-20 border-t-2 border-foreground/20 space-y-12"
      >
        {/* Anchor for backward compatibility with #volunteer */}
        <span id="volunteer" className="absolute -top-24 left-0 block opacity-0 pointer-events-none" />

        {/* Header 1:1 nihfery.net style */}
        <div className="services-header text-center space-y-4 py-6">
          <div className="services-profile-icon w-20 h-20 mx-auto rounded-2xl overflow-hidden border-4 border-foreground shadow-lg bg-zinc-900 flex items-center justify-center font-mono text-xl font-black text-emerald-400">
            MU
          </div>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-500 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>{expData.tagline || "Track Record & Experience"}</span>
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-foreground tracking-tight max-w-3xl mx-auto leading-none">
            {expData.title || "Pengalaman, Kompetisi & Aksi Sosial"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {expData.subtitle}
          </p>

          {/* Category Filter Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {filterOptions.map((opt) => {
              const isActive = activeFilter === opt.key;
              const count = filterCounts[opt.key];
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setActiveFilter(opt.key)}
                  className={`font-mono text-xs font-extrabold uppercase px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-emerald-500 text-zinc-950 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.35)] scale-105"
                      : "bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white border-zinc-800"
                  }`}
                >
                  <span>{opt.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-black/20 text-zinc-950 font-black" : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="services-header-arrow-icon flex justify-center pt-2 text-foreground">
            <ArrowDown className="w-7 h-7 animate-bounce text-emerald-500" />
          </div>
        </div>

        {/* Stacking Sequential Cards */}
        <div className="relative space-y-12 min-h-[400px]">
          {filteredCards.length === 0 ? (
            <div className="text-center py-16 font-mono text-sm text-zinc-500">
              Tidak ada pengalaman dalam kategori ini.
            </div>
          ) : (
            filteredCards.map((card: any, idx: number) => {
              const theme = THEME_STYLES[card.color_theme as keyof typeof THEME_STYLES] || THEME_STYLES.dark;
              const isVideo = card.id === "exp-cisarua-disaster" || card.type === "video";
              const isCertificate = card.id === "exp-icc-2026" || card.id === "exp-gemini-hackathon-2026";

              return (
                <div
                  key={card.id}
                  id={`experience-card-${idx + 1}`}
                  className={`service-card sticky top-24 sm:top-28 w-full rounded-[2em] border-4 ${theme.bgColor} shadow-2xl p-6 sm:p-10 transition-all duration-300 min-h-[390px] flex flex-col justify-between`}
                >
                  {/* Top Bar: Badge & Date / Location */}
                  <div className="flex flex-wrap justify-between items-center font-mono text-xs border-b border-current/20 pb-4 mb-4 gap-2">
                    <span
                      className={`font-black tracking-widest uppercase px-3 py-1 rounded-full border ${theme.accentTag}`}
                    >
                      {card.badge || card.category}
                    </span>
                    <div className="flex items-center gap-2 font-bold tracking-wider opacity-90 text-[11px] sm:text-xs">
                      <span>{card.date}</span>
                      <span>//</span>
                      <span>{card.location}</span>
                    </div>
                  </div>

                  {/* Main Body */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center flex-1 my-2">
                    <div className="md:col-span-2 space-y-3">
                      <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-none">
                        {card.title}
                      </h3>
                      {card.role && (
                        <p className="font-mono text-xs sm:text-sm font-bold opacity-80 uppercase tracking-wide">
                          {card.role}
                        </p>
                      )}
                      <p className="text-sm sm:text-base font-medium opacity-90 leading-relaxed max-w-xl">
                        {card.desc}
                      </p>
                    </div>

                    {/* Preview Thumbnail */}
                    <div className="service-card-img hidden md:block aspect-[4/3] rounded-2xl overflow-hidden border-2 border-current/30 shadow-md bg-black/20 relative">
                      <Image
                        src={card.image_src}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Footer Bar: Action Button & Counter */}
                  <div className="pt-4 border-t border-current/20 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => handleOpenCard(card)}
                      className={`font-mono text-xs font-black uppercase px-6 py-3.5 rounded-full transition cursor-pointer flex items-center gap-2 ${theme.btnClass}`}
                    >
                      {isVideo ? (
                        <Video className="w-4 h-4" />
                      ) : isCertificate ? (
                        <Award className="w-4 h-4" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                      <span>{card.btn_text || "Lihat Dokumentasi"}</span>
                    </button>
                    <span className="font-mono text-xs font-extrabold opacity-60">
                      {String(idx + 1).padStart(2, "0")} // {String(filteredCards.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <VolunteerLightbox media={selectedMedia} onClose={() => setSelectedMedia(null)} />
    </>
  );
}
