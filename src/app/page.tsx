import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Volunteer from "@/components/volunteer";

export default function Home() {
  return (
    <main className="flex-1 w-full bg-transparent text-gray-900 dark:text-white transition-colors duration-300 relative z-10">
      {/* 1. Hero Section Singkat */}
      <Hero />

      {/* 2. Section Proyek Unggulan */}
      <div id="projects" className="border-t border-gray-200/40 dark:border-zinc-800/40 bg-transparent text-gray-900 dark:text-white transition-colors duration-300 relative z-10">
        <Projects />
      </div>

      {/* 3. Section Volunteer */}
      <div id="volunteer-section" className="border-t border-gray-200/40 dark:border-zinc-800/40 bg-transparent text-gray-900 dark:text-white transition-colors duration-300 relative z-10">
        <Volunteer />
      </div>
    </main>
  );
}
