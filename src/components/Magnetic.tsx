"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: React.ReactElement;
  range?: number; // Distance threshold to attract cursor
  strength?: number; // How strongly it pulls (e.g. 0.18 = 18%)
}

export default function Magnetic({ children, range = 40, strength = 0.18 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current || shouldReduceMotion) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from cursor to element center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Check if cursor is within range
    const distance = Math.hypot(distanceX, distanceY);
    
    if (distance < range) {
      // Pull element towards cursor
      setPosition({ x: distanceX * strength, y: distanceY * strength });
    } else {
      // Return to original position
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (shouldReduceMotion) return;

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return children;
  }

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
