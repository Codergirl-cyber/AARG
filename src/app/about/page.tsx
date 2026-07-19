"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import PageBackground from "@/components/PageBackground";

export default function About() {
  return (
    <div className="relative w-full flex flex-col min-h-screen py-12 md:py-20 px-6 md:px-8 overflow-hidden">
      <PageBackground />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16 md:gap-24">

        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6 text-center md:text-left">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center justify-center md:justify-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            OPERATIONAL_SYSTEM // ABOUT_AARG
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-accent uppercase tracking-tight mt-2">
            Who We Are &amp; Why We Fly
          </h1>
        </div>

        {/* Logo and Intro Section */}
        <ScrollReveal delay={0.05}>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 pb-12 border-b border-secondary-accent/10">
            <div className="flex-shrink-0 relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-secondary-accent/15 bg-surface-low/30 p-0 flex items-center justify-center group hover:border-primary-accent/40 transition-all duration-300 shadow-[0_0_20px_rgba(200,90,23,0.04)] hover:shadow-[0_0_30px_rgba(200,90,23,0.12)]">
              {/* HUD corners */}
              <div className="hud-corner hud-corner-tl !border-secondary-accent/20" />
              <div className="hud-corner hud-corner-tr !border-secondary-accent/20" />
              <div className="hud-corner hud-corner-bl !border-secondary-accent/20" />
              <div className="hud-corner hud-corner-br !border-secondary-accent/20" />
              
              {/* Rotating outer dash ring */}
              <div className="absolute inset-2 rounded-full border border-dashed border-primary-accent/20 animate-[spin_40s_linear_infinite] pointer-events-none" />
              
              {/* Logo Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="AARG Badge Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105 rounded-full"
              />
            </div>
            
            <div className="flex-grow flex flex-col gap-2.5 text-center md:text-left">
              <p className="font-display text-base sm:text-lg font-medium text-secondary-accent/90 max-w-3xl leading-relaxed">
                Advanced Aerial Robotics Group is AISSMS IOIT&apos;s premier student engineering flight division, designing and validating next-generation autonomous unmanned aerial systems.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Editorial text blocks */}
        <div className="flex flex-col gap-16">

          {/* Section 01 — Who We Are */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col gap-5">
              {/* Eyebrow */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-2xl md:text-3xl font-semibold text-primary-accent leading-none opacity-70">01</span>
                <div className="hud-divider-v" style={{ height: "2.5rem" }} />
                <span className="font-mono text-[10px] text-primary-accent/70 uppercase tracking-widest">Foundational Overview</span>
              </div>
              <div className="hud-divider-h" />
              
              <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-accent uppercase tracking-tight">
                WHO WE ARE
              </h2>
              <div className="font-sans text-sm md:text-base text-secondary-accent/85 space-y-4 leading-relaxed max-w-3xl">
                <p>
                  Advanced Aerial Robotics Group (AARG) is the official student-led aerial robotics organization at AISSMS Institute of Information Technology, bringing together students with a shared passion for aerospace, robotics, embedded systems, and autonomous technologies. Founded to foster innovation through hands-on engineering, AARG provides a collaborative environment where members transform ideas into practical aerial robotic systems while developing the technical skills required to solve real-world engineering challenges.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 02 — What We Do */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col gap-5">
              {/* Eyebrow */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-2xl md:text-3xl font-semibold text-primary-accent leading-none opacity-70">02</span>
                <div className="hud-divider-v" style={{ height: "2.5rem" }} />
                <span className="font-mono text-[10px] text-primary-accent/70 uppercase tracking-widest">Operations &amp; Focus</span>
              </div>
              <div className="hud-divider-h" />
              <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-accent uppercase tracking-tight">
                WHAT WE DO
              </h2>
              <div className="font-sans text-sm md:text-base text-secondary-accent/85 space-y-4 leading-relaxed max-w-3xl">
                <p>
                  At AARG, learning happens by building. Our members work on the complete spectrum of aerial robotics, including unmanned aerial vehicles, embedded flight controllers, autonomous navigation, computer vision, control systems, and intelligent mission planning. Through research-oriented projects, technical workshops, competitions, and collaborative development, we encourage a culture of curiosity, experimentation, and continuous improvement.
                </p>
                <p>
                  Whether designing custom hardware, developing flight software, or integrating AI into autonomous platforms, every project is driven by a commitment to engineering excellence.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 03 — Our Goal */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col gap-5">
              {/* Eyebrow */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-2xl md:text-3xl font-semibold text-primary-accent leading-none opacity-70">03</span>
                <div className="hud-divider-v" style={{ height: "2.5rem" }} />
                <span className="font-mono text-[10px] text-primary-accent/70 uppercase tracking-widest">Mission &amp; Vision</span>
              </div>
              <div className="hud-divider-h" />
              <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-accent uppercase tracking-tight">
                OUR GOAL
              </h2>
              <div className="font-sans text-sm md:text-base text-secondary-accent/85 space-y-4 leading-relaxed max-w-3xl">
                <p>
                  AARG&apos;s mission is to build a strong community of innovators who thrive on competition. By designing, building, and flying UAVs for national and international challenges such as NIDAR and ISRO&apos;s IROC-U, the team transforms classroom learning into hands-on engineering experience. Students collaborate across disciplines, solve real-world technical challenges under competitive environments, and graduate prepared for careers in aerospace, robotics, and advanced technology, while strengthening AISSMS IoIT&apos;s culture of innovation and engineering excellence.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
}
