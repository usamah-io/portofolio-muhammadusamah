"use client";

import { ReactNode } from "react";

export interface GoogleDriveVideoPlayerProps {
  videoId?: string;
  title?: string;
  poster?: string;
  className?: string;
  customOverlay?: ReactNode;
}

export default function GoogleDriveVideoPlayer({
  videoId,
  title = "Clean Native Video Player",
  poster,
  className = "",
  customOverlay,
}: GoogleDriveVideoPlayerProps) {
  // Fallback UI if videoId is missing
  if (!videoId) {
    return (
      <div
        className={`relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-950 dark:bg-black border border-gray-200 dark:border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-3 shadow-md ${className}`}
      >
        {customOverlay ? (
          customOverlay
        ) : (
          <>
            <div className="p-3 rounded-full bg-emerald-500/10 dark:bg-[#00FF87]/10 border border-emerald-500/30 dark:border-[#00FF87]/30 text-emerald-600 dark:text-[#00FF87]">
              <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Video ID Tidak Tersedia
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 max-w-xs">
                Sediakan properti <code className="font-mono text-emerald-600 dark:text-[#00FF87]">videoId</code> untuk memutar video.
              </p>
            </div>
          </>
        )}
      </div>
    );
  }

  // Backend Stream Proxy Endpoint with HTTP Range / 206 Support
  const proxyStreamUrl = `/api/video/${videoId}`;

  return (
    <div
      className={`relative w-full h-full min-h-[200px] overflow-hidden bg-black flex items-center justify-center group ${className}`}
    >
      <video
        controls
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={title}
        className="w-full h-full object-cover bg-black"
      >
        <source src={proxyStreamUrl} type="video/mp4" />
        Browser Anda tidak mendukung pemutaran video HTML5.
      </video>
    </div>
  );
}
