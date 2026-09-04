"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const INDICATOR_SEGMENTS = 5;
const TICKS_BETWEEN = 7;

// Hardcoded coordinates for 10 cards in 3D space to ensure exact 1:1 behavior without random layout shifts
const cardCoords = [
  { x: -380, y: -220 },
  { x: 320, y: -180 },
  { x: -300, y: 160 },
  { x: 350, y: 140 },
  { x: -50, y: -260 },
  { x: -420, y: 60 },
  { x: 400, y: -60 },
  { x: -180, y: -120 },
  { x: 220, y: 240 },
  { x: 20, y: 190 },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const ticksRef = useRef<HTMLSpanElement[]>([]);
  const numsRef = useRef<HTMLParagraphElement[]>([]);
  const dotRef = useRef<HTMLSpanElement>(null);

  // 10 Cards mapping Usamah's real projects & achievements
  const flyThroughCards = [
    {
      title: "SKS-Master (Platform Ujian AI)",
      badge: "Gemini Hackathon 2026",
      tech: "Next.js • Gemini API • TypeScript",
      image: "/assets/sks-master-certificate.png",
      link: "https://sks-master.vercel.app",
    },
    {
      title: "Stry - AI Quiz Generator",
      badge: "AI Learning Platform",
      tech: "Next.js • Prisma ORM • Vercel",
      image: "/assets/volunteer-hari-anak-nasional.jpg",
      link: "https://github.com/usamah-io",
    },
    {
      title: "Budiman Cendikia",
      badge: "Situs Web Sekolah",
      tech: "Next.js • PHP Blade • SQL",
      image: "/assets/volunteerr.jpg",
      link: "https://github.com/usamah-io",
    },
    {
      title: "Top 4 Finalis Gemini Hackathon",
      badge: "Nilai Akhir 86.4",
      tech: "Inovasi 85 • SDGs 85 • Feasibility 88",
      image: "/assets/datakeseluruhan peserta.png",
      link: "/hackathon-recap",
    },
    {
      title: "Sertifikat Resmi Gemini Hackathon",
      badge: "Penghargaan Resmi",
      tech: "Gemini Unity Festival 2026",
      image: "/assets/sks-master-certificate.png",
      link: "/hackathon-recap",
    },
    {
      title: "Hari Anak Nasional Tasikmalaya",
      badge: "Operator Sound & Streaming",
      tech: "Live Media Tech & Mixing",
      image: "/assets/volunteer-hari-anak-nasional.jpg",
      link: "/#experience",
    },
    {
      title: "Relawan Pemulihan Longsor Cisarua",
      badge: "Aksi Kemanusiaan",
      tech: "10 Video Dokumentasi & Logistik",
      image: "/assets/volunteerr.jpg",
      link: "/#experience",
    },
    {
      title: "Arsitektur Sistem SKS-Master",
      badge: "System Architecture",
      tech: "React • Server Actions • Gemini API",
      image: "/assets/arsitektur-sistem.png",
      link: "/hackathon-recap",
    },
    {
      title: "Pengumuman Finalis WhatsApp",
      badge: "Babak Final Pitch",
      tech: "Gemini Innovation Hackathon",
      image: "/assets/pengumumanfinalis.png",
      link: "/hackathon-recap",
    },
    {
      title: "Rincian Skor Penilaian Juri",
      badge: "Scorecard Resmi",
      tech: "Pitching 88 • Feasibility 88",
      image: "/assets/data sks.png",
      link: "/hackathon-recap",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !titlesRef.current || !cardsContainerRef.current) return;

    const cards = cardsContainerRef.current.querySelectorAll(".featured-img-card");

    ticksRef.current = ticksRef.current.slice(0, INDICATOR_SEGMENTS * TICKS_BETWEEN);
    numsRef.current = numsRef.current.slice(0, INDICATOR_SEGMENTS);

    cards.forEach((card, index) => {
      const coord = cardCoords[index % cardCoords.length];
      gsap.set(card, { x: coord.x, y: coord.y, z: -1500, scale: 0 });
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        pinSpacing: true,
        start: "top top",
        end: "+=500%",
        scrub: 0.85,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (titlesRef.current) {
            gsap.set(titlesRef.current, { x: -window.innerWidth * 4 * progress });
          }

          cards.forEach((card, index) => {
            const delay = index * 0.045;
            const local = Math.max(0, Math.min(1, (progress - delay) * 2.6));
            const z = -1500 + 3000 * local;
            const scale = Math.min(1, local * 10);
            gsap.set(card, { z, scale });
          });

          const ticks = ticksRef.current;
          const step = ticks.length > 0 ? 1 / ticks.length : 1;
          ticks.forEach((tick, i) => {
            if (!tick) return;
            tick.style.opacity = progress > i * step ? "1" : "0.2";
          });

          const active = Math.min(
            INDICATOR_SEGMENTS - 1,
            Math.floor(progress * INDICATOR_SEGMENTS + 0.001)
          );
          numsRef.current.forEach((num, i) => {
            if (!num) return;
            num.classList.toggle("is-active", i === active);
          });

          if (dotRef.current) {
            dotRef.current.style.top = `${1.15 + progress * 12.2}em`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="featured-work relative w-screen h-screen overflow-hidden bg-background text-foreground"
    >
      {/* 500vw Title Strip Header translating horizontally */}
      <div
        ref={titlesRef}
        className="featured-titles relative w-[500vw] h-full flex items-center will-change-transform z-10"
      >
        <div className="w-[100vw] flex-shrink-0 flex flex-col justify-center items-center px-8 text-center">
          <span className="font-mono text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">
            PROJECT PORTFOLIO [ 10 ]
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter">
            Proyek Unggulan
          </h1>
        </div>

        <div className="w-[100vw] flex-shrink-0 flex flex-col justify-center items-center px-8 text-center">
          <span className="font-mono text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">
            GEMINI HACKATHON 2026
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter">
            SKS-Master Platform
          </h1>
        </div>

        <div className="w-[100vw] flex-shrink-0 flex flex-col justify-center items-center px-8 text-center">
          <span className="font-mono text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">
            AI LEARNING SYSTEM
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter">
            Stry Quiz Generator
          </h1>
        </div>

        <div className="w-[100vw] flex-shrink-0 flex flex-col justify-center items-center px-8 text-center">
          <span className="font-mono text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">
            SCHOOL WEBSITE ARCHITECTURE
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter">
            Budiman Cendikia
          </h1>
        </div>

        <div className="w-[100vw] flex-shrink-0 flex flex-col justify-center items-center px-8 text-center">
          <span className="font-mono text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">
            FULL-STACK & AI BUILDS
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter">
            Hackathon & Works
          </h1>
        </div>
      </div>

      {/* 3D Fly-Through Cards Container (perspective: 500px) */}
      <div
        ref={cardsContainerRef}
        className="featured-images absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-20"
        style={{ perspective: "500px", transformStyle: "preserve-3d" }}
      >
        {flyThroughCards.map((card, idx) => (
          <a
            key={idx}
            href={card.link}
            target={card.link.startsWith("/") ? undefined : "_blank"}
            rel={card.link.startsWith("/") ? undefined : "noopener noreferrer"}
            className="featured-img-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] overflow-hidden pointer-events-auto rounded-2xl border-4 border-foreground shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
          >
            <img src={card.image} alt="" className="w-full h-full object-cover" />
          </a>
        ))}
      </div>

      {/* Vertical 01–05 progress ruler */}
      <aside className="featured-work-indicator" aria-hidden="true">
        <span ref={dotRef} className="indicator-dot" />
        {Array.from({ length: INDICATOR_SEGMENTS }).map((_, segment) => (
          <div key={segment} className="flex flex-col items-center gap-[0.35em]">
            <p
              ref={(el) => {
                if (el) numsRef.current[segment] = el;
              }}
              className={`indicator-num ${segment === 0 ? "is-active" : ""}`}
            >
              {String(segment + 1).padStart(2, "0")}
            </p>
            {segment < INDICATOR_SEGMENTS - 1 &&
              Array.from({ length: TICKS_BETWEEN }).map((_, tick) => {
                const tickIndex = segment * TICKS_BETWEEN + tick;
                return (
                  <span
                    key={`${segment}-${tick}`}
                    ref={(el) => {
                      if (el) ticksRef.current[tickIndex] = el;
                    }}
                    className="indicator-tick"
                  />
                );
              })}
          </div>
        ))}
      </aside>

      {/* Footer Bar: PROJECT PORTFOLIO [ 10 ] + /////////////////// */}
      <div className="featured-work-footer absolute bottom-0 w-full p-6 flex justify-between items-center z-30 font-mono text-xs font-bold text-foreground border-t border-foreground/20">
        <div>PROJECT PORTFOLIO [ 10 ]</div>
        <div className="text-emerald-500">///////////////////</div>
        <div>MUHAMMAD USAMAH</div>
      </div>
    </section>
  );
}
