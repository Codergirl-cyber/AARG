"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { domains } from "@/content/domains";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function DomainRadar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Auto-cycle through domains every 4.5 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % domains.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, activeIndex]);

  const activeDomain = domains[activeIndex];

  // SVG dimensions for the radar layout
  const CENTER = 170;
  const RADIUS = 130;

  // Calculate trigonometric positioning for 5 nodes (72 degrees apart, starting at 12 o'clock / -90 degrees)
  const nodeCoordinates = Array.from({ length: 5 }).map((_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const x = CENTER + RADIUS * Math.cos(angle);
    const y = CENTER + RADIUS * Math.sin(angle);
    return { x, y };
  });

  // Crossfade transitions for the panel content (slight vertical slide, disabled if motion is reduced)
  const panelVariants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -12,
    },
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full"
    >
      {/* 1. Radar display container (left/top, ~40% width on desktop) */}
      <div className="col-span-1 lg:col-span-5 flex justify-center items-center relative py-4 lg:py-8">
        <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] flex items-center justify-center select-none">
          {/* Static precision ring — no sweep animation */}

          {/* SVG Radar Graphics */}
          <svg
            viewBox="0 0 340 340"
            className="w-full h-full absolute inset-0 z-10 pointer-events-none"
          >
            {/* Concentric rings */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={130}
              stroke="var(--color-secondary-accent)"
              strokeOpacity="0.12"
              fill="none"
              strokeWidth="1.5"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={90}
              stroke="var(--color-secondary-accent)"
              strokeOpacity="0.08"
              fill="none"
              strokeWidth="1"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={50}
              stroke="var(--color-secondary-accent)"
              strokeOpacity="0.08"
              fill="none"
              strokeWidth="1"
            />

            {/* Faint crosshairs */}
            <line
              x1={CENTER}
              y1={20}
              x2={CENTER}
              y2={320}
              stroke="var(--color-secondary-accent)"
              strokeOpacity="0.12"
              strokeDasharray="4 4"
            />
            <line
              x1={20}
              y1={CENTER}
              x2={320}
              y2={CENTER}
              stroke="var(--color-secondary-accent)"
              strokeOpacity="0.12"
              strokeDasharray="4 4"
            />

            {/* Spoke lines to each node */}
            {nodeCoordinates.map((coords, i) => {
              const isActive = activeIndex === i;
              return (
                <line
                  key={i}
                  x1={CENTER}
                  y1={CENTER}
                  x2={coords.x}
                  y2={coords.y}
                  stroke={
                    isActive
                      ? "var(--color-primary-accent)"
                      : "var(--color-secondary-accent)"
                  }
                  strokeOpacity={isActive ? "0.8" : "0.15"}
                  strokeWidth={isActive ? "1.5" : "1"}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Dead center crosshair dot — no glow */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={3}
              fill="var(--color-primary-accent)"
              opacity="0.85"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={8}
              fill="none"
              stroke="var(--color-primary-accent)"
              strokeOpacity="0.25"
              strokeWidth="0.8"
            />
          </svg>

          {/* Interactive node buttons (placed absolutely on top of the SVG) */}
          {nodeCoordinates.map((coords, i) => {
            const domain = domains[i];
            const isActive = activeIndex === i;

            // Calculate percentage positioning for responsive scaling
            const percentageX = (coords.x / 340) * 100;
            const percentageY = (coords.y / 340) * 100;

            return (
              <button
                key={domain.id}
                onClick={() => {
                  setActiveIndex(i);
                  setIsHovered(true);
                }}
                onMouseEnter={() => {
                  setActiveIndex(i);
                  setIsHovered(true);
                }}
                onFocus={() => {
                  setActiveIndex(i);
                  setIsHovered(true);
                }}
                onBlur={() => setIsHovered(false)}
                aria-label={`View ${domain.name} domain`}
                aria-pressed={isActive}
                className="absolute flex flex-col items-center justify-center focus-hud rounded-none cursor-pointer z-20 group transition-transform duration-300"
                style={{
                  left: `${percentageX}%`,
                  top: `${percentageY}%`,
                  transform: `translate(-50%, -50%) ${
                    isActive ? "scale(1.15)" : "scale(1)"
                  }`,
                  width: "48px",
                  height: "48px",
                }}
              >
                {/* Active ring — precision CAD indicator, no ping */}
                {isActive && (
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="w-5 h-5 rounded-full border border-primary-accent/50" />
                  </span>
                )}

                {/* Node dot graphic — no neon shadow */}
                <div
                  className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? "bg-primary-accent border-primary-accent"
                      : "bg-bg-base border-secondary-accent/35 group-hover:border-primary-accent/60"
                  }`}
                />

                {/* Two-digit index label underneath node */}
                <span
                  className={`absolute top-[36px] font-mono text-[9px] tracking-wider transition-colors duration-300 ${
                    isActive
                      ? "text-primary-accent font-bold"
                      : "text-secondary-accent/50 group-hover:text-secondary-accent/90"
                  }`}
                >
                  {`0${i + 1}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Detail readout panel (right/bottom, ~60% width on desktop) */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-stretch">
        <div className="relative border border-secondary-accent/12 bg-surface-low p-6 md:p-8 rounded-none min-h-[460px] sm:min-h-[400px] md:min-h-[380px] lg:min-h-[420px] flex flex-col justify-between">
          {/* Precision top-edge accent bar instead of corner decals */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-accent/30 to-transparent pointer-events-none" />

          {/* AnimatePresence for clean transition when domains change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full flex flex-col justify-between h-full flex-grow"
            >
              <div>
                {/* Header row */}
                <div className="flex justify-between items-center border-b border-secondary-accent/15 pb-2.5 mb-5 font-mono text-[10px] uppercase tracking-wider">
                  <span className="text-primary-accent font-bold">
                    // DOMAIN_0{activeIndex + 1}
                  </span>
                  <span className="text-secondary-accent/60 text-right">
                    {activeDomain.focus}
                  </span>
                </div>

                {/* Domain name */}
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-secondary-accent uppercase tracking-tight mb-4">
                  {activeDomain.name}
                </h3>

                {/* Description */}
                <p className="text-secondary-accent/80 font-sans text-sm md:text-base leading-relaxed mb-6">
                  {activeDomain.description}
                </p>

                {/* Responsibilities list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                  {activeDomain.responsibilities.slice(0, 4).map((resp, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs md:text-sm text-secondary-accent/75 font-sans leading-snug"
                    >
                      <span className="text-primary-accent font-mono select-none">
                        ▸
                      </span>
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tools pill tags row */}
                {activeDomain.tools && activeDomain.tools.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-5 border-t border-secondary-accent/10">
                    {activeDomain.tools.map((tool) => (
                      <span
                        key={tool}
                        className="border border-secondary-accent/15 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-secondary-accent/40 bg-surface/30"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bottom link */}
                <div className="mt-6 pt-2 flex justify-start">
                  <Link
                    href="/domains"
                    className="font-mono text-xs font-bold text-primary-accent hover:text-secondary-accent transition-colors duration-250 flex items-center gap-1.5 focus-hud rounded-none"
                  >
                    // EXPLORE FULL DOMAIN BRIEFING{" "}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
