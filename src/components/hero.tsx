"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import Typewriter from "./typewriter";


interface LanyardResponse {
  success: boolean;
  data: {
    discord_status: "online" | "idle" | "dnd" | "offline";
    listening_to_spotify: boolean;
    spotify: {
      song: string;
      artist: string;
      track_id: string;
    } | null;
  };
}

const DEFAULT_DISCORD_ID = "915220377464049714"; // Fallback public/example ID

export default function Hero() {
  const { language } = useApp();
  const t = content[language].hero;

  const [status, setStatus] = useState<LanyardResponse["data"] | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const lanyardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Fetch Lanyard API
  useEffect(() => {
    const discordId = process.env.NEXT_PUBLIC_DISCORD_ID || DEFAULT_DISCORD_ID;
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
        const json: LanyardResponse = await res.json();
        if (json.success) {
          setStatus(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch Lanyard status:", err);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 15000); // Poll every 15s

    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        lanyardRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      );

      // Split words/lines or animate the title
      if (titleRef.current) {
        const lines = titleRef.current.querySelectorAll(".reveal-line");
        tl.fromTo(
          lines,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
          "-=0.6"
        );
      }

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.7"
      );

      tl.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to determine status pill details
  const getStatusDetails = () => {
    if (!status) {
      return {
        text: t.status_connecting,
        dotColor: "bg-zinc-500 shadow-zinc-500/50",
        pillBg: "bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300",
      };
    }

    if (status.listening_to_spotify && status.spotify) {
      return {
        text: t.status_listening.replace("{song}", status.spotify.song).replace("{artist}", status.spotify.artist),
        dotColor: "bg-emerald-500 animate-pulse shadow-emerald-500/50",
        pillBg: "bg-emerald-100/80 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 hover:border-emerald-450 dark:hover:border-emerald-500/40 transition-colors",
        href: `https://open.spotify.com/track/${status.spotify.track_id}`,
      };
    }

    switch (status.discord_status) {
      case "online":
        return {
          text: t.status_online,
          dotColor: "bg-emerald-500 shadow-emerald-500/50",
          pillBg: "bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300",
        };
      case "idle":
        return {
          text: t.status_idle,
          dotColor: "bg-amber-500 shadow-amber-500/50",
          pillBg: "bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300",
        };
      case "dnd":
        return {
          text: t.status_dnd,
          dotColor: "bg-rose-500 shadow-rose-500/50",
          pillBg: "bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300",
        };
      default:
        return {
          text: t.status_offline,
          dotColor: "bg-zinc-500 shadow-zinc-500/50",
          pillBg: "bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300",
        };
    }
  };

  const details = getStatusDetails();

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-20 px-4"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 -z-10" />
      
      {/* Dynamic light blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full -z-10 animate-pulse duration-[8000ms]" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" 
      />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6 sm:gap-7 relative z-10">
        
        {/* Glowing Lanyard Badge */}
        <div ref={lanyardRef} className="opacity-0">
          {details.href ? (
            <a
              href={details.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 px-4 py-2 border rounded-full text-xs font-semibold shadow-lg shadow-black/5 dark:shadow-black/20 ${details.pillBg}`}
            >
              <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_var(--tw-shadow-color)] ${details.dotColor}`} />
              <span className="truncate max-w-[280px] sm:max-w-md">{details.text}</span>
            </a>
          ) : (
            <div className={`inline-flex items-center gap-2.5 px-4 py-2 border rounded-full text-xs font-semibold shadow-lg shadow-black/5 dark:shadow-black/20 ${details.pillBg}`}>
              <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_var(--tw-shadow-color)] ${details.dotColor}`} />
              <span>{details.text}</span>
            </div>
          )}
        </div>

        {/* Bento/Trading UI Bold Typography Header */}
        <h1 
          ref={titleRef}
          className="flex flex-col items-center justify-center text-center gap-2.5 sm:gap-3"
        >
          {/* Tingkat 1: Nama Utama (Paling Besar) */}
          <span className="block overflow-hidden pb-1">
            <span className="reveal-line block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Muhammad Usamah Abdurrahman
            </span>
          </span>

          {/* Tingkat 2: Animasi Role / Typewriter (Sedang) */}
          <span className="block overflow-hidden pb-1 min-h-[44px] sm:min-h-[52px] flex items-center justify-center">
            <span className="reveal-line block text-xl sm:text-2xl md:text-3xl font-bold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400">
              <Typewriter
                words={[
                  "Frontend Developer & UI Designer",
                  "Full-Stack & AI Tooling Enthusiast",
                  "Content Creator @usamaahhhh"
                ]}
                typingSpeed={75}
                deletingSpeed={35}
                pauseDuration={2000}
              />
            </span>
          </span>
        </h1>

        {/* Tingkat 3: Deskripsi Paragraf (Paling Kecil & Muted) */}
        <p 
          ref={subtitleRef}
          className="opacity-0 max-w-xl mx-auto text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed"
        >
          {t.subtitle}
        </p>

        {/* CTA Buttons */}
        <div 
          ref={buttonsRef}
          className="opacity-0 flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center"
        >
          <Link
            href="#projects"
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-xl shadow-emerald-500/10 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
          >
            {t.cta_explore}
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 font-semibold px-8 py-3.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
          >
            {t.cta_github}
          </a>
        </div>

      </div>
    </section>
  );
}
