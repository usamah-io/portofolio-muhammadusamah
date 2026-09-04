import Hero from "@/components/hero";
import HeroImageCard from "@/components/HeroImageCard";
import About from "@/components/about";
import Projects from "@/components/projects";
import Volunteer from "@/components/volunteer";

export default function Home() {
  return (
    <main className="flex-1 w-full bg-transparent text-foreground relative z-10">
      {/* 1. Hero Section (Dual-Text Offset Header + Hero Footer Bar) */}
      <Hero />

      {/* 2. Hero Image Showcase Card (250ms Rapid Slideshow + ScrollTrigger Rotation) */}
      <HeroImageCard />

      {/* 3. About Section di Beranda (Hi, I'm Usamah + Portrait rotate 6deg) */}
      <About />

      {/* 4. Section Proyek Unggulan (3D Fly-Through 10 Cards + 500vw Title Strip Pinned GSAP) */}
      <Projects />

      {/* 5. Section Experience & Volunteer (GSAP Pinned Stacking Cards + Lightbox Modal) */}
      <Volunteer />
    </main>
  );
}
