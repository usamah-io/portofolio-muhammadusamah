import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Volunteer from "@/components/volunteer";

export default function Home() {
  return (
    <main className="flex-1 w-full bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {/* 1. Hero Section (Profil Singkat) */}
      <Hero />

      {/* 2. Section Proyek Utama */}
      <div id="projects" className="border-t border-gray-200 dark:border-zinc-800/80 bg-white dark:bg-[#0a0a0c] text-gray-900 dark:text-white transition-colors duration-300">
        <Projects />
      </div>

      {/* 3. Section Dokumentasi Volunteer (Browser Mockup Video Cards) */}
      <div id="volunteer-section" className="border-t border-gray-200 dark:border-zinc-800/80 bg-gray-50/60 dark:bg-[#0d0d10] text-gray-900 dark:text-white transition-colors duration-300">
        <Volunteer />
      </div>
    </main>
  );
}
