"use client";

import React, { useEffect, useState, useRef } from "react";
import { useApp } from "./app-context";

export default function CustomCursor() {
  const { theme } = useApp();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const arrowRef = useRef<HTMLDivElement>(null);
  const isDarkMode = theme === "dark";

  useEffect(() => {
    // Check if device supports fine pointer (mouse/desktop)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const checkIsDesktop = () => setIsDesktop(mediaQuery.matches);

    checkIsDesktop();
    mediaQuery.addEventListener("change", checkIsDesktop);

    return () => {
      mediaQuery.removeEventListener("change", checkIsDesktop);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    // Add CSS class to root element to hide default browser cursor on desktop
    document.documentElement.classList.add("custom-cursor-enabled");

    // 1:1 Instant mouse tracking with 0ms lag/lerp
    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      if (arrowRef.current) {
        // Hotspot tip (0, 0) aligns 100% precisely with mouse coordinates
        arrowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor-hover], .interactive, card, article, iframe'
        ) || window.getComputedStyle(target).cursor === "pointer"
      );

      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [isDesktop, isVisible]);

  if (!isDesktop) return null;

  return (
    <div
      ref={arrowRef}
      className={`fixed top-0 left-0 pointer-events-none select-none z-[9999] will-change-transform transition-opacity duration-150 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Slender, Sharp System Pointer Arrow (0, 0 Hotspot Tip Alignment) */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none transition-transform duration-100 ease-out origin-top-left ${
          isHovered
            ? "scale-125 " +
              (isDarkMode
                ? "drop-shadow-[0_0_12px_rgba(52,211,153,1)]"
                : "drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]")
            : isClicking
            ? "scale-90 " +
              (isDarkMode
                ? "drop-shadow-[0_0_6px_rgba(52,211,153,0.7)]"
                : "drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]")
            : "scale-100 " +
              (isDarkMode
                ? "drop-shadow-[0_0_8px_rgba(52,211,153,0.85)]"
                : "drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]")
        }`}
      >
        <path
          d="M0 0V17L4 12.8L7.2 19.2L9.6 18L6.4 11.6L12 11.6Z"
          fill={
            isDarkMode
              ? isHovered
                ? "#34d399"
                : "#ffffff"
              : isHovered
              ? "#064e3b"
              : "#09090b"
          }
          stroke={isDarkMode ? "#000000" : "#ffffff"}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
