import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const WAR_LOGOS = [
  "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/534ee255f_image.png",
  "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/367d6554b_image.png",
  "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/b14ce6c26_image.png",
];

const TEXT_COLORS = [
  "text-slate-500 dark:text-slate-200",
  "text-amber-600/70 dark:text-amber-300/80",
  "text-blue-600/60 dark:text-blue-300/70",
  "text-slate-600 dark:text-slate-300",
  "text-amber-700/60 dark:text-amber-200/70",
  "text-sky-600/50 dark:text-sky-300/60",
];

const ZONES = [
  { xMin: 8, xMax: 22, yMin: 8, yMax: 20 },
  { xMin: 35, xMax: 48, yMin: 6, yMax: 16 },
  { xMin: 52, xMax: 65, yMin: 6, yMax: 16 },
  { xMin: 78, xMax: 92, yMin: 8, yMax: 20 },
  { xMin: 6, xMax: 18, yMin: 38, yMax: 58 },
  { xMin: 82, xMax: 94, yMin: 38, yMax: 58 },
  { xMin: 8, xMax: 22, yMin: 78, yMax: 92 },
  { xMin: 35, xMax: 48, yMin: 84, yMax: 94 },
  { xMin: 52, xMax: 65, yMin: 84, yMax: 94 },
  { xMin: 78, xMax: 92, yMin: 78, yMax: 92 },
];

const BLOBS = [
  { className: "bg-amber-400/10 dark:bg-amber-400/15", size: 400, x: 15, y: 20, duration: 22, delay: 0 },
  { className: "bg-blue-500/8 dark:bg-blue-400/12", size: 350, x: 80, y: 25, duration: 26, delay: 4 },
  { className: "bg-amber-500/8 dark:bg-amber-300/10", size: 300, x: 75, y: 75, duration: 24, delay: 7 },
  { className: "bg-slate-400/5 dark:bg-slate-500/10", size: 450, x: 15, y: 70, duration: 30, delay: 2 },
];

const RINGS = [
  { size: 200, x: 25, y: 14, duration: 35, delay: 1 },
  { size: 150, x: 72, y: 82, duration: 28, delay: 5 },
  { size: 120, x: 12, y: 85, duration: 32, delay: 8 },
];

const BASE_CYCLE = 8500;
const FLOATER_COUNT = 10;

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInZone = (zone) => ({
  x: zone.xMin + Math.random() * (zone.xMax - zone.xMin),
  y: zone.yMin + Math.random() * (zone.yMax - zone.yMin),
});

function AmbientBlob({ className, size, x, y, duration, delay }) {
  const drift = useMemo(() => ({
    x: (Math.random() - 0.5) * 200,
    y: (Math.random() - 0.5) * 200,
  }), []);
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{
        x: [0, drift.x, -drift.x * 0.5, 0],
        y: [0, drift.y, -drift.y * 0.5, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function AmbientRing({ size, x, y, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full border border-amber-400/10 dark:border-amber-400/15"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{ rotate: 360, scale: [1, 1.1, 1] }}
      transition={{
        rotate: { duration, repeat: Infinity, ease: "linear" },
        scale: { duration: duration / 2, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}

function Floater({ pool, index }) {
  const [tick, setTick] = useState(0);
  const cycle = BASE_CYCLE + index * 600;
  const zone = ZONES[index % ZONES.length];

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), cycle);
    return () => clearInterval(id);
  }, [cycle]);

  const data = useMemo(() => {
    const item = pick(pool);
    const pos = randomInZone(zone);
    const scale = 0.5 + Math.random() * 0.6;
    const color = pick(TEXT_COLORS);
    const fontSize = 16 + Math.random() * 12;
    return { item, pos, scale, color, fontSize };
  }, [tick, pool, zone]);

  const { item, pos, scale, color, fontSize } = data;

  return (
    <motion.div
      key={tick}
      initial={{ opacity: 0, scale: 0.3, x: "-50%", y: "-50%" }}
      animate={{
        opacity: [0, 0.8, 0.7, 0],
        scale: [0.3, scale, scale, 0.3],
      }}
      transition={{
        duration: cycle / 1000,
        times: [0, 0.15, 0.85, 1],
        ease: "easeInOut",
      }}
      style={{ position: "absolute", left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      {item.src ? (
        <img
          src={item.src}
          style={{ height: `${28 + scale * 42}px`, width: "auto" }}
          className="object-contain mix-blend-screen"
        />
      ) : (
        <span
          className={`whitespace-nowrap font-bold ${color}`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {item.text}
        </span>
      )}
    </motion.div>
  );
}

export default function IntroAnimation({ categories = [] }) {
  const pool = useMemo(
    () => [...WAR_LOGOS.map((src) => ({ src })), ...categories.map((text) => ({ text }))],
    [categories]
  );

  if (!pool.length) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {BLOBS.map((b, i) => <AmbientBlob key={`blob-${i}`} {...b} />)}
      {RINGS.map((r, i) => <AmbientRing key={`ring-${i}`} {...r} />)}
      {Array.from({ length: FLOATER_COUNT }, (_, i) => (
        <Floater key={i} pool={pool} index={i} />
      ))}
    </div>
  );
}