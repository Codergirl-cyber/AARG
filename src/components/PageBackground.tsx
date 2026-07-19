"use client";

import React from "react";

const pageDots = Array.from({ length: 560 }, (_, index) => {
  const seeded = index * 83 + 19;
  const rand = (n: number) => Math.abs((Math.sin(n) * 10000) % 1);
  const x = 1 + Math.floor(rand(seeded) * 97);
  const y = 2 + Math.floor(rand(seeded + 23) * 94);
  const size = 0.8 + rand(seeded + 7) * 1.0;
  const dx = Math.floor(rand(seeded + 17) * 18) - 9;
  const dy = Math.floor(rand(seeded + 29) * 18) - 9;
  const delay = `${-(rand(seeded + 11) * 9.5).toFixed(2)}s`;
  const duration = `${2.4 + rand(seeded + 13) * 2.8}s`;
  return {
    left: `${Math.min(x, 98)}%`,
    top: `${Math.min(y, 96)}%`,
    size,
    dx,
    dy,
    delay,
    duration,
  };
});

/** Same drifting dots background used on the Home narrative section. */
export default function PageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {pageDots.map((dot, index) => (
        <span
          key={index}
          className="scroll-dot"
          style={{
            left: dot.left,
            top: dot.top,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animationDelay: dot.delay,
            animationDuration: dot.duration,
            ["--dx" as string]: `${dot.dx}px`,
            ["--dy" as string]: `${dot.dy}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
