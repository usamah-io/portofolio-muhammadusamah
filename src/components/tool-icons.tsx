import React from "react";

export function ToolIcon({ id, className = "w-10 h-10" }: { id: string; className?: string }) {
  switch (id) {
    case "gemini":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Official Google Gemini 4-Pointed Spectrum Diamond Star (Matching Reference Image 1) */}
          <path
            d="M12 0.5C12 6.85 6.85 12 0.5 12C6.85 12 12 17.15 12 23.5C12 17.15 17.15 12 23.5 12C17.15 12 12 6.85 12 0.5Z"
            fill="url(#gemini-official-spectrum)"
          />
          <defs>
            <linearGradient id="gemini-official-spectrum" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EA4335" />
              <stop offset="28%" stopColor="#FBBC04" />
              <stop offset="55%" stopColor="#34A853" />
              <stop offset="82%" stopColor="#4285F4" />
              <stop offset="100%" stopColor="#1A73E8" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "antigravity":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Official Google AntiGravity Spectrum Arch / Dome (Matching Reference Image 2) */}
          <path
            d="M 2 22.5 C 2 11.5 6.5 1.5 12 1.5 C 17.5 1.5 22 11.5 22 22.5 C 22 23.2 20.2 23.5 19.2 22.8 C 17 21 15 12.8 12 12.8 C 9 12.8 7 21 4.8 22.8 C 3.8 23.5 2 23.2 2 22.5 Z"
            fill="url(#antigravity-official-spectrum)"
          />
          <defs>
            <linearGradient id="antigravity-official-spectrum" x1="12" y1="1.5" x2="12" y2="23.5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E05238" />
              <stop offset="20%" stopColor="#E2B43B" />
              <stop offset="42%" stopColor="#4DB66C" />
              <stop offset="70%" stopColor="#4285F4" />
              <stop offset="90%" stopColor="#64B5F6" />
              <stop offset="100%" stopColor="#BAE0FF" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "chatgpt":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Official OpenAI ChatGPT Teal Mint Flower Vector (Matching Reference Image 3 & 4) */}
          <path
            d="M19.07 10.93a3.78 3.78 0 0 0-.34-2.58 3.84 3.84 0 0 0-2.09-1.81 3.78 3.78 0 0 0-1.84-.18 3.84 3.84 0 0 0-2.47-1.2 3.78 3.78 0 0 0-3.66.92 3.84 3.84 0 0 0-2.31 1.4 3.78 3.78 0 0 0-.58 2.54 3.84 3.84 0 0 0-1.5 2.34 3.78 3.78 0 0 0 .9 3.65 3.84 3.84 0 0 0 1.48 2.27 3.78 3.78 0 0 0 2.55.57 3.84 3.84 0 0 0 2.33 1.25 3.78 3.78 0 0 0 3.64-.93 3.84 3.84 0 0 0 2.33-1.4 3.78 3.78 0 0 0 .58-2.54 3.84 3.84 0 0 0 1.5-2.34 3.78 3.78 0 0 0-.91-3.65zm-7.07 6.47a2.53 2.53 0 0 1-1.32-.37l.15-.09 2.2-1.27a.64.64 0 0 0 .32-.55v-3.1l.93.54v2.56a2.53 2.53 0 0 1-2.28 2.28zm-4.32-2.1a2.53 2.53 0 0 1-.37-1.32v-1.74l.93.54v2.55a.64.64 0 0 0 .32.55l2.2 1.27-.15.09a2.53 2.53 0 0 1-2.93-.94zm-1.04-4.88a2.53 2.53 0 0 1 .95-1.04l.15.09 2.2 1.27a.64.64 0 0 0 .64 0l2.69-1.55v1.08l-.93.54-2.2-1.27a.64.64 0 0 0-.64 0l-2.2 1.27a2.53 2.53 0 0 1-.66-.39zm6.36-2.24a2.53 2.53 0 0 1 1.32.37l-.15.09-2.2 1.27a.64.64 0 0 0-.32.55v3.1l-.93-.54V10.5a2.53 2.53 0 0 1 2.28-2.28zm4.32 2.1a2.53 2.53 0 0 1 .37 1.32v1.74l-.93-.54v-2.55a.64.64 0 0 0-.32-.55l-2.2-1.27.15-.09a2.53 2.53 0 0 1 2.93.94zm-2.02 5.09l-.15-.09-2.2-1.27a.64.64 0 0 0-.64 0L9.61 14v-1.08l.93-.54 2.2 1.27a.64.64 0 0 0 .64 0l2.2-1.27c.21.14.41.31.57.51a2.53 2.53 0 0 1-.84 2.48z"
            fill="#10A37F"
          />
        </svg>
      );

    case "notebooklm":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Official NotebookLM 3 Concentric Arch Waves Vector (Matching Reference Image 5) */}
          <path d="M 2.5 19.5 A 9.5 9.5 0 0 1 21.5 19.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="text-zinc-900 dark:text-white" />
          <path d="M 6 19.5 A 6 6 0 0 1 18 19.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="text-zinc-900 dark:text-white" />
          <path d="M 9.5 19.5 A 2.5 2.5 0 0 1 14.5 19.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="text-zinc-900 dark:text-white" />
        </svg>
      );

    case "google-drive":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M8.2 3.5L1.5 15H8L14.7 3.5H8.2Z" fill="#0066DA" />
          <path d="M14.7 3.5H8.2L15.8 16.5H22.5L14.7 3.5Z" fill="#00AC47" />
          <path d="M1.5 15L4.8 20.5H19.2L15.8 16.5H8L1.5 15Z" fill="#EA4335" />
          <path d="M8 15L4.8 20.5H19.2L22.5 15H15.8H8Z" fill="#FFBA00" />
        </svg>
      );

    case "google-docs":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="#2684FC" />
          <path d="M14 2L20 8H14V2Z" fill="#0056C6" opacity="0.5" />
          <path d="M8 12H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 15H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 18H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "google-sheets":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="#00AC47" />
          <path d="M14 2L20 8H14V2Z" fill="#006621" opacity="0.5" />
          <rect x="7.5" y="11.5" width="9" height="7" rx="0.5" stroke="white" strokeWidth="1.2" fill="none" />
          <path d="M7.5 15H16.5" stroke="white" strokeWidth="1.2" />
          <path d="M12 11.5V18.5" stroke="white" strokeWidth="1.2" />
        </svg>
      );

    case "google-slides":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="#FFBA00" />
          <path d="M14 2L20 8H14V2Z" fill="#C68A00" opacity="0.5" />
          <rect x="7" y="11" width="10" height="7" rx="1" fill="white" />
          <rect x="8.5" y="12.5" width="7" height="4" rx="0.5" fill="#FFBA00" />
        </svg>
      );

    case "google-meet":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#00832D" />
          <path d="M6 8C6 6.89543 6.89543 6 8 6H13C14.1046 6 15 6.89543 15 8V16C15 17.1046 14.1046 18 13 18H8C6.89543 18 6 17.1046 6 16V8Z" fill="white" />
          <path d="M15 10.5L18.5 8V16L15 13.5V10.5Z" fill="white" />
          <path d="M6 14H15V16C15 17.1046 14.1046 18 13 18H8C6.89543 18 6 17.1046 6 16V14Z" fill="#00AC47" />
          <path d="M15 10.5L18.5 8V11.5L15 10.5Z" fill="#FFBA00" />
          <path d="M15 13.5L18.5 16V12.5L15 13.5Z" fill="#0066DA" />
        </svg>
      );

    case "google-chat":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#00AC47" />
          <path d="M5 8C5 6.34315 6.34315 5 8 5H13C14.6569 5 16 6.34315 16 8V12C16 13.6569 14.6569 15 13 15H10L6 18V15H8C6.34315 15 5 13.6569 5 12V8Z" fill="white" />
          <path d="M11 10C11 8.89543 11.8954 8 13 8H16C17.6569 8 19 9.34315 19 11V15C19 16.6569 17.6569 18 16 18H15V20L12 18H13C11.8954 18 11 17.1046 11 16V10Z" fill="#006621" opacity="0.8" />
        </svg>
      );

    case "gmail":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6V18C3 19.1 3.9 20 5 20H7V10.2L12 14L17 10.2V20H19C20.1 20 21 19.1 21 18V6C21 4.9 20.1 4 19 4H18L12 8.5L6 4H5C3.9 4 3 4.9 3 6Z" fill="#EA4335" />
          <path d="M17 10.2L21 7.2V18C21 19.1 20.1 20 19 20H17V10.2Z" fill="#4285F4" />
          <path d="M3 7.2L7 10.2V20H5C3.9 20 3 19.1 3 18V7.2Z" fill="#34A853" />
          <path d="M18 4H19C20.1 4 21 4.9 21 6V7.2L17 10.2L12 14L7 10.2L3 7.2V6C3 4.9 3.9 4 5 4H6L12 8.5L18 4Z" fill="#FBBC04" opacity="0.3" />
        </svg>
      );

    case "google-calendar":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="17" rx="3" fill="white" stroke="#4285F4" strokeWidth="2" />
          <path d="M3 7C3 5.34315 4.34315 4 6 4H18C19.6569 4 21 5.34315 21 7V9H3V7Z" fill="#4285F4" />
          <text x="12" y="18" textAnchor="middle" fill="#1E293B" fontSize="9" fontWeight="bold" fontFamily="sans-serif">31</text>
        </svg>
      );

    case "google-tasks":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" fill="#1A73E8" />
          <path d="M8.5 12.5L10.8 14.8L15.8 9.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="7" r="2" fill="#FBBC04" />
        </svg>
      );

    case "google-keep":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#FBBC04" />
          <path
            d="M12 6C9.23858 6 7 8.23858 7 11C7 12.9234 8.08719 14.5925 9.68427 15.4357C9.88047 15.5393 10 15.7439 10 15.9654V17C10 17.5523 10.4477 18 11 18H13C13.5523 18 14 17.5523 14 17V15.9654C14 15.7439 14.1195 15.5393 14.3157 15.4357C15.9128 14.5925 17 12.9234 17 11C17 8.23858 14.7614 6 12 6Z"
            fill="white"
          />
          <path d="M10 19.5H14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "google-voice":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#34A853" />
          <path
            d="M7 6C5.89543 6 5 6.89543 5 8V14C5 15.1046 5.89543 16 7 16H16L19 19V8C19 6.89543 18.1046 6 17 6H7Z"
            fill="white"
          />
          <path
            d="M8.5 9.5C8.5 9 9 8.5 9.5 8.5H10.5C11 8.5 11.5 9 11.5 9.5V10.5L10.25 11.75C11.5 13 12.5 13.75 13.5 14L14.5 12.75H15.5C16 12.75 16.5 13.25 16.5 13.75V14.75C16.5 15.25 16 15.75 15.5 15.75C11.5 15.75 8.5 12.75 8.5 9.5Z"
            fill="#34A853"
          />
        </svg>
      );

    case "google-forms":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#7248B9" />
          <path d="M8 5H16C17.1046 5 18 5.89543 18 7V17C18 18.1046 17.1046 19 16 19H8C6.89543 19 6 18.1046 6 17V7C6 5.89543 6.89543 5 8 5Z" fill="white" />
          <circle cx="9" cy="9" r="1" fill="#7248B9" />
          <line x1="11.5" y1="9" x2="15.5" y2="9" stroke="#7248B9" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="9" cy="13" r="1" fill="#7248B9" />
          <line x1="11.5" y1="13" x2="15.5" y2="13" stroke="#7248B9" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="9" cy="17" r="1" fill="#7248B9" />
          <line x1="11.5" y1="17" x2="15.5" y2="17" stroke="#7248B9" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "google-sites":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#4285F4" />
          <rect x="4" y="5" width="16" height="14" rx="2" fill="white" />
          <path d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V8.5H4V7Z" fill="#E8F0FE" />
          <circle cx="6" cy="6.75" r="0.75" fill="#4285F4" />
          <circle cx="8" cy="6.75" r="0.75" fill="#34A853" />
          <circle cx="10" cy="6.75" r="0.75" fill="#FBBC04" />
          <rect x="6" y="11" width="12" height="2" rx="0.5" fill="#4285F4" opacity="0.6" />
          <rect x="6" y="14" width="7" height="2" rx="0.5" fill="#9AA0A6" opacity="0.5" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#3B82F6" />
          <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">T</text>
        </svg>
      );
  }
}
