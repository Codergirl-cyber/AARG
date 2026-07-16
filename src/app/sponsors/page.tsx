"use client";

import React from "react";
import { sponsorsData } from "@/content/sponsors";
import ScrollReveal from "@/components/ScrollReveal";
import DecryptText from "@/components/DecryptText";
import { Download, Landmark, ArrowUpRight } from "lucide-react";

export default function Sponsors() {
  return (
    <div className="relative w-full flex flex-col min-h-screen bg-bg-base py-12 md:py-20 px-4 md:px-8">

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            <DecryptText text="/// CORPORATE_SUPPORT // SPONSORSHIP" />
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-secondary-accent uppercase tracking-tight mt-2">
            OUR SPONSORS &amp; AFFILIATES
          </h1>
          <p className="text-secondary-accent/60 font-mono text-[11px] mt-1">
            {"PARTNERSHIP STATUS // ENABLERS OF FLIGHT RESEARCH"}
          </p>
        </div>

        {/* VALUE PROP — editorial text block, no card wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Value Proposition — direct text on page */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="flex flex-col gap-5">
                {/* Eyebrow with large number */}
                <div className="flex items-center gap-4">
                  <span className="font-mono text-4xl font-extrabold text-primary-accent leading-none opacity-80">01</span>
                  <div className="hud-divider-v" style={{ height: "2rem" }} />
                  <span className="font-mono text-[10px] text-primary-accent/70 uppercase tracking-widest">Partnership Overview</span>
                </div>
                <div className="hud-divider-h" />
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-secondary-accent uppercase tracking-tight">
                  WHY SPONSOR AARG?
                </h2>
                <div className="font-sans text-sm md:text-base text-secondary-accent/85 space-y-4 leading-relaxed max-w-xl">
                  <p>{sponsorsData.valueProposition}</p>
                  <p>
                    By sponsoring our squadron, you are putting your technology, hardware, and brand directly onto competitive UAV aircraft. It enables us to manufacture state-of-the-art carbon fiber wings, integrate top-tier lidar modules, and travel to national aeronautics flight lines.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Download deck CTA — HUD panel kept (it&apos;s a focused action element) */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.15}>
              <div className="border border-primary-accent/30 bg-surface-low p-6 relative font-mono text-xs text-secondary-accent/80 flex flex-col gap-5">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-accent/40 to-transparent pointer-events-none" />

                <div className="text-primary-accent font-bold border-b border-secondary-accent/15 pb-2 uppercase text-[10px] flex items-center gap-1.5">
                  <Landmark className="w-4 h-4" /> {"// DOWNLOAD_DECK"}
                </div>

                <p className="font-sans leading-relaxed text-secondary-accent/75 text-[11px]">
                  Access AARG&apos;s detailed corporate sponsorship catalog, featuring tiered branding options, UAV fuselage placements, technical research profiles, and logistics support breakdowns.
                </p>

                <a
                  href={sponsorsData.sponsorshipDeckUrl}
                  className="font-mono text-xs font-bold border border-primary-accent bg-primary-accent text-white px-5 py-3 hover:bg-transparent hover:text-primary-accent transition-all duration-250 focus-hud text-center flex items-center justify-center gap-2 rounded-none"
                >
                  <Download className="w-4 h-4" /> SPONSORSHIP_DECK // PDF
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* TIERED SPONSORS — differentiated by size and border prominence */}
        <div className="flex flex-col gap-14 border-t border-secondary-accent/10 pt-12">
          <div className="flex items-center gap-3">
            <h2 className="font-mono text-[10px] font-bold text-secondary-accent uppercase tracking-widest">
              {"// TIERED BRANDING SLOTS"}
            </h2>
            <div className="flex-1 hud-divider-h" />
          </div>

          {/* TIER 1: TITLE — full width, largest, primary-accent border with glow */}
          <ScrollReveal>
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[9px] text-primary-accent font-bold uppercase tracking-widest">
                {"/// TIER_01 — TITLE PARTNER"}
              </span>
              <div className="flex flex-col gap-4">
                {sponsorsData.tiers.title.map((sponsor) => (
                  <a
                    key={sponsor.name}
                    href={sponsor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center h-40 w-full border-2 border-primary-accent bg-surface-low hover:bg-primary-accent/5 transition-all duration-300 focus-hud text-center font-mono relative group"
                  >
                    <span className="text-primary-accent text-[9px] uppercase tracking-widest mb-2 font-semibold">
                      {"// PLATINUM TITLE"}
                    </span>
                    <span className="text-2xl font-bold text-secondary-accent uppercase tracking-wider flex items-center gap-2">
                      {sponsor.name} <ArrowUpRight className="w-5 h-5 text-secondary-accent/40 group-hover:text-primary-accent transition-colors" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* TIER 2: PLATINUM — 2-col, medium size */}
          <ScrollReveal>
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[9px] text-secondary-accent/60 font-bold uppercase tracking-widest">
                {"/// TIER_02 — PLATINUM SUPPORT"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {sponsorsData.tiers.platinum.map((sponsor) => (
                  <a
                    key={sponsor.name}
                    href={sponsor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center h-28 border border-secondary-accent/25 bg-surface-low hover:border-primary-accent/50 hover:bg-primary-accent/4 transition-all duration-300 focus-hud text-center font-mono relative group"
                  >
                    <span className="text-secondary-accent/35 text-[8px] uppercase tracking-widest mb-1.5 font-semibold">
                      {"// PLATINUM SLOT"}
                    </span>
                    <span className="text-lg font-bold text-secondary-accent uppercase tracking-wider flex items-center gap-1.5">
                      {sponsor.name} <ArrowUpRight className="w-4 h-4 text-secondary-accent/25 group-hover:text-primary-accent/60 transition-colors" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* TIER 3: GOLD — 3-col, smaller */}
          <ScrollReveal>
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[9px] text-secondary-accent/45 font-bold uppercase tracking-widest">
                {"/// TIER_03 — GOLD SUPPORT"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {sponsorsData.tiers.gold.map((sponsor) => (
                  <a
                    key={sponsor.name}
                    href={sponsor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center h-20 border border-secondary-accent/12 bg-surface-low hover:border-primary-accent/40 transition-colors focus-hud text-center font-mono relative group"
                  >
                    <span className="text-secondary-accent/35 text-[8px] uppercase tracking-widest mb-1">
                      {"// GOLD SLOT"}
                    </span>
                    <span className="text-sm font-bold text-secondary-accent uppercase tracking-wider flex items-center gap-1">
                      {sponsor.name} <ArrowUpRight className="w-3.5 h-3.5 text-secondary-accent/15 group-hover:text-primary-accent/50 transition-colors" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* TIER 4: ASSOCIATE — 4-col, smallest/most compact */}
          <ScrollReveal>
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[9px] text-secondary-accent/35 font-bold uppercase tracking-widest">
                {"/// TIER_04 — ASSOCIATE SPONSORS"}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sponsorsData.tiers.associate.map((sponsor) => (
                  <a
                    key={sponsor.name}
                    href={sponsor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-14 border border-secondary-accent/10 bg-surface/25 hover:border-primary-accent/30 transition-colors focus-hud text-center font-mono relative group px-3"
                  >
                    <span className="text-xs font-semibold text-secondary-accent/60 uppercase tracking-wide flex items-center gap-1">
                      {sponsor.name} <ArrowUpRight className="w-3 h-3 text-secondary-accent/15 group-hover:text-primary-accent/40 transition-colors" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </div>
  );
}
