"use client";

import { motion } from "framer-motion";

export default function LetsTalkMarquee() {
  const marqueeItems = Array(8).fill("LET'S TALK •");

  return (
    <div className="w-full overflow-hidden bg-black py-6 border-y border-zinc-800/60 select-none relative z-10">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex whitespace-nowrap shrink-0 items-center gap-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 18,
            ease: "linear",
          }}
        >
          {marqueeItems.concat(marqueeItems).map((text, idx) => (
            <span key={idx} className="shrink-0">
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
