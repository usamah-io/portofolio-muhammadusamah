"use client";

import { useEffect, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";

interface PageTransitionContextType {
  navigateTo: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  navigateTo: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Entrance Animation: scaleY: 1 -> 0, transform-origin top, stagger -0.1
    gsap.fromTo(
      ".transition-overlay",
      { scaleY: 1 },
      {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.75,
        stagger: -0.08,
        ease: "power3.inOut",
      }
    );
  }, [pathname]);

  const navigateTo = (href: string) => {
    if (href === pathname) return;
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // Exit Animation: scaleY: 0 -> 1, transform-origin bottom, stagger 0.1
    gsap.to(".transition-overlay", {
      scaleY: 1,
      transformOrigin: "bottom",
      duration: 0.75,
      stagger: 0.08,
      ease: "power3.inOut",
      onComplete: () => {
        router.push(href);
      },
    });
  };

  return (
    <PageTransitionContext.Provider value={{ navigateTo }}>
      <div className="transition-overlay-container">
        <div className="transition-overlay overlay-1"></div>
        <div className="transition-overlay overlay-2"></div>
        <div className="transition-overlay overlay-3"></div>
        <div className="transition-overlay overlay-4"></div>
        <div className="transition-overlay overlay-5"></div>
      </div>
      {children}
    </PageTransitionContext.Provider>
  );
}
