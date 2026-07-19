"use client";

import React, { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import PageBackground from "@/components/PageBackground";

import { Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Join() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const timelineSteps = [
    {
      step: "01",
      title: "Online Registration Form",
      description: "Fill out the external application form outlining your background, domain interests, and any previous tech project details.",
      date: "Closed on Date [MOCK_DATE_1]"
    },
    {
      step: "02",
      title: "Technical Assessment",
      description: "Complete a basic take-home task designed for your chosen subteam (e.g. simple CAD modeling, control loops, or budgeting sheets).",
      date: "Scheduled [MOCK_DATE_2]"
    },
    {
      step: "03",
      title: "Personal Interview",
      description: "Discuss your task findings, team fit, and interest depth with our division leads and captains in a formal review.",
      date: "Scheduled [MOCK_DATE_3]"
    }
  ];

  const faqs = [
    {
      q: "Do I need prior drone or aerospace experience to join?",
      a: "No prior drone experience is required. We look for core engineering curiosity, willingness to learn composite layout design or systems firmware, and dedication. We provide training for all selected recruits."
    },
    {
      q: "What is the weekly time commitment for AARG?",
      a: "Typically, members commit 8-12 hours per week for standard lab sessions, fabrication tests, and meetings. During flight campaigns or before competitions, commitment levels can rise."
    },
    {
      q: "Which academic disciplines are eligible to apply?",
      a: "Any student enrolled in the college can apply! While a majority of our crew comes from Mechanical, Aerospace, Electronics, and Computer Science departments, we also welcome Business and Humanities students for our business operations."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="relative w-full flex flex-col min-h-screen py-12 md:py-20 px-4 md:px-8 overflow-hidden">
      <PageBackground />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            SQUADRON_RECRUITMENT // JOIN
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-accent uppercase tracking-tight mt-2">
            Recruitment Command
          </h1>
          <p className="text-secondary-accent/60 font-mono text-[11px] mt-1">
            {"SELECTION GATEWAYS // FLIGHT CADRE RECRUITING ACTIVE"}
          </p>
        </div>

        {/* PITCH — editorial text, no card wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Why Join — direct text block */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-2xl font-semibold text-primary-accent leading-none opacity-70">01</span>
                  <div className="hud-divider-v" style={{ height: "2rem" }} />
                  <span className="font-mono text-[10px] text-primary-accent/70 uppercase tracking-widest">Recruitment Call</span>
                </div>
                <div className="hud-divider-h" />
                <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-accent uppercase tracking-tight">
                  Why Join AARG?
                </h2>
                <div className="font-sans text-sm md:text-base text-secondary-accent/85 space-y-4 leading-relaxed max-w-xl">
                  <p>
                    AARG is not a hobby club — it is an incubation facility designed to replicate corporate aerospace engineering pipelines. You will gain hands-on experience running finite element structural models, programming PX4 controller laws, or pitching to corporate sponsors.
                  </p>
                  <p>
                    Our alumni work at top-tier robotics firms, autonomous aviation labs, and defense agencies. By designing and testing custom UAVs, you will bridge the gap between abstract textbooks and validated flight dynamics.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Panel */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.15}>
              <div className="border border-primary-accent/30 bg-surface-low p-6 md:p-8 relative flex flex-col gap-6">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-accent/40 to-transparent pointer-events-none" />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-primary-accent" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-primary-accent" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-primary-accent" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-primary-accent" />

                <div className="font-mono text-[10px] text-primary-accent font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  POINT OF CONTACT
                </div>

                <div className="border-b border-white/5 pb-4">
                  <p className="font-display text-base font-bold text-white uppercase tracking-wide">Aryan Basnet</p>
                  <p className="font-mono text-[10px] text-secondary-accent/50 uppercase tracking-widest mt-0.5">AARG Representative</p>
                </div>

                <div className="flex flex-col gap-4">
                  <a
                    href="tel:+918218397502"
                    className="flex items-center gap-3 group"
                  >
                    <div className="p-2 bg-primary-accent/10 border border-primary-accent/20 group-hover:border-primary-accent/60 transition-colors">
                      <Phone className="w-4 h-4 text-primary-accent" />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] text-secondary-accent/40 uppercase tracking-widest">Phone</p>
                      <p className="font-mono text-xs text-secondary-accent group-hover:text-white transition-colors">+91 82183 97502</p>
                    </div>
                  </a>

                  <a
                    href="mailto:aryanbasnet2005@gmail.com"
                    className="flex items-center gap-3 group"
                  >
                    <div className="p-2 bg-primary-accent/10 border border-primary-accent/20 group-hover:border-primary-accent/60 transition-colors">
                      <Mail className="w-4 h-4 text-primary-accent" />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] text-secondary-accent/40 uppercase tracking-widest">Email</p>
                      <p className="font-mono text-xs text-secondary-accent group-hover:text-white transition-colors">aryanbasnet2005@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/aryan-basnet-446973235/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="p-2 bg-primary-accent/10 border border-primary-accent/20 group-hover:border-primary-accent/60 transition-colors">
                      <svg className="w-4 h-4 text-primary-accent" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] text-secondary-accent/40 uppercase tracking-widest">LinkedIn</p>
                      <p className="font-mono text-xs text-secondary-accent group-hover:text-white transition-colors">aryan-basnet-446973235</p>
                    </div>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>


        {/* FAQ ACCORDION */}
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase font-bold">{"// RECRUITMENT_FAQ"}</span>
            <h3 className="font-display text-xl font-bold text-secondary-accent uppercase tracking-wider">
              Frequently Asked Questions
            </h3>
            <div className="hud-divider-h" />
          </div>

          <div className="flex flex-col gap-0">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="border-b border-secondary-accent/12">
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between py-5 font-display font-bold text-secondary-accent uppercase tracking-wide text-left cursor-pointer hover:text-primary-accent transition-colors focus-hud text-sm md:text-base gap-4"
                  >
                    <span>{faq.q}</span>
                    <span className="font-mono text-primary-accent font-bold ml-4 shrink-0">
                      {isOpen
                        ? <ChevronUp className="w-4 h-4" />
                        : <ChevronDown className="w-4 h-4" />
                      }
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 font-sans text-sm text-secondary-accent/75 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
