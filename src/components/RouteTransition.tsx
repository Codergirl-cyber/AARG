"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface RouteTransitionProps {
  children: React.ReactNode;
}

export default function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  
  // State for simulated page loading progress bar
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Track page scroll progress
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to clean display values
  const [scrollPct, setScrollPct] = useState(0);
  
  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      setScrollPct(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  // Trigger telemetry route-load progress bar on path changes
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    setLoading(true);
    setProgress(15);
    
    const t1 = setTimeout(() => setProgress(45), 100);
    const t2 = setTimeout(() => setProgress(85), 200);
    const t3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 150);
    }, 350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, shouldReduceMotion]);

  // Telemetry vertical coordinate labels
  const scrollCoordinates = useTransform(scrollYProgress, [0, 1], [0, 9999]);
  const [formattedCoords, setFormattedCoords] = useState("0000");

  useEffect(() => {
    return scrollCoordinates.onChange((v) => {
      setFormattedCoords(Math.floor(v).toString().padStart(4, "0"));
    });
  }, [scrollCoordinates]);

  if (shouldReduceMotion) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <>
      {/* 1. Telemetry Loading Progress Bar */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-surface z-50 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="h-full bg-primary-accent shadow-[0_0_8px_#b44d0b]"
          />
          <span className="absolute right-4 top-1 font-mono text-[8px] text-primary-accent/80 animate-pulse">
            LOADING_DATA // SYS_SYS_ACK
          </span>
        </div>
      )}

      {/* 2. Persistent Side Scroll-Progress HUD Bar */}
      <div className="fixed left-4 top-1/4 bottom-1/4 w-12 hidden md:flex flex-col items-center justify-between z-30 font-mono text-[9px] text-secondary-accent/40 pointer-events-none border-l border-secondary-accent/10 pl-2">
        <span className="text-primary-accent font-bold">ALT_PCT</span>
        
        {/* Track Line & Indicator */}
        <div className="relative flex-1 w-full my-4 flex justify-center">
          {/* Scroll progress slider track */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-secondary-accent/10" />
          
          {/* Progress fill */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] bg-primary-accent"
            style={{ height: `${scrollPct}%`, transformOrigin: "top" }}
          />
          
          {/* Telemetry scrolling text indicator */}
          <motion.div
            className="absolute left-0 right-0 text-center font-bold text-primary-accent bg-bg-base/90 py-0.5 border border-primary-accent/25 rounded-none px-1"
            style={{ top: `calc(${scrollPct}% - 10px)` }}
          >
            {scrollPct}%
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-0.5 font-bold">
          <span>ALT_ELEV</span>
          <span className="text-secondary-accent/70">{formattedCoords}</span>
        </div>
      </div>

      {/* 3. Page Route Transition Animates */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: { opacity: 0, filter: "brightness(0.2) contrast(1.5)" },
            animate: { 
              opacity: 1, 
              filter: "brightness(1) contrast(1)",
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } 
            },
            exit: { 
              opacity: 0, 
              filter: "brightness(0.2) contrast(1.5)",
              transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } 
            }
          }}
          className="relative w-full flex-grow flex flex-col"
        >
          <motion.div
            initial={{ height: "100%" }}
            animate={{ height: "0%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-x-0 top-0 bg-primary-accent/10 z-45 pointer-events-none"
          />
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
