"use client";

import React from "react";
import { teamData } from "@/content/team";
import ScrollReveal from "@/components/ScrollReveal";

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
            UAV_CREW_MANIFEST // FLIGHT_OFFICERS
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-accent uppercase tracking-tight mt-2">
            The AARG Squadron
          </h1>
          <p className="text-secondary-accent/60 font-mono text-[11px] mt-1">
            CREW_TOTAL // {teamData.leadership.length + teamData.leads.length + 15} MEMBERS ACTIVE
          </p>
        </div>

        {/* New centered leadership layout per request:
            - Center top: Faculty (Rahul Jadhav) as main profile
            - Below: Student President (Aryan Basnet)
            - Then a 'Members' tag and a three-column grid of remaining people (leads + members)
        */}
        <div className="flex flex-col gap-8 items-center">
          <div className="text-center">
            <motion.div whileHover={{ scale: 1.02 }} className="mx-auto w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-primary-accent/30 flex items-center justify-center bg-surface mb-4">
              {faculty.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={faculty.photoUrl} alt={faculty.name} className="object-cover w-full h-full" />
              ) : (
                <span className="font-mono text-2xl font-extrabold text-primary-accent">{getInitials(faculty.name)}</span>
              )}
            </motion.div>
            <h2 className="font-display text-xl md:text-2xl font-extrabold text-secondary-accent uppercase tracking-tight">
              {faculty.name.replace(/^Mr\s+/i, "").trim()}
            </h2>
            <p className="font-mono text-sm text-secondary-accent/60 mt-1">Faculty Chair &amp; Coordinator</p>
          </div>

          <div className="text-center">
            <motion.div whileHover={{ scale: 1.02 }} className="mx-auto w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border border-secondary-accent/20 flex items-center justify-center bg-surface mb-3">
              {captain.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={captain.photoUrl} alt={captain.name} className="object-cover w-full h-full" />
              ) : (
                <span className="font-mono text-xl font-extrabold text-secondary-accent">{getInitials(captain.name)}</span>
              )}
            </motion.div>
            <h3 className="font-display text-lg font-bold text-secondary-accent uppercase tracking-tight">{captain.name}</h3>
            <p className="font-mono text-sm text-secondary-accent/60 mt-1">Student President</p>
          </div>

          <div className="w-full max-w-5xl mt-6">
            <div className="text-center mb-4">
              <span className="font-mono text-[10px] text-primary-accent font-bold uppercase tracking-widest">Members</span>
            </div>

            {/* Combine leads + members into a single list for the 3-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamData.leads.concat(...Object.values(teamData.members)).flat().map((member, idx) => (
                <div key={`${member.name}-${idx}`} className="flex flex-col items-center gap-4 bg-surface/5 p-6 rounded">
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden flex items-center justify-center bg-surface border-2 border-primary-accent/20 shadow-sm">
                    {member.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={member.photoUrl} alt={member.name} className="object-cover w-full h-full" />
                    ) : (
                      <span className="font-mono text-2xl font-extrabold text-secondary-accent/70">{getInitials(member.name)}</span>
                    )}
                  </div>
                  <div className="text-center">
                    <h4 className="font-display text-lg md:text-xl font-extrabold text-secondary-accent uppercase">{member.name}</h4>
                      <p className="font-mono text-sm text-secondary-accent/60">{member.role || 'Member'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Removed subteam/lead sections per request — only the centered members grid above is shown */}

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
