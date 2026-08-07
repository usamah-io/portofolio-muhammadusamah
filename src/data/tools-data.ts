export interface ToolItem {
  id: string;
  name: string;
  category: "ai" | "google" | "dev";
  categoryLabel: { id: string; en: string };
  badge: { id: string; en: string };
  isHighlight?: boolean;
  color: string;
  glowColor: string;
  description: { id: string; en: string };
  capabilities: { id: string[]; en: string[] };
}

export const TOOLS_DATA: ToolItem[] = [
  {
    id: "gemini",
    name: "Gemini AI",
    category: "ai",
    categoryLabel: { id: "AI Ecosystem", en: "AI Ecosystem" },
    badge: { id: "★ HIGHLIGHT UTAMA", en: "★ HIGHLIGHT UTAMA" },
    isHighlight: true,
    color: "from-blue-500 via-indigo-500 to-purple-600",
    glowColor: "rgba(59, 130, 246, 0.6)",
    description: {
      id: "Model AI Multimodal utama yang digunakan untuk analisis arsitektur mendalam, pemrosesan prompt sistem kompleks, perancangan logika backend, dan sintesis kode tingkat tinggi.",
      en: "Primary Multimodal AI model utilized for deep architecture analysis, complex system prompt engineering, backend logic design, and high-level code synthesis."
    },
    capabilities: {
      id: [
        "Analisis Multimodal Kode & UI",
        "Prompting Arsitektur Kompleks",
        "Refactoring & Optimasi Performa",
        "Generasi Schema Data & Logic"
      ],
      en: [
        "Multimodal Code & UI Analysis",
        "Complex Architecture Prompting",
        "Refactoring & Performance Tuning",
        "Data Schema & Logic Generation"
      ]
    }
  },
  {
    id: "antigravity",
    name: "Google AntiGravity",
    category: "ai",
    categoryLabel: { id: "AI Ecosystem", en: "AI Ecosystem" },
    badge: { id: "★ PINNED TOOL", en: "★ PINNED TOOL" },
    isHighlight: true,
    color: "from-cyan-500 via-teal-500 to-emerald-600",
    glowColor: "rgba(20, 184, 166, 0.5)",
    description: {
      id: "Platform IDE berbasis agen AI cerdas yang mengotomatisasi alur kerja pengkodean, eksekusi perintah terminal cerdas, refactoring multi-file, dan penyelesaian tugas kompleks secara mandiri.",
      en: "Intelligent AI agent IDE platform automating coding workflows, smart terminal command execution, multi-file refactoring, and autonomous task completion."
    },
    capabilities: {
      id: [
        "Otomasi Multi-Agen Coding",
        "Pengeditan Kode Multi-File Presisi",
        "Eksekusi Perintah Verifikasi Mandiri",
        "Kustomisasi System Prompt Agens"
      ],
      en: [
        "Multi-Agent Coding Automation",
        "Precise Multi-File Editing",
        "Autonomous Verification Execution",
        "Custom Agent System Prompts"
      ]
    }
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "ai",
    categoryLabel: { id: "AI Ecosystem", en: "AI Ecosystem" },
    badge: { id: "AI Assistant", en: "AI Assistant" },
    isHighlight: false,
    color: "from-emerald-600 via-teal-600 to-cyan-700",
    glowColor: "rgba(16, 185, 129, 0.4)",
    description: {
      id: "Asisten LLM serbaguna yang digunakan untuk diskusi awal konsep aplikasi, perancangan skenario pengujian, penyusunan dokumentasi API, dan perumusan alternatif penyelesaian bug.",
      en: "Versatile LLM assistant utilized for early concept brainstorming, test scenario design, API documentation drafting, and bug resolution strategy formulation."
    },
    capabilities: {
      id: [
        "Brainstorming Konsep & Fitur",
        "Penyusunan Skenario Testing",
        "Eksplorasi Algoritma Alternatif",
        "Drafting Dokumentasi API"
      ],
      en: [
        "Concept & Feature Brainstorming",
        "Test Scenario Drafting",
        "Algorithm Exploration",
        "API Documentation Drafting"
      ]
    }
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    category: "ai",
    categoryLabel: { id: "AI Ecosystem", en: "AI Ecosystem" },
    badge: { id: "AI Research", en: "AI Research" },
    isHighlight: false,
    color: "from-purple-600 via-violet-600 to-indigo-700",
    glowColor: "rgba(147, 51, 234, 0.4)",
    description: {
      id: "Alat riset AI berbasis dokumen terpercaya untuk mengekstrak wawasan dari dokumentasi framework resmi, artikel teknis, serta mensintesis materi referensi pengembangan.",
      en: "Document-grounded AI research tool trusted for extracting insights from official framework docs, technical whitepapers, and synthesizing development references."
    },
    capabilities: {
      id: [
        "Sintesis Berkas Dokumen & PDF",
        "Analisis Source Code & Specs",
        "Tanya-Jawab Terbuka Kontekstual",
        "Ringkasan Otomatis Materi Riset"
      ],
      en: [
        "Document & PDF Synthesis",
        "Source Code & Specs Analysis",
        "Contextual Technical Q&A",
        "Automated Research Summaries"
      ]
    }
  },
  {
    id: "google-drive",
    name: "Google Drive",
    category: "google",
    categoryLabel: { id: "Google Productivity", en: "Google Productivity" },
    badge: { id: "Cloud Storage", en: "Cloud Storage" },
    isHighlight: false,
    color: "from-blue-500 via-amber-500 to-emerald-500",
    glowColor: "rgba(59, 130, 246, 0.4)",
    description: {
      id: "Pusat penyimpanan media dan cadangan berkas aman untuk menyimpan video dokumentasi volunteer, screenshot aplikasi, aset desain proyek, dan file cadangan codebase.",
      en: "Centralized media storage and secure backup vault for volunteer video documentation, app screenshots, project design assets, and codebase backups."
    },
    capabilities: {
      id: [
        "Penyimpanan Video HD & Rekaman",
        "Backup Berkas Proyek Aman",
        "Manajemen Aset Gambar & Media",
        "Integrasi Link Cloud Publik"
      ],
      en: [
        "HD Video & Recording Vault",
        "Secure Project File Backup",
        "Image & Media Asset Control",
        "Public Cloud Link Integration"
      ]
    }
  },
  {
    id: "google-docs",
    name: "Google Docs",
    category: "google",
    categoryLabel: { id: "Google Productivity", en: "Google Productivity" },
    badge: { id: "Document Editor", en: "Document Editor" },
    isHighlight: false,
    color: "from-blue-600 to-indigo-600",
    glowColor: "rgba(37, 99, 235, 0.4)",
    description: {
      id: "Penyusunan naskah spesifikasi teknis (PRD), proposal hackathon, draft artikel edukasi, dan dokumentasi arsitektur sistem secara kolaboratif.",
      en: "Collaborative drafting of Product Requirement Documents (PRDs), hackathon proposals, educational article drafts, and system architecture specs."
    },
    capabilities: {
      id: [
        "Penyusunan PRD & Spesifikasi",
        "Penyuntingan Naskah Artikel",
        "Kolaborasi Real-time Tim",
        "Export PDF & Format Berkas"
      ],
      en: [
        "PRD & Specs Authoring",
        "Article Draft Editing",
        "Real-time Team Editing",
        "PDF & Format Export"
      ]
    }
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    category: "google",
    categoryLabel: { id: "Google Productivity", en: "Google Productivity" },
    badge: { id: "Data & Spreadsheet", en: "Data & Spreadsheet" },
    isHighlight: false,
    color: "from-emerald-600 to-green-600",
    glowColor: "rgba(16, 185, 129, 0.4)",
    description: {
      id: "Manajemen data terstruktur, alokasi anggaran proyek, pelacakan progres backlog, serta penyusunan matriks pengujian fitur aplikasi.",
      en: "Structured data management, project budget allocation, backlog progress tracking, and feature matrix test mapping."
    },
    capabilities: {
      id: [
        "Matrix Fitur & Testing",
        "Pelacakan Sprint & Backlog",
        "Kalkulasi Anggaran & Biaya",
        "Analisis Data Terstruktur"
      ],
      en: [
        "Feature & Testing Matrix",
        "Sprint & Backlog Tracking",
        "Budget & Cost Calculation",
        "Structured Data Analysis"
      ]
    }
  },
  {
    id: "google-slides",
    name: "Google Slides",
    category: "google",
    categoryLabel: { id: "Google Productivity", en: "Google Productivity" },
    badge: { id: "Presentation", en: "Presentation" },
    isHighlight: false,
    color: "from-amber-500 to-yellow-500",
    glowColor: "rgba(245, 158, 11, 0.4)",
    description: {
      id: "Perancangan slide presentasi pitch deck visual yang menarik untuk kompetisi hackathon, demo proyek, dan materi presentasi edukasi teknologi.",
      en: "Designing visually compelling pitch deck presentation slides for hackathon competitions, product demos, and tech education presentations."
    },
    capabilities: {
      id: [
        "Presentasi Pitch Deck Hackathon",
        "Visualisasi Slide Interaktif",
        "Diagram Flow System Visual",
        "Ekspor PDF Presentasi"
      ],
      en: [
        "Hackathon Pitch Decks",
        "Interactive Slide Visuals",
        "Visual System Flow Diagrams",
        "PDF Presentation Export"
      ]
    }
  },
  {
    id: "google-meet",
    name: "Google Meet",
    category: "google",
    categoryLabel: { id: "Google Productivity", en: "Google Productivity" },
    badge: { id: "Video Conference", en: "Video Conference" },
    isHighlight: false,
    color: "from-teal-500 via-emerald-500 to-blue-600",
    glowColor: "rgba(13, 148, 136, 0.4)",
    description: {
      id: "Platform komunikasi video definisi tinggi untuk diskusi arsitektur tim, tinjauan pengkodean langsung (live pair programming), dan wawancara proyek.",
      en: "High-definition video conference platform for team architecture syncs, live pair programming code reviews, and project interviews."
    },
    capabilities: {
      id: [
        "Live Code Review & Demo",
        "Sesi Diskusi Tim Remote",
        "Screen Sharing High-Quality",
        "Rekaman Sesi Sinkronisasi"
      ],
      en: [
        "Live Code Review & Demos",
        "Remote Team Discussions",
        "High-Quality Screen Sharing",
        "Session Recording & Logs"
      ]
    }
  },
  {
    id: "google-chat",
    name: "Google Chat",
    category: "google",
    categoryLabel: { id: "Google Productivity", en: "Google Productivity" },
    badge: { id: "Team Messaging", en: "Team Messaging" },
    isHighlight: false,
    color: "from-green-600 to-emerald-700",
    glowColor: "rgba(22, 163, 74, 0.4)",
    description: {
      id: "Ruang komunikasi pesan instan dan saluran ruang kerja untuk koordinasi tim pengembang cepat, update status, dan integrasi webhook notifikasi.",
      en: "Instant messaging space and workspace channels for rapid developer coordination, status updates, and notification webhook integration."
    },
    capabilities: {
      id: [
        "Pesan Instan & Channel",
        "Integrasi Webhook Bot",
        "Diskusi Thread Topik",
        "Berbagi Snippet Kode Cepat"
      ],
      en: [
        "Instant Chat & Channels",
        "Bot Webhook Integration",
        "Threaded Topic Discussion",
        "Quick Code Snippet Sharing"
      ]
    }
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "google",
    categoryLabel: { id: "Google Productivity", en: "Google Productivity" },
    badge: { id: "Communication", en: "Communication" },
    isHighlight: false,
    color: "from-red-500 to-rose-600",
    glowColor: "rgba(239, 68, 68, 0.4)",
    description: {
      id: "Komunikasi profesional dengan klien/mitra, integrasi notifikasi sistem Nodemailer, serta penanganan autentikasi dan surat elektronik.",
      en: "Professional communication with clients/partners, Nodemailer system notification integration, and electronic mail authentication."
    },
    capabilities: {
      id: [
        "Integrasi SMTP Nodemailer",
        "Korespondensi Profesional",
        "Notifikasi Deployment System",
        "Manajemen Kontak Resmi"
      ],
      en: [
        "Nodemailer SMTP Setup",
        "Professional Correspondence",
        "Deployment System Alerts",
        "Official Contact Control"
      ]
    }
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    category: "google",
    categoryLabel: { id: "Google Productivity", en: "Google Productivity" },
    badge: { id: "Scheduling", en: "Scheduling" },
    isHighlight: false,
    color: "from-blue-600 to-cyan-600",
    glowColor: "rgba(37, 99, 235, 0.4)",
    description: {
      id: "Pengaturan jadwal tenggat waktu (milestone) pengkodean, manajemen alokasi waktu belajar, dan penjatual otomatis sesi sinkronisasi tim.",
      en: "Scheduling coding milestone deadlines, managing study time allocation, and automating team synchronization schedules."
    },
    capabilities: {
      id: [
        "Manajemen Milestone Proyek",
        "Jadwal Hackathon & Sprint",
        "Pengingat Tenggat Waktu",
        "Sinkronisasi Zona Waktu"
      ],
      en: [
        "Project Milestone Scheduling",
        "Hackathon & Sprint Timelines",
        "Deadline Reminders",
        "Time Zone Synchronization"
      ]
    }
  },
  {
    id: "google-tasks",
    name: "Google Tasks",
    category: "google",
    categoryLabel: { id: "Google Productivity", en: "Google Productivity" },
    badge: { id: "Task Management", en: "Task Management" },
    isHighlight: false,
    color: "from-blue-500 to-indigo-500",
    glowColor: "rgba(99, 102, 241, 0.4)",
    description: {
      id: "Pengelolaan daftar tugas singkat harian (to-do list), checklist perbaikan bug cepat, dan penyelesaian prioritas mikro dalam sesi koding.",
      en: "Daily action item to-do list management, micro bug-fix checklists, and micro-priority execution during coding sessions."
    },
    capabilities: {
      id: [
        "Checklist Bug Harian",
        "Prioritas Tugas Micro-Level",
        "Pengingat Integrasi Email",
        "Penyelesaian Item Beruntun"
      ],
      en: [
        "Daily Bug Checklist",
        "Micro-Level Task Priority",
        "Email Integration Reminders",
        "Sequential Item Execution"
      ]
    }
  },
  {
    id: "google-keep",
    name: "Google Keep",
    category: "google",
    categoryLabel: { id: "Google Productivity", en: "Google Productivity" },
    badge: { id: "Quick Notes", en: "Quick Notes" },
    isHighlight: false,
    color: "from-amber-500 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.4)",
    description: {
      id: "Penangkapan ide instan, pencatatan snippet kode sementara saat riset, serta pengorganisasian checklist berwarna untuk inspirasi desain UI.",
      en: "Instant idea capture, temporary code snippet notes during research, and color-coded checklist organization for UI design inspiration."
    },
    capabilities: {
      id: [
        "Catatan Cepat Spontan",
        "Snippet Kode Sementara",
        "Checklist Berwarna Visual",
        "Pin Ide Penting Proyek"
      ],
      en: [
        "Spontaneous Quick Notes",
        "Temporary Code Snippets",
        "Visual Color Checklists",
        "Pin Project Essential Ideas"
      ]
    }
  },
  {
    id: "google-voice",
    name: "Google Voice",
    category: "google",
    categoryLabel: { id: "Google Productivity", en: "Google Productivity" },
    badge: { id: "Voice Telecom", en: "Voice Telecom" },
    isHighlight: false,
    color: "from-emerald-600 to-teal-700",
    glowColor: "rgba(16, 185, 129, 0.4)",
    description: {
      id: "Layanan komunikasi suara profesional fleksibel untuk verifikasi dua langkah (2FA) aman dan nomor saluran komunikasi resmi.",
      en: "Flexible professional voice communication service for secure two-factor authentication (2FA) and dedicated communication channels."
    },
    capabilities: {
      id: [
        "Verifikasi Kemanan 2FA",
        "Nomor Saluran Kontak Dedicated",
        "Pesan Suara Transkrip",
        "Integrasi Telekomunikasi"
      ],
      en: [
        "2FA Security Verification",
        "Dedicated Contact Number",
        "Voicemail Transcript",
        "Telecom Integration"
      ]
    }
  },
  {
    id: "google-forms",
    name: "Google Forms",
    category: "google",
    categoryLabel: { id: "Google Productivity", en: "Google Productivity" },
    badge: { id: "Form & Feedback", en: "Form & Feedback" },
    isHighlight: false,
    color: "from-purple-600 to-fuchsia-600",
    glowColor: "rgba(192, 38, 211, 0.4)",
    description: {
      id: "Pengumpulan umpan balik pengguna (user feedback) aplikasi, survei validator riset pasar, dan formulir pendaftaran acara web.",
      en: "Collecting app user feedback, market research validation surveys, and web event registration forms."
    },
    capabilities: {
      id: [
        "Survei Umpan Balik Pengguna",
        "Form Registration Events",
        "Analisis Data Jawaban Real-time",
        "Ekspor Hasil ke Sheets"
      ],
      en: [
        "User Feedback Surveys",
        "Event Registration Forms",
        "Real-time Response Analysis",
        "Results Export to Sheets"
      ]
    }
  },
  {
    id: "google-sites",
    name: "Google Sites",
    category: "google",
    categoryLabel: { id: "Google Productivity", en: "Google Productivity" },
    badge: { id: "Web Portal", en: "Web Portal" },
    isHighlight: false,
    color: "from-blue-600 to-cyan-600",
    glowColor: "rgba(37, 99, 235, 0.4)",
    description: {
      id: "Penyusunan portal dokumentasi internal proyek, repositori pedoman tim, dan landing page pengenalan singkat untuk demonstrasi cepat.",
      en: "Drafting internal project documentation portals, team guidelines repositories, and quick introduction landing pages for rapid demos."
    },
    capabilities: {
      id: [
        "Portal Dokumentasi Tim",
        "Landing Page Demo Cepat",
        "Integrasi Berkas Google Workspace",
        "Akses Kontrol Internal"
      ],
      en: [
        "Team Docs Portal",
        "Rapid Demo Landing Page",
        "Google Workspace File Sync",
        "Internal Access Control"
      ]
    }
  }
];
