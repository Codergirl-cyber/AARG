"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import ScrollReveal from "@/components/ScrollReveal";
import DecryptText from "@/components/DecryptText";
import { UserPlus, ChevronDown, ChevronUp } from "lucide-react";
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
    <div className="relative w-full flex flex-col min-h-screen bg-bg-base py-12 md:py-20 px-4 md:px-8">
      {/* HUD background grid overlay */}
      <div className="absolute inset-0 hud-grid pointer-events-none opacity-30" />
      <div className="absolute inset-0 hud-grid-fine pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            <DecryptText text="/// SQUADRON_RECRUITMENT // JOIN" />
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-secondary-accent uppercase tracking-tight mt-2">
            RECRUITMENT COMMAND
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
                  <span className="font-mono text-4xl font-extrabold text-primary-accent leading-none opacity-80">01</span>
                  <div className="hud-divider-v" style={{ height: "2rem" }} />
                  <span className="font-mono text-[10px] text-primary-accent/70 uppercase tracking-widest">Recruitment Call</span>
                </div>
                <div className="hud-divider-h" />
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-secondary-accent uppercase tracking-tight">
                  WHY JOIN AARG?
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

          {/* CTA Panel — HUD panel kept (focused action element) */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.15}>
              <div className="border border-primary-accent/30 bg-surface-low p-6 md:p-8 relative flex flex-col gap-6 text-center items-center">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-accent/40 to-transparent pointer-events-none" />

                <div className="font-mono text-xs text-primary-accent font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  GATEWAY: REGISTRATION OPEN
                </div>

                <p className="font-sans text-xs text-secondary-accent/70 leading-relaxed max-w-sm">
                  Click the link below to load AARG&apos;s external Google Form application portal. Ensure you provide accurate details.
                </p>

                <a
                  href={siteConfig.recruitmentFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold border border-primary-accent bg-primary-accent text-white px-6 py-4 hover:bg-transparent hover:text-primary-accent transition-all duration-250 focus-hud text-center flex items-center justify-center gap-2 rounded-none w-full cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" /> APPLY_NOW // REG_PORTAL
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* SELECTION STEPS — Vertical sequential flow, not 3 cards */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <h2 className="font-mono text-[10px] font-bold text-secondary-accent uppercase tracking-widest">
              {"// SELECTION STEPS & SCHEDULE"}
            </h2>
            <div className="flex-1 hud-divider-h" />
          </div>

          {/* Vertical step flow */}
          <div className="flex flex-col gap-0 max-w-3xl">
            {timelineSteps.map((step, idx) => (
              <ScrollReveal key={step.step} delay={0.1 * idx}>
                <div className="grid grid-cols-12 gap-6 items-start">
                  {/* Step number + connector line */}
                  <div className="col-span-2 flex flex-col items-center">
                    <span className="font-mono text-4xl md:text-5xl font-extrabold text-primary-accent leading-none">
                      {step.step}
                    </span>
                    {idx < timelineSteps.length - 1 && (
                      <div className="w-[1px] flex-1 mt-3 min-h-[3rem]" style={{ background: "rgba(180,77,11,0.25)" }} />
                    )}
                  </div>

                  {/* Step content */}
                  <div className="col-span-10 flex flex-col gap-2 pt-1 pb-8">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-display font-bold text-base md:text-lg text-secondary-accent uppercase tracking-wide">
                        {step.title}
                      </h3>
                      <span className="font-mono text-[9px] text-secondary-accent/35 uppercase border border-secondary-accent/12 px-2 py-0.5 tracking-widest">
                        {step.date}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-secondary-accent/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] text-primary-accent tracking-widest uppercase font-bold">{"// RECRUITMENT_FAQ"}</span>
            <h3 className="font-display text-2xl font-extrabold text-secondary-accent uppercase tracking-wider">
              FREQUENTLY ASKED QUESTIONS
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
