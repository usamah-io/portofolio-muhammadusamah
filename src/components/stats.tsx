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

interface ApiDocItem {
  id: string;
  title: string;
  iconName: "mdn" | "ts" | "waka" | "github";
  summary: string;
  endpoint?: string;
  url: string;
  isHighlight?: boolean;
}

export default function Stats() {
  const { language } = useApp();
  const t = content[language].stats;

  const [selectedAccount, setSelectedAccount] = useState("usamah-io");
  const [githubData, setGithubData] = useState<GithubUserData | null>(null);
  const [loadingGithub, setLoadingGithub] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Default fallback language distribution
  const defaultLanguages = [
    { name: "TypeScript", percentage: 55, color: "bg-blue-500" },
    { name: "JavaScript", percentage: 25, color: "bg-yellow-500" },
    { name: "HTML", percentage: 12, color: "bg-orange-500" },
    { name: "CSS", percentage: 8, color: "bg-pink-500" },
  ];

  const [dynamicLanguages, setDynamicLanguages] = useState(defaultLanguages);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const apiDocs: ApiDocItem[] = [
    {
      id: "mdn",
      title: "MDN JS Docs",
      iconName: "mdn",
      summary: "Dokumentasi standar bahasa JavaScript untuk manipulasi DOM dan logika frontend modern.",
      endpoint: "Standard Web API / ECMAScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      id: "ts",
      title: "TypeScript Docs",
      iconName: "ts",
      summary: "Dokumentasi type-system untuk menjaga keamanan tipe data pada kode Next.js dan komponen React.",
      endpoint: "TypeScript Compiler v5.x",
      url: "https://www.typescriptlang.org/docs/",
    },
    {
      id: "waka",
      title: "WakaTime API",
      iconName: "waka",
      summary: "API untuk mengambil statistik waktu koding riil pengguna langsung dari Text Editor secara otomatis.",
      endpoint: "GET https://wakatime.com/api/v1/users/current/stats",
      url: "https://wakatime.com/developers",
    },
    {
      id: "github",
      title: "GitHub REST API Docs",
      iconName: "github",
      summary: "API resmi GitHub (GET /users/usamah-io) yang digunakan untuk menyinkronkan data statistik repositori, follower, dan aktivitas koding @usamah-io secara real-time!",
      endpoint: "GET https://api.github.com/users/usamah-io",
      url: "https://docs.github.com/en/rest/users/users#get-a-user",
      isHighlight: true,
    },
  ];

  // Fetch GitHub User Info & Repos Language Distribution in Real-Time
  useEffect(() => {
    setLoadingGithub(true);
    const fetchGithub = async () => {
      try {
        // 1. Fetch User Profile
        const resUser = await fetch(`https://api.github.com/users/${selectedAccount}`);
        if (resUser.ok) {
          const data = await resUser.json();
          setGithubData({
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            login: data.login,
            name: data.name || data.login,
          });
        }

        // 2. Fetch Repos to Calculate Top Languages
        const resRepos = await fetch(`https://api.github.com/users/${selectedAccount}/repos?per_page=100`);
        if (resRepos.ok) {
          const repos = await resRepos.json();
          const langMap: Record<string, number> = {};
          let totalCount = 0;

          repos.forEach((repo: any) => {
            if (repo.language) {
              langMap[repo.language] = (langMap[repo.language] || 0) + 1;
              totalCount += 1;
            }
          });

          if (totalCount > 0) {
            const colorMap: Record<string, string> = {
              TypeScript: "bg-blue-500",
              JavaScript: "bg-yellow-500",
              HTML: "bg-orange-500",
              CSS: "bg-pink-500",
              PHP: "bg-purple-500",
              Python: "bg-emerald-500",
            };

            const calculatedLangs = Object.keys(langMap)
              .map((lang) => ({
                name: lang,
                percentage: Math.round((langMap[lang] / totalCount) * 100),
                color: colorMap[lang] || "bg-teal-500",
              }))
              .sort((a, b) => b.percentage - a.percentage)
              .slice(0, 4);

            if (calculatedLangs.length > 0) {
              setDynamicLanguages(calculatedLangs);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch Github stats:", err);
      } finally {
        setLoadingGithub(false);
      }
    };

    fetchGithub();
  }, [selectedAccount]);

  // GSAP ScrollTrigger Entry Animation
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

  const toggleDropdown = (id: string) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const handleCopyEndpoint = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy endpoint:", err);
    }
  };

  const renderTitleIcon = (iconName: string, isHighlighted = false) => {
    switch (iconName) {
      case "mdn":
        return (
          <span className={`font-mono text-[11px] font-black px-1.5 py-0.5 rounded transition-colors duration-200 ${
            isHighlighted
              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 font-extrabold"
              : "text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 group-hover:bg-emerald-500/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
          }`}>
            JS
          </span>
        );
      case "ts":
        return (
          <span className={`font-mono text-[11px] font-black px-1.5 py-0.5 rounded transition-colors duration-200 ${
            isHighlighted
              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 font-extrabold"
              : "text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 group-hover:bg-emerald-500/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
          }`}>
            TS
          </span>
        );
      case "waka":
        return (
          <svg className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
            isHighlighted ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
          }`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case "github":
        return (
          <svg className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
            isHighlighted ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
          }`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        );
      default:
        return null;
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
        
        {/* Card 1: Top Languages Calculated Live from GitHub API */}
        <div
          ref={addToRefs}
          className="md:col-span-2 group relative bg-white dark:bg-zinc-900/50 dark:backdrop-blur-md border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] shadow-sm hover:shadow-md overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <svg className="text-emerald-550 dark:text-emerald-400 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{t.waka_title}</h3>
            </div>
            <a
              href="https://docs.github.com/en/rest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-500/10 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 font-mono px-2.5 py-1 rounded-full border border-transparent hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
            >
              <span>Live GitHub API Sync</span>
              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>

          <div className="mb-6">
            <div className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
              42.5 <span className="text-base font-normal text-zinc-600 dark:text-zinc-400">{t.waka_hours}</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 transition-colors duration-300">{t.waka_sub}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider transition-colors duration-300">{t.waka_top}</h4>
            {loadingGithub ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-4/6"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {dynamicLanguages.map((lang) => {
                  const docMap: Record<string, string> = {
                    TypeScript: "https://www.typescriptlang.org/docs/",
                    JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
                    Python: "https://docs.python.org/3/",
                    HTML: "https://developer.mozilla.org/en-US/docs/Web/HTML",
                    CSS: "https://developer.mozilla.org/en-US/docs/Web/CSS",
                    PHP: "https://www.php.net/docs.php",
                  };
                  const docUrl = docMap[lang.name] || "https://developer.mozilla.org/en-US/";

                  return (
                    <div key={lang.name} className="space-y-1">
                      <div className="flex justify-between text-xs sm:text-sm font-medium">
                        <a
                          href={docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors group/lang cursor-pointer"
                        >
                          <span>{lang.name}</span>
                          <svg className="w-3 h-3 text-zinc-400 opacity-60 group-hover/lang:opacity-100 group-hover/lang:translate-x-0.5 group-hover/lang:-translate-y-0.5 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </a>
                        <span className="text-zinc-600 dark:text-zinc-400 transition-colors duration-300">{lang.percentage}%</span>
                      </div>
                      <div className="w-full bg-zinc-100 dark:bg-zinc-800/60 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${lang.color} rounded-full transition-all duration-1000`} 
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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

      {/* --- SEKSI DOKUMENTASI & SUMBER API DROPDOWN POPOVER CARDS --- */}
      <div className="mt-10 pt-6 border-t border-zinc-200/60 dark:border-zinc-850/60 pb-16">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
          <svg className="w-4 h-4 text-emerald-550 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>Sumber Data &amp; API Docs (Klik untuk Detail):</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {apiDocs.map((doc) => {
            const isOpen = activeDropdown === doc.id;

            return (
              <div key={doc.id} className="relative">
                {/* Main Pill Button */}
                <button
                  onClick={() => toggleDropdown(doc.id)}
                  className={`group inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isOpen
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/50 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/20"
                      : "bg-white dark:bg-zinc-900/80 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/10 text-zinc-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs"
                  }`}
                >
                  {renderTitleIcon(doc.iconName, isOpen)}
                  <span className={isOpen ? "text-emerald-600 dark:text-emerald-400 font-bold" : "group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"}>
                    {doc.title}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 text-emerald-600 dark:text-emerald-400 stroke-[2.5]"
                        : "text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 stroke-[2]"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Popover / Dropdown Card (Mengalir Ke Bawah) */}
                {isOpen && (
                  <div className="absolute left-0 top-full mt-2 z-50 w-72 sm:w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                        {renderTitleIcon(doc.iconName)}
                        <span>{doc.title}</span>
                      </h4>
                      <button
                        onClick={() => setActiveDropdown(null)}
                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xs p-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                      {doc.summary}
                    </p>

                    {/* Interactive Copyable API Endpoint */}
                    {doc.endpoint && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] uppercase font-bold text-zinc-400">API Endpoint</span>
                          {copiedId === doc.id && (
                            <span className="text-[10px] font-bold text-emerald-500 animate-pulse">Tersalin!</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-2 bg-zinc-100 dark:bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-200/60 dark:border-zinc-800/80">
                          <code className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 truncate flex-1">
                            {doc.endpoint}
                          </code>
                          <button
                            onClick={() => handleCopyEndpoint(doc.endpoint!, doc.id)}
                            className="p-1 rounded-md text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                            title="Copy Endpoint"
                          >
                            {copiedId === doc.id ? (
                              <svg className="w-3.5 h-3.5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : (
                              <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-450 text-zinc-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
                    >
                      <span>Kunjungi Dokumen Resmi</span>
                      <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
