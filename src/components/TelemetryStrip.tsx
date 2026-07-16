"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function TelemetryStrip() {
  const pathname = usePathname();
  const [telem, setTelem] = useState({
    lat: 12.9716,
    lng: 77.5946,
    alt: 120.4,
    spd: 14.5,
    sat: 18,
    bat: 82,
    mode: "AUTO_NAV",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelem((prev) => {
        // Randomly walk coordinates and telemetry values slightly
        const latWalk = (Math.random() - 0.5) * 0.0004;
        const lngWalk = (Math.random() - 0.5) * 0.0004;
        const altWalk = (Math.random() - 0.5) * 0.6;
        const spdWalk = (Math.random() - 0.5) * 0.3;

        return {
          lat: prev.lat + latWalk,
          lng: prev.lng + lngWalk,
          alt: Math.max(0, prev.alt + altWalk),
          spd: Math.max(0, prev.spd + spdWalk),
          sat: Math.random() > 0.85 ? (Math.random() > 0.5 ? 18 : 19) : prev.sat,
          bat: Math.random() > 0.99 ? Math.max(0, prev.bat - 1) : prev.bat,
          mode: prev.mode,
        };
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Format helper for numbers
  const fmtNum = (n: number, dec = 4) => n.toFixed(dec);

  return (
    <div className="w-full bg-[#111318]/90 backdrop-blur-sm border-b border-white/5 py-1 px-4 md:px-8 select-none overflow-hidden relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-[8px] md:text-[9px] text-secondary-accent/65 tracking-wider uppercase flex-wrap gap-y-1">
        {/* Left readout: GPS Coordinates */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            <span className="text-secondary-accent/40">SYS_STATE:</span>
            <span className="text-green-500 font-bold">ONLINE</span>
          </span>
          <span className="hidden sm:inline">|</span>
          <span>
            <span className="text-secondary-accent/40">GPS:</span> {fmtNum(telem.lat)}° N, {fmtNum(telem.lng)}° E
          </span>
        </div>

        {/* Center readout: Active Route/Mode */}
        <div className="hidden lg:flex items-center gap-1.5">
          <span className="text-secondary-accent/40">FLT_ROUTE:</span>
          <span className="text-secondary-accent font-semibold">
            {pathname === "/" ? "BASE_HOME" : pathname.replace("/", "").toUpperCase()} // {telem.mode}
          </span>
        </div>

        {/* Right readout: Flight variables */}
        <div className="flex items-center gap-4">
          <span>
            <span className="text-secondary-accent/40">ALT:</span> {fmtNum(telem.alt, 1)}m
          </span>
          <span>
            <span className="text-secondary-accent/40">SPD:</span> {fmtNum(telem.spd, 1)}m/s
          </span>
          <span className="hidden md:inline">
            <span className="text-secondary-accent/40">SAT:</span> {telem.sat}
          </span>
          <span>
            <span className="text-secondary-accent/40">BAT:</span> {telem.bat}%
          </span>
        </div>
      </div>
    </div>
  );
}
