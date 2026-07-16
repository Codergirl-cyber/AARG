"use client";

import React, { useRef } from "react";
import { achievementsData, Award } from "@/content/achievements";
import ScrollReveal from "@/components/ScrollReveal";
import DecryptText from "@/components/DecryptText";
import { Calendar, MapPin } from "lucide-react";
import { motion, useScroll, useSpring, useInView, useReducedMotion } from "framer-motion";

// Custom Timeline Node — flat editorial layout, no HudCard wrapper
function TimelineNode({ award, index }: { award: Award; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const nodeRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(nodeRef, { 
    once: false, 
    margin: "-10% 0px -30% 0px"
  });

  if (shouldReduceMotion) {
    return (
      <div className="relative flex flex-col gap-3 pl-4 border-l border-secondary-accent/15 py-5">
        <div className="absolute left-[-5px] top-7 w-2.5 h-2.5 rounded-full bg-primary-accent" />
        <div className="pl-6 md:pl-8 flex flex-col gap-3">
          {/* Year + Rank header row */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-secondary-accent/45 uppercase">
              <Calendar className="w-3 h-3" /> {award.year}
            </div>
            <span className="font-mono text-[10px] text-primary-accent font-extrabold uppercase border-b border-primary-accent/40 pb-0.5">
              {award.rank}
            </span>
          </div>
          {/* Title + Competition */}
          <div>
            <h4 className="font-display text-lg md:text-xl font-extrabold text-secondary-accent uppercase leading-tight">
              {award.title}
            </h4>
            <p className="font-mono text-[10px] text-secondary-accent/35 uppercase mt-1 tracking-wider">
              {award.competition}
            </p>
          </div>
          {/* Description */}
          <p className="font-sans text-sm text-secondary-accent/70 leading-relaxed max-w-2xl">
            {award.description}
          </p>
          {/* Location tag */}
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-secondary-accent/35 uppercase tracking-wide mt-1">
            <MapPin className="w-3 h-3 text-primary-accent/60" /> {award.location}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={nodeRef} className="relative flex flex-col gap-3 items-start pb-10">
      {/* Timeline Node Marker */}
      <div className="absolute left-[-26px] md:left-[-38px] top-7 z-10 flex items-center justify-center">
        {/* Outer pulse ring */}
        <motion.div
          animate={isInView ? { scale: [1, 1.9, 1], opacity: [0.08, 0.5, 0.08] } : { scale: 1, opacity: 0.08 }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="absolute w-7 h-7 rounded-full bg-primary-accent/30 pointer-events-none"
        />
        {/* Core dot */}
        <motion.div
          animate={isInView ? { 
            backgroundColor: "#b44d0b", 
            scale: 1.3, 
            boxShadow: "0 0 12px #b44d0b",
            borderColor: "#b44d0b"
          } : { 
            backgroundColor: "#111318", 
            scale: 1, 
            boxShadow: "none",
            borderColor: "rgba(209, 202, 191, 0.2)"
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="w-3.5 h-3.5 rounded-full border-2 bg-surface"
        />
      </div>

      {/* Content — slide+fade reveal */}
      <motion.div
        initial={{ opacity: 0, x: 28 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pl-6 md:pl-8 flex flex-col gap-3"
      >
        {/* Year + Rank row — sits directly on page background */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-secondary-accent/40 uppercase tracking-wide">
            <Calendar className="w-3 h-3" /> {award.year}
          </div>
          <span className="font-mono text-sm font-extrabold text-primary-accent uppercase border-b border-primary-accent/50 pb-0.5 leading-tight">
            {award.rank}
          </span>
        </div>

        {/* Title */}
        <div>
          <h4 className="font-display text-lg md:text-xl font-extrabold text-secondary-accent uppercase leading-tight">
            {award.title}
          </h4>
          <p className="font-mono text-[10px] text-secondary-accent/35 uppercase mt-1 tracking-wider">
            {award.competition}
          </p>
        </div>

        {/* Description */}
        <p className="font-sans text-sm md:text-base text-secondary-accent/70 leading-relaxed max-w-2xl">
          {award.description}
        </p>

        {/* Location footer tag */}
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-secondary-accent/35 uppercase tracking-wide">
          <MapPin className="w-3 h-3 text-primary-accent/60" /> {award.location}
        </div>
      </motion.div>
    </div>
  );
}

export default function Achievements() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking for the timeline track fill
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, { 
    stiffness: 80, 
    damping: 25, 
    restDelta: 0.001 
  });

  return (
    <div className="relative w-full flex flex-col min-h-screen bg-bg-base py-12 md:py-20 px-4 md:px-8">
      {/* HUD background grid textures */}
      <div className="absolute inset-0 hud-grid pointer-events-none opacity-30" />
      <div className="absolute inset-0 hud-grid-fine pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            <DecryptText text="/// COMP_HISTORY_LOG // ACHIEVEMENTS" />
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-accent uppercase tracking-tight mt-2">
            Victories &amp; Accreditations
          </h1>
          <p className="text-secondary-accent/60 font-mono text-[11px] mt-1">
            RECORD_DATABASE // PODIUMS SECURED
          </p>
        </div>

        {/* FLAGSHIP CAMPAIGN SPOTLIGHT — kept as full-width editorial panel */}
        <ScrollReveal>
          <div className="border border-primary-accent/35 bg-surface/30 p-6 md:p-10 relative flex flex-col gap-8">
            <div className="hud-corner hud-corner-tl !border-primary-accent" />
            <div className="hud-corner hud-corner-tr !border-primary-accent" />
            <div className="hud-corner hud-corner-bl !border-primary-accent" />
            <div className="hud-corner hud-corner-br !border-primary-accent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Written Narrative */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <span className="font-mono text-xs text-primary-accent tracking-widest uppercase font-semibold">
                  <DecryptText text="/// FEATURED FLIGHT SPOTLIGHT" />
                </span>
                <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-accent uppercase leading-tight">
                  {achievementsData.spotlight.title}
                </h2>
                <h3 className="font-mono text-xs text-secondary-accent/55 uppercase">
                  {achievementsData.spotlight.subtitle}
                </h3>
                
                <div className="font-sans text-sm md:text-base text-secondary-accent/80 space-y-3 leading-relaxed mt-2">
                  {achievementsData.spotlight.narrative.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Spotlight telemetry metrics */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="border border-secondary-accent/15 bg-bg-base/80 p-5 font-mono text-[10px] relative flex flex-col gap-2">
                  <div className="hud-corner hud-corner-tl" />
                  <div className="hud-corner hud-corner-tr" />
                  <div className="hud-corner hud-corner-bl" />
                  <div className="hud-corner hud-corner-br" />

                  <div className="text-primary-accent font-bold border-b border-secondary-accent/15 pb-1 uppercase text-[10px]">
                    {"// MISSION_FLIGHT_LOGS"}
                  </div>

                  {achievementsData.spotlight.metrics.map((metric) => (
                    <div key={metric.label} className="flex justify-between border-b border-secondary-accent/5 py-1.5 text-secondary-accent/80">
                      <span className="font-semibold uppercase">{metric.label}:</span>
                      <span className="text-primary-accent font-bold text-xs">
                        <DecryptText text={metric.value} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* AWARDS REGISTRY TIMELINE TRACK */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <h3 className="font-mono text-[10px] font-bold text-secondary-accent uppercase tracking-widest">
              {"// AWARD REGISTRY HISTORY"}
            </h3>
            <div className="flex-1 hud-divider-h" />
          </div>

          <div 
            ref={timelineRef}
            className="relative flex flex-col gap-2 pl-6 md:pl-10 max-w-4xl mx-auto w-full"
          >
            {/* Timeline track fill line */}
            {!shouldReduceMotion && (
              <div className="absolute left-[3px] md:left-[5px] top-6 bottom-6 w-[2px] bg-secondary-accent/8 pointer-events-none z-0">
                <motion.div
                  style={{ scaleY, transformOrigin: "top" }}
                  className="w-full h-full bg-primary-accent shadow-[0_0_8px_#b44d0b]"
                />
              </div>
            )}

            {achievementsData.awards.map((award, index) => (
              <TimelineNode key={award.id} award={award} index={index} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
