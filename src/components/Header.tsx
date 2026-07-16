"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import TelemetryStrip from "@/components/TelemetryStrip";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Accessibility: Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Domains", href: "/domains" },
    { name: "Achievements", href: "/achievements" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-bg-base/90 backdrop-blur-md py-2 shadow-md border-b border-white/5"
            : "bg-transparent py-4 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-hud"
          >
            {/* Logo Container */}
            <div className="relative w-10 h-10 flex-shrink-0 bg-black/40 border border-white/10 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:border-primary-accent/50">
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="AARG Logo"
                  className="w-full h-full object-cover"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-primary-accent"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                  <path
                    d="M50 20C50 20 44 38 44 55C44 62 48 66 50 66C52 66 56 62 56 55C56 38 50 20 50 20Z"
                    fill="currentColor"
                    opacity="0.85"
                  />
                  <path
                    d="M44 48C40 50 35 55 35 60C35 63 39 63 43 61L44 58"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M56 48C60 50 65 55 65 60C65 63 61 63 57 61L56 58"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            {/* Text Container */}
            <div className="flex flex-col justify-center">
              <span className="font-sans font-extrabold text-base md:text-lg leading-none text-white tracking-wider transition-colors duration-250 group-hover:text-primary-accent">
                AARG
              </span>
              <span className="font-mono text-[7px] md:text-[8px] tracking-[0.15em] text-secondary-accent/60 leading-none mt-1 uppercase font-medium">
                Advanced Aerial Robotics Group
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Link Strip - Increased gap to 8 */}
          <nav className="hidden lg:flex items-center gap-8 font-mono text-[10px] tracking-wider font-semibold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`hover:text-primary-accent transition-colors duration-200 focus-hud px-1 py-1 relative ${
                    isActive ? "text-primary-accent font-bold" : "text-secondary-accent/80"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary-accent"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Primary Call-to-Action - Cleaned & Toned Down */}
          <div className="hidden lg:block">
            <Magnetic>
              <Link
                href="/join"
                className="group relative overflow-hidden font-mono text-[10px] font-bold border border-primary-accent/40 bg-primary-accent/5 px-4 py-2 hover:bg-primary-accent/15 hover:border-primary-accent hover:text-white transition-all duration-300 focus-hud rounded-md flex items-center gap-1.5 hover:scale-[1.02]"
              >
                <span className="relative z-10">{"JOIN_US // REC_OPEN"}</span>
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="lg:hidden p-2 border border-white/10 text-secondary-accent hover:border-primary-accent hover:text-primary-accent transition-colors focus-hud rounded-md"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Live flight computer telemetry bar */}
        <div className="mt-2">
          <TelemetryStrip />
        </div>
      </header>

      {/* Mobile Sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-41 bg-bg-base/70 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[270px] z-42 bg-surface-mid border-l border-white/10 p-6 flex flex-col justify-between lg:hidden"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <span className="font-mono text-[9px] tracking-widest text-primary-accent font-semibold">
                    {"/// UAV_SYS_NAV"}
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="p-1 border border-white/5 text-secondary-accent hover:text-primary-accent hover:border-primary-accent transition-colors focus-hud rounded-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="flex flex-col gap-3 font-mono text-xs">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`hover:text-primary-accent transition-colors duration-200 focus-hud py-2 ${
                          isActive
                            ? "text-primary-accent font-bold pl-2 border-l border-primary-accent"
                            : "text-secondary-accent/80"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/5 pt-6">
                <Link
                  href="/join"
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-xs font-bold text-center border border-primary-accent bg-primary-accent/5 py-3 hover:bg-primary-accent hover:text-white transition-all duration-300 focus-hud rounded-md block"
                >
                  {"JOIN_US // REC_OPEN"}
                </Link>
                <div className="text-center font-mono text-[9px] text-secondary-accent/40 uppercase">
                  AARG Flight Console v1.0.0
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
