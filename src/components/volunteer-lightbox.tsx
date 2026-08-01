"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";

export interface LightboxMedia {
  id: string;
  type: "image" | "video";
  title: string;
  category: string;
  domain: string;
  description: string;
  mediaSrc: string;
  detailUrl?: string;
}

interface VolunteerLightboxProps {
  media: LightboxMedia | null;
  onClose: () => void;
}

// Extract Google Drive File ID if present
function extractDriveFileId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:drive\.google\.com\/(?:file\/d\/|uc\?.*id=|open\?.*id=)|docs\.google\.com\/file\/d\/)([a-zA-Z0-9_-]+)/
  );
  if (match && match[1]) {
    return match[1];
  }
  if (/^[a-zA-Z0-9_-]{25,50}$/.test(url.trim())) {
    return url.trim();
  }
  return null;
}

export default function VolunteerLightbox({ media, onClose }: VolunteerLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (media) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [media, onClose]);

  if (!media) return null;

  const driveFileId = media.type === "video" ? extractDriveFileId(media.mediaSrc) : null;
  const drivePreviewUrl = driveFileId
    ? `https://drive.google.com/file/d/${driveFileId}/preview`
    : media.mediaSrc;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 dark:bg-black/90 backdrop-blur-xl transition-all duration-300">
      {/* Background Overlay Click to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-5xl bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="bg-zinc-100 dark:bg-[#18181b] border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between gap-4 select-none">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] sm:text-xs font-mono font-extrabold text-emerald-600 dark:text-[#00FF87] uppercase bg-emerald-500/10 dark:bg-[#00FF87]/10 border border-emerald-500/25 dark:border-[#00FF87]/25 px-2.5 py-0.5 rounded">
              {media.category}
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate max-w-[200px] sm:max-w-md">
              {media.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {media.detailUrl && (
              <a
                href={media.detailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                title="Buka di Drive"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5 text-emerald-600 dark:text-[#00FF87]" />
            </button>
          </div>
        </div>

        {/* Media Container */}
        <div className="relative w-full flex-1 min-h-[260px] sm:min-h-[450px] max-h-[68vh] bg-black flex items-center justify-center overflow-hidden">
          {media.type === "image" ? (
            <Image
              src={media.mediaSrc}
              alt={media.title}
              fill
              sizes="100vw"
              className="object-contain w-full h-full"
            />
          ) : driveFileId ? (
            <iframe
              src={drivePreviewUrl}
              className="w-full h-full border-0 bg-black"
              allow="autoplay; fullscreen"
              allowFullScreen
              title={media.title}
            />
          ) : (
            <video
              src={media.mediaSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            >
              Browser Anda tidak mendukung pemutaran video HTML5.
            </video>
          )}
        </div>

        {/* Bottom Details Footer */}
        <div className="p-4 bg-zinc-100 dark:bg-[#18181b] border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl">
            {media.description}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 px-2 py-1 rounded">
              https://{media.domain}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
