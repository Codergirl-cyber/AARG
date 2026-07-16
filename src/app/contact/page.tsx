"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import ScrollReveal from "@/components/ScrollReveal";
import { Mail, Phone, MapPin, Send } from "lucide-react";

// Inline brand SVGs for social media icons
const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative w-full flex flex-col min-h-screen bg-bg-base py-12 md:py-20 px-4 md:px-8">
      {/* HUD Background Overlays */}
      <div className="absolute inset-0 hud-grid pointer-events-none opacity-30" />
      <div className="absolute inset-0 hud-grid-fine pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            {"/// COMMUNICATIONS_DECK // CONTACT"}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-accent uppercase tracking-tight mt-2">
            Connect With AARG
          </h1>
          <p className="text-secondary-accent/60 font-mono text-[11px] mt-1">
            {"COMMS_CHANNEL // ESTABLISH DIRECT LINK"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Information & Coordinates */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ScrollReveal>
              <div className="border border-secondary-accent/25 bg-surface/80 p-6 relative font-mono text-xs text-secondary-accent/80 flex flex-col gap-6">
                <div className="hud-corner hud-corner-tl" />
                <div className="hud-corner hud-corner-tr" />
                <div className="hud-corner hud-corner-bl" />
                <div className="hud-corner hud-corner-br" />

                <div className="text-primary-accent font-bold border-b border-secondary-accent/15 pb-2 uppercase text-[10px]">
                  {"// MISSION_COORDINATES"}
                </div>

                <div className="flex flex-col gap-4 font-sans text-xs">
                  
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[9px] block text-secondary-accent/50 uppercase font-semibold">
                        Laboratory Base Location:
                      </span>
                      <span className="text-secondary-accent/90">
                        {siteConfig.labRoom}, {siteConfig.department}, <br />
                        {siteConfig.college}, <br />
                        {siteConfig.city}, {siteConfig.state} - {siteConfig.pincode}
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary-accent shrink-0" />
                    <div>
                      <span className="font-mono text-[9px] block text-secondary-accent/50 uppercase font-semibold">
                        General Email:
                      </span>
                      <a href={`mailto:${siteConfig.email}`} className="text-secondary-accent/90 hover:text-primary-accent hover:underline font-mono">
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary-accent shrink-0" />
                    <div>
                      <span className="font-mono text-[9px] block text-secondary-accent/50 uppercase font-semibold">
                        Systems Hotline:
                      </span>
                      <a href={`tel:${siteConfig.phone}`} className="text-secondary-accent/90 hover:text-primary-accent hover:underline font-mono">
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social links block */}
                <div className="border-t border-secondary-accent/15 pt-4">
                  <span className="font-mono text-[9px] block text-secondary-accent/50 uppercase font-semibold mb-3">
                    {"// SOCIAL_MEDIA_FEEDS"}
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={siteConfig.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Link"
                      className="p-2 border border-secondary-accent/15 hover:border-primary-accent hover:text-primary-accent transition-colors focus-hud rounded-none"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={siteConfig.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Link"
                      className="p-2 border border-secondary-accent/15 hover:border-primary-accent hover:text-primary-accent transition-colors focus-hud rounded-none"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={siteConfig.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube Channel Link"
                      className="p-2 border border-secondary-accent/15 hover:border-primary-accent hover:text-primary-accent transition-colors focus-hud rounded-none"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                    {siteConfig.socials.github && (
                      <a
                        href={siteConfig.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository Link"
                        className="p-2 border border-secondary-accent/15 hover:border-primary-accent hover:text-primary-accent transition-colors focus-hud rounded-none"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Embedded Google Map (Mock representation or generic embed if available) */}
            <ScrollReveal delay={0.2}>
              <div className="border border-secondary-accent/15 relative h-56 bg-surface overflow-hidden">
                <div className="hud-corner hud-corner-tl" />
                <div className="hud-corner hud-corner-tr" />
                <div className="hud-corner hud-corner-bl" />
                <div className="hud-corner hud-corner-br" />
                {/* Styled Map Placeholder representing laboratory location */}
                <div className="absolute inset-0 bg-bg-base/80 p-6 flex flex-col justify-between font-mono text-[10px] text-secondary-accent/70 hud-grid">
                  <div className="flex justify-between items-center text-primary-accent font-bold">
                    <span>{"/// GOOGLE_MAPS_FEED"}</span>
                    <span className="text-[8px] border border-primary-accent/30 px-1 py-0.5 rounded-sm">{"GPS_OK"}</span>
                  </div>
                  <div className="text-center py-4 text-xs font-sans text-secondary-accent/80 font-semibold uppercase tracking-wider">
                    {siteConfig.college} <br />
                    <span className="text-[10px] font-mono text-secondary-accent/40 font-normal">
                      {"LAT: 12.9716° N // LON: 77.5946° E"}
                    </span>
                  </div>
                  <div className="border-t border-secondary-accent/10 pt-2 text-[8px] flex justify-between uppercase">
                    <span>{"LAB_REF:"} {siteConfig.labRoom}</span>
                    <span>{"MAPS_SECURE"}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Simple Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <div className="border border-secondary-accent/15 bg-surface/30 p-6 md:p-8 relative">
                <div className="hud-corner hud-corner-tl" />
                <div className="hud-corner hud-corner-tr" />
                <div className="hud-corner hud-corner-bl" />
                <div className="hud-corner hud-corner-br" />

                <div className="border-b border-secondary-accent/15 pb-4 mb-6 font-mono">
                  <span className="text-[10px] text-primary-accent font-bold uppercase tracking-widest">
                    {"/// TRANSMISSION_FORM"}
                  </span>
                  <h3 className="font-display text-lg font-bold text-secondary-accent uppercase mt-1">
                    ESTABLISH DUPLEX COMMS
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-xs md:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-2 font-mono">
                      <label htmlFor="name" className="text-secondary-accent/60 uppercase font-semibold text-[10px]">
                        {"// SENDER_NAME"}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="ENTER NAME"
                        className="bg-bg-base border border-secondary-accent/15 p-3 text-secondary-accent placeholder:text-secondary-accent/30 font-mono tracking-widest focus:outline-none focus:border-primary-accent rounded-none"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2 font-mono">
                      <label htmlFor="email" className="text-secondary-accent/60 uppercase font-semibold text-[10px]">
                        {"// SENDER_EMAIL"}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="ENTER EMAIL"
                        className="bg-bg-base border border-secondary-accent/15 p-3 text-secondary-accent placeholder:text-secondary-accent/30 font-mono tracking-widest focus:outline-none focus:border-primary-accent rounded-none"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-2 font-mono">
                    <label htmlFor="subject" className="text-secondary-accent/60 uppercase font-semibold text-[10px]">
                      {"// TELEMETRY_SUBJECT"}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="ENTER TOPIC / REASON"
                      className="bg-bg-base border border-secondary-accent/15 p-3 text-secondary-accent placeholder:text-secondary-accent/30 font-mono tracking-widest focus:outline-none focus:border-primary-accent rounded-none"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2 font-mono">
                    <label htmlFor="message" className="text-secondary-accent/60 uppercase font-semibold text-[10px]">
                      {"// MESSAGE_BODY"}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="WRITE TRANSMISSION METRICS..."
                      className="bg-bg-base border border-secondary-accent/15 p-3 text-secondary-accent placeholder:text-secondary-accent/30 font-sans tracking-wide focus:outline-none focus:border-primary-accent rounded-none resize-none"
                    />
                  </div>

                  {/* Status Indicator / Submit */}
                  <div className="flex items-center justify-between mt-2 font-mono text-xs">
                    <div>
                      {status === "sending" && (
                        <span className="text-primary-accent font-bold animate-pulse uppercase">
                          {"// TRANSMITTING DATA..."}
                        </span>
                      )}
                      {status === "success" && (
                        <span className="text-green-500 font-bold uppercase">
                          {"// TRANSMISSION SUCCESSFUL [COMMS_UP]"}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="font-mono text-xs font-bold border border-primary-accent bg-primary-accent text-white px-6 py-3.5 hover:bg-transparent hover:text-primary-accent transition-all duration-250 focus-hud rounded-none flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" /> SEND_TRANSMISSION
                    </button>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </div>
  );
}
