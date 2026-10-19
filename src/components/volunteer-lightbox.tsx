"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ExternalLink, Award, Image as ImageIcon, Video } from "lucide-react";

export interface LightboxMedia {
  id: string;
  type: "image" | "video";
  title: string;
  category: string;
  domain: string;
  description: string;
  mediaSrc: string;
  detailUrl?: string;
  certificateSrc?: string;
  videoOptions?: {
    id: string;
    label: string;
    videoSrc: string;
    detailUrl?: string;
    description?: string;
  }[];
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
  const [videoError, setVideoError] = useState(false);
  const [activeTab, setActiveTab] = useState<"media" | "certificate">("media");
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  useEffect(() => {
    setVideoError(false);
    setActiveTab("media");
    setSelectedVideoIndex(0);

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

  // Determine current display content
  const hasCertificate = Boolean(media.certificateSrc);
  const isViewingCert = activeTab === "certificate" && hasCertificate;
  const hasVideoPlaylist = Boolean(media.videoOptions && media.videoOptions.length > 0);

  const currentVideo = hasVideoPlaylist && media.videoOptions
    ? media.videoOptions[selectedVideoIndex]
    : null;

  const currentType = isViewingCert ? "image" : media.type;
  const currentSrc = isViewingCert
    ? media.certificateSrc!
    : currentVideo
    ? currentVideo.videoSrc
    : media.mediaSrc;

  const currentDetailUrl = isViewingCert
    ? media.certificateSrc!
    : currentVideo?.detailUrl || media.detailUrl || currentSrc;

  const currentDesc = isViewingCert
    ? "Sertifikat penghargaan resmi yang terverifikasi."
    : currentVideo?.description || media.description;

  const driveFileId = currentType === "video" ? extractDriveFileId(currentSrc) : null;
  const streamUrl = driveFileId ? `/api/video/${driveFileId}` : currentSrc;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 dark:bg-black/90 backdrop-blur-xl transition-all duration-300">
      {/* Background Overlay Click to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-5xl bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="bg-zinc-100 dark:bg-[#18181b] border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] sm:text-xs font-mono font-extrabold text-emerald-600 dark:text-[#00FF87] uppercase bg-emerald-500/10 dark:bg-[#00FF87]/10 border border-emerald-500/25 dark:border-[#00FF87]/25 px-2.5 py-0.5 rounded">
              {media.category}
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate max-w-[200px] sm:max-w-md">
              {isViewingCert ? "Sertifikat Resmi" : currentVideo ? currentVideo.label : media.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle tabs for Media vs Certificate */}
            {hasCertificate && (
              <div className="flex items-center bg-zinc-200 dark:bg-zinc-800/80 p-0.5 rounded-lg border border-zinc-300 dark:border-zinc-700">
                <button
                  type="button"
                  onClick={() => setActiveTab("media")}
                  className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded-md flex items-center gap-1.5 transition cursor-pointer ${
                    activeTab === "media"
                      ? "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Dokumentasi</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("certificate")}
                  className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded-md flex items-center gap-1.5 transition cursor-pointer ${
                    activeTab === "certificate"
                      ? "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Sertifikat</span>
                </button>
              </div>
            )}

            {currentDetailUrl && (
              <a
                href={currentDetailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                title="Buka File Penuh di Tab Baru"
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

        {/* Video Playlist Bar (if multiple videos exist) */}
        {!isViewingCert && hasVideoPlaylist && media.videoOptions && (
          <div className="bg-zinc-900/95 border-b border-zinc-800 px-3 py-2 flex items-center gap-2 overflow-x-auto scrollbar-thin">
            <span className="text-[10px] font-mono font-bold text-zinc-400 shrink-0 flex items-center gap-1 uppercase tracking-wider">
              <Video className="w-3 h-3 text-emerald-400" />
              <span>Playlist:</span>
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {media.videoOptions.map((opt, idx) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSelectedVideoIndex(idx);
                    setVideoError(false);
                  }}
                  className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-md transition cursor-pointer ${
                    selectedVideoIndex === idx
                      ? "bg-emerald-500 text-black shadow font-black"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Media Container */}
        <div className="relative w-full flex-1 min-h-[280px] sm:min-h-[460px] max-h-[66vh] bg-black flex items-center justify-center overflow-hidden">
          {currentType === "image" ? (
            <div className="relative w-full h-full min-h-[280px] sm:min-h-[460px] flex items-center justify-center p-2">
              <Image
                src={currentSrc}
                alt={media.title}
                fill
                sizes="100vw"
                className="object-contain w-full h-full"
                priority
              />
            </div>
          ) : videoError ? (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
              <p className="text-sm font-mono text-zinc-300">
                Video tidak dapat diputar langsung di browser.
              </p>
              <a
                href={currentSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 bg-emerald-500 dark:bg-[#00FF87] px-4 py-2 rounded-xl hover:bg-emerald-400 dark:hover:bg-[#00e67a] transition-colors"
              >
                <span>Buka Sumber di Google Drive</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <video
              key={streamUrl}
              src={streamUrl}
              controls
              autoPlay
              playsInline
              onError={() => setVideoError(true)}
              className="w-full h-full object-contain bg-black"
            >
              Browser Anda tidak mendukung pemutaran video HTML5.
            </video>
          )}
        </div>

        {/* Bottom Details Footer */}
        <div className="p-4 bg-zinc-100 dark:bg-[#18181b] border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl">
            {currentDesc}
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
