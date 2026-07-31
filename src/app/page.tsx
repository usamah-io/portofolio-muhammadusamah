import Hero from "@/components/hero";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <main className="flex-1 w-full">
      {/* 1. Hero Section (Profil Singkat) */}
      <Hero />

      {/* 2. Section Proyek Utama */}
      <div id="projects" className="border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950">
        <Projects />
      </div>
    </main>
  );
}
