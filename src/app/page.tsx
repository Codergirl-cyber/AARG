"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Users, Calendar, Trophy, Cpu } from "lucide-react";
import HeroSchematic from "@/components/HeroSchematic";
import { siteConfig } from "@/content/site";
import { vehicles } from "@/content/vehicles";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import SponsorMarquee from "@/components/SponsorMarquee";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import DecryptText from "@/components/DecryptText";
import HeroBackground from "@/components/HeroBackground";
import DomainRadar from "@/components/DomainRadar";


export default function Home() {
  const featuredVehicle = vehicles[0];
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking for Hero section parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms (bypassed if reduced motion is requested)
  const yText = useTransform(scrollY, [0, 600], [0, 80]);
  const yConsole = useTransform(scrollY, [0, 600], [0, 130]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

  // States to trigger stats icon pulse animations when count finishes
  const [stat1Comp, setStat1Comp] = useState(false);
  const [stat2Comp, setStat2Comp] = useState(false);
  const [stat3Comp, setStat3Comp] = useState(false);
  const [stat4Comp, setStat4Comp] = useState(false);

  return (
    <div className="relative w-full flex flex-col min-h-screen overflow-hidden">
      
      {/* SECTION 1: HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center border-b border-secondary-accent/15 bg-bg-base hud-grid hud-scanlines py-20 px-4 md:px-8"
      >
        {/* Slowly drifting background particles */}
        <HeroBackground />
        
        {/* Fine crosshairs overlay */}
        <div className="absolute inset-0 hud-grid-fine pointer-events-none opacity-40 z-0" />

        {/* Clean radial fade from edges — no HUD corners */}

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          
          {/* Hero Left Content */}
          <motion.div 
            style={shouldReduceMotion ? {} : { y: yText, opacity: opacityHero }}
            className="lg:col-span-7 flex flex-col gap-6 text-left"
          >
            {/* Section Eyebrow with typewriter decrypt */}
            <div className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-primary-accent animate-pulse" />
              <DecryptText text="/// AARG FLIGHT COMMAND MODULE // INITIALIZED" />
            </div>

            {/* Main Taglines */}
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-secondary-accent leading-tight">
              Designing, Building, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent via-primary-accent/80 to-secondary-accent">
                and Flying
              </span> <br />
              Next-Gen UAVs.
            </h1>

            <p className="text-secondary-accent/80 text-base md:text-lg font-sans leading-relaxed max-w-xl">
              AARG is a student-led engineering team dedicated to autonomous aviation, building 
              high-performance fixed-wing aircraft and heavy-lift multirotor drones for prestigious competitions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href="/domains"
                className="font-mono text-xs font-bold border border-primary-accent bg-primary-accent text-white px-6 py-3.5 hover:bg-transparent hover:text-primary-accent transition-all duration-250 focus-hud rounded-none flex items-center gap-2"
              >
                DEPLOY_FLIGHT_SPEC <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/join"
                className="font-mono text-xs font-bold border border-secondary-accent/30 text-secondary-accent bg-transparent px-6 py-3.5 hover:border-primary-accent hover:text-primary-accent transition-all duration-250 focus-hud rounded-none"
              >
                JOIN_SQUADRON // REC_2026
              </Link>
            </div>
          </motion.div>

          {/* Hero Right — Dynamic Flight Telemetry HUD */}
          <motion.div
            style={shouldReduceMotion ? {} : { y: yConsole, opacity: opacityHero }}
            className="lg:col-span-5 hidden lg:block"
          >
            <HeroSchematic />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: STATS STRIP — Dashboard readout, no card boxes */}
      <section className="bg-bg-base border-b border-secondary-accent/15 py-10 md:py-14 relative z-10">
        {/* Faint HUD crosshair grid overlay */}
        <div className="absolute inset-0 hud-grid pointer-events-none opacity-20" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Mono eyebrow */}
          <div className="font-mono text-[10px] text-primary-accent tracking-widest uppercase mb-8 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            {"// OPERATIONAL METRICS // LIVE READOUT"}
          </div>
          {/* Stats row — raw numbers on background, dividers only */}
          <div className="flex flex-col sm:flex-row items-stretch gap-0">
            <div className="flex-1">
              <ScrollReveal delay={0.1}>
                <div className="flex flex-col items-start px-0 sm:pr-8 py-4 sm:py-0 border-b sm:border-b-0 sm:border-r border-secondary-accent/12">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl md:text-5xl font-display font-bold text-primary-accent tracking-tight leading-none">
                      <AnimatedCounter value={siteConfig.memberCount} onComplete={() => setStat1Comp(true)} />
                    </span>
                    <motion.div
                      animate={stat1Comp ? { scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Users className="w-5 h-5 text-primary-accent/60" />
                    </motion.div>
                  </div>
                  <span className="font-mono text-[10px] text-secondary-accent/50 uppercase tracking-widest">{"ACTIVE MEMBERS"}</span>
                </div>
              </ScrollReveal>
            </div>

            <div className="flex-1">
              <ScrollReveal delay={0.2}>
                <div className="flex flex-col items-start px-0 sm:px-8 py-4 sm:py-0 border-b sm:border-b-0 sm:border-r border-secondary-accent/12">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl md:text-5xl font-display font-bold text-primary-accent tracking-tight leading-none">
                      <AnimatedCounter value={siteConfig.yearsActive} onComplete={() => setStat2Comp(true)} />
                    </span>
                    <motion.div
                      animate={stat2Comp ? { scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Calendar className="w-5 h-5 text-primary-accent/60" />
                    </motion.div>
                  </div>
                  <span className="font-mono text-[10px] text-secondary-accent/50 uppercase tracking-widest">{"YEARS ACTIVE"}</span>
                </div>
              </ScrollReveal>
            </div>

            <div className="flex-1">
              <ScrollReveal delay={0.3}>
                <div className="flex flex-col items-start px-0 sm:px-8 py-4 sm:py-0 border-b sm:border-b-0 sm:border-r border-secondary-accent/12">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl md:text-5xl font-display font-bold text-primary-accent tracking-tight leading-none">
                      <AnimatedCounter value={siteConfig.competitionsWon} onComplete={() => setStat3Comp(true)} />
                    </span>
                    <motion.div
                      animate={stat3Comp ? { scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Trophy className="w-5 h-5 text-primary-accent/60" />
                    </motion.div>
                  </div>
                  <span className="font-mono text-[10px] text-secondary-accent/50 uppercase tracking-widest">{"COMPETITIVE WINS"}</span>
                </div>
              </ScrollReveal>
            </div>

            <div className="flex-1">
              <ScrollReveal delay={0.4}>
                <div className="flex flex-col items-start px-0 sm:pl-8 py-4 sm:py-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl md:text-5xl font-display font-bold text-primary-accent tracking-tight leading-none">
                      <AnimatedCounter value="5" onComplete={() => setStat4Comp(true)} />
                    </span>
                    <motion.div
                      animate={stat4Comp ? { scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Cpu className="w-5 h-5 text-primary-accent/60" />
                    </motion.div>
                  </div>
                  <span className="font-mono text-[10px] text-secondary-accent/50 uppercase tracking-widest">{"TECHNICAL DOMAINS"}</span>
                </div>
              </ScrollReveal>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: NARRATIVE ARC — Editorial numbered rows, no cards */}
      <section className="py-16 md:py-28 bg-surface relative z-10 px-4 md:px-8 border-b border-secondary-accent/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-0">
          
          <div className="mb-12">
            <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
              <DecryptText text="// MISSION OPERATIONAL MANIFESTO" />
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary-accent uppercase mt-2">
              How We Define Our Strategic Purpose
            </h2>
          </div>

          {/* Editorial row 01 */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-12 gap-6 md:gap-12 py-10 md:py-14 border-t border-secondary-accent/15 items-start">
              <div className="col-span-12 md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                <span className="font-mono text-2xl md:text-3xl font-semibold text-primary-accent leading-none opacity-70">01</span>
                <div className="hud-divider-v md:hidden" style={{height: '2rem'}} />
                <span className="font-mono text-[10px] text-primary-accent/60 uppercase tracking-widest md:mt-3">The Mission</span>
              </div>
              <div className="hidden md:block col-span-1">
                <div className="hud-divider-v" style={{minHeight: '100%', height: '100%'}} />
              </div>
              <div className="col-span-12 md:col-span-9 flex flex-col gap-3">
                <h3 className="font-display text-lg md:text-xl font-bold text-secondary-accent uppercase tracking-tight">What We Do</h3>
                <p className="text-secondary-accent/75 font-sans text-sm md:text-base leading-relaxed max-w-2xl">
                  AARG designs, simulates, builds, and flies UAV systems from the ground up. 
                  Our team engineers specialized cargo planes and drone delivery platforms designed to transport payloads, pack into tactical boxes, and operate fully autonomously.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Editorial row 02 */}
          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-12 gap-6 md:gap-12 py-10 md:py-14 border-t border-secondary-accent/15 items-start">
              <div className="col-span-12 md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                <span className="font-mono text-2xl md:text-3xl font-semibold text-primary-accent leading-none opacity-70">02</span>
                <div className="hud-divider-v md:hidden" style={{height: '2rem'}} />
                <span className="font-mono text-[10px] text-primary-accent/60 uppercase tracking-widest md:mt-3">The Method</span>
              </div>
              <div className="hidden md:block col-span-1">
                <div className="hud-divider-v" style={{minHeight: '100%', height: '100%'}} />
              </div>
              <div className="col-span-12 md:col-span-9 flex flex-col gap-3">
                <h3 className="font-display text-lg md:text-xl font-bold text-secondary-accent uppercase tracking-tight">How We Do It</h3>
                <p className="text-secondary-accent/75 font-sans text-sm md:text-base leading-relaxed max-w-2xl">
                  We employ rigorous aerospace methods: computational fluid dynamics (CFD) for aerodynamics, composite laminates and stress analysis for fabrication, and hardware-in-the-loop autopilot tuning for controls.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Editorial row 03 */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-12 gap-6 md:gap-12 py-10 md:py-14 border-t border-b border-secondary-accent/15 items-start">
              <div className="col-span-12 md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                <span className="font-mono text-2xl md:text-3xl font-semibold text-primary-accent leading-none opacity-70">03</span>
                <div className="hud-divider-v md:hidden" style={{height: '2rem'}} />
                <span className="font-mono text-[10px] text-primary-accent/60 uppercase tracking-widest md:mt-3">The Motivation</span>
              </div>
              <div className="hidden md:block col-span-1">
                <div className="hud-divider-v" style={{minHeight: '100%', height: '100%'}} />
              </div>
              <div className="col-span-12 md:col-span-9 flex flex-col gap-3">
                <h3 className="font-display text-lg md:text-xl font-bold text-secondary-accent uppercase tracking-tight">Why We Do It</h3>
                <p className="text-secondary-accent/75 font-sans text-sm md:text-base leading-relaxed max-w-2xl">
                  To cultivate industry-ready systems engineers, UAV pilots, and business strategists. We seek to push the envelope of autonomous flight and claim top placements on national-level drone arenas.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3.5: TECHNICAL DOMAINS / INTERACTIVE SYSTEMS MAP */}
      <section className="py-16 md:py-24 bg-bg-base relative z-10 px-4 md:px-8 border-b border-secondary-accent/10">
        {/* Faint HUD crosshair grid overlay */}
        <div className="absolute inset-0 hud-grid pointer-events-none opacity-20" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12">
            <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
              <DecryptText text="// TECHNICAL DOMAINS // INTERACTIVE SYSTEMS MAP" />
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary-accent uppercase mt-2">
              Explore the Engineering Divisions
            </h2>
          </div>

          <ScrollReveal>
            <DomainRadar />
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4: FEATURED UAV PROJECT TEASER */}
      <section className="py-16 md:py-24 bg-surface border-y border-secondary-accent/15 relative z-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Spec details grid (Left) */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-6">
            <div>
              <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
                <DecryptText text="// FEATURED SYSTEMS INTEGRATION" />
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary-accent uppercase mt-2">
                {featuredVehicle.name}
              </h2>
              <p className="text-secondary-accent/80 font-sans text-sm leading-relaxed mt-3">
                {featuredVehicle.description}
              </p>
            </div>

            <div className="border border-secondary-accent/12 bg-surface-low p-5 font-mono text-[11px] relative flex flex-col gap-2">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-secondary-accent/20 to-transparent pointer-events-none" />
              
              <div className="text-primary-accent font-bold border-b border-secondary-accent/10 pb-1 uppercase">
                {"// SYSTEM SPEC SHEET"}
              </div>

              {featuredVehicle.specs.slice(0, 5).map((spec) => (
                <div key={spec.label} className="flex justify-between border-b border-secondary-accent/5 py-1 text-secondary-accent/80">
                  <span className="font-semibold">{spec.label}:</span>
                  <span className="text-primary-accent font-bold">
                    <DecryptText text={spec.value} />
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/domains"
              className="font-mono text-xs font-bold text-center lg:text-left text-primary-accent hover:text-secondary-accent transition-colors duration-200 focus-hud mt-2 flex items-center gap-1.5 justify-center lg:justify-start"
            >
              {"// VIEW ALL VEHICLES & DETAILED DOMAINS"} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Photo frame (Right) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-video w-full border border-secondary-accent/12 bg-bg-base overflow-hidden">
              <Image
                src="/images/gallery_flight_1.png"
                alt="Phoenix UAV Flying"
                fill
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover p-1"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ALUMNI SPOTLIGHT / TESTIMONIAL */}
      <section className="py-16 md:py-24 bg-bg-base relative z-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase">
            <DecryptText text="// FOUNDATION_TESTIMONIAL" />
          </span>
          
          <div className="relative p-6 md:p-10 border border-secondary-accent/10 bg-surface-low">
            
            <p className="font-display text-lg md:text-xl font-medium italic text-secondary-accent/90 leading-relaxed font-sans">
              {"\"AARG was where I learned to translate aerospace textbooks into real-world autonomous aircraft. It builds a rare technical confidence and systems discipline that shapes careers in aerospace.\""}
            </p>
            
            <div className="mt-6 font-mono text-xs">
              <span className="text-primary-accent font-bold">[ALUMNI PRESIDENT NAME]</span>
              <span className="text-secondary-accent/50 block mt-1">Former Team President // Class of 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: SPONSOR MARQUEE */}
      <section className="bg-bg-base relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center pb-8">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase block mb-4">
            <DecryptText text="// TRUSTED BY INDUSTRY LEADERS" />
          </span>
          <h3 className="font-display text-xl font-bold text-secondary-accent uppercase tracking-wider">
            OUR SPONSORS & CORPORATE ENABLERS
          </h3>
        </div>
        <SponsorMarquee />
      </section>

      {/* SECTION 7: RECRUITMENT CTA BLOCK */}
      <section className="py-20 bg-bg-base relative z-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto border border-primary-accent/25 bg-surface-low p-8 md:p-12 relative flex flex-col items-center text-center gap-6">
          {/* Accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-accent/50 to-transparent pointer-events-none" />
          
          <div className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            STATUS: RECRUITMENT ACTIVE FOR BATCH 2026
          </div>
          
          <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary-accent uppercase leading-tight max-w-2xl">
            Are You Ready to Design the Future of Flight?
          </h2>
          
          <p className="text-secondary-accent/80 font-sans text-sm md:text-base max-w-xl leading-relaxed">
            We are looking for passionate minds across aerodynamics, structural fabrication, control software, 
            propulsion mechanics, and business operations. No prior drone experience required—only raw curiosity.
          </p>

          <Link
            href="/join"
            className="font-mono text-xs font-bold border border-primary-accent bg-primary-accent text-white px-8 py-4 hover:bg-transparent hover:text-primary-accent transition-all duration-250 focus-hud rounded-none"
          >
            INITIATE_APPLICATION // INTERVIEW_FLOW
          </Link>
        </div>
      </section>
    </div>
  );
}
