"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Image as ImageIcon, HeartHandshake, ShieldCheck, Camera, ArrowRight, Radio } from "lucide-react";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import BrowserMockupCard from "./browser-mockup-card";
import VolunteerLightbox, { LightboxMedia } from "./volunteer-lightbox";

export default function Volunteer() {
  const { language } = useApp();
  const t = content[language as "id" | "en"]?.volunteer || content["id"].volunteer;
  const isIndonesian = language === "id";

  const [selectedMedia, setSelectedMedia] = useState<LightboxMedia | null>(null);

  // Pasangan 2 kartu: Kiri = Operator HAN Tasikmalaya (Landscape), Kanan = Relawan Cisarua (Portrait)
  const hanTasikItem = t.items.find((item) => item.id === "vol-han-tasik") || t.items[0];
  const cisaruaItem = t.items.find((item) => item.id === "vol-11") || t.items[1];
  const featuredPair = [hanTasikItem, cisaruaItem];

  const bouncySpring = {
    type: "spring",
    stiffness: 300,
    damping: 20,
  } as const;

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
      id="experience"
      className="py-20 px-4 w-full max-w-6xl mx-auto relative transition-colors duration-300 text-zinc-900 dark:text-white"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={bouncySpring}
        className="mb-8 border-b border-zinc-200 dark:border-zinc-800/60 pb-6 text-center md:text-left"
      >
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-[#00FF87]/10 border border-emerald-500/30 dark:border-[#00FF87]/30 text-emerald-600 dark:text-[#00FF87] text-xs font-mono font-bold">
            <Radio className="w-4 h-4 text-emerald-600 dark:text-[#00FF87] shrink-0 animate-pulse" />
            <span>{isIndonesian ? "Pengalaman & Dokumentasi Event Tech" : "Experience & Event Tech Portfolio"}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            {isIndonesian ? "Pengalaman &" : "Experience &"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-[#00FF87] dark:to-teal-400">
              {isIndonesian ? "Dokumentasi Lapangan" : "Field Documentation"}
            </span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl">
            {isIndonesian 
              ? "Dokumentasi peranan penting sebagai Operator Sound System & Live Stream Hari Anak Nasional Tasikmalaya serta aksi relawan di Cisarua."
              : "Key documentation serving as Sound System & Live Stream Operator at National Children's Day Tasikmalaya and volunteer relief actions."}
          </p>
        </div>
      </motion.div>

      {/* 1. STATS IMPACT COUNTER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...bouncySpring, delay: 0.1 }}
        className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-10"
      >
        <motion.div 
          whileHover={{ y: -3, scale: 1.015 }}
          transition={bouncySpring}
          className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/50 dark:hover:border-[#00FF87]/50 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col justify-between transition-all group shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xl sm:text-3xl font-black text-emerald-600 dark:text-[#00FF87] group-hover:scale-105 transition-transform">
              12+
            </span>
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-[#00FF87] transition-colors" />
          </div>
          <div className="text-[10px] sm:text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-1">
            {isIndonesian ? "Dokumentasi Lapangan" : "Field Documentation"}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -3, scale: 1.015 }}
          transition={bouncySpring}
          className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/50 dark:hover:border-[#00FF87]/50 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col justify-between transition-all group shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xl sm:text-3xl font-black text-emerald-600 dark:text-[#00FF87] group-hover:scale-105 transition-transform">
              1
            </span>
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-[#00FF87] transition-colors" />
          </div>
          <div className="text-[10px] sm:text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-1">
            {isIndonesian ? "Operator Event Tasik" : "Tasik Event Operator"}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -3, scale: 1.015 }}
          transition={bouncySpring}
          className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/50 dark:hover:border-[#00FF87]/50 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col justify-between transition-all group shadow-xs hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-2xl font-black text-emerald-600 dark:text-[#00FF87] group-hover:scale-105 transition-transform truncate">
              {isIndonesian ? "Pengalaman" : "Experience"}
            </span>
            <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-[#00FF87] transition-colors" />
          </div>
          <div className="text-[10px] sm:text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-1">
            {isIndonesian ? "Peran Operator & Event" : "Operator & Event Role"}
          </div>
        </motion.div>
      </motion.div>

      {/* 2. Responsive Grid with Natural Aspect Ratios (Landscape for HAN Tasikmalaya, Portrait for Cisarua) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start w-full max-w-5xl mx-auto">
        {featuredPair.map((item, idx) => {
          const itemType = "image";
          const mediaSource =
            (item as { imageSrc?: string; videoSrc?: string }).imageSrc ||
            (item as { videoSrc?: string }).videoSrc ||
            "";

          // Card 0 (HAN Tasikmalaya) -> Landscape 16:9
          // Card 1 (Relawan Cisarua) -> Portrait 3:4
          const naturalRatio = idx === 0 ? "aspect-video" : "aspect-[3/4]";

          return (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              transition={{ ...bouncySpring, delay: idx * 0.15 }}
              className="h-full"
            >
              <BrowserMockupCard
                layout="vertical"
                domain={item.domain}
                mediaType={itemType}
                mediaSrc={mediaSource}
                aspectRatio={naturalRatio}
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
                  label: isIndonesian ? "Lihat Foto" : "View Photo",
                  onClick: () => handleOpenLightbox(item),
                  icon: <ImageIcon className="w-3.5 h-3.5 shrink-0" />,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* 3. Compact & Proportional "Lihat Selengkapnya" Button */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...bouncySpring, delay: 0.25 }}
        className="mt-8 text-center flex justify-center"
      >
        <Link href="/volunteer">
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={bouncySpring}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs sm:text-sm border border-zinc-800 dark:border-zinc-200 shadow-xs hover:shadow-md cursor-pointer transition-all duration-200"
          >
            <span>{isIndonesian ? "Lihat Selengkapnya Dokumentasi" : "View All Documentation"}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 text-emerald-400 dark:text-emerald-600" />
          </motion.div>
        </Link>
      </motion.div>

      {/* 4. LIGHTBOX MODAL */}
      <VolunteerLightbox
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </section>
  );
}
