import Hero from "@/components/hero";
import About from "@/components/about";
import Stats from "@/components/stats";
import Projects from "@/components/projects";
import FAQ from "@/components/faq";
import Articles from "@/components/articles";

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <Hero />
      <div id="about" className="border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950">
        <About />
      </div>
      {/* Dynamic placeholders for stats, projects, articles, FAQ sections to correspond to nav links */}
      <div id="stats" className="border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950/50">
        <Stats />
      </div>
      <div id="projects" className="border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950">
        <Projects />
      </div>
      <div id="articles" className="border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950/50">
        <Articles />
      </div>
      <div id="faq" className="border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950">
        <FAQ />
      </div>
    </main>
  );
}
