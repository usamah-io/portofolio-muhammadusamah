"use client";

import { useState } from "react";
import Link from "next/link";

interface ApiItem {
  id: string;
  method: "GET" | "POST";
  path: string;
  title: string;
  category: string;
  description: string;
  officialUrl: string;
  quickStartCmd: string;
}

export default function ApiDocsPage() {
  const [openId, setOpenId] = useState<string | null>("contents");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const apiItems: ApiItem[] = [
    {
      id: "contents",
      method: "GET",
      path: "/api/contents",
      title: "Content Store API",
      category: "Portofolio API",
      description: "Mengambil data proyek unggulan, keahlian bahasa, dan profil pengembang dalam format JSON.",
      officialUrl: "https://api.domain.com/api/contents",
      quickStartCmd: `npm install axios && axios.get('https://api.domain.com/api/contents?lang=id')`,
    },
    {
      id: "contact",
      method: "POST",
      path: "/api/contact",
      title: "Form Kontak API",
      category: "Portofolio API",
      description: "Endpoint pengiriman pesan dari formulir kontak pengunjung ke server pengelola.",
      officialUrl: "https://api.domain.com/contact",
      quickStartCmd: `fetch('https://api.domain.com/api/contact', { method: 'POST', body: JSON.stringify(data) })`,
    },
    {
      id: "projects-featured",
      method: "GET",
      path: "/api/projects/featured",
      title: "Katalog Proyek Unggulan",
      category: "Portofolio API",
      description: "Daftar spesifikasi lengkap proyek unggulan beserta arsitektur dan stack teknologi.",
      officialUrl: "https://api.domain.com/#projects",
      quickStartCmd: `npm install axios && axios.get('https://api.domain.com/api/projects/featured')`,
    },
    {
      id: "hackathon-scorecard",
      method: "GET",
      path: "/api/hackathon/scorecard",
      title: "Lembar Nilai Gemini Hackathon",
      category: "Prestasi & Hackathon",
      description: "Transparansi lembar nilai juri resmi kompetisi Gemini Hackathon berdasarkan 5 kriteria penilaian.",
      officialUrl: "https://docs.google.com/spreadsheets/d/1VVHQfvEqWVzb5cl165ivFw7pp-UFCtlxI_-6fqUrr7I/edit?gid=1263546258#gid=1263546258",
      quickStartCmd: `npm install googleapis && google.sheets('v4').spreadsheets.values.get({ spreadsheetId: 'SPREADSHEET_ID' })`,
    },
    {
      id: "activity-stats",
      method: "GET",
      path: "/api/activity/stats",
      title: "Metrik Jam Ngoding WakaTime",
      category: "Portofolio API",
      description: "Statistik jam ngoding mingguan dan persentase distribusi bahasa pemrograman.",
      officialUrl: "https://wakatime.com/developers",
      quickStartCmd: `npm install wakatime-client && WakaTimeClient.getUserStats('username')`,
    },
    {
      id: "auth-session",
      method: "POST",
      path: "/api/auth/[...nextauth]",
      title: "NextAuth Admin Session",
      category: "Portofolio API",
      description: "Endpoint autentikasi sesi enkripsi JWT admin untuk mengelola konten portofolio.",
      officialUrl: "https://next-auth.js.org",
      quickStartCmd: `npm install next-auth && useSession()`,
    },
    {
      id: "github-user",
      method: "GET",
      path: "https://api.github.com/users/username",
      title: "GitHub Profile REST API",
      category: "Integrasi Publik",
      description: "Integrasi API resmi GitHub REST v3 untuk data profil pengembang, repositori, dan followers.",
      officialUrl: "https://docs.github.com/en/rest",
      quickStartCmd: `npm install @octokit/rest && octokit.rest.users.getByUsername({ username: 'username' })`,
    },
    {
      id: "github-repos",
      method: "GET",
      path: "https://api.github.com/users/username/repos",
      title: "GitHub Repositories List",
      category: "Integrasi Publik",
      description: "Mengambil daftar repositori kode sumber open-source milik pengembang di GitHub.",
      officialUrl: "https://github.com/username?tab=repositories",
      quickStartCmd: `npm install @octokit/rest && octokit.rest.repos.listForUser({ username: 'username' })`,
    }
  ];

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans relative overflow-x-hidden transition-colors duration-300 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* Background Grid Lines */}
      <div 
        className="absolute top-0 inset-x-0 w-full h-[500px] opacity-50 dark:opacity-40 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" 
      />

      <div className="pt-28 pb-32 sm:pb-40 px-4 sm:px-6 w-full max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 py-2 px-3.5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-xs"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Kembali ke Halaman Utama</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">API Docs</span>
          </div>
        </div>

        {/* Minimal Section Title */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span>Sumber Data & API</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
            Dokumentasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">API & Data</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
            Klik pada setiap item API di bawah untuk membuka perintah terminal dan tautan resmi.
          </p>
        </div>

        {/* Accordion Dropdown List Container */}
        <div className="space-y-3.5 pt-2">
          {apiItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-xs"
              >
                {/* Accordion Header Trigger */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <span
                      className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-lg shrink-0 ${
                        item.method === "GET"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          : "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30"
                      }`}
                    >
                      {item.method}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-zinc-400 hidden sm:inline-block">
                          {item.category}
                        </span>
                        <span className="text-xs text-zinc-400 hidden sm:inline-block">•</span>
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 truncate">
                          {item.path}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-zinc-900 dark:text-white truncate mt-0.5">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Expand Chevron Icon */}
                  <div className={`p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-emerald-500 dark:text-emerald-400" : ""}`}>
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Accordion Body */}
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 border-t border-zinc-100 dark:border-zinc-800/80 pt-4 space-y-4 animate-fadeIn">
                    {/* Description */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        Fungsi & Deskripsi
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Uniform Short Terminal Code Box with Copy Button */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                          <span>Perintah Terminal / Inisialisasi</span>
                        </span>

                        {/* Icon-Only Copy Button */}
                        <button
                          onClick={() => handleCopy(item.id, item.quickStartCmd)}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-zinc-700 flex items-center gap-1"
                          aria-label="Salin Kode Terminal"
                          title="Salin Kode"
                        >
                          {copiedId === item.id ? (
                            <>
                              <svg className="w-3.5 h-3.5 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span className="text-[10px] font-mono font-bold text-emerald-400">Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                              <span className="text-[10px] font-mono">Salin</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-3.5 rounded-xl bg-zinc-950 text-zinc-200 font-mono text-xs overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden border border-zinc-800 leading-relaxed whitespace-pre-wrap">
                        <code>{item.quickStartCmd}</code>
                      </pre>
                    </div>

                    {/* External Link Button */}
                    <div className="pt-1 flex items-center justify-end">
                      <a
                        href={item.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all shadow-xs cursor-pointer"
                      >
                        <span>Buka di Website</span>
                        <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
