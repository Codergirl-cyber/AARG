"use client";

import React, { useState, useEffect, useRef } from "react";
import { domains } from "@/content/domains";
import { vehicles } from "@/content/vehicles";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import DecryptText from "@/components/DecryptText";
import { Wrench, Battery, Cpu, Landmark, Compass, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Domain to Vehicle Mapping
const domainToVehicles: Record<string, string[]> = {
  "aerodynamics-design": ["fixed-wing-micro"],
  "structures-fabrication": ["fixed-wing-micro", "heavy-lift-octocopter"],
  "avionics-controls": ["heavy-lift-octocopter"],
  "propulsion-power": ["heavy-lift-octocopter"],
  "business-sponsorship": ["fixed-wing-micro", "heavy-lift-octocopter"],
};

// Icon mapper for technical subteams
const getSubteamIcon = (id: string, size = "w-5 h-5") => {
  switch (id) {
    case "aerodynamics-design":   return <Compass className={`${size} text-primary-accent`} />;
    case "structures-fabrication": return <Wrench className={`${size} text-primary-accent`} />;
    case "avionics-controls":     return <Cpu className={`${size} text-primary-accent`} />;
    case "propulsion-power":      return <Battery className={`${size} text-primary-accent`} />;
    case "business-sponsorship":  return <Landmark className={`${size} text-primary-accent`} />;
    default:                      return <Cpu className={`${size} text-primary-accent`} />;
  }
};

// Framer Motion variants for staggered responsibilities list
const listContainerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const listItemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 120 } },
};

export default function Domains() {
  const shouldReduceMotion = useReducedMotion();
  // Default to first domain selected
  const [selectedDomainId, setSelectedDomainId] = useState<string>(domains[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDomain = domains.find((d) => d.id === selectedDomainId)!;

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col min-h-screen bg-bg-base py-12 md:py-20 px-4 md:px-8 overflow-hidden"
    >
      {/* HUD Background Overlays */}
      <div className="absolute inset-0 hud-grid pointer-events-none opacity-30" />
      <div className="absolute inset-0 hud-grid-fine pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* SECTION 1: DOMAINS — Tabbed Rail + Full-Width Panel */}
        <div className="flex flex-col gap-10">
          <div className="border-b border-secondary-accent/15 pb-6">
            <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary-accent" />
              <DecryptText text="/// UAV_SYSTEMS_DIVISIONS // STRUCTURES" />
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-secondary-accent uppercase tracking-tight mt-2">
              TECHNICAL DOMAINS
            </h1>
            <p className="text-secondary-accent/60 font-mono text-[11px] mt-1">
              {"ENGINEERING MATRIX // 5 ACTIVE SYSTEM CATEGORIES // SELECT TO ACCESS"}
            </p>
          </div>

          {/* Mobile: horizontal tab strip */}
          <div className="flex md:hidden overflow-x-auto -mx-4 px-4 gap-0 border border-secondary-accent/12 relative">
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />
            {domains.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setSelectedDomainId(domain.id)}
                className={`flex flex-col items-center gap-1.5 px-4 py-3 border-b-2 transition-all shrink-0 cursor-pointer ${
                  selectedDomainId === domain.id
                    ? "border-primary-accent text-primary-accent bg-primary-accent/5"
                    : "border-transparent text-secondary-accent/40 hover:text-secondary-accent/70"
                }`}
              >
                {getSubteamIcon(domain.id, "w-4 h-4")}
                <span className="font-mono text-[8px] uppercase tracking-wider whitespace-nowrap">
                  {domain.name.split(" &")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Desktop: left rail + right panel */}
          <div className="hidden md:grid grid-cols-12 gap-0 border border-secondary-accent/15 relative min-h-[420px]">
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />

            {/* Left Rail */}
            <div className="col-span-3 border-r border-secondary-accent/12 flex flex-col divide-y divide-secondary-accent/8">
              {/* Rail header */}
              <div className="px-4 py-3 border-b border-secondary-accent/15">
                <span className="font-mono text-[9px] text-secondary-accent/35 uppercase tracking-widest">
                  // SELECT DOMAIN
                </span>
              </div>
              {domains.map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomainId(domain.id)}
                  className={`domain-rail-item w-full text-left ${selectedDomainId === domain.id ? "active" : ""}`}
                >
                  <span className="shrink-0">{getSubteamIcon(domain.id, "w-4 h-4")}</span>
                  <span className="truncate leading-tight">
                    {domain.name}
                  </span>
                  {selectedDomainId === domain.id && (
                    <ChevronRight className="w-3 h-3 text-primary-accent ml-auto shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {/* Right Panel */}
            <div className="col-span-9" id="domain-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDomain.id}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, x: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 h-full flex flex-col gap-6"
                >
                  {/* Domain header */}
                  <div className="flex flex-col gap-2 border-b border-secondary-accent/10 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 border border-secondary-accent/15 bg-bg-base">
                        {getSubteamIcon(selectedDomain.id, "w-6 h-6")}
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-primary-accent/70 uppercase tracking-widest block">
                          {selectedDomain.focus}
                        </span>
                        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-secondary-accent uppercase tracking-tight leading-none mt-0.5">
                          {selectedDomain.name}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <p className="font-sans text-sm md:text-base text-secondary-accent/80 leading-relaxed max-w-2xl">
                    {selectedDomain.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-mono text-[10px] text-primary-accent font-bold uppercase tracking-wider">
                      CORE RESPONSIBILITIES:
                    </h3>
                    <motion.ul
                      variants={listContainerVariants}
                      initial="hidden"
                      animate="show"
                      key={selectedDomain.id + "-list"}
                      className="space-y-2"
                    >
                      {selectedDomain.responsibilities.map((resp) => (
                        <motion.li
                          variants={listItemVariants}
                          key={resp}
                          className="flex items-start gap-2 font-sans text-sm text-secondary-accent/70 leading-relaxed"
                        >
                          <span className="text-primary-accent font-mono text-[11px] mt-0.5 shrink-0">▸</span>
                          <span>{resp}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  {/* Tool tags */}
                  {selectedDomain.tools && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-secondary-accent/10">
                      {selectedDomain.tools.map((tool) => (
                        <span
                          key={tool}
                          className="font-mono text-[9px] px-2 py-1 border border-secondary-accent/12 bg-bg-base text-secondary-accent/50 uppercase tracking-wide"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile domain panel (below tab strip) */}
          <div className="md:hidden border border-secondary-accent/12 relative">
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDomain.id + "-mobile"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="p-6 flex flex-col gap-5"
              >
                <div>
                  <span className="font-mono text-[9px] text-primary-accent/70 uppercase tracking-widest">{selectedDomain.focus}</span>
                  <h2 className="font-display text-2xl font-extrabold text-secondary-accent uppercase mt-1">{selectedDomain.name}</h2>
                </div>
                <p className="font-sans text-sm text-secondary-accent/80 leading-relaxed">{selectedDomain.description}</p>
                <ul className="space-y-2">
                  {selectedDomain.responsibilities.map((resp) => (
                    <li key={resp} className="flex items-start gap-2 font-sans text-sm text-secondary-accent/70">
                      <span className="text-primary-accent font-mono text-[11px] mt-0.5 shrink-0">▸</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
                {selectedDomain.tools && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-secondary-accent/10">
                    {selectedDomain.tools.map((tool) => (
                      <span key={tool} className="font-mono text-[9px] px-2 py-1 border border-secondary-accent/12 bg-bg-base text-secondary-accent/50">
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* SECTION 2: VEHICLE SPEC DOSSIERS — Full-width, stacked */}
        <div className="flex flex-col gap-10">
          <div className="border-b border-secondary-accent/15 pb-6">
            <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary-accent" />
              <DecryptText text="/// PHYSICAL_DEPLOYMENT_SPEC // VEHICLE_PORTFOLIO" />
            </span>
            <h2 className="font-display text-3xl font-extrabold text-secondary-accent uppercase tracking-tight mt-2">
              UAV VEHICLE SPECIFICATION SHEETS
            </h2>
            <p className="text-secondary-accent/60 font-mono text-[11px] mt-1">
              {"FLEET STATUS: 2 COMPETITION HULLS // HIGHLIGHTED ON DOMAIN LINK"}
            </p>
          </div>

          <div className="flex flex-col gap-0">
            {vehicles.map((vehicle, index) => {
              const isRelated = domainToVehicles[selectedDomainId]?.includes(vehicle.id);
              return (
                <ScrollReveal key={vehicle.id} delay={0.1 * index}>
                  <div
                    id={`vehicle-card-${vehicle.id}`}
                    className={`relative grid grid-cols-1 lg:grid-cols-12 gap-0 transition-all duration-400 ${
                      index > 0 ? "border-t border-secondary-accent/15" : ""
                    } ${isRelated ? "bg-primary-accent/3" : ""}`}
                  >
                    {/* Accent line on left edge when related */}
                    {isRelated && (
                      <motion.div
                        layoutId="vehicle-highlight"
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary-accent shadow-[0_0_12px_rgba(180,77,11,0.5)]"
                      />
                    )}

                    {/* Left: large image + identity */}
                    <div className={`lg:col-span-5 flex flex-col gap-0 py-8 md:py-10 px-6 md:px-10 ${index % 2 === 0 ? "lg:pl-10 lg:pr-10" : "lg:pl-10 lg:pr-10 lg:order-2"}`}>
                      {/* Image area */}
                      <div className="relative aspect-video w-full border border-secondary-accent/12 bg-surface/50 mb-6 overflow-hidden">
                        <div className="hud-corner hud-corner-tl" />
                        <div className="hud-corner hud-corner-tr" />
                        <div className="hud-corner hud-corner-bl" />
                        <div className="hud-corner hud-corner-br" />
                        <Image
                          src="/images/gallery_flight_1.png"
                          alt={vehicle.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 500px"
                          className="object-cover p-1"
                        />
                        {isRelated && (
                          <div className="absolute top-2 right-2 font-mono text-[8px] text-primary-accent bg-bg-base/90 border border-primary-accent/40 px-2 py-0.5 uppercase tracking-widest">
                            ● LINKED
                          </div>
                        )}
                      </div>

                      {/* Identity */}
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] text-primary-accent font-bold uppercase tracking-widest">
                          {"///"} {vehicle.category.toUpperCase()}
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-secondary-accent uppercase">
                          {vehicle.name}
                        </h3>
                        <div className="font-mono text-[9px] text-secondary-accent/40 uppercase mt-0.5">
                          {"COMPETITION //"} {vehicle.competition}
                        </div>
                      </div>
                    </div>

                    {/* Right: spec rows + description + features */}
                    <div className={`lg:col-span-7 flex flex-col gap-6 py-8 md:py-10 px-6 md:px-10 ${index % 2 === 0 ? "lg:pl-10 lg:pr-10 lg:border-l border-secondary-accent/12" : "lg:pl-10 lg:pr-10 lg:border-r border-secondary-accent/12"}`}>
                      
                      <p className="font-sans text-sm md:text-base text-secondary-accent/80 leading-relaxed">
                        {vehicle.description}
                      </p>

                      {/* HUD Spec rows — full-width label/value pairs, not in a nested box */}
                      <div className="flex flex-col gap-0">
                        <div className="font-mono text-[10px] text-primary-accent font-bold uppercase tracking-widest border-b border-secondary-accent/15 pb-2 mb-1">
                          {"// HUD_SPEC_TELEMETRY"}
                        </div>
                        {vehicle.specs.map((spec) => (
                          <div
                            key={spec.label}
                            className="flex justify-between items-baseline py-2.5 border-b border-secondary-accent/8 font-mono text-xs"
                          >
                            <span className="text-secondary-accent/45 uppercase tracking-wide">{spec.label}</span>
                            <span className="text-secondary-accent font-bold text-right ml-4">
                              <DecryptText text={spec.value} />
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="font-mono text-[10px] text-primary-accent font-bold uppercase tracking-wider mb-3">
                          {"// COMPONENT ATTRIBUTES:"}
                        </h4>
                        <ul className="space-y-2">
                          {vehicle.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2 font-sans text-sm text-secondary-accent/70 leading-relaxed">
                              <span className="text-primary-accent font-mono text-[11px] mt-0.5 shrink-0">▸</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
