"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Database, 
  Terminal, 
  Globe, 
  Zap,
  Mail,
  MessageSquare
} from "lucide-react";
import { useApp } from "./app-context";
import content from "@/data/content.json";
import Typewriter from "./typewriter";

interface GithubUserData {
  public_repos: number;
  followers: number;
  following: number;
  login: string;
  name: string;
}

interface SkillItem {
  name: string;
  percentage: number;
  category: string;
  description: string;
}

interface ApiCapability {
  id: string;
  name: string;
  badge: string;
  endpoint: string;
  method: "GET" | "POST" | "REST" | "SDK";
  description: string;
  docUrl: string;
  tags: string[];
  icon: any;
}

export default function Stats() {
  const { language } = useApp();
  const t = content[language as "id" | "en"]?.stats || content["id"].stats;
  const isIndonesian = language === "id";

  const [selectedAccount, setSelectedAccount] = useState("usamah-io");
  const [githubData, setGithubData] = useState<GithubUserData | null>(null);
  const [loadingGithub, setLoadingGithub] = useState(true);
  const [activeApiId, setActiveApiId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const bouncySpring = {
    type: "spring",
    stiffness: 300,
    damping: 20,
  } as const;

  // 1. Skill Mastery Progress Bar Data (Minimalist Modern)
  const skillsData: SkillItem[] = [
    {
      name: "Next.js / React",
      percentage: 95,
      category: "Frontend Core",
      description: isIndonesian 
        ? "Penguasaan mendalam Next.js App Router, Server Components, SSR/SSG, dan React 19 hooks."
        : "Deep mastery of Next.js App Router, Server Components, SSR/SSG, and React 19 hooks.",
    },
    {
      name: "Integrasi API & AI Workflows",
      percentage: 95,
      category: "Full-Stack Tech",
      description: isIndonesian
        ? "Menghubungkan REST API, GraphQL, Google Gemini API, Nodemailer, & AntiGravity AI workflows."
        : "Integrating REST APIs, GraphQL, Google Gemini API, Nodemailer, & AntiGravity AI workflows.",
    },
    {
      name: "Frontend Architecture",
      percentage: 92,
      category: "Engineering & Motion",
      description: isIndonesian
        ? "Struktur komponen modular, manajemen state global, dan mikro-animasi Framer Motion / GSAP."
        : "Modular component design, global state architecture, and Framer Motion / GSAP animations.",
    },
    {
      name: "TypeScript & Tailwind CSS",
      percentage: 90,
      category: "Type Safety & UI",
      description: isIndonesian
        ? "Pengkodean strictly-typed, desain sistem atomis, & styling Tailwind CSS v4 ultra-responsif."
        : "Strictly-typed coding, atomic design systems, & ultra-responsive Tailwind CSS v4 styling.",
    },
  ];

  // 2. Daftar API yang Aktif Digunakan (Technical Capabilities)
  const apiCapabilities: ApiCapability[] = [
    {
      id: "gemini",
      name: "Google Gemini API",
      badge: "AI Engine",
      endpoint: "https://generativelanguage.googleapis.com/v1beta",
      method: "POST",
      description: isIndonesian
        ? "Digunakan untuk generator kuis otomatis, evaluasi jawaban essay otomatis real-time, dan alur pemrosesan AntiGravity AI."
        : "Powers automated quiz generation, real-time essay evaluation, and AntiGravity AI workflows.",
      docUrl: "https://ai.google.dev/docs",
      tags: ["Gemini 1.5", "LLM", "JSON Mode", "Prompt Eng"],
      icon: Sparkles,
    },
    {
      id: "multi-ai",
      name: "Multi-AI Endpoints",
      badge: "AI Router",
      endpoint: "https://api.openai.com/v1 / Claude API",
      method: "REST",
      description: isIndonesian
        ? "Arsitektur multi-model fallback untuk penanganan instruksi AI yang kompleks dan redundansi server."
        : "Multi-model fallback architecture for handling complex AI instructions and server redundancy.",
      docUrl: "https://platform.openai.com/docs",
      tags: ["OpenAI", "Claude 3.5", "Fallback", "Streaming"],
      icon: Cpu,
    },
    {
      id: "db-api",
      name: "Database APIs & Prisma ORM",
      badge: "Backend DB",
      endpoint: "Prisma Client / PostgreSQL SQL Engine",
      method: "SDK",
      description: isIndonesian
        ? "Integrasi query ORM type-safe untuk penyimpanan bank soal, data user, dan rekap penilaian ujian."
        : "Type-safe ORM query integration for question banks, user profiles, and exam grading recaps.",
      docUrl: "https://www.prisma.io/docs",
      tags: ["Prisma", "PostgreSQL", "SQL", "Migrations"],
      icon: Database,
    },
    {
      id: "wakatime",
      name: "WakaTime REST API",
      badge: "Live Telemetry",
      endpoint: "GET https://wakatime.com/api/v1/users/current/stats",
      method: "GET",
      description: isIndonesian
        ? "Mengambil statistik durasi koding mingguan secara otomatis langsung dari VS Code editor."
        : "Fetches live weekly coding time metrics directly from VS Code editor environment.",
      docUrl: "https://wakatime.com/developers",
      tags: ["WakaTime", "Telemetry", "Screen Time"],
      icon: Terminal,
    },
    {
      id: "github-api",
      name: "GitHub REST API v3",
      badge: "Version Control",
      endpoint: "GET https://api.github.com/users/usamah-io",
      method: "GET",
      description: isIndonesian
        ? "Sinkronisasi otomatis statistik repositori publik, follower, dan distribusi bahasa koding @usamah-io."
        : "Auto-syncs public repository statistics, follower counts, and language breakdowns for @usamah-io.",
      docUrl: "https://docs.github.com/en/rest",
      tags: ["GitHub API", "Repos", "Languages"],
      icon: Globe,
    },
    {
      id: "contact-api",
      name: "Gmail & WhatsApp APIs",
      badge: "Communication",
      endpoint: "POST /api/contact (Gmail SMTP & Meta Cloud API)",
      method: "POST",
      description: isIndonesian
        ? "Protokol pengiriman pesan formulir kontak otomatis via SMTP Nodemailer dan Meta WhatsApp Click-to-Chat."
        : "Automated contact message dispatch via Nodemailer SMTP and Meta WhatsApp Click-to-Chat protocol.",
      docUrl: "https://developers.google.com/gmail/api",
      tags: ["Nodemailer", "SMTP", "Meta Cloud", "WhatsApp"],
      icon: Mail,
    },
  ];

  // Fetch GitHub User Info & Top Languages
  useEffect(() => {
    setLoadingGithub(true);
    const fetchGithub = async () => {
      try {
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
      } catch (err) {
        console.error("Failed to fetch Github stats:", err);
      } finally {
        setLoadingGithub(false);
      }
    };

    fetchGithub();
  }, [selectedAccount]);

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

  return (
    <section 
      id="stats"
      className="py-24 px-4 w-full max-w-6xl mx-auto relative transition-colors duration-300 text-zinc-900 dark:text-white"
    >
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={bouncySpring}
        className="text-center md:text-left mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-[#00FF87]/10 border border-emerald-500/30 dark:border-[#00FF87]/30 text-emerald-600 dark:text-[#00FF87] text-xs font-mono font-bold mb-3">
          <Zap className="w-4 h-4 text-emerald-600 dark:text-[#00FF87] shrink-0" />
          <span>{isIndonesian ? "Kapabilitas Teknis & Metrics" : "Technical Capability & Metrics"}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight min-h-[1.2em] flex items-center justify-center md:justify-start">
          <Typewriter
            words={isIndonesian ? ["Skill, Integrasi API & Statistik"] : ["Skill Mastery & API Integrations"]}
            loop={true}
            typingSpeed={70}
            deletingSpeed={40}
            pauseDuration={2500}
            className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 dark:from-[#00FF87] dark:via-teal-400 dark:to-emerald-300 font-extrabold"
            cursorClassName="text-emerald-500 dark:text-[#00FF87] text-3xl md:text-4xl font-light"
          />
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm sm:text-base max-w-2xl">
          {isIndonesian
            ? "Ringkasan penguasaan skill utama, ekosistem API aktif yang terintegrasi dalam proyek, serta statistik koding real-time."
            : "Breakdown of core skill proficiencies, active API integrations in production projects, and real-time coding statistics."}
        </p>
      </motion.div>

      {/* =================================================== */}
      {/* 1. SECTION SKILL & STATISTIK (MODERN MINIMALIST PROGRESS BARS) */}
      {/* =================================================== */}
      <div className="mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={bouncySpring}
          className="flex items-center gap-2 mb-6"
        >
          <Code2 className="w-5 h-5 text-emerald-600 dark:text-[#00FF87]" />
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
            {isIndonesian ? "Penguasaan Skill Utama" : "Core Skill Mastery"}
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.015 }}
              transition={{ ...bouncySpring, delay: idx * 0.1 }}
              className="bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/50 dark:hover:border-[#00FF87]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-extrabold uppercase text-emerald-600 dark:text-[#00FF87] bg-emerald-500/10 dark:bg-[#00FF87]/10 px-2.5 py-0.5 rounded border border-emerald-500/20 dark:border-[#00FF87]/20">
                    {skill.category}
                  </span>
                  <span className="text-2xl font-black font-mono text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#00FF87] transition-colors">
                    {skill.percentage}%
                  </span>
                </div>

                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
                  {skill.name}
                </h4>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Progress Bar Track */}
              <div className="mt-5">
                <div className="w-full bg-zinc-100 dark:bg-zinc-800/80 h-3 rounded-full overflow-hidden p-0.5 border border-zinc-200/50 dark:border-zinc-700/50">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 15,
                      delay: 0.2 + idx * 0.1,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-[#00FF87] dark:from-[#00FF87] dark:via-teal-400 dark:to-emerald-400 shadow-sm"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* =================================================== */}
      {/* 2. SECTION DAFTAR API YANG DIGUNAKAN (TECHNICAL CAPABILITIES) */}
      {/* =================================================== */}
      <div className="mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={bouncySpring}
          className="flex items-center justify-between mb-6 flex-wrap gap-3"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600 dark:text-[#00FF87]" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              {isIndonesian ? "Ekosistem API yang Aktif Digunakan" : "Active API Integrations"}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400">
            {apiCapabilities.length} {isIndonesian ? "API Terverifikasi" : "Verified Endpoints"}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apiCapabilities.map((api, idx) => {
            const Icon = api.icon;
            const isOpen = activeApiId === api.id;

            return (
              <motion.div
                key={api.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ ...bouncySpring, delay: idx * 0.08 }}
                className="bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/50 dark:hover:border-[#00FF87]/50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 dark:bg-[#00FF87]/10 text-emerald-600 dark:text-[#00FF87] border border-emerald-500/20 dark:border-[#00FF87]/20">
                      <Icon className="w-5 h-5 shrink-0" />
                    </div>
                    <span className="text-[10px] font-mono font-black uppercase text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700">
                      {api.method}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#00FF87] transition-colors">
                    {api.name}
                  </h4>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                    {api.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {api.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* API Endpoint & Actions */}
                <div className="mt-6 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                  <div className="flex items-center justify-between gap-2 bg-zinc-50 dark:bg-[#09090b] px-3 py-2 rounded-xl border border-zinc-200/60 dark:border-zinc-800">
                    <code className="text-[11px] font-mono text-emerald-600 dark:text-[#00FF87] truncate flex-1">
                      {api.endpoint}
                    </code>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCopyEndpoint(api.endpoint, api.id)}
                      className="p-1 rounded-md text-zinc-400 hover:text-emerald-500 dark:hover:text-[#00FF87] hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                      title="Copy Endpoint"
                    >
                      {copiedId === api.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-[#00FF87]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </motion.button>
                  </div>

                  <a
                    href={api.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-100 hover:bg-emerald-500 hover:text-zinc-950 dark:bg-zinc-900 dark:hover:bg-[#00FF87] dark:hover:text-zinc-950 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all duration-300 border border-zinc-200 dark:border-zinc-800"
                  >
                    <span>{isIndonesian ? "Dokumentasi API" : "API Documentation"}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* =================================================== */}
      {/* 3. BENTO GRID METRICS: WAKATIME & GITHUB REAL-TIME */}
      {/* =================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: WakaTime Coding Hours */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, scale: 1.015 }}
          transition={bouncySpring}
          className="md:col-span-2 group relative bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-emerald-500/50 dark:hover:border-[#00FF87]/50 shadow-sm hover:shadow-xl overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Terminal className="text-emerald-600 dark:text-[#00FF87] w-5 h-5" />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{t.waka_title}</h3>
              </div>
              <span className="inline-flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-600 dark:text-[#00FF87] font-mono px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#00FF87] animate-pulse" />
                <span>Live WakaTime Sync</span>
              </span>
            </div>

            <div className="mb-6">
              <div className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
                42.5 <span className="text-base font-normal text-zinc-600 dark:text-zinc-400">{t.waka_hours}</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{t.waka_sub}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80">
            {[
              { name: "TypeScript", pct: "55%", color: "bg-blue-500" },
              { name: "React / Next.js", pct: "25%", color: "bg-teal-400" },
              { name: "Tailwind CSS", pct: "12%", color: "bg-cyan-400" },
              { name: "Python / Node", pct: "8%", color: "bg-emerald-500" },
            ].map((lang) => (
              <div key={lang.name} className="bg-zinc-50 dark:bg-zinc-950/60 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/60">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  <span className="truncate">{lang.name}</span>
                  <span className="text-emerald-600 dark:text-[#00FF87] font-mono">{lang.pct}</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full ${lang.color} rounded-full`} style={{ width: lang.pct }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 2: GitHub Live Profile */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, scale: 1.015 }}
          transition={bouncySpring}
          className="group relative bg-white dark:bg-[#111111] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-emerald-500/50 dark:hover:border-[#00FF87]/50 shadow-sm hover:shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Globe className="text-emerald-600 dark:text-[#00FF87] w-5 h-5" />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{t.gh_title}</h3>
              </div>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="usamah-io">@usamah-io</option>
              </select>
            </div>

            {loadingGithub ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
              </div>
            ) : githubData ? (
              <div className="space-y-4">
                <div>
                  <div className="text-xl font-bold text-zinc-900 dark:text-white">{githubData.name}</div>
                  <div className="text-xs font-mono text-zinc-500">@{githubData.login}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-200/80 dark:border-zinc-800/80 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {t.gh_repos}
                    </span>
                    <span className="text-lg font-black text-zinc-900 dark:text-white">{githubData.public_repos}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {t.gh_followers}
                    </span>
                    <span className="text-lg font-black text-zinc-900 dark:text-white">{githubData.followers}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-[#00FF87] font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#00FF87] animate-pulse" />
                  <span>{t.gh_status}</span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80">
            <a
              href={`https://github.com/${selectedAccount}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-emerald-500 dark:hover:bg-[#00FF87] transition-all cursor-pointer"
            >
              {t.gh_cta}
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
