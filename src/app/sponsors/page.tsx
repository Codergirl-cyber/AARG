"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import PageBackground from "@/components/PageBackground";
import HudCard from "@/components/HudCard";
import { 
  Award, 
  Cpu, 
  Users, 
  Briefcase 
} from "lucide-react";

export default function Sponsors() {
  const whySponsor = [
    {
      icon: <Award className="w-5 h-5 text-primary-accent" />,
      title: "Brand Visibility",
      desc: "Logo placement on drones, UAV frames, team apparel, event banners, website, and social media."
    },
    {
      icon: <Users className="w-5 h-5 text-primary-accent" />,
      title: "Talent Access",
      desc: "Connect with skilled students specializing in robotics, AI, embedded systems, and autonomous technologies."
    },
    {
      icon: <Cpu className="w-5 h-5 text-primary-accent" />,
      title: "Innovation Support",
      desc: "Contribute to research, product development, and real-world engineering projects."
    },
    {
      icon: <Briefcase className="w-5 h-5 text-primary-accent" />,
      title: "Industry Engagement",
      desc: "Collaborate through workshops, technical events, mentorship, and recruitment opportunities."
    }
  ];

  const fundingItems = [
    "UAV design and development",
    "Embedded systems and sensors",
    "Research & prototyping",
    "Competition participation",
    "Workshops and technical events"
  ];

  const benefitsItems = [
    "Logo on drones and equipment",
    "Website and social media recognition",
    "Branding at events and exhibitions",
    "Opportunities for technical collaboration",
    "Access to emerging engineering talent"
  ];

  return (
    <div className="relative w-full flex flex-col min-h-screen py-12 md:py-20 px-4 md:px-8 overflow-hidden">
      <PageBackground />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            SPONSOR AARG
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-accent uppercase tracking-tight mt-2">
            Partner with Innovation
          </h1>
          <p className="text-secondary-accent/60 font-mono text-[11px] mt-1">
            {"SUPPORT THE NEXT GENERATION OF AEROSPACE ENGINEERS"}
          </p>
        </div>

        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <ScrollReveal delay={0.1}>
              <div className="font-sans text-base md:text-lg text-secondary-accent/90 space-y-6 leading-relaxed">
                <p className="font-medium text-white/95">
                  Support the Advanced Aerial Robotics Group (AARG) at AISSMS Institute of Information Technology and help empower the next generation of engineers developing cutting-edge aerial robotics and autonomous systems.
                </p>
                <p className="text-secondary-accent/80 text-sm md:text-base">
                  Your partnership enables hands-on research, technical innovation, and participation in national-level competitions while connecting your brand with a community driven by engineering excellence.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-4">
            <ScrollReveal delay={0.2}>
              <div className="border border-white/10 bg-surface-mid/40 backdrop-blur-sm p-6 relative">
                {/* Tech corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary-accent" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary-accent" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary-accent" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary-accent" />
                
                <h4 className="font-mono text-[10px] tracking-wider text-primary-accent uppercase font-bold mb-3">
                  {"// PARTNERSHIP_STATUS"}
                </h4>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-secondary-accent/50">CAMPAIGN:</span>
                    <span className="text-green-500 font-bold">ACTIVE</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-secondary-accent/50">DECK VERSION:</span>
                    <span className="text-white">v2026.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-accent/50">TARGET GROUP:</span>
                    <span className="text-white">AISSMS IOIT AARG</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Why Sponsor Us? */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <h2 className="font-mono text-[10px] font-bold text-secondary-accent uppercase tracking-widest">
              {"// WHY SPONSOR US"}
            </h2>
            <div className="flex-1 hud-divider-h" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whySponsor.map((item, idx) => (
              <ScrollReveal key={item.title} delay={0.1 * idx}>
                <HudCard 
                  title={item.title}
                  eyebrow={`STRATEGIC VALUE 0${idx + 1}`}
                  hoverGlow={true}
                  className="h-full bg-surface-mid/20 hover:bg-surface-mid/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary-accent/10 border border-primary-accent/20 rounded-md shrink-0">
                      {item.icon}
                    </div>
                    <p className="font-sans text-sm text-secondary-accent/75 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </HudCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Funding & Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Funding Section */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col gap-6 p-6 md:p-8 bg-surface-mid/10 border border-white/5 rounded-md relative">
              <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-bg-base px-3 py-0.5 border border-white/10 font-mono text-[8px] text-secondary-accent/50 uppercase tracking-widest">
                ALLOCATION_SCHEMATIC
              </div>
              <div>
                <span className="font-mono text-[9px] text-primary-accent uppercase tracking-wider font-bold">
                  {"// FINANCIAL SYNERGY"}
                </span>
                <h3 className="font-display text-lg md:text-xl font-bold text-white uppercase tracking-tight mt-1">
                  Your Support Helps Fund
                </h3>
              </div>
              <div className="hud-divider-h" />
              <ul className="space-y-4">
                {fundingItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary-accent rotate-45 shrink-0 animate-pulse" />
                    <span className="font-sans text-sm text-secondary-accent/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Benefits Section */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col gap-6 p-6 md:p-8 bg-surface-mid/10 border border-white/5 rounded-md relative">
              <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-bg-base px-3 py-0.5 border border-white/10 font-mono text-[8px] text-secondary-accent/50 uppercase tracking-widest">
                RETURN_VALUE_METRICS
              </div>
              <div>
                <span className="font-mono text-[9px] text-primary-accent uppercase tracking-wider font-bold">
                  {"// PARTNER RETURN"}
                </span>
                <h3 className="font-display text-lg md:text-xl font-bold text-white uppercase tracking-tight mt-1">
                  Sponsorship Benefits
                </h3>
              </div>
              <div className="hud-divider-h" />
              <ul className="space-y-4">
                {benefitsItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary-accent rotate-45 shrink-0 animate-pulse" />
                    <span className="font-sans text-sm text-secondary-accent/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>



      </div>
    </div>
  );
}
