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

  if (shouldReduceMotion) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <>
      {/* 1. Telemetry Loading Progress Bar - Non Glowing */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-surface-low z-50 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="h-full bg-primary-accent"
          />
          <span className="absolute right-4 top-1 font-mono text-[8px] text-secondary-accent/40">
            LOADING_DATA // SYS_SYS_ACK
          </span>
        </div>
      )}

      {/* 3. Page Route Transition Animates - Premium Slide and Fade Spring */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: { opacity: 0, y: 12 },
            animate: { 
              opacity: 1, 
              y: 0,
              transition: { type: "spring", stiffness: 200, damping: 25 } 
            },
            exit: { 
              opacity: 0, 
              y: -12,
              transition: { duration: 0.2, ease: "easeInOut" } 
            }
          }}
          className="relative w-full flex-grow flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
