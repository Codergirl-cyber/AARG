"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import ScrollReveal from "@/components/ScrollReveal";
import DecryptText from "@/components/DecryptText";
import { Target, Compass } from "lucide-react";

export default function About() {
  return (
    <div className="relative w-full flex flex-col min-h-screen bg-bg-base py-12 md:py-20 px-4 md:px-8">
      {/* HUD background grid textures */}
      <div className="absolute inset-0 hud-grid pointer-events-none opacity-40" />
      <div className="absolute inset-0 hud-grid-fine pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            <DecryptText text="/// OPERATIONAL SYSTEM // ABOUT_AARG" />
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-accent uppercase tracking-tight mt-2">
            Who We Are &amp; Why We Fly
          </h1>
          <p className="text-secondary-accent/60 font-mono text-[11px] mt-1">
            {"REGISTRY // STATUS: ACTIVE // HOST_COLLEGE:"} {siteConfig.college}
          </p>
        </div>

        {/* Layout: editorial text left, affiliation panel right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Editorial text blocks — no card wrappers */}
          <div className="lg:col-span-7 flex flex-col gap-16">

            {/* Section 01 — The Team */}
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col gap-5">
                {/* Eyebrow */}
                <div className="flex items-center gap-4">
                  <span className="font-mono text-2xl md:text-3xl font-semibold text-primary-accent leading-none opacity-70">01</span>
                  <div className="hud-divider-v" style={{ height: "2.5rem" }} />
                  <span className="font-mono text-[10px] text-primary-accent/70 uppercase tracking-widest">Foundational Overview</span>
                </div>
                {/* Rule */}
                <div className="hud-divider-h" />
                <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-accent uppercase tracking-tight">
                  THE TEAM
                </h2>
                <div className="font-sans text-sm md:text-base text-secondary-accent/85 space-y-4 leading-relaxed max-w-xl">
                  <p>
                    Founded in <span className="text-primary-accent font-bold font-mono">{siteConfig.foundingYear}</span>, 
                    AARG is an elite student-led engineering team dedicated to autonomous aviation, 
                    bringing together <span className="text-primary-accent font-bold font-mono">{siteConfig.memberCount}</span>+ 
                    students across electrical, computer, mechanical, and business disciplines.
                  </p>
                  <p>
                    We design, build, and test unmanned aerial vehicle (UAV) systems from the ground up. 
                    Our platforms undergo extensive validation checks to meet national standards, 
                    aiming for precision flight envelopes at SAE Aero Design and SAE India Drone Design challenges.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Section 02 — Mission & Vision */}
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col gap-5">
                {/* Eyebrow */}
                <div className="flex items-center gap-4">
                  <span className="font-mono text-2xl md:text-3xl font-semibold text-primary-accent leading-none opacity-70">02</span>
                  <div className="hud-divider-v" style={{ height: "2.5rem" }} />
                  <span className="font-mono text-[10px] text-primary-accent/70 uppercase tracking-widest">Mission &amp; Vision</span>
                </div>
                <div className="hud-divider-h" />
                <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-accent uppercase tracking-tight">
                  OUR GOALS
                </h2>
                {/* Two-column icon + text items — no card borders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-2">
                  <div className="flex gap-4">
                    <div className="mt-0.5">
                      <Target className="w-5 h-5 text-primary-accent shrink-0" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h4 className="font-mono text-[10px] font-bold uppercase text-primary-accent tracking-widest">
                        MISSION DETAIL
                      </h4>
                      <div className="hud-divider-h" style={{ width: "2rem" }} />
                      <p className="text-secondary-accent/75 text-sm leading-relaxed">
                        To construct highly robust UAV platforms that address complex mission criteria, bridging the gap between theoretical dynamics and physically validated aerial systems.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-0.5">
                      <Compass className="w-5 h-5 text-primary-accent shrink-0" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h4 className="font-mono text-[10px] font-bold uppercase text-primary-accent tracking-widest">
                        VISION BLUEPRINT
                      </h4>
                      <div className="hud-divider-h" style={{ width: "2rem" }} />
                      <p className="text-secondary-accent/75 text-sm leading-relaxed">
                        To serve as an incubation hub for autonomous flight innovation, composite research, and next-generation systems engineering pioneers in college robotics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right: Affiliation telemetry panel + founding story */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ScrollReveal delay={0.3}>
              <div className="border border-secondary-accent/25 bg-surface/80 p-6 relative font-mono text-[11px] text-secondary-accent/80 flex flex-col gap-4">
                <div className="hud-corner hud-corner-tl" />
                <div className="hud-corner hud-corner-tr" />
                <div className="hud-corner hud-corner-bl" />
                <div className="hud-corner hud-corner-br" />

                <div className="text-primary-accent font-bold border-b border-secondary-accent/15 pb-2 uppercase">
                  {"// INSTITUTIONAL AFFILIATION"}
                </div>
                
                <div className="flex flex-col gap-3 font-sans">
                  <div className="flex flex-col border-b border-secondary-accent/8 pb-3">
                    <span className="font-mono text-[9px] text-secondary-accent/40 uppercase mb-0.5">DEPARTMENT</span>
                    <span className="font-semibold text-secondary-accent">{siteConfig.department}</span>
                  </div>
                  
                  <div className="flex flex-col border-b border-secondary-accent/8 pb-3">
                    <span className="font-mono text-[9px] text-secondary-accent/40 uppercase mb-0.5">COLLEGE / UNIVERSITY</span>
                    <span className="font-semibold text-secondary-accent">{siteConfig.college}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-secondary-accent/40 uppercase mb-0.5">OPERATIONAL BASE</span>
                    <span className="font-semibold text-secondary-accent">{siteConfig.labRoom}</span>
                  </div>
                </div>

                <div className="border-t border-secondary-accent/10 pt-4 text-[10px] text-secondary-accent/50 leading-relaxed font-sans">
                  AARG operates with the structural support, funding, and technical guidance of our parent academic department, using university labs for CFD simulations, flight computer testing, and carbon composites curation.
                </div>
              </div>
            </ScrollReveal>

            {/* Founding story — flat editorial text, no card border */}
            <ScrollReveal delay={0.4}>
              <div className="flex flex-col gap-3 pt-4 border-t border-secondary-accent/15">
                <span className="font-mono text-[10px] text-primary-accent font-bold uppercase tracking-widest">
                  {"// THE FOUNDING STORY"}
                </span>
                <p className="font-sans text-sm leading-relaxed text-secondary-accent/75">
                  Established by a small cohort of engineering students seeking to explore composites fabrication and autonomous UAV flight, AARG has grown from a handful of model airplane builders into a structured multidisciplinary division fielding UAVs on international runways.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
