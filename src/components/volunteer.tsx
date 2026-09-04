"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import VolunteerLightbox, { LightboxMedia } from "./volunteer-lightbox";
import { Camera, Video, ArrowDown } from "lucide-react";

export default function Volunteer() {
  const { language } = useApp();
  const t = content[language as "id" | "en"] || content.id;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedMedia, setSelectedMedia] = useState<LightboxMedia | null>(null);

  const rawItems = (t.volunteer && t.volunteer.items) || [];

  // 4 Cards matching nihfery.net color scheme & layout
  const cards = [
    {
      id: "card-1",
      bgColor: "bg-[#ed6a5a] text-zinc-950 border-zinc-950",
      accentTag: "bg-black/10 text-zinc-950 border-zinc-950/20",
      btnClass: "bg-zinc-950 text-white hover:bg-zinc-800",
      badge: "VOLUNTEER #01",
      location: "TASIKMALAYA",
      title: "Hari Anak Nasional Tasikmalaya",
      desc: "Dokumentasi foto aksi sebagai Operator Sound System, Audio Mixing, & Live Streaming pada acara Hari Anak Nasional se-Kabupaten/Kota Tasikmalaya.",
      btnText: "Lihat Foto Operator",
      type: "image",
      imageSrc: "/assets/volunteer-hari-anak-nasional.jpg",
      items: rawItems.filter((i: any) => i.id === "vol-han-tasik"),
    },
    {
      id: "card-2",
      bgColor: "bg-[#f4f1bb] text-zinc-950 border-zinc-950",
      accentTag: "bg-black/10 text-zinc-950 border-zinc-950/20",
      btnClass: "bg-zinc-950 text-white hover:bg-zinc-800",
      badge: "VOLUNTEER #02",
      location: "CISARUA BOGOR",
      title: "Relawan Tanggap Darurat Cisarua (Video 1 - 5)",
      desc: "Dokumentasi tim relawan saat tiba di lokasi bencana longsor Cisarua, evakuasi, posko kemanusiaan, dan logistik dasar.",
      btnText: "Putar Video Posko & Evakuasi",
      type: "video",
      imageSrc: "/assets/volunteerr.jpg",
      items: rawItems.filter((i: any) => ["vol-1", "vol-2", "vol-3", "vol-4", "vol-5"].includes(i.id)),
    },
    {
      id: "card-3",
      bgColor: "bg-[#9bc1bc] text-zinc-950 border-zinc-950",
      accentTag: "bg-black/10 text-zinc-950 border-zinc-950/20",
      btnClass: "bg-zinc-950 text-white hover:bg-zinc-800",
      badge: "VOLUNTEER #03",
      location: "CISARUA BOGOR",
      title: "Kegiatan Pemulihan & Logistik (Video 6 - 10)",
      desc: "Dokumentasi briefing tim relawan, penyaluran sembako ke rumah warga, dapur umum, dan penutupan aksi relawan.",
      btnText: "Putar Video Logistik & Pemulihan",
      type: "video",
      imageSrc: "/assets/volunteerr.jpg",
      items: rawItems.filter((i: any) => ["vol-6", "vol-7", "vol-8", "vol-9", "vol-10"].includes(i.id)),
    },
    {
      id: "card-4",
      bgColor: "bg-[#141414] text-white border-white/20",
      accentTag: "bg-white/10 text-emerald-400 border-white/20",
      btnClass: "bg-emerald-500 text-black hover:bg-emerald-400",
      badge: "VOLUNTEER #04",
      location: "GALERI LAPANGAN",
      title: "Foto Dokumentasi Aksi Relawan",
      desc: "Kumpulan foto momen kebersamaan, distribusi logistik, dan koordinasi tim relawan di lokasi posko bencana.",
      btnText: "Lihat Galeri Foto Lapangan",
      type: "image",
      imageSrc: "/assets/volunteer-hari-anak-nasional.jpg",
      items: rawItems.filter((i: any) => ["vol-11", "vol-12"].includes(i.id)),
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cardEls = sectionRef.current?.querySelectorAll(".service-card");
      if (!cardEls || cardEls.length === 0) return;

      // GSAP Stacking Animation: As each card scrolls up, the card below scales down slightly
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

    return () => ctx.revert();
  }, []);

  const handleOpenCardMedia = (cardItems: any[]) => {
    if (!cardItems || cardItems.length === 0) return;
    const target = cardItems[0];
    setSelectedMedia({
      id: target.id,
      type: target.type as "image" | "video",
      title: target.title,
      category: target.category || "VOLUNTEER",
      domain: target.domain || "volunteer.dev",
      description: target.description,
      mediaSrc: target.type === "video" ? target.videoSrc : target.imageSrc,
      detailUrl: target.detailUrl,
    });
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="experience-section"
        className="services relative w-full max-w-5xl mx-auto px-4 py-20 border-t-2 border-foreground/20 space-y-16"
      >
        {/* Services Header 1:1 nihfery.net */}
        <div className="services-header text-center space-y-4 py-6">
          <div className="services-profile-icon w-20 h-20 mx-auto rounded-2xl overflow-hidden border-4 border-foreground shadow-lg bg-zinc-900 flex items-center justify-center font-mono text-xl font-black text-emerald-400">
            MU
          </div>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-500">
            Your Vision. My Expertise.
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-foreground tracking-tight max-w-3xl mx-auto leading-none">
            Full-stack development & Design Solutions
          </h2>
          <div className="services-header-arrow-icon flex justify-center pt-3 text-foreground">
            <ArrowDown className="w-8 h-8 animate-bounce text-emerald-500" />
          </div>
        </div>

        {/* 4 Stacking Cards 1:1 Sticky Sequential Overlay */}
        <div className="relative space-y-12">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              id={`service-card-${idx + 1}`}
              className={`service-card sticky top-24 sm:top-28 w-full rounded-[2em] border-4 ${card.bgColor} shadow-2xl p-6 sm:p-10 transition-all duration-300 min-h-[380px] flex flex-col justify-between`}
            >
              <div className="flex flex-wrap justify-between items-center font-mono text-xs border-b border-current/20 pb-4 mb-4">
                <span className={`font-black tracking-widest uppercase px-3 py-1 rounded-full border ${card.accentTag}`}>
                  {card.badge}
                </span>
                <span className="font-bold tracking-wider">{card.location}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center flex-1 my-2">
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-none">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base font-medium opacity-90 leading-relaxed max-w-xl">
                    {card.desc}
                  </p>
                </div>
                <div className="service-card-img hidden md:block aspect-[4/3] rounded-2xl overflow-hidden border-2 border-current/30 shadow-md bg-black/20">
                  <img src={card.imageSrc} alt={card.title} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="pt-4 border-t border-current/20 flex items-center justify-between">
                <button
                  onClick={() => handleOpenCardMedia(card.items)}
                  className={`font-mono text-xs font-black uppercase px-6 py-3.5 rounded-full transition cursor-pointer flex items-center gap-2 shadow-md ${card.btnClass}`}
                >
                  {card.type === "video" ? <Video className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
                  <span>{card.btnText}</span>
                </button>
                <span className="font-mono text-xs font-extrabold opacity-60">0{idx + 1} // 04</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <VolunteerLightbox media={selectedMedia} onClose={() => setSelectedMedia(null)} />
    </>
  );
}
