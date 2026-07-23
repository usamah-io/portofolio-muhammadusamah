"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

interface ArticleItem {
  id: string;
  tag: string;
  title: string;
  platform: string;
  link: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [editingItem, setEditingItem] = useState<ArticleItem | null>(null);

  // Form states
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("TikTok Video");
  const [link, setLink] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const ADMIN_EMAIL = "muhammadusamahabdurrahman@gmail.com";

  // Fetch articles on mount if user is authorized
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email === ADMIN_EMAIL) {
      fetchArticles();
    }
  }, [status, session]);

  const fetchArticles = async () => {
    setLoadingArticles(true);
    try {
      const res = await fetch("/api/contents");
      const data = await res.json();
      if (data.success) {
        setArticles(data.articles);
      }
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setLoadingArticles(false);
    }
  };

  const handleEditInit = (item: ArticleItem) => {
    setEditingItem(item);
    setTag(item.tag);
    setTitle(item.title);
    setPlatform(item.platform);
    setLink(item.link);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setTag("");
    setTitle("");
    setPlatform("TikTok Video");
    setLink("");
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const payload = { tag, title, platform, link };

    try {
      if (editingItem) {
        // Edit mode
        const res = await fetch("/api/contents", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingItem.id, ...payload }),
        });
        const data = await res.json();
        if (data.success) {
          setSuccessMsg("Konten berhasil diperbarui!");
          handleCancelEdit();
          fetchArticles();
        } else {
          setErrorMsg(data.error || "Gagal memperbarui konten.");
        }
      } else {
        // Create mode
        if (articles.length >= 6) {
          setErrorMsg("Maksimal 6 konten terlampaui!");
          return;
        }
        const res = await fetch("/api/contents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setSuccessMsg("Konten baru berhasil ditambahkan!");
          setTag("");
          setTitle("");
          setLink("");
          fetchArticles();
        } else {
          setErrorMsg(data.error || "Gagal menambahkan konten.");
        }
      }
    } catch (err) {
      setErrorMsg("Koneksi gagal. Silakan coba lagi.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus konten ini?")) return;
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`/api/contents?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg("Konten berhasil dihapus!");
        fetchArticles();
      } else {
        setErrorMsg(data.error || "Gagal menghapus konten.");
      }
    } catch (err) {
      setErrorMsg("Koneksi gagal. Silakan coba lagi.");
    }
  };

  // 1. Loading state view
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex items-center justify-center transition-colors duration-300">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-zinc-550 dark:text-zinc-400">Loading Session...</span>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated state view (Login page)
  if (status === "unauthenticated") {
    return (
      <div className="min-h-[85vh] bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex items-center justify-center p-4 transition-colors duration-300">
        <div className="relative bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-8 max-w-md w-full shadow-2xl transition-all duration-300">
          
          {/* Close 'X' icon */}
          <Link
            href="/"
            className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-white rounded-full bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close and return home"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </Link>

          <div className="text-center mb-8 pr-4">
            <h1 className="text-2xl font-black tracking-tight">Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Dashboard</span></h1>
            <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-2">Autentikasi admin diperlukan untuk mengelola konten artikel.</p>
          </div>

          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-900 font-semibold py-3.5 px-6 rounded-2xl transition-all duration-300 shadow-md cursor-pointer"
          >
            {/* Google Logo SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span>Login dengan Google</span>
          </button>

          <div className="text-center mt-6">
            <Link 
              href="/" 
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1 font-medium"
            >
              ← Kembali ke Halaman Utama
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated but unauthorized view
  if (session?.user?.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-[85vh] bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex items-center justify-center p-4 transition-colors duration-300">
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-rose-200 dark:border-rose-950/40 rounded-3xl p-8 max-w-md w-full shadow-2xl transition-all duration-300 text-center">
          <div className="w-12 h-12 bg-rose-100 dark:bg-rose-950/30 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400">Akses Ditolak</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
            Halaman ini khusus untuk Admin (<span className="font-semibold">{ADMIN_EMAIL}</span>). Anda login menggunakan <span className="font-semibold">{session?.user?.email}</span>.
          </p>

          <button
            onClick={() => signOut()}
            className="mt-6 inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 px-6 rounded-xl transition-all duration-300 cursor-pointer text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // 4. Authenticated & authorized view (Admin Panel)
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 py-12 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top bar header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm transition-colors duration-300">
          <div>
            <h1 className="text-2xl font-black">CMS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Dashboard</span></h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-450 mt-1">Logged in as {session?.user?.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white font-semibold text-xs py-2 px-4 rounded-xl transition-colors duration-300 cursor-pointer"
          >
            Sign Out
          </button>
        </div>

        {/* Status Alerts */}
        {errorMsg && (
          <div className="bg-rose-100/50 dark:bg-rose-950/15 border border-rose-200 dark:border-rose-900/30 text-rose-700 dark:text-rose-400 p-4 rounded-xl text-sm font-medium">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="bg-emerald-100/50 dark:bg-emerald-950/15 border border-emerald-200 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 p-4 rounded-xl text-sm font-medium">
            {successMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Manage / Input Form */}
          <div className="lg:col-span-1 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm transition-colors duration-300 self-start">
            <h2 className="text-lg font-bold mb-4">{editingItem ? "Edit Konten" : "Tambah Konten Baru"}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500">Judul Artikel</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Bongkar rahasia code..."
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500">Tag / Kategori</label>
                <input
                  type="text"
                  required
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Python & Otomasi"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-colors"
                >
                  <option value="TikTok Video">TikTok Video</option>
                  <option value="Instagram Post">Instagram Post</option>
                  <option value="Featured Article">Featured Article</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500">URL Link</label>
                <input
                  type="url"
                  required
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://tiktok.com/..."
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  {editingItem ? "Perbarui" : "Simpan"}
                </button>
                {editingItem && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white font-semibold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Column 2: Items List & Slot Tracking */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Slot counter progress */}
            <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm transition-colors duration-300">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold">Slot Terpakai</span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  {articles.length} / 6
                </span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-500" 
                  style={{ width: `${(articles.length / 6) * 100}%` }}
                />
              </div>
            </div>

            {/* List items block */}
            <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm transition-colors duration-300">
              <h2 className="text-lg font-bold mb-4">Daftar Konten Aktif</h2>

              {loadingArticles ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-16 bg-zinc-200 dark:bg-zinc-850 rounded-xl"></div>
                  <div className="h-16 bg-zinc-200 dark:bg-zinc-850 rounded-xl"></div>
                </div>
              ) : articles.length === 0 ? (
                <div className="text-center py-8 text-zinc-500">Belum ada konten ditambahkan.</div>
              ) : (
                <div className="space-y-4">
                  {articles.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/20 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">{item.tag}</span>
                          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-200/50 dark:bg-zinc-900 px-2 py-0.5 rounded">{item.platform}</span>
                        </div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug">{item.title}</h4>
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-xs text-emerald-600 hover:underline inline-flex items-center gap-1 font-medium truncate max-w-xs"
                        >
                          Link: {item.link}
                        </a>
                      </div>

                      <div className="flex gap-2 sm:self-center shrink-0">
                        <button
                          onClick={() => handleEditInit(item)}
                          className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white font-semibold text-xs py-2 px-3 rounded-lg transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs py-2 px-3 rounded-lg transition-colors cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
