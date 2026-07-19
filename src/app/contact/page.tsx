"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import PageBackground from "@/components/PageBackground";
import { Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="relative w-full flex flex-col min-h-screen py-12 md:py-20 px-4 md:px-8 overflow-hidden">
      <PageBackground />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            COMMS_CENTER // REACH_OUT
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-accent uppercase tracking-tight mt-2">
            Connect With AARG
          </h1>
          <p className="text-secondary-accent/60 font-mono text-[11px] mt-1 uppercase">
            OPERATIONAL_CHANNELS // INQUIRIES & PARTNERSHIPS
          </p>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <ScrollReveal>
            <div className="relative h-full flex flex-col justify-between border border-secondary-accent/15 bg-surface-mid/30 p-6 md:p-8 hover:border-primary-accent/40 transition-all duration-300 group">
              {/* HUD corner lines */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />

              <div>
                <h2 className="font-display text-2xl font-bold text-secondary-accent uppercase tracking-tight group-hover:text-primary-accent transition-colors duration-300">
                  Mr. Aryan Basnet
                </h2>
                <div className="h-[1px] w-full bg-secondary-accent/10 my-4" />
              </div>

              <div className="font-mono text-xs flex flex-col gap-5 text-secondary-accent/70 mt-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-secondary-accent/40 font-bold">VOICE CHANNEL</span>
                  <a href="tel:8218397502" className="hover:text-primary-accent hover:underline flex items-center gap-2.5 text-secondary-accent transition-colors">
                    <Phone className="w-4 h-4 text-primary-accent shrink-0" />
                    <span className="font-medium">8218397502</span>
                  </a>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-secondary-accent/40 font-bold">EMAIL LINK</span>
                  <a href="mailto:aryanbasnet2005@gmail.com" className="hover:text-primary-accent hover:underline flex items-center gap-2.5 text-secondary-accent transition-colors">
                    <Mail className="w-4 h-4 text-primary-accent shrink-0" />
                    <span className="font-medium truncate">aryanbasnet2005@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative h-full flex flex-col justify-between border border-secondary-accent/15 bg-surface-mid/30 p-6 md:p-8 hover:border-primary-accent/40 transition-all duration-300 group">
              {/* HUD corner lines */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-secondary-accent/30 group-hover:border-primary-accent/60 transition-colors" />

              <div>
                <h2 className="font-display text-2xl font-bold text-secondary-accent uppercase tracking-tight group-hover:text-primary-accent transition-colors duration-300">
                  Mr. Rahul Jadhav
                </h2>
                <div className="h-[1px] w-full bg-secondary-accent/10 my-4" />
              </div>

              <div className="font-mono text-xs flex flex-col gap-5 text-secondary-accent/70 mt-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-secondary-accent/40 font-bold">VOICE CHANNEL</span>
                  <a href="tel:9960622886" className="hover:text-primary-accent hover:underline flex items-center gap-2.5 text-secondary-accent transition-colors">
                    <Phone className="w-4 h-4 text-primary-accent shrink-0" />
                    <span className="font-medium">9960622886</span>
                  </a>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-secondary-accent/40 font-bold">EMAIL LINK</span>
                  <a href="mailto:rahul.jadhav@aissmsioit.org" className="hover:text-primary-accent hover:underline flex items-center gap-2.5 text-secondary-accent transition-colors">
                    <Mail className="w-4 h-4 text-primary-accent shrink-0" />
                    <span className="font-medium truncate">rahul.jadhav@aissmsioit.org</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}
