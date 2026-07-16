"use client";

import React from "react";
import { teamData } from "@/content/team";
import ScrollReveal from "@/components/ScrollReveal";
import DecryptText from "@/components/DecryptText";
import { motion } from "framer-motion";

// Custom LinkedIn SVG icon component
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Extract 2-letter initials
const getInitials = (name: string) => {
  const cleanName = name.replace(/[\[\]]/g, "").trim();
  const parts = cleanName.split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return cleanName.slice(0, 2).toUpperCase();
};

export default function Team() {
  const captain = teamData.leadership[0];
  const viceCaptain = teamData.leadership[1];
  const faculty = teamData.faculty[0];

  return (
    <div className="relative w-full flex flex-col min-h-screen bg-bg-base py-12 md:py-20 px-4 md:px-8">

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            <DecryptText text="/// UAV_CREW_MANIFEST // FLIGHT_OFFICERS" />
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-secondary-accent uppercase tracking-tight mt-2">
            THE AARG SQUADRON
          </h1>
          <p className="text-secondary-accent/60 font-mono text-[11px] mt-1">
            CREW_TOTAL // {teamData.leadership.length + teamData.leads.length + 15} MEMBERS ACTIVE
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 1: LEADERSHIP MASTHEAD
            Captain is larger, vice + faculty beside at smaller scale.
            No card borders — names sit directly in the strip.
        ──────────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-primary-accent font-bold uppercase tracking-widest">
              {"// CORE LEADERSHIP & FACULTY"}
            </span>
            <div className="flex-1 hud-divider-h" />
          </div>

          <ScrollReveal>
            {/* Masthead strip: captain | divider | vice+faculty */}
            <div className="flex flex-col md:flex-row items-start md:items-stretch gap-0 border-t border-b border-secondary-accent/15 divide-y md:divide-y-0 md:divide-x divide-secondary-accent/12">
              
              {/* Captain — larger visual weight */}
              <div className="flex items-center gap-6 py-8 md:pr-10 flex-1 md:flex-none md:basis-[42%]">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-primary-accent/40 flex items-center justify-center relative overflow-hidden select-none bg-primary-accent/10 shrink-0"
                >
                  {captain.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={captain.photoUrl} alt={captain.name} className="object-cover w-full h-full" />
                  ) : (
                    <span className="font-mono text-xl font-extrabold text-primary-accent">
                      {getInitials(captain.name)}
                    </span>
                  )}
                  {/* Accent ring pulse */}
                  <span className="absolute inset-0 rounded-full border border-primary-accent/20 animate-pulse pointer-events-none" />
                </motion.div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-primary-accent uppercase tracking-widest font-semibold">
                    TEAM CAPTAIN
                  </span>
                  <h2 className="font-display text-xl md:text-2xl font-extrabold text-secondary-accent uppercase tracking-tight leading-tight">
                    {captain.name}
                  </h2>
                  <p className="font-mono text-xs text-secondary-accent/55">
                    {captain.role}
                  </p>
                  {captain.linkedinUrl && (
                    <a
                      href={captain.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${captain.name} LinkedIn`}
                      className="mt-1 text-secondary-accent/40 hover:text-primary-accent transition-colors focus-hud w-fit"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Vice Captain + Faculty — smaller scale, side by side */}
              <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-secondary-accent/12 flex-1">
                {[viceCaptain, faculty].map((member) => (
                  <div key={member.name} className="flex items-center gap-4 py-6 px-0 sm:px-8 flex-1">
                    <div className="w-12 h-12 rounded-full border border-secondary-accent/25 flex items-center justify-center relative overflow-hidden select-none bg-surface shrink-0">
                      {member.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={member.photoUrl} alt={member.name} className="object-cover w-full h-full" />
                      ) : (
                        <span className="font-mono text-sm font-bold text-secondary-accent/70">
                          {getInitials(member.name)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[9px] text-secondary-accent/40 uppercase tracking-widest">
                        {member.subteam}
                      </span>
                      <h3 className="font-display text-sm font-extrabold text-secondary-accent uppercase leading-tight">
                        {member.name}
                      </h3>
                      <p className="font-mono text-[10px] text-secondary-accent/50">
                        {member.role}
                      </p>
                      {"linkedinUrl" in member && member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 text-secondary-accent/30 hover:text-primary-accent transition-colors focus-hud w-fit"
                        >
                          <Linkedin className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </ScrollReveal>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 2: DOMAIN LEADS — Horizontal hub rail
            Compact station strip — no card grid.
        ──────────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-primary-accent font-bold uppercase tracking-widest">
              {"// FLIGHT DIVISION LEADS"}
            </span>
            <div className="flex-1 hud-divider-h" />
          </div>

          <ScrollReveal>
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex min-w-max md:min-w-0 md:flex-row border-t border-b border-secondary-accent/15 divide-x divide-secondary-accent/12">
                {teamData.leads.map((lead, index) => (
                  <motion.div
                    key={lead.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.07 * index, duration: 0.4 }}
                    className="flex flex-col items-center gap-3 px-6 py-6 text-center flex-1 min-w-[160px] group cursor-default"
                  >
                    {/* Domain tag eyebrow */}
                    <span className="font-mono text-[8px] text-primary-accent/60 uppercase tracking-widest border border-primary-accent/20 px-2 py-0.5">
                      {lead.subteam.split(" &")[0].toUpperCase()}
                    </span>
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full border border-secondary-accent/20 group-hover:border-primary-accent/40 transition-colors flex items-center justify-center bg-surface">
                      {lead.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={lead.photoUrl} alt={lead.name} className="object-cover w-full h-full rounded-full" />
                      ) : (
                        <span className="font-mono text-xs font-bold text-secondary-accent/70 group-hover:text-secondary-accent transition-colors">
                          {getInitials(lead.name)}
                        </span>
                      )}
                    </div>
                    {/* Name */}
                    <div className="flex flex-col gap-0.5 items-center">
                      <h4 className="font-display text-xs font-bold text-secondary-accent uppercase truncate max-w-[130px]">
                        {lead.name}
                      </h4>
                      <p className="font-mono text-[9px] text-secondary-accent/50 truncate max-w-[130px]">
                        {lead.role}
                      </p>
                    </div>
                    {/* LinkedIn */}
                    {lead.linkedinUrl && (
                      <a
                        href={lead.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary-accent/25 hover:text-primary-accent transition-colors focus-hud"
                      >
                        <Linkedin className="w-3 h-3" />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 3: MEMBERS — Compact roster table per subteam
            Dense name+role rows, no individual mini-cards.
        ──────────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-primary-accent font-bold uppercase tracking-widest">
              {"// SPECIALIST DIVISIONS"}
            </span>
            <div className="flex-1 hud-divider-h" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-secondary-accent/12 relative">

            {Object.entries(teamData.members).map(([subteamName, membersList], sIdx) => (
              <ScrollReveal key={subteamName} delay={0.05 * sIdx}>
                <div className={`flex flex-col gap-0 border-secondary-accent/12 ${
                  sIdx % 2 === 0 ? "lg:border-r" : ""
                } ${sIdx < Object.keys(teamData.members).length - 2 ? "border-b" : ""} ${
                  sIdx === Object.keys(teamData.members).length - 1 && Object.keys(teamData.members).length % 2 === 1 
                    ? "lg:border-r-0" 
                    : ""
                }`}>
                  {/* Subteam header */}
                  <div className="flex items-center gap-2 px-5 pt-5 pb-3 border-b border-secondary-accent/10">
                    <span className="w-1.5 h-1.5 bg-primary-accent shrink-0" />
                    <h3 className="font-mono text-[10px] font-bold uppercase text-primary-accent tracking-widest">
                      {subteamName}
                    </h3>
                    <span className="font-mono text-[9px] text-secondary-accent/30 ml-auto">
                      {membersList.length} MEMBERS
                    </span>
                  </div>

                  {/* Roster rows */}
                  <div className="px-5 pb-5 pt-2">
                    {membersList.map((member, mIdx) => (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.04 * mIdx, duration: 0.35 }}
                        className="roster-row"
                      >
                        {/* Initials badge */}
                        <div className="w-7 h-7 rounded-full border border-secondary-accent/15 flex items-center justify-center bg-surface/60 shrink-0">
                          <span className="font-mono text-[9px] font-bold text-secondary-accent/55">
                            {getInitials(member.name)}
                          </span>
                        </div>
                        {/* Name + Role */}
                        <div className="flex flex-col gap-0 min-w-0 flex-1">
                          <span className="font-display text-xs font-bold text-secondary-accent uppercase truncate leading-tight">
                            {member.name}
                          </span>
                          <span className="font-mono text-[9px] text-secondary-accent/45 truncate">
                            {member.role}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 4: ALUMNI — Horizontal scrolling strip
            Pure typography: year / name / role, no card borders.
        ──────────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-primary-accent font-bold uppercase tracking-widest">
              {"// DECOMMISSIONED OFFICER CADRES (ALUMNI)"}
            </span>
            <div className="flex-1 hud-divider-h" />
          </div>

          <ScrollReveal>
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex border-t border-b border-secondary-accent/12 py-5">
                {teamData.alumni.map((alumnus, index) => (
                  <motion.div
                    key={alumnus.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className="alumni-strip-item"
                  >
                    <span className="font-mono text-[10px] text-primary-accent font-bold uppercase">
                      {alumnus.classYear}
                    </span>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display text-sm font-extrabold text-secondary-accent uppercase leading-tight">
                        {alumnus.name}
                      </h4>
                      {alumnus.linkedinUrl && (
                        <a
                          href={alumnus.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary-accent/25 hover:text-primary-accent transition-colors focus-hud shrink-0"
                        >
                          <Linkedin className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <span className="font-mono text-[9px] text-secondary-accent/45 uppercase">
                      {alumnus.role}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}
