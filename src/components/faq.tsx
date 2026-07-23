"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "./app-context";
import content from "@/data/content.json";

export default function FAQ() {
  const { language } = useApp();
  const t = content[language].faq;

  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  // Perform smooth GSAP heights animation on state change
  useEffect(() => {
    t.items.forEach((faq) => {
      const el = contentRefs.current[faq.id];
      if (el) {
        const isOpen = activeId === faq.id;
        gsap.to(el, {
          height: isOpen ? el.scrollHeight : 0,
          opacity: isOpen ? 1 : 0,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    });
  }, [activeId, t.items]);

  // Viewport entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 px-4 w-full max-w-3xl mx-auto relative transition-colors duration-300"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {t.title.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            {t.title.split(" ").slice(-1)[0]}
          </span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm sm:text-base">
          {t.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {t.items.map((faq) => {
          const isOpen = activeId === faq.id;

          return (
            <div
              key={faq.id}
              className="faq-item bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-850/60 rounded-2xl overflow-hidden transition-all duration-300 hover:border-emerald-500/20"
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-zinc-800 hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base">{faq.question}</span>
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 group-hover:text-white transition-transform duration-350 ${
                    isOpen ? "rotate-180 text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-950/40" : ""
                  }`}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>

              {/* Accordion Content Body */}
              <div
                ref={(el) => {
                  contentRefs.current[faq.id] = el;
                }}
                className="height-0 overflow-hidden px-6"
                style={{ height: 0, opacity: 0 }}
              >
                <p className="text-sm text-zinc-600 dark:text-zinc-400 pb-6 leading-relaxed transition-colors duration-300">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
