"use client";

import React from "react";
import { teamData, TeamMember } from "@/content/team";
import ScrollReveal from "@/components/ScrollReveal";
import PageBackground from "@/components/PageBackground";

import { motion } from "framer-motion";

// Custom LinkedIn SVG icon component
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Generic user icon for placeholder cards
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </svg>
);

// Extract 2-letter initials
const getInitials = (name: string) => {
  const cleanName = name.replace(/[\[\]]/g, "").trim();
  const parts = cleanName.split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return cleanName.slice(0, 2).toUpperCase();
};

// Section header component matching the aerospace HUD theme
const SectionHeader = ({ label, title }: { label: string; title: string }) => (
  <div className="flex flex-col gap-2 mb-8">
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] text-primary-accent font-bold uppercase tracking-widest">
        {label}
      </span>
      <div className="flex-1 hud-divider-h" />
    </div>
    <h3 className="font-display text-xl md:text-2xl font-bold text-secondary-accent uppercase tracking-tight">
      {title}
    </h3>
  </div>
);

// Reusable team member card component
const MemberCard = ({
  member,
  index,
  isPlaceholder = false,
}: {
  member: TeamMember;
  index: number;
  isPlaceholder?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.06 * index, duration: 0.45, ease: "easeOut" }}
    className="group flex flex-col items-center gap-4"
  >
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden flex items-center justify-center bg-surface border-2 border-primary-accent/20 shadow-sm"
    >
      {member.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.photoUrl}
          alt={member.name}
          className="object-cover w-full h-full"
          style={{ objectPosition: member.name === "Pushkar Lokhande" ? "center 40%" : "center center" }}
        />
      ) : isPlaceholder ? (
        <UserIcon className="w-16 h-16 md:w-20 md:h-20 text-secondary-accent/30" />
      ) : (
        <span className="font-mono text-2xl font-extrabold text-secondary-accent/70">{getInitials(member.name)}</span>
      )}
    </motion.div>

    {/* Info */}
    <div className="text-center flex flex-col items-center gap-1">
      <h4 className="font-display text-lg md:text-xl font-extrabold text-secondary-accent uppercase">
        {member.name}
      </h4>
      <p className="font-mono text-sm text-secondary-accent/60">{member.role || "Member"}</p>
      {member.linkedinUrl && (
        <a
          href={member.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 text-secondary-accent/30 hover:text-primary-accent transition-colors focus-hud"
          aria-label={`${member.name} LinkedIn`}
        >
          <Linkedin className="w-4 h-4" />
        </a>
      )}
    </div>
  </motion.div>
);

// Frontend developer placeholder data
const frontendPlaceholders: TeamMember[] = [
  { name: "Annanya Ukey", role: "Frontend Developer", subteam: "Members", linkedinUrl: "https://www.linkedin.com/in/annanya-ukey-3698592bb/", photoUrl: "/images/team/annanya.png" },
  { name: "Aayush Gajbhiye", role: "Frontend Developer", subteam: "Members", linkedinUrl: "https://www.linkedin.com/in/aayush-gajbhiye-74104438a/", photoUrl: "/images/team/Aayush.png" },
  { name: "Shruti Bhute", role: "Frontend Developer", subteam: "Members", linkedinUrl: "https://www.linkedin.com/in/shruti-bhute-961277384/", photoUrl: "/images/team/shruti bhute.png" },
];

export default function Team() {
  const captain = teamData.leadership[0];
  const faculty = teamData.faculty[0];
  const leads = teamData.leads;
  const coreMembers = Object.values(teamData.members).flat();

  return (
    <div className="relative w-full flex flex-col min-h-screen py-12 md:py-20 px-4 md:px-8 overflow-hidden">
      <PageBackground />

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
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 1: Faculty Chair & Student President (centered)
        ──────────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-8 items-center">
          {/* Faculty Chair */}
          <div className="text-center flex flex-col items-center gap-1">
            <motion.div whileHover={{ scale: 1.02 }} className="mx-auto w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-primary-accent/30 flex items-center justify-center bg-surface mb-3">
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
            <p className="font-mono text-sm text-secondary-accent/60">Faculty Chair &amp; Coordinator</p>
            {faculty.linkedinUrl && (
              <a
                href={faculty.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-secondary-accent/30 hover:text-primary-accent transition-colors focus-hud"
                aria-label={`${faculty.name} LinkedIn`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Student President */}
          <div className="text-center flex flex-col items-center gap-1">
            <motion.div whileHover={{ scale: 1.02 }} className="mx-auto w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border border-secondary-accent/20 flex items-center justify-center bg-surface mb-2">
              {captain.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={captain.photoUrl} alt={captain.name} className="object-cover w-full h-full" />
              ) : (
                <span className="font-mono text-xl font-extrabold text-secondary-accent">{getInitials(captain.name)}</span>
              )}
            </motion.div>
            <h3 className="font-display text-lg font-bold text-secondary-accent uppercase tracking-tight">{captain.name}</h3>
            <p className="font-mono text-sm text-secondary-accent/60">Student President</p>
            {captain.linkedinUrl && (
              <a
                href={captain.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-secondary-accent/30 hover:text-primary-accent transition-colors focus-hud"
                aria-label={`${captain.name} LinkedIn`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            Team Leads — 4 in a row
        ──────────────────────────────────────────────────────────── */}
        <div className="w-full">
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leads.map((lead, idx) => (
                <MemberCard key={lead.name} member={lead} index={idx} />
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            Members — 3 in a row
        ──────────────────────────────────────────────────────────── */}
        <div className="w-full">
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreMembers.map((member, idx) => (
                <MemberCard
                  key={member.name}
                  member={member}
                  index={idx}
                />
              ))}
              {/* Frontend Developer Placeholders */}
              {frontendPlaceholders.map((placeholder, idx) => (
                <MemberCard
                  key={`placeholder-${idx}`}
                  member={placeholder}
                  index={idx + coreMembers.length}
                  isPlaceholder
                />
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 4: ALUMNI — Horizontal scrolling strip
            Pure typography: year / name / role, no card borders.
        ──────────────────────────────────────────────────────────── */}
        {teamData.alumni.length > 0 && (
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
                      {alumnus.photoUrl ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface border border-secondary-accent/20">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={alumnus.photoUrl} alt={alumnus.name} className="object-cover w-full h-full" />
                        </div>
                      ) : null}
                      <div>
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
        )}

      </div>
    </div>
  );
}
