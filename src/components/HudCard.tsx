"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface HudCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  corners?: boolean;
  hoverGlow?: boolean; // Keep for interface compatibility, mapped to spotlight
  eyebrow?: string;
  title?: string;
}

export default function HudCard({
  children,
  corners = false, // Changed default to false
  hoverGlow = true,
  eyebrow,
  title,
  className = "",
  ...props
}: HudCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const cardVariants = {
    initial: { y: 0 },
    hover: { 
      y: shouldReduceMotion ? 0 : -3,
      borderColor: "rgba(255, 255, 255, 0.12)",
      transition: { type: "spring", stiffness: 300, damping: 22 }
    }
  };

  if (shouldReduceMotion) {
    return (
      <div
        className={`relative bg-surface-mid border border-white/5 rounded-md p-6 md:p-8 transition-all duration-300 ${className}`}
        {...props}
      >
        {corners && (
          <>
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />
          </>
        )}
        {(eyebrow || title) && (
          <div className="mb-4 border-b border-white/5 pb-3 font-mono relative z-10">
            {eyebrow && (
              <div className="text-[9px] uppercase tracking-widest text-primary-accent font-bold">
                {"///"} {eyebrow}
              </div>
            )}
            {title && (
              <h3 className="font-display text-base md:text-lg font-bold tracking-tight text-white uppercase mt-1">
                {title}
              </h3>
            )}
          </div>
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      className={`relative bg-surface-mid border border-white/5 rounded-md p-6 md:p-8 overflow-hidden group card-spotlight transition-colors duration-300 ${className}`}
      {...(props as any)}
    >
      {/* Background Spotlight Radial Gradient Overlay */}
      {hoverGlow && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.045), transparent 80%)`,
          }}
        />
      )}

      {/* Target Reticle Corners - reserved for specialized elements */}
      {corners && (
        <>
          <div className="hud-corner hud-corner-tl !border-white/20" />
          <div className="hud-corner hud-corner-tr !border-white/20" />
          <div className="hud-corner hud-corner-bl !border-white/20" />
          <div className="hud-corner hud-corner-br !border-white/20" />
        </>
      )}

      {/* Card Header Content */}
      {(eyebrow || title) && (
        <div className="mb-4 border-b border-white/5 pb-3 font-mono relative z-10">
          {eyebrow && (
            <div className="text-[9px] uppercase tracking-widest text-primary-accent font-bold">
              {"///"} {eyebrow}
            </div>
          )}
          {title && (
            <h3 className="font-display text-base md:text-lg font-bold tracking-tight text-white uppercase mt-1">
              {title}
            </h3>
          )}
        </div>
      )}

      {/* Main card body */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
