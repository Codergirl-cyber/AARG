"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TelemetryState {
  airspeed: number;
  altitude: number;
  pitch: number;
  roll: number;
  heading: number;
  battery: number;
  signal: number;
  gps: number;
  throttle: number;
  uptime: number; // seconds
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function randWalk(cur: number, step: number, min: number, max: number) {
  return clamp(cur + (Math.random() - 0.5) * step * 2, min, max);
}

function fmtNum(n: number, decimals = 1) {
  return n.toFixed(decimals);
}

function fmtUptime(s: number) {
  const h = Math.floor(s / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((s % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${h}:${m}:${sec}`;
}

function headingLabel(deg: number) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(((deg % 360) + 360) % 360 / 45) % 8];
}

// ─── Waveform ─────────────────────────────────────────────────────────────────

function buildPath(points: number[], width: number, height: number): string {
  if (points.length < 2) return "";
  const step = width / (points.length - 1);
  return points
    .map((p, i) => {
      const x = i * step;
      const y = height - (p / 100) * height;
      return i === 0 ? `M ${x},${y}` : `L ${x},${y}`;
    })
    .join(" ");
}

// ─── Artificial Horizon ───────────────────────────────────────────────────────

function ArtificialHorizon({ pitch, roll }: { pitch: number; roll: number }) {
  const size = 60;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;
  // pitch offset: 1 degree = 0.8px
  const pitchOffset = clamp(pitch * 0.8, -r + 4, r - 4);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="overflow-visible"
    >
      <defs>
        <clipPath id="ah-clip">
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>

      {/* Sky */}
      <g clipPath="url(#ah-clip)">
        <rect x={0} y={0} width={size} height={size} fill="#0a1626" />
        {/* Horizon band rotated by roll */}
        <g
          transform={`rotate(${-roll}, ${cx}, ${cy}) translate(0, ${pitchOffset})`}
        >
          {/* Ground */}
          <rect x={-10} y={cy} width={size + 20} height={size + 10} fill="#141c24" />
          {/* Horizon line */}
          <line
            x1={-10}
            y1={cy}
            x2={size + 10}
            y2={cy}
            stroke="#4A90D9"
            strokeWidth={1}
            opacity={0.75}
          />
          {/* Pitch ladder lines */}
          {[-10, -5, 5, 10].map((p) => (
            <line
              key={p}
              x1={cx - 8}
              y1={cy + p * 0.8}
              x2={cx + 8}
              y2={cy + p * 0.8}
              stroke="#B8C4CE"
              strokeWidth={0.6}
              opacity={0.35}
            />
          ))}
        </g>
      </g>

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#4A90D9" strokeWidth={0.8} opacity={0.4} />

      {/* Reticle — fixed */}
      <line x1={cx - 12} y1={cy} x2={cx - 5} y2={cy} stroke="#4A90D9" strokeWidth={1.2} />
      <line x1={cx + 5} y1={cy} x2={cx + 12} y2={cy} stroke="#4A90D9" strokeWidth={1.2} />
      <circle cx={cx} cy={cy} r={1.2} fill="#4A90D9" />

      {/* Roll marker at top */}
      <polygon
        points={`${cx},${cy - r + 1} ${cx - 2},${cy - r + 5} ${cx + 2},${cy - r + 5}`}
        fill="#4A90D9"
        opacity={0.8}
      />
    </svg>
  );
}

// ─── Compass Rose ─────────────────────────────────────────────────────────────

function CompassRose({ heading }: { heading: number }) {
  const size = 60;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;

  const cardinals = [
    { label: "N", angle: 0 },
    { label: "E", angle: 90 },
    { label: "S", angle: 180 },
    { label: "W", angle: 270 },
  ];

  const tickAngles = Array.from({ length: 36 }, (_, i) => i * 10);

  function polarToXY(angle: number, radius: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#4A90D9" strokeWidth={0.8} opacity={0.35} />

      {/* Rotating group */}
      <g
        transform={`rotate(${-heading}, ${cx}, ${cy})`}
        style={{ transition: "transform 0.5s ease" }}
      >
        {tickAngles.map((a) => {
          const isMajor = a % 90 === 0;
          const isMed = a % 30 === 0;
          const outer = polarToXY(a, r - 1);
          const inner = polarToXY(a, r - (isMajor ? 6 : isMed ? 4 : 2));
          return (
            <line
              key={a}
              x1={outer.x}
              y1={outer.y}
              x2={inner.x}
              y2={inner.y}
              stroke={isMajor ? "#4A90D9" : "#B8C4CE"}
              strokeWidth={isMajor ? 1 : 0.6}
              opacity={isMajor ? 0.8 : 0.25}
            />
          );
        })}

        {/* Cardinal labels */}
        {cardinals.map(({ label, angle }) => {
          const pos = polarToXY(angle, r - 10);
          return (
            <text
              key={label}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={5}
              fill={label === "N" ? "#4A90D9" : "#B8C4CE"}
              fontFamily="monospace"
              fontWeight={label === "N" ? "bold" : "normal"}
              opacity={label === "N" ? 0.95 : 0.5}
            >
              {label}
            </text>
          );
        })}
      </g>

      {/* Fixed heading needle */}
      <polygon
        points={`${cx},${cy - r + 8} ${cx - 2},${cy} ${cx + 2},${cy}`}
        fill="#4A90D9"
        opacity={0.85}
      />
      <polygon
        points={`${cx},${cy + r - 8} ${cx - 2},${cy} ${cx + 2},${cy}`}
        fill="#B8C4CE"
        opacity={0.2}
      />
      <circle cx={cx} cy={cy} r={2} fill="#4A90D9" />

      {/* Fixed crosshair ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#B8C4CE" strokeWidth={0.5} opacity={0.08} />
    </svg>
  );
}

// ─── Bar Gauge ────────────────────────────────────────────────────────────────

function BarGauge({
  value,
  max = 100,
  label,
  unit = "%",
  warn = 20,
}: {
  value: number;
  max?: number;
  label: string;
  unit?: string;
  warn?: number;
}) {
  const pct = clamp((value / max) * 100, 0, 100);
  const isWarn = value <= warn;

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex justify-between items-center">
        <span className="text-[8px] font-mono uppercase tracking-widest text-secondary-accent/40">
          {label}
        </span>
        <span
          className={`text-[9px] font-mono font-bold ${
            isWarn ? "text-red-400" : "text-secondary-accent/70"
          }`}
        >
          {fmtNum(value, 0)}
          {unit}
        </span>
      </div>
      <div className="h-[3px] w-full bg-secondary-accent/10 relative overflow-hidden">
        <motion.div
          className={`h-full ${isWarn ? "bg-red-500" : "bg-primary-accent"}`}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Animated Waveform ────────────────────────────────────────────────────────

const WAVE_POINTS = 40;

function Waveform({ value, color = "#4A90D9" }: { value: number; color?: string }) {
  // Initialise with a flat deterministic array (SSR-safe — no Math.random on server).
  // The useEffect below seeds realistic random values immediately on the client.
  const [points, setPoints] = useState<number[]>(
    Array.from({ length: WAVE_POINTS }, () => 50)
  );

  // Seed randomness once on the client to avoid server/client hydration mismatch.
  useEffect(() => {
    setPoints(Array.from({ length: WAVE_POINTS }, () => 40 + Math.random() * 20));
  }, []);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const tick = useCallback(
    (time: number) => {
      if (time - lastTimeRef.current > 80) {
        lastTimeRef.current = time;
        setPoints((prev) => {
          const next = [...prev.slice(1)];
          // push new point trending toward the live value normalised 0-100
          const target = clamp(value, 0, 100);
          const last = next[next.length - 1] ?? 50;
          next.push(clamp(lerp(last, target, 0.25) + (Math.random() - 0.5) * 8, 5, 95));
          return next;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    },
    [value]
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  const W = 260;
  const H = 36;
  const path = buildPath(points, W, H);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height: H }}
      preserveAspectRatio="none"
    >
      {/* Fill gradient */}
      <defs>
        <linearGradient id="wave-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      {path && (
        <path
          d={`${path} L ${W},${H} L 0,${H} Z`}
          fill="url(#wave-fill)"
        />
      )}
      {/* Line */}
      {path && (
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
      {/* Live dot at trailing edge */}
      {points.length > 0 && (
        <circle
          cx={W}
          cy={H - (clamp(points[points.length - 1], 5, 95) / 100) * H}
          r={2.5}
          fill={color}
          opacity={0.9}
        />
      )}
    </svg>
  );
}

// ─── Scrolling Log ────────────────────────────────────────────────────────────

const LOG_MESSAGES = [
  "AUTOPILOT ENGAGED",
  "GPS LOCK ACQUIRED",
  "WAYPOINT 03 REACHED",
  "ALTITUDE HOLD ACTIVE",
  "SIGNAL NOMINAL",
  "BATTERY MONITORING OK",
  "COMMS ENCRYPTED",
  "GEOFENCE ACTIVE",
  "MOTOR TEMP NOMINAL",
  "ATTITUDE OK",
];

function FlightLog({ uptime }: { uptime: number }) {
  const [logs, setLogs] = useState<{ t: string; msg: string }[]>([
    { t: "00:00:00", msg: "SYSTEM INITIALIZED" },
    { t: "00:00:01", msg: "TELEMETRY FEED ACTIVE" },
  ]);

  useEffect(() => {
    if (uptime > 0 && uptime % 4 === 0) {
      setLogs((prev) => {
        const next = [
          ...prev,
          {
            t: fmtUptime(uptime),
            msg: LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)],
          },
        ].slice(-4);
        return next;
      });
    }
  }, [uptime]);

  return (
    <div className="flex flex-col gap-0.5">
      <AnimatePresence mode="popLayout">
        {logs.map((l, i) => (
          <motion.div
            key={`${l.t}-${l.msg}-${i}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: i === logs.length - 1 ? 0.9 : 0.3, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex gap-2 font-mono text-[8px] leading-tight"
          >
            <span className="text-primary-accent/70 shrink-0">[{l.t}]</span>
            <span className="text-secondary-accent/60">{l.msg}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FlightTelemetry() {
  const shouldReduceMotion = useReducedMotion();

  // ── Client-only mount guard ───────────────────────────────────────────────
  // Math.cos/sin produce slightly different floating-point results between
  // Node.js (server) and browser V8, causing SVG coordinate mismatches.
  // This widget is live-data-driven and gains nothing from SSR, so we render
  // a static skeleton on the server and the full HUD only after hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [telem, setTelem] = useState<TelemetryState>({
    airspeed: 14.5,
    altitude: 120.0,
    pitch: 2.4,
    roll: -0.8,
    heading: 47,
    battery: 78,
    signal: 94,
    gps: 18,
    throttle: 62,
    uptime: 0,
  });

  // Live simulation tick
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setTelem((prev) => ({
        airspeed: randWalk(prev.airspeed, 0.4, 10, 22),
        altitude: randWalk(prev.altitude, 1.5, 80, 160),
        pitch: randWalk(prev.pitch, 0.3, -8, 8),
        roll: randWalk(prev.roll, 0.4, -12, 12),
        heading: (prev.heading + (Math.random() - 0.45) * 2 + 360) % 360,
        battery: clamp(prev.battery - 0.02, 0, 100),
        signal: randWalk(prev.signal, 1, 70, 100),
        gps: clamp(
          Math.round(randWalk(prev.gps, 0.5, 14, 22)),
          14,
          22
        ),
        throttle: randWalk(prev.throttle, 2, 40, 85),
        uptime: prev.uptime + 1,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const waveValue = ((telem.airspeed - 10) / 12) * 100;

  // ── SSR skeleton ─────────────────────────────────────────────────────────
  if (!mounted) {
    return (
      <div className="border border-secondary-accent/15 bg-surface-low relative font-mono text-[10px] text-secondary-accent/70 flex flex-col gap-0 overflow-hidden min-h-[320px]">
        {/* Precision top-edge accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-accent/25 to-transparent pointer-events-none" />
        <div className="flex justify-between items-center border-b border-secondary-accent/10 px-4 py-2.5 text-primary-accent font-bold">
          <span className="tracking-wider">/// TELEMETRY_FEED_01</span>
          <span className="flex items-center gap-1.5 text-[9px]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-accent opacity-50" />
            RECORDING
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center opacity-20 p-6">
          <span className="font-mono text-[9px] uppercase tracking-widest">
            INITIALIZING...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-secondary-accent/15 bg-surface-low relative font-mono text-[10px] text-secondary-accent/70 flex flex-col gap-0 overflow-hidden">
      {/* Precision top-edge accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-accent/25 to-transparent pointer-events-none" />

      {/* ── Header ──────────────────────────────── */}
      <div className="flex justify-between items-center border-b border-secondary-accent/10 px-4 py-2.5 text-primary-accent font-bold">
        <span className="tracking-wider">/// TELEMETRY_FEED_01</span>
        <span className="flex items-center gap-1.5 text-[9px]">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="inline-block w-1.5 h-1.5 rounded-full bg-primary-accent"
          />
          RECORDING
        </span>
      </div>

      {/* ── Main Grid ───────────────────────────── */}
      <div className="grid grid-cols-2 gap-0 divide-x divide-secondary-accent/10">

        {/* Left column */}
        <div className="flex flex-col gap-0 divide-y divide-secondary-accent/10">

          {/* Airspeed */}
          <div className="px-4 py-3 flex flex-col gap-0.5">
            <span className="text-secondary-accent/40 uppercase font-semibold text-[8px] tracking-widest">
              AIRSPEED
            </span>
            <div className="flex items-baseline gap-1">
              <motion.span
                key={Math.round(telem.airspeed * 10)}
                initial={{ opacity: 0.4, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-xl text-secondary-accent font-bold tracking-tight"
              >
                {fmtNum(telem.airspeed)}
              </motion.span>
              <span className="text-secondary-accent/40 text-[9px]">m/s</span>
            </div>
          </div>

          {/* Altitude */}
          <div className="px-4 py-3 flex flex-col gap-0.5">
            <span className="text-secondary-accent/40 uppercase font-semibold text-[8px] tracking-widest">
              ALTITUDE (AGL)
            </span>
            <div className="flex items-baseline gap-1">
              <motion.span
                key={Math.round(telem.altitude)}
                initial={{ opacity: 0.4, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-xl text-secondary-accent font-bold tracking-tight"
              >
                {fmtNum(telem.altitude)}
              </motion.span>
              <span className="text-secondary-accent/40 text-[9px]">m</span>
            </div>
          </div>

          {/* Pitch / Roll */}
          <div className="px-4 py-3 flex flex-col gap-0.5">
            <span className="text-secondary-accent/40 uppercase font-semibold text-[8px] tracking-widest">
              PITCH // ROLL
            </span>
            <div className="flex items-baseline gap-1">
              <motion.span
                key={`${Math.round(telem.pitch * 10)}-${Math.round(telem.roll * 10)}`}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="text-xl text-secondary-accent font-bold tracking-tight"
              >
                {fmtNum(telem.pitch)}° //{" "}
                {fmtNum(telem.roll)}°
              </motion.span>
            </div>
          </div>

          {/* GPS */}
          <div className="px-4 py-3 flex flex-col gap-0.5">
            <span className="text-secondary-accent/40 uppercase font-semibold text-[8px] tracking-widest">
              GPS SAT COUNT
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl text-secondary-accent font-bold tracking-tight">
                {telem.gps}
              </span>
              <span className="text-green-400/80 text-[9px] font-bold">
                (FIXED)
              </span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-0 divide-y divide-secondary-accent/10">

          {/* Artificial Horizon */}
          <div className="px-4 py-3 flex flex-col gap-1">
            <span className="text-secondary-accent/40 uppercase font-semibold text-[8px] tracking-widest mb-1">
              ATTITUDE
            </span>
            <div className="flex items-center justify-center">
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : { rotate: telem.roll }
                }
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <ArtificialHorizon pitch={telem.pitch} roll={telem.roll} />
              </motion.div>
            </div>
          </div>

          {/* Compass */}
          <div className="px-4 py-3 flex flex-col gap-1">
            <span className="text-secondary-accent/40 uppercase font-semibold text-[8px] tracking-widest mb-1">
              HEADING — {Math.round(telem.heading)}°{" "}
              <span className="text-primary-accent">
                {headingLabel(telem.heading)}
              </span>
            </span>
            <div className="flex items-center justify-center">
              <CompassRose heading={telem.heading} />
            </div>
          </div>

          {/* Bar Gauges */}
          <div className="px-4 py-3 flex flex-col gap-2">
            <BarGauge value={telem.battery} label="BATT" warn={20} />
            <BarGauge value={telem.signal} label="SIGNAL" warn={40} />
            <BarGauge value={telem.throttle} label="THROTTLE" warn={5} />
          </div>
        </div>
      </div>

      {/* ── Waveform Strip ──────────────────────── */}
      <div className="border-t border-secondary-accent/10 px-0 pt-0 bg-primary-accent/5 relative overflow-hidden">
        <div className="px-4 pt-2 pb-0">
          <span className="text-[7px] text-secondary-accent/30 uppercase tracking-widest">
            AIRSPEED_TELEMETRY // LIVE
          </span>
        </div>
        <div className="px-2 pb-1">
          <Waveform value={waveValue} />
        </div>
      </div>

      {/* ── Footer ──────────────────────────────── */}
      <div className="border-t border-secondary-accent/10 px-4 py-2 grid grid-cols-2 gap-2">
        <FlightLog uptime={telem.uptime} />
        <div className="flex flex-col gap-0.5 items-end justify-end">
          <span className="text-[8px] text-secondary-accent/40 uppercase">
            UPTIME
          </span>
          <span className="text-[9px] text-primary-accent font-bold tabular-nums">
            {fmtUptime(telem.uptime)}
          </span>
          <span className="text-[8px] text-green-400/70 mt-0.5">
            COMMS_OK
          </span>
        </div>
      </div>
    </div>
  );
}
