"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const showcaseItems = [
  { title: "SKS-Master (Gemini Hackathon 2026)", badge: "Top 4 Finalist", image: "/assets/sks-master-certificate.png" },
  { title: "Stry - AI Quiz Generator", badge: "AI Platform", image: "/assets/volunteer-hari-anak-nasional.jpg" },
  { title: "Budiman Cendikia Website", badge: "School Platform", image: "/assets/volunteerr.jpg" },
  { title: "Hari Anak Nasional Tasikmalaya", badge: "Audio & Media Tech", image: "/assets/volunteer-hari-anak-nasional.jpg" },
];

export default function HeroImageCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !cardRef.current) return;

    // 250ms rapid slideshow loop
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 250);

    // ScrollTrigger Animation: translateY(-110%) scale(0.25) rotate(-15deg) -> translateY(0) scale(1) rotate(0deg)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          y: "-110%",
          scale: 0.25,
          rotation: -15,
        },
        {
          y: "0%",
          scale: 1,
          rotation: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  const currentItem = showcaseItems[currentIndex];

  return (
    <section ref={containerRef} className="hero-img-holder relative w-full max-w-5xl mx-auto px-4 py-8 z-20">
      <div
        ref={cardRef}
        className="hero-img relative w-full h-[320px] sm:h-[420px] md:h-[560px] overflow-hidden rounded-2xl border-4 border-foreground shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
      >
        <img
          src={currentItem.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
