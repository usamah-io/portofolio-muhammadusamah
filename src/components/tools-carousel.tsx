"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2, Layers, Cpu, Wrench } from "lucide-react";
import { useApp } from "./app-context";
import { TOOLS_DATA, ToolItem } from "@/data/tools-data";
import { ToolIcon } from "./tool-icons";
import content from "@/data/content.json";
import Typewriter from "./typewriter";

export default function ToolsCarousel() {
  const { language } = useApp();
  const [filter, setFilter] = useState<"all" | "ai" | "google">("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);

  const containerRef = useRef<HTMLDivElement>(null);

  // Filter tools based on category tab
  const filteredTools = TOOLS_DATA.filter((tool) => {
    if (filter === "all") return true;
    return tool.category === filter;
  });

  const totalItems = filteredTools.length;

  // Window resize listener for responsive 3D spacing
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ensure activeIndex is within bounds when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  // Infinite Auto-play slider
  useEffect(() => {
    if (isHovered || isDragging || totalItems <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, isDragging, totalItems]);

  // Circular Index Normalization helper
  const getNormalizedOffset = (index: number) => {
    let diff = index - activeIndex + dragOffset;
    const half = totalItems / 2;
    while (diff < -half) diff += totalItems;
    while (diff > half) diff -= totalItems;
    return diff;
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  };

  // Touch & Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    const cardWidth = windowWidth < 640 ? 160 : 240;
    setDragOffset(deltaX / cardWidth);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragOffset) > 0.25) {
      if (dragOffset > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    const cardWidth = windowWidth < 640 ? 140 : 220;
    setDragOffset(deltaX / cardWidth);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragOffset) > 0.25) {
      if (dragOffset > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setDragOffset(0);
  };

  const activeTool = filteredTools[activeIndex] || filteredTools[0];
  const t = content[language as "id" | "en"] || content.id;
  const isIndonesian = language === "id";

  return (
    <section className="relative py-20 px-4 overflow-hidden select-none">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-purple-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10 flex flex-col items-center gap-3">
          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-sm text-center">
            {isIndonesian ? "Ekosistem Alat & AI Tools" : "Tools & AI Integration Catalog"}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight text-center min-h-[1.2em] flex items-center justify-center">
            <Typewriter
              words={
                isIndonesian
                  ? ["Katalog Alat & Integrasi AI Ecosystem"]
                  : ["Tools & AI Integration Catalog"]
              }
              loop={true}
              typingSpeed={70}
              deletingSpeed={40}
              pauseDuration={2500}
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 font-extrabold"
              cursorClassName="text-emerald-500 dark:text-emerald-400 text-3xl sm:text-5xl font-light"
            />
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mt-1 text-center">
            {isIndonesian
              ? "Pemanfaatan kecerdasan buatan terdepan dan ekosistem produktivitas modern dalam mendukung proses alur kerja pembuatan aplikasi web modern berbasis Next.js & Full-Stack."
              : "Leveraging cutting-edge artificial intelligence and modern productivity tool ecosystems to empower Next.js & Full-Stack web application development workflows."}
          </p>

          {/* 3D Glassmorphic Capsule Filter Tabs (Equal Grid Pill - 100% Fits Mobile & Desktop) */}
          <div className="w-full max-w-md mx-auto mt-6 px-3 sm:px-0">
            <div className="grid grid-cols-3 gap-1 sm:gap-1.5 p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/85 backdrop-blur-2xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl shadow-black/5 dark:shadow-black/50 ring-1 ring-black/5 dark:ring-white/10 w-full transition-all duration-300">
              <button
                onClick={() => setFilter("all")}
                className={`flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1.5 sm:px-4 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer w-full text-center ${
                  filter === "all"
                    ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/30 ring-1 ring-emerald-300/60 scale-[1.02]"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="whitespace-nowrap">{isIndonesian ? "Semua" : "All"}</span>
              </button>

              <button
                onClick={() => setFilter("ai")}
                className={`flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1.5 sm:px-4 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer w-full text-center ${
                  filter === "ai"
                    ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/30 ring-1 ring-emerald-300/60 scale-[1.02]"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="whitespace-nowrap">AI Tools</span>
              </button>

              <button
                onClick={() => setFilter("google")}
                className={`flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1.5 sm:px-4 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer w-full text-center ${
                  filter === "google"
                    ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/30 ring-1 ring-emerald-300/60 scale-[1.02]"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="whitespace-nowrap">Google</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3D CURVED CAROUSEL CONTAINER */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseUp();
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[400px] sm:h-[460px] flex items-center justify-center overflow-hidden my-4 cursor-grab active:cursor-grabbing"
          style={{ perspective: "1200px" }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {filteredTools.map((tool, idx) => {
              const diff = getNormalizedOffset(idx);
              const absDiff = Math.abs(diff);

              // Don't render cards that are too far away for smooth performance
              if (absDiff > 4) return null;

              // Calculate 3D Curve Geometry matching Pinterest reference image
              const stepX = windowWidth < 640 ? 110 : windowWidth < 1024 ? 170 : 220;
              const translateX = diff * stepX;
              
              // Concave / Curved arch rotation (left cards rotate positive Y inward, right cards rotate negative Y inward)
              const rotateY = Math.max(-45, Math.min(45, diff * 18));
              const translateZ = 60 - absDiff * 80;
              const translateY = Math.pow(diff, 2) * 8; // subtle arch lift
              const scale = Math.max(0.7, 1.05 - absDiff * 0.09);
              const opacity = Math.max(0, 1 - absDiff * 0.22);
              const zIndex = 50 - Math.round(absDiff * 10);

              const isActive = Math.round(absDiff) === 0;

              return (
                <div
                  key={tool.id}
                  onClick={() => {
                    if (!isActive) {
                      setActiveIndex(idx);
                    }
                  }}
                  className={`absolute w-[240px] sm:w-[280px] md:w-[320px] rounded-3xl p-5 sm:p-6 transition-transform duration-500 ease-out backdrop-blur-xl border flex flex-col justify-between shadow-2xl cursor-pointer ${
                    isActive
                      ? tool.isHighlight
                        ? "bg-white/95 dark:bg-zinc-900/95 border-emerald-500/80 dark:border-emerald-400/80 shadow-emerald-500/20 ring-2 ring-emerald-500/40"
                        : "bg-white/95 dark:bg-zinc-900/95 border-zinc-300 dark:border-zinc-700 shadow-zinc-950/20 ring-1 ring-zinc-400 dark:ring-zinc-600"
                      : "bg-white/80 dark:bg-zinc-900/80 border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/50"
                  }`}
                  style={{
                    transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* Top Badge & Highlight tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${
                        tool.isHighlight
                          ? "bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 text-zinc-950 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400/50"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {tool.isHighlight && <Sparkles className="w-3.5 h-3.5 fill-zinc-950 text-zinc-950 shrink-0" />}
                      {isIndonesian ? tool.badge.id : tool.badge.en}
                    </span>

                    {tool.isHighlight && (
                      <span className="flex h-3 w-3 relative shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex flex-col items-center text-center my-3">
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-3 flex items-center justify-center mb-3 shrink-0 transition-all duration-300 ${
                        isActive ? "scale-110 shadow-lg shadow-black/10 dark:shadow-black/50" : "scale-100 opacity-90"
                      } bg-zinc-100/90 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80`}
                    >
                      <ToolIcon id={tool.id} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                      {tool.name}
                    </h3>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                      {isIndonesian ? tool.categoryLabel.id : tool.categoryLabel.en}
                    </span>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 text-center line-clamp-3 leading-relaxed mt-2">
                    {isIndonesian ? tool.description.id : tool.description.en}
                  </p>

                  {/* Active Indicator bar */}
                  <div className="mt-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>{isActive ? (isIndonesian ? "Sedang Aktif" : "Active Selection") : (isIndonesian ? "Klik untuk Detail" : "Click for Details")}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Chevrons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white shadow-xl hover:scale-110 hover:bg-emerald-500 hover:text-zinc-950 transition-all cursor-pointer"
            aria-label="Previous Tool"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white shadow-xl hover:scale-110 hover:bg-emerald-500 hover:text-zinc-950 transition-all cursor-pointer"
            aria-label="Next Tool"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4 mb-8">
          {filteredTools.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? "w-8 bg-emerald-500 shadow-md shadow-emerald-500/30"
                  : "w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* ACTIVE CARD DETAILS EXPANSION DRAWER */}
        {activeTool && (
          <div className="w-full max-w-4xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-2.5 flex items-center justify-center shrink-0">
                  <ToolIcon id={activeTool.id} className="w-11 h-11" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                      {activeTool.name}
                    </h3>
                    {activeTool.isHighlight && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500 text-zinc-950 shadow-sm">
                        {isIndonesian ? activeTool.badge.id : activeTool.badge.en}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {isIndonesian ? activeTool.categoryLabel.id : activeTool.categoryLabel.en}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  {isIndonesian ? "Status Integrasi: Aktif Dalam Workflow" : "Integration Status: Active in Workflow"}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
            </div>

            {/* Description & Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-zinc-400 mb-2">
                  {isIndonesian ? "Deskripsi Peran Alat:" : "Tool Role Description:"}
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                  {isIndonesian ? activeTool.description.id : activeTool.description.en}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-zinc-400 mb-2">
                  {isIndonesian ? "Kapabilitas Utama dalam Pengkodean:" : "Key Coding Capabilities:"}
                </h4>
                <ul className="grid grid-cols-1 gap-2">
                  {(isIndonesian ? activeTool.capabilities.id : activeTool.capabilities.en).map((cap, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
