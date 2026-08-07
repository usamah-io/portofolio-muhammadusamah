"use client";

import React, { useEffect, useRef, useState } from "react";

export default function GridSpotlightBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches ||
          window.matchMedia("(pointer: coarse)").matches
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let animFrameId: number | null = null;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 60FPS requestAnimationFrame loop updating CSS variables
    const updateSpotlight = () => {
      // Smooth interpolation for spotlight movement
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", `${currentX}px`);
        containerRef.current.style.setProperty("--mouse-y", `${currentY}px`);
      }

      animFrameId = requestAnimationFrame(updateSpotlight);
    };

    animFrameId = requestAnimationFrame(updateSpotlight);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-slate-50 dark:bg-zinc-950 transition-colors duration-300"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as React.CSSProperties
      }
    >
      {/* 1. Light Mode Fine Grid Pattern (Thin Dark Slate/Black lines) */}
      <div
        className="absolute inset-0 pointer-events-none select-none opacity-30 dark:opacity-0 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.14) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* 2. Dark Mode Fine Grid Pattern (Thin White/Zinc lines) */}
      <div
        className="absolute inset-0 pointer-events-none select-none opacity-0 dark:opacity-25 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* 3. Interactive Spotlight Radial Gradient (Emerald 0.18, 550px radius) */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none select-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(550px circle at var(--mouse-x) var(--mouse-y), rgba(16, 185, 129, 0.18), transparent 80%)`,
          }}
        />
      )}

      {/* 4. Glowing Neon Emerald Dense Grid Lines (Masked by Radial Spotlight) */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16, 185, 129, 0.9) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.9) 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
            WebkitMaskImage: `radial-gradient(380px circle at var(--mouse-x) var(--mouse-y), black 0%, transparent 80%)`,
            maskImage: `radial-gradient(380px circle at var(--mouse-x) var(--mouse-y), black 0%, transparent 80%)`,
          }}
        />
      )}

      {/* Ambient static fallback for mobile devices */}
      {isMobile && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none select-none" />
      )}
    </div>
  );
}
