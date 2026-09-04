"use client";

import { useMemo } from "react";

export default function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: `${(i * 4.5 + (i % 5) * 3) % 95 + 2}%`,
      delay: `${(i * 0.6) % 7}s`,
      drift: `${(i % 2 === 0 ? 1 : -1) * (15 + (i % 4) * 10)}px`,
    }));
  }, []);

  return (
    <div className="home-particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="home-particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            ["--particle-drift" as any]: p.drift,
          }}
        />
      ))}
    </div>
  );
}
