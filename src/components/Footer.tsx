import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Mail, Phone } from "lucide-react";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const footerDots = Array.from({ length: 72 }, (_, index) => {
  const seed = index * 41 + 12;
  const rand = (n: number) => Math.abs((Math.sin(n) * 10000) % 1);
  const left = 4 + Math.floor(rand(seed) * 92);
  const top = 6 + Math.floor(rand(seed + 7) * 74);
  const size = 0.9 + rand(seed + 3) * 1.4;
  const delay = `${-(rand(seed + 11) * 7).toFixed(2)}s`;
  const duration = `${2.4 + rand(seed + 13) * 2.4}s`;
  return {
    left: `${Math.min(left, 96)}%`,
    top: `${Math.min(top, 90)}%`,
    size,
    delay,
    duration,
  };
});

export default function Footer() {
  const exploreLinks = [
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Projects", href: "/projects" },
    { name: "Achievements", href: "/achievements" },
  ];

  const involvedLinks = [
    { name: "Join Us", href: "/join" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-bg-base py-14 md:py-20 font-sans relative z-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-t from-bg-base via-bg-base/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {footerDots.map((dot, index) => (
          <span
            key={index}
            className="scroll-dot"
            style={{
              left: dot.left,
              top: dot.top,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              animationDelay: dot.delay,
              animationDuration: dot.duration,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="font-display font-bold text-2xl tracking-wider text-secondary-accent flex items-center gap-4 focus-hud w-fit"
            >
              <img
                src="/images/logo.png"
                alt="AARG Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-full"
              />
              {siteConfig.name}
            </Link>
            <p className="text-secondary-accent/65 text-sm leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-5">
            <h4 className="text-secondary-accent font-semibold uppercase tracking-widest text-xs">
              Explore
            </h4>
            <nav className="flex flex-col gap-3 text-secondary-accent/70 text-sm">
              {exploreLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-primary-accent transition-colors duration-200 focus-hud w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Get Involved */}
          <div className="flex flex-col gap-5">
            <h4 className="text-secondary-accent font-semibold uppercase tracking-widest text-xs">
              Get Involved
            </h4>
            <nav className="flex flex-col gap-3 text-secondary-accent/70 text-sm">
              {involvedLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-primary-accent transition-colors duration-200 focus-hud w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="text-secondary-accent font-semibold uppercase tracking-widest text-xs">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-secondary-accent/70 text-sm">
              <span className="text-secondary-accent font-medium">Aryan Basnet</span>
              <a
                href={`tel:${siteConfig.phone}`}
                className="hover:text-primary-accent transition-colors focus-hud w-fit inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-primary-accent shrink-0" />
                {siteConfig.phone}
              </a>
              <a
                href="https://www.linkedin.com/in/aryan-basnet-446973235/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-accent transition-colors focus-hud w-fit inline-flex items-center gap-2"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-primary-accent shrink-0" />
                LinkedIn
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-primary-accent transition-colors focus-hud w-fit inline-flex items-center gap-2 break-all"
              >
                <Mail className="w-3.5 h-3.5 text-primary-accent shrink-0" />
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-accent/15 mt-12 md:mt-14 pt-6 text-secondary-accent/45 text-sm">
          © {new Date().getFullYear()} {siteConfig.name}, AISSMS IoIT. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
