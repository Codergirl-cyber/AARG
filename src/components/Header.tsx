"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/Magnetic";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Projects", href: "/projects" },
    { name: "Achievements", href: "/achievements" },
    { name: "Gallery", href: "/gallery" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full max-w-[100vw] transition-all duration-500 ${
          scrolled
            ? "bg-surface-mid/95 backdrop-blur-xl py-3 border-b border-white/10 shadow-[0_2px_18px_rgba(0,0,0,0.35)]"
            : "bg-surface-mid/95 py-3 border-b border-white/10"
        }`}
      >
        <div className="max-w-screen-xl mx-auto w-full px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 min-w-0">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group focus-hud min-w-0 shrink"
            >
              <div className="relative w-7 h-7 sm:w-9 sm:h-9 lg:w-11 lg:h-11 flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300">
                {!logoError ? (
                  <img
                    src="/images/logo.png"
                    alt="AARG Logo"
                    className="w-full h-full object-contain rounded-full"
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
                  </svg>
                )}
              </div>

              <div className="flex flex-col justify-center min-w-0">
                <span className="font-sans font-extrabold text-sm sm:text-lg lg:text-xl leading-none text-white tracking-wider transition-colors duration-250 group-hover:text-primary-accent whitespace-nowrap">
                  AARG
                </span>
                <span className="hidden sm:block font-sans text-[8px] md:text-[10px] tracking-[0.08em] text-secondary-accent/70 leading-none mt-1 uppercase font-medium whitespace-nowrap">
                  Advanced Aerial Robotics Group
                </span>
              </div>
            </Link>

            {/* Centered Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center min-w-0">
              <nav className="flex items-center gap-5 font-sans text-sm tracking-wide">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative whitespace-nowrap px-1.5 py-2 transition-all duration-200 focus-hud text-secondary-accent/70 font-medium hover:text-white hover:underline hover:underline-offset-4 decoration-primary-accent ${
                        isActive ? "text-white font-semibold" : ""
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
            </div>

            {/* Desktop JOIN US + Mobile hamburger — same row */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden lg:block">
                <Magnetic>
                  <Link
                    href="/join"
                    className="group relative overflow-hidden whitespace-nowrap font-sans text-sm font-semibold border border-primary-accent bg-primary-accent px-5 py-2 hover:bg-primary-accent/95 text-white transition-all duration-300 focus-hud rounded-md inline-flex items-center gap-2 hover:scale-[1.02] shadow-sm hover:shadow-[0_10px_30px_rgba(200,90,23,0.16)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      <span>JOIN US</span>
                    </span>
                  </Link>
                </Magnetic>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className="lg:hidden p-2 border border-white/10 text-secondary-accent hover:border-primary-accent hover:text-primary-accent transition-colors focus-hud rounded-md"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
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
              className="fixed top-0 right-0 bottom-0 w-[min(270px,85vw)] z-42 bg-surface-mid border-l border-white/10 p-6 flex flex-col justify-between lg:hidden"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <span className="font-mono text-[9px] tracking-widest text-primary-accent font-semibold">
                    {"UAV_SYS_NAV"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="p-1 border border-white/5 text-secondary-accent hover:text-primary-accent hover:border-primary-accent transition-colors focus-hud rounded-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="flex flex-col gap-3 font-sans text-sm">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`transition-colors duration-200 focus-hud py-2 ${
                          isActive
                            ? "text-primary-accent font-semibold pl-2 border-l border-primary-accent"
                            : "text-secondary-accent/80 font-medium hover:text-white"
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
                  className="font-sans text-sm font-semibold text-center border border-primary-accent bg-primary-accent py-3 hover:bg-primary-accent/90 text-white transition-all duration-300 focus-hud rounded-md inline-flex items-center justify-center gap-2"
                >
                  <span className="font-bold">↗</span>
                  <span>JOIN US</span>
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
