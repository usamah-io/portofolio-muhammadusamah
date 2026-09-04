"use client";

import { useEffect, useRef, type RefObject } from "react";

type TrailItem = {
  el: HTMLImageElement;
  removeAt: number;
  rotation: number;
};

const MAX_TRAIL = 8;
const LIFESPAN = 720;
const THRESHOLD = 72;
const OUT_MS = 380;

function pointInRect(x: number, y: number, el: HTMLElement | null) {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
}

export default function CursorImageTrail({
  images,
  className = "",
  excludeRef,
}: {
  images: string[];
  className?: string;
  excludeRef?: RefObject<HTMLElement | null>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || images.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const trail: TrailItem[] = [];
    let lastSpawnX = 0;
    let lastSpawnY = 0;
    let raf = 0;
    let leaving = false;

    const dist = (ax: number, ay: number, bx: number, by: number) =>
      Math.hypot(ax - bx, ay - by);

    const spawn = (x: number, y: number) => {
      if (leaving) return;
      const rect = root.getBoundingClientRect();
      const img = document.createElement("img");
      const rotation = (Math.random() - 0.5) * 36;
      img.src = images[Math.floor(Math.random() * images.length)];
      img.alt = "";
      img.className = "trail-img";
      img.style.width = "64px";
      img.style.height = "80px";
      img.style.maxWidth = "64px";
      img.style.objectFit = "cover";
      img.style.left = `${x - rect.left}px`;
      img.style.top = `${y - rect.top}px`;
      img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
      root.appendChild(img);
      requestAnimationFrame(() => {
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
      });
      trail.push({ el: img, removeAt: Date.now() + LIFESPAN, rotation });
      lastSpawnX = x;
      lastSpawnY = y;

      while (trail.length > MAX_TRAIL) {
        const oldest = trail.shift();
        if (oldest) retire(oldest);
      }
    };

    const retire = (item: TrailItem) => {
      const { el, rotation } = item;
      el.style.transition = `transform ${OUT_MS}ms cubic-bezier(.87, 0, .13, 1), opacity ${OUT_MS}ms ease`;
      el.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
      el.style.opacity = "0";
      window.setTimeout(() => el.remove(), OUT_MS);
    };

    const tick = () => {
      const now = Date.now();
      while (trail.length && trail[0].removeAt <= now) {
        const item = trail.shift();
        if (item) retire(item);
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = root.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside || leaving) return;
      if (pointInRect(e.clientX, e.clientY, excludeRef?.current ?? null)) return;
      if (dist(e.clientX, e.clientY, lastSpawnX, lastSpawnY) > THRESHOLD) {
        spawn(e.clientX, e.clientY);
      }
    };

    const onLeave = () => {
      leaving = true;
      const leftover = trail.splice(0, trail.length);
      leftover.forEach((item, i) => {
        window.setTimeout(() => retire(item), i * 40);
      });
      window.setTimeout(() => {
        leaving = false;
      }, leftover.length * 40 + OUT_MS + 40);
    };

    root.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      trail.forEach((item) => item.el.remove());
      trail.length = 0;
    };
  }, [images, excludeRef]);

  return <div ref={rootRef} className={`cursor-trail ${className}`} aria-hidden="true" />;
}
