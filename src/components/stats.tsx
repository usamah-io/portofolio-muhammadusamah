"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "./app-context";
import content from "@/data/content.json";

interface GithubUserData {
  public_repos: number;
  followers: number;
  following: number;
  login: string;
  name: string;
}

interface WakaTimeStats {
  weekly_hours: number;
  languages: { name: string; percentage: number; color: string }[];
}

export default function Stats() {
  const { language } = useApp();
  const t = content[language].stats;

  const [selectedAccount, setSelectedAccount] = useState("usamah-io");
  const [githubData, setGithubData] = useState<GithubUserData | null>(null);
  const [loadingGithub, setLoadingGithub] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Wakatime mockup/fetch-ready statistics
  const wakaStats: WakaTimeStats = {
    weekly_hours: 42.5,
    languages: [
      { name: "TypeScript", percentage: 48, color: "bg-blue-500" },
      { name: "JavaScript", percentage: 22, color: "bg-yellow-500" },
      { name: "React / Next.js", percentage: 20, color: "bg-emerald-500" },
      { name: "CSS / Tailwind", percentage: 10, color: "bg-pink-500" },
    ],
  };

  // Fetch GitHub Info
  useEffect(() => {
    setLoadingGithub(true);
    const fetchGithub = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${selectedAccount}`);
        if (res.ok) {
          const data = await res.json();
          setGithubData({
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            login: data.login,
            name: data.name || data.login,
          });
        }
      } catch (err) {
        console.error("Failed to fetch Github stats:", err);
      } finally {
        setLoadingGithub(false);
      }
    };
    fetchGithub();
  }, [selectedAccount]);

  // GSAP ScrollTrigger entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
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

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-24 px-4 w-full max-w-5xl mx-auto relative transition-colors duration-300"
    >
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {t.title.split("&")[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">&amp; {t.title.split("&")[1]}</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm sm:text-base">
          {t.subtitle}
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: WakaTime Stats */}
        <div
          ref={addToRefs}
          className="md:col-span-2 group relative bg-white dark:bg-zinc-900/50 dark:backdrop-blur-md border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] shadow-sm hover:shadow-md overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <svg className="text-emerald-550 dark:text-emerald-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{t.waka_title}</h3>
            </div>
            <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono px-2.5 py-1 rounded-full transition-colors duration-300">
              Live updates
            </span>
          </div>

          <div className="mb-6">
            <div className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
              {wakaStats.weekly_hours} <span className="text-base font-normal text-zinc-600 dark:text-zinc-400">{t.waka_hours}</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 transition-colors duration-300">{t.waka_sub}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider transition-colors duration-300">{t.waka_top}</h4>
            <div className="space-y-3">
              {wakaStats.languages.map((lang) => (
                <div key={lang.name} className="space-y-1">
                  <div className="flex justify-between text-xs sm:text-sm font-medium">
                    <span className="text-zinc-700 dark:text-zinc-300">{lang.name}</span>
                    <span className="text-zinc-600 dark:text-zinc-400 transition-colors duration-300">{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800/60 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${lang.color} rounded-full transition-all duration-1000`} 
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: GitHub Profile Info */}
        <div
          ref={addToRefs}
          className="group relative bg-white dark:bg-zinc-900/50 dark:backdrop-blur-md border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] shadow-sm hover:shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <svg className="text-emerald-550 dark:text-emerald-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{t.gh_title}</h3>
              </div>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-200 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer transition-colors duration-300"
              >
                <option value="usamah-io">@usamah-io</option>
                <option value="usamah-apalah">@usamah-apalah</option>
              </select>
            </div>

            {loadingGithub ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-8 bg-zinc-200 dark:bg-zinc-850 rounded w-1/2"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-850 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-850 rounded w-5/6"></div>
              </div>
            ) : githubData ? (
              <div className="space-y-5">
                <div>
                  <div className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{githubData.name}</div>
                  <div className="text-xs font-mono text-zinc-500">@{githubData.login}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-200 dark:border-zinc-800/60 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 transition-colors duration-300">
                      <svg className="text-zinc-450 dark:text-zinc-450 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg> {t.gh_repos}
                    </span>
                    <span className="text-lg font-bold text-zinc-800 dark:text-white">{githubData.public_repos}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 transition-colors duration-300">
                      <svg className="text-zinc-450 dark:text-zinc-450 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> {t.gh_followers}
                    </span>
                    <span className="text-lg font-bold text-zinc-800 dark:text-white">{githubData.followers}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>{t.gh_status}</span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-zinc-500">Failed to load GitHub stats.</div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800/50">
            <a
              href={`https://github.com/${selectedAccount}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white text-xs font-semibold py-2 px-4 rounded-xl transition-colors"
            >
              {t.gh_cta}
            </a>
          </div>
        </div>

        {/* Card 3: Stack Spotlight Card */}
        <div
          ref={addToRefs}
          className="md:col-span-3 group relative bg-white dark:bg-zinc-900/50 dark:backdrop-blur-md border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] shadow-sm hover:shadow-md overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <svg className="text-emerald-550 dark:text-emerald-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{t.focus_title}</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { title: t.focus_editor_label, value: "VS Code / Cursor" },
              { title: t.focus_shell_label, value: "Zsh + Oh My Zsh" },
              { title: t.focus_stack_label, value: "React, Next.js, Node.js" },
              { title: t.focus_style_label, value: "Tailwind CSS, CSS Modules" },
            ].map((item, idx) => (
              <div key={idx} className="bg-zinc-100/50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-850/60 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors duration-300">
                <span className="text-[10px] sm:text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider transition-colors duration-300">{item.title}</span>
                <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-300">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
