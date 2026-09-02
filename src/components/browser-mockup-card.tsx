"use client";

import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

export interface CardAction {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export interface FloatingBadge {
  text: string;
  variant?: "neon" | "emerald" | "amber" | "dark" | "outline";
  icon?: ReactNode;
}

export interface BrowserMockupCardProps {
  layout?: "horizontal" | "vertical";
  domain: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  poster?: string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain";
  floatingBadge?: FloatingBadge;
  secondaryBadge?: FloatingBadge;
  categoryLabel: string;
  title: string;
  description: string;
  tags: string[];
  primaryAction: CardAction;
  secondaryAction?: CardAction;
  extraAction?: CardAction;
  isHighlighted?: boolean;
  onMediaClick?: () => void;
  className?: string;
}

// GitHub Icon Component
function GithubIcon({ className = "w-3.5 h-3.5 shrink-0" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

// Extract Google Drive File ID if present
function extractDriveFileId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:drive\.google\.com\/(?:file\/d\/|thumbnail\?.*id=|uc\?.*id=|open\?.*id=)|docs\.google\.com\/file\/d\/|lh3\.googleusercontent\.com\/d\/)([a-zA-Z0-9_-]+)/
  );
  if (match && match[1]) {
    return match[1];
  }
  if (/^[a-zA-Z0-9_-]{25,50}$/.test(url.trim())) {
    return url.trim();
  }
  return null;
}

function getResolvedMediaSrc(url: string, type: "image" | "video"): string {
  if (!url) return "";
  if (type === "image") {
    const driveId = extractDriveFileId(url);
    if (driveId && url.includes("drive.google.com")) {
      return `https://lh3.googleusercontent.com/d/${driveId}`;
    }
  }
  return url;
}

export default function BrowserMockupCard({
  layout = "vertical",
  domain,
  mediaType,
  mediaSrc,
  poster,
  aspectRatio,
  objectFit = "cover",
  floatingBadge,
  secondaryBadge,
  categoryLabel,
  title,
  description,
  tags,
  primaryAction,
  secondaryAction,
  extraAction,
  isHighlighted = false,
  onMediaClick,
  className = "",
}: BrowserMockupCardProps) {
  const resolvedMediaSrc = getResolvedMediaSrc(mediaSrc, mediaType);
  const driveFileId = mediaType === "video" ? extractDriveFileId(mediaSrc) : null;
  const streamUrl = driveFileId
    ? `/api/video/${driveFileId}`
    : resolvedMediaSrc;

  // ==========================================
  // MODE 1: LAYOUT HORIZONTAL (Khusus Volunteer Video)
  // ==========================================
  if (layout === "horizontal") {
    return (
      <div
        className={`group relative flex flex-col md:flex-row bg-white dark:bg-zinc-950/80 border ${
          isHighlighted
            ? "border-emerald-500/60 dark:border-[#00FF87]/60 shadow-lg shadow-emerald-500/10 dark:shadow-[0_0_30px_rgba(0,255,135,0.12)]"
            : "border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700"
        } rounded-2xl overflow-hidden p-4 md:p-6 gap-6 items-center md:items-stretch w-full transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-[#00FF87]/10 active:scale-[0.99] transform ${className}`}
      >
        {/* SISI KIRI (VIDEO PLAYER POTRET 9:16) */}
        <div className="w-full md:w-[260px] lg:w-[280px] shrink-0 aspect-[9/16] rounded-xl overflow-hidden bg-black relative flex items-center justify-center group/media border border-gray-200 dark:border-zinc-800/80 shadow-md">
          {mediaType === "image" ? (
            <img
              src={resolvedMediaSrc}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover block group-hover/media:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <video
              src={streamUrl}
              poster={poster}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover bg-black"
            >
              Browser Anda tidak mendukung pemutaran video HTML5.
            </video>
          )}

          {/* Status Badge Overlay in top-left of video */}
          {floatingBadge && (
            <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md text-emerald-400 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 pointer-events-none">
              {floatingBadge.icon ? (
                floatingBadge.icon
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
              <span>{floatingBadge.text}</span>
            </div>
          )}
        </div>

        {/* SISI KANAN (KETERANGAN & TOMBOL AKSI) */}
        <div className="flex-1 flex flex-col justify-between w-full py-1 space-y-4">
          <div className="space-y-3 flex flex-col items-start">
            {/* 1. Category Badge Only (Above Title) */}
            <span className="text-[10px] sm:text-xs font-mono font-extrabold tracking-wider text-emerald-600 dark:text-[#00FF87] uppercase bg-emerald-500/10 dark:bg-[#00FF87]/10 border border-emerald-500/25 dark:border-[#00FF87]/25 px-2.5 py-1 rounded inline-block w-fit">
              {categoryLabel}
            </span>

            {/* 2. Judul Utama Video */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#00FF87] transition-colors leading-snug">
              {title}
            </h3>

            {/* 3. Deskripsi Video */}
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {description}
            </p>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-zinc-800 px-2.5 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-zinc-800/90 flex flex-wrap items-center justify-end gap-3 mt-4 md:mt-0">
            {extraAction && (
              <div className="w-full sm:w-auto">
                {extraAction.href ? (
                  <a
                    href={extraAction.href}
                    className="inline-flex items-center justify-center gap-2 text-xs md:text-sm font-black text-zinc-950 bg-emerald-500 hover:bg-emerald-400 dark:bg-[#00FF87] dark:hover:bg-[#00e67a] transition-all py-2.5 px-4 rounded-xl shadow-md border border-emerald-400/40 dark:border-[#00FF87]/50"
                  >
                    {extraAction.icon}
                    <span>{extraAction.label}</span>
                  </a>
                ) : (
                  <button
                    onClick={extraAction.onClick}
                    className="inline-flex items-center justify-center gap-2 text-xs md:text-sm font-black text-zinc-950 bg-emerald-500 hover:bg-emerald-400 dark:bg-[#00FF87] dark:hover:bg-[#00e67a] transition-all py-2.5 px-4 rounded-xl shadow-md border border-emerald-400/40 dark:border-[#00FF87]/50 cursor-pointer"
                  >
                    {extraAction.icon}
                    <span>{extraAction.label}</span>
                  </button>
                )}
              </div>
            )}

            {secondaryAction && (
              <a
                href={secondaryAction.href || "#"}
                target={secondaryAction.href?.startsWith("http") ? "_blank" : undefined}
                rel={secondaryAction.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={secondaryAction.onClick}
                className="inline-flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800 cursor-pointer min-h-[42px] text-center"
              >
                {secondaryAction.icon ? (
                  secondaryAction.icon
                ) : secondaryAction.href?.includes("github.com") ? (
                  <GithubIcon className="w-4 h-4 shrink-0" />
                ) : (
                  <ExternalLink className="w-4 h-4 shrink-0" />
                )}
                <span>{secondaryAction.label}</span>
              </a>
            )}

            <a
              href={primaryAction.href || "#"}
              target={primaryAction.href?.startsWith("http") ? "_blank" : undefined}
              rel={primaryAction.href?.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={primaryAction.onClick}
              className="inline-flex items-center justify-center gap-2 text-xs md:text-sm font-black text-zinc-950 bg-emerald-500 hover:bg-emerald-400 dark:bg-[#00FF87] dark:hover:bg-[#00e67a] active:scale-[0.98] transition-all py-2.5 px-5 rounded-xl shadow-md shadow-emerald-500/10 dark:shadow-[#00FF87]/20 cursor-pointer min-h-[42px] text-center"
            >
              <span>{primaryAction.label}</span>
              {primaryAction.icon ? (
                primaryAction.icon
              ) : (
                <svg
                  className="w-4 h-4 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              )}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MODE 2: LAYOUT VERTIKAL KLASIK (Khusus Proyek Unggulan / Showcase)
  // ==========================================
  return (
    <div
      className={`group relative bg-white dark:bg-[#111111] border ${
        isHighlighted
          ? "border-emerald-500/60 dark:border-[#00FF87]/60 shadow-lg shadow-emerald-500/10 dark:shadow-[0_0_30px_rgba(0,255,135,0.12)]"
          : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-zinc-700"
      } rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between col-span-1 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-[#00FF87]/10 active:scale-[0.98] transform hover:-translate-y-1 sm:hover:-translate-y-1.5 ${className}`}
    >
      {/* 1. Header Mockup Browser */}
      <div className="bg-gray-100 dark:bg-zinc-900/80 border-b border-gray-200 dark:border-zinc-800/90 px-2.5 py-1.5 sm:px-4 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-3 z-10 shrink-0 select-none">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] inline-block shadow-sm" title="Close" />
          <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] inline-block shadow-sm" title="Minimize" />
          <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] inline-block shadow-sm" title="Expand" />
        </div>

        <div className="flex-1 max-w-[110px] sm:max-w-[280px] mx-auto bg-white dark:bg-[#0a0a0c] px-2 py-0.5 sm:px-3 sm:py-1 rounded-md border border-gray-200 dark:border-zinc-800/80 text-center flex items-center justify-center gap-1 sm:gap-1.5">
          <svg
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 dark:text-gray-500 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-[9px] sm:text-[11px] font-mono text-gray-500 dark:text-gray-400 truncate">
            https://{domain}
          </span>
        </div>

        <div className="w-6 sm:w-10 flex justify-end">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-zinc-600" />
        </div>
      </div>

      {/* 2. Media Container Standard */}
      <div className={`relative w-full ${aspectRatio || "aspect-video"} overflow-hidden bg-zinc-950 dark:bg-black/95 group/media flex items-center justify-center`}>
        {mediaType === "image" ? (
          <img
            src={resolvedMediaSrc}
            alt={title}
            loading="lazy"
            onClick={onMediaClick}
            className={`w-full h-full ${objectFit === "contain" ? "object-contain bg-zinc-900/90 p-1.5" : "object-cover"} block group-hover/media:scale-105 transition-transform duration-500 ease-out ${onMediaClick ? "cursor-pointer" : ""}`}
          />
        ) : (
          <video
            src={streamUrl}
            poster={poster}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-cover bg-black"
          >
            Browser Anda tidak mendukung pemutaran video HTML5.
          </video>
        )}

        {floatingBadge && (
          <div className="absolute bottom-2 left-2 z-10 pointer-events-none">
            <span
              className={`text-[8px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full flex items-center gap-1 shadow-lg backdrop-blur-md border ${
                floatingBadge.variant === "neon"
                  ? "bg-emerald-500/15 dark:bg-[#00FF87]/15 text-emerald-600 dark:text-[#00FF87] border-emerald-500/40 dark:border-[#00FF87]/40"
                  : floatingBadge.variant === "amber"
                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40"
                  : "bg-zinc-950/85 text-zinc-200 border-zinc-700/80"
              }`}
            >
              {floatingBadge.icon ? (
                floatingBadge.icon
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#00FF87] animate-pulse" />
              )}
              <span className="truncate">{floatingBadge.text}</span>
            </span>
          </div>
        )}

        {secondaryBadge && (
          <div className="absolute top-2 right-2 z-10 pointer-events-none">
            <span className="text-[8px] sm:text-[10px] font-mono font-black text-zinc-950 bg-emerald-500 dark:bg-[#00FF87] border border-emerald-400 dark:border-[#00FF87] px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full shadow-md">
              {secondaryBadge.text}
            </span>
          </div>
        )}
      </div>

      {/* 3. Isi Kartu Vertikal */}
      <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4 bg-white dark:bg-[#111111]">
        <div>
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
            <span className="text-[9px] sm:text-[11px] font-mono font-extrabold tracking-wider text-emerald-600 dark:text-[#00FF87] uppercase bg-emerald-500/10 dark:bg-[#00FF87]/10 border border-emerald-500/25 dark:border-[#00FF87]/25 px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded">
              {categoryLabel}
            </span>
          </div>

          <h3 className="text-xs sm:text-base md:text-lg font-bold sm:font-extrabold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#00FF87] transition-colors leading-snug line-clamp-2">
            {title}
          </h3>

          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1 line-clamp-2">
            {description}
          </p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2 sm:mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] sm:text-[10px] font-mono font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-zinc-800 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 4. Tombol Aksi Vertikal */}
        <div className="pt-2 sm:pt-4 border-t border-gray-200 dark:border-zinc-800/90 flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 sm:mt-4">
          {extraAction && (
            <div className="w-full mb-1">
              {extraAction.href ? (
                <a
                  href={extraAction.href}
                  className="w-full text-center inline-flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-black text-zinc-950 bg-emerald-500 hover:bg-emerald-400 dark:bg-[#00FF87] dark:hover:bg-[#00e67a] transition-all py-1.5 px-2 sm:py-2.5 sm:px-3 rounded-lg sm:rounded-xl shadow-md shadow-emerald-500/10 dark:shadow-[#00FF87]/20 border border-emerald-400/40 dark:border-[#00FF87]/50 transform hover:scale-[1.01]"
                >
                  {extraAction.icon}
                  <span>{extraAction.label}</span>
                </a>
              ) : (
                <button
                  onClick={extraAction.onClick}
                  className="w-full text-center inline-flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-black text-zinc-950 bg-emerald-500 hover:bg-emerald-400 dark:bg-[#00FF87] dark:hover:bg-[#00e67a] transition-all py-1.5 px-2 sm:py-2.5 sm:px-3 rounded-lg sm:rounded-xl shadow-md shadow-emerald-500/10 dark:shadow-[#00FF87]/20 border border-emerald-400/40 dark:border-[#00FF87]/50 transform hover:scale-[1.01] cursor-pointer"
                >
                  {extraAction.icon}
                  <span>{extraAction.label}</span>
                </button>
              )}
            </div>
          )}

          {secondaryAction && (
            <a
              href={secondaryAction.href || "#"}
              target={secondaryAction.href?.startsWith("http") ? "_blank" : undefined}
              rel={secondaryAction.href?.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={secondaryAction.onClick}
              className="inline-flex flex-1 items-center justify-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-2.5 px-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800 cursor-pointer min-h-[38px] text-center"
            >
              {secondaryAction.icon ? (
                secondaryAction.icon
              ) : secondaryAction.href?.includes("github.com") ? (
                <GithubIcon className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              )}
              <span>{secondaryAction.label}</span>
            </a>
          )}

          <a
            href={primaryAction.href || "#"}
            target={primaryAction.href?.startsWith("http") ? "_blank" : undefined}
            rel={primaryAction.href?.startsWith("http") ? "noopener noreferrer" : undefined}
            onClick={primaryAction.onClick}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-black text-zinc-950 bg-emerald-500 hover:bg-emerald-400 dark:bg-[#00FF87] dark:hover:bg-[#00e67a] active:scale-[0.98] transition-all py-1.5 px-2 sm:py-2.5 sm:px-3.5 rounded-lg sm:rounded-xl shadow-md shadow-emerald-500/10 dark:shadow-[#00FF87]/20 cursor-pointer min-h-[30px] sm:min-h-[38px] text-center"
          >
            <span>{primaryAction.label}</span>
            {primaryAction.icon ? (
              primaryAction.icon
            ) : (
              <svg
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            )}
          </a>
        </div>
      </div>
    </div>
  );
}
