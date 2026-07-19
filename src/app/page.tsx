"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import ScrollReveal from "@/components/ScrollReveal";
import PageBackground from "@/components/PageBackground";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import HeroBackground from "@/components/HeroBackground";
import AnimatedCounter from "@/components/AnimatedCounter";


export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking for Hero section parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms (bypassed if reduced motion is requested)
  const yText = useTransform(scrollY, [0, 600], [0, 80]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

  // States to trigger stats icon pulse animations when count finishes


  return (
    <div className="relative w-full flex flex-col min-h-screen overflow-hidden">
      
      {/* SECTION 1: HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center border-b border-secondary-accent/15 hud-grid hud-scanlines py-20 px-4 md:px-8 overflow-hidden"
      >
        {/* Full-bleed hero background image */}
        <Image
          src="/images/drone_hero.jpg"
          alt="AARG drone hero"
          fill
          sizes="100vw"
          quality={100}
          className="object-cover object-center z-0 brightness-75"
          priority
        />

        {/* Darkening overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-base/20 via-bg-base/30 to-bg-base/20 z-[1]" />

        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base/50 via-transparent to-bg-base/20 z-[1]" />

        {/* Slowly drifting background particles */}
        <div className="relative z-[2]">
          <HeroBackground />
        </div>

        {/* Fine crosshairs overlay */}
        <div className="absolute inset-0 hud-grid-fine pointer-events-none opacity-20 z-[2]" />

        <div className="max-w-7xl mx-auto w-full relative z-[3] items-center">
          
          {/* Hero Content */}
          <motion.div 
            style={shouldReduceMotion ? {} : { y: yText, opacity: opacityHero }}
            className="flex flex-col gap-6 text-left max-w-2xl"
          >
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
            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                href="/join"
                className="font-sans text-sm font-semibold border border-primary-accent bg-primary-accent text-white px-7 py-3 hover:bg-primary-accent/95 transition-all duration-250 focus-hud rounded-md inline-flex items-center gap-2 shadow-sm hover:shadow-[0_10px_30px_rgba(200,90,23,0.18)]"
              >
                Join the Team <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="font-sans text-sm font-medium border border-secondary-accent/30 text-secondary-accent bg-transparent px-7 py-3 hover:border-primary-accent hover:text-primary-accent transition-all duration-250 focus-hud rounded-md"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>



      {/* SECTION 3: NARRATIVE ARC — Editorial numbered rows, no cards */}
      <section className="py-16 md:py-28 bg-surface relative z-10 px-4 md:px-8">
        <PageBackground />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-0">
          
          <div className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary-accent uppercase mt-2">
              THE GROUP'S PURPOSE
            </h2>
          </div>

          {/* Editorial row 01 */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-12 gap-6 md:gap-12 py-10 md:py-14 border-t border-secondary-accent/15 items-start">
              <div className="col-span-12 md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                <span className="font-mono text-2xl md:text-3xl font-semibold text-primary-accent leading-none opacity-70">01</span>
                <div className="hud-divider-v md:hidden" style={{height: '2rem'}} />
                <span className="font-mono text-[10px] text-primary-accent/60 uppercase tracking-widest md:mt-3">Foundational Overview</span>
              </div>
              <div className="hidden md:block col-span-1">
                <div className="hud-divider-v" style={{minHeight: '100%', height: '100%'}} />
              </div>
              <div className="col-span-12 md:col-span-9 flex flex-col gap-3">
                <h3 className="font-display text-lg md:text-xl font-bold text-secondary-accent uppercase tracking-tight">Who We Are</h3>
                <p className="text-secondary-accent/75 font-sans text-sm md:text-base leading-relaxed max-w-2xl">
                  Advanced Aerial Robotics Group (AARG) is the official student-led aerial robotics organization at AISSMS Institute of Information Technology, bringing together students with a shared passion for aerospace, robotics, embedded systems, and autonomous technologies. Founded to foster innovation through hands-on engineering, AARG provides a collaborative environment where members transform ideas into practical aerial robotic systems while developing the technical skills required to solve real-world engineering challenges.
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
                <span className="font-mono text-[10px] text-primary-accent/60 uppercase tracking-widest md:mt-3">Operations &amp; Focus</span>
              </div>
              <div className="hidden md:block col-span-1">
                <div className="hud-divider-v" style={{minHeight: '100%', height: '100%'}} />
              </div>
              <div className="col-span-12 md:col-span-9 flex flex-col gap-3">
                <h3 className="font-display text-lg md:text-xl font-bold text-secondary-accent uppercase tracking-tight">What We Do</h3>
                <p className="text-secondary-accent/75 font-sans text-sm md:text-base leading-relaxed max-w-2xl">
                  At AARG, learning happens by building. Our members work on the complete spectrum of aerial robotics, including unmanned aerial vehicles, embedded flight controllers, autonomous navigation, computer vision, control systems, and intelligent mission planning. Through research-oriented projects, technical workshops, competitions, and collaborative development, we encourage a culture of curiosity, experimentation, and continuous improvement. Whether designing custom hardware, developing flight software, or integrating AI into autonomous platforms, every project is driven by a commitment to engineering excellence.
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
                <span className="font-mono text-[10px] text-primary-accent/60 uppercase tracking-widest md:mt-3">Mission &amp; Vision</span>
              </div>
              <div className="hidden md:block col-span-1">
                <div className="hud-divider-v" style={{minHeight: '100%', height: '100%'}} />
              </div>
              <div className="col-span-12 md:col-span-9 flex flex-col gap-3">
                <h3 className="font-display text-lg md:text-xl font-bold text-secondary-accent uppercase tracking-tight">Our Goal</h3>
                <p className="text-secondary-accent/75 font-sans text-sm md:text-base leading-relaxed max-w-2xl">
                  AARG's mission is to build a strong community of innovators who thrive on competition. By designing, building, and flying UAVs for national and international challenges — from SAE Aero Design to NIDAR and ISRO's IROC-U — the team turns classroom learning into competitive, hands-on engineering. Students collaborate across disciplines, tackle meaningful technical problems under competition constraints, and graduate ready for careers in aerospace, robotics, and advanced technology, while strengthening AISSMS IoIT's growing culture of innovation and competitive achievement.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>



    </div>
  );
}
