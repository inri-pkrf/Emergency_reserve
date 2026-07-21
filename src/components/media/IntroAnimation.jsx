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
  { xMin: 78, xMax: 92, yMin: 8, yMax: 20 },
  { xMin: 8, xMax: 22, yMin: 78, yMax: 92 },
  { xMin: 78, xMax: 92, yMin: 78, yMax: 92 },
  { xMin: 6, xMax: 18, yMin: 38, yMax: 58 },
  { xMin: 82, xMax: 94, yMin: 38, yMax: 58 },
  { xMin: 35, xMax: 48, yMin: 84, yMax: 94 },
  { xMin: 52, xMax: 65, yMin: 84, yMax: 94 },
  { xMin: 35, xMax: 48, yMin: 6, yMax: 16 },
  { xMin: 52, xMax: 65, yMin: 6, yMax: 16 },
];

const BLOBS = [
  { className: "bg-amber-400/15 dark:bg-amber-400/22", size: 400, x: 15, y: 20, duration: 22, delay: 0, radius: "60% 40% 50% 50%" },
  { className: "bg-blue-500/12 dark:bg-blue-400/18", size: 350, x: 80, y: 25, duration: 26, delay: 4, radius: "40% 60% 60% 40%" },
  { className: "bg-amber-500/12 dark:bg-amber-300/16", size: 300, x: 75, y: 75, duration: 24, delay: 7, radius: "50% 50% 40% 60%" },
  { className: "bg-slate-400/8 dark:bg-slate-500/15", size: 450, x: 15, y: 70, duration: 30, delay: 2, radius: "55% 45% 60% 40%" },
  { className: "bg-sky-400/10 dark:bg-sky-500/16", size: 320, x: 50, y: 50, duration: 28, delay: 10, radius: "45% 55% 50% 50%" },
];

const STREAKS = [
  { className: "from-transparent via-amber-400/22 to-transparent dark:via-amber-300/28", width: 50, angle: 15, y: 30, duration: 15, delay: 0 },
  { className: "from-transparent via-blue-400/18 to-transparent dark:via-blue-300/24", width: 40, angle: -10, y: 60, duration: 18, delay: 5 },
  { className: "from-transparent via-slate-400/15 to-transparent dark:via-slate-300/20", width: 60, angle: 20, y: 80, duration: 20, delay: 8 },
  { className: "from-transparent via-amber-400/16 to-transparent dark:via-amber-300/22", width: 45, angle: -5, y: 15, duration: 17, delay: 12 },
];

const PARTICLES = [
  { color: "bg-amber-400/35 dark:bg-amber-300/40", size: 5, x: 10, duration: 16, delay: 0 },
  { color: "bg-blue-400/35 dark:bg-blue-300/40", size: 4, x: 25, duration: 20, delay: 3 },
  { color: "bg-slate-400/30 dark:bg-slate-300/35", size: 6, x: 45, duration: 18, delay: 6 },
  { color: "bg-amber-400/30 dark:bg-amber-300/35", size: 3, x: 65, duration: 22, delay: 2 },
  { color: "bg-sky-400/35 dark:bg-sky-300/40", size: 5, x: 80, duration: 17, delay: 9 },
  { color: "bg-blue-400/30 dark:bg-blue-300/35", size: 4, x: 90, duration: 19, delay: 12 },
  { color: "bg-amber-400/30 dark:bg-amber-300/35", size: 4, x: 35, duration: 21, delay: 7 },
  { color: "bg-slate-400/25 dark:bg-slate-300/30", size: 5, x: 55, duration: 23, delay: 14 },
];

const RINGS = [
  { size: 200, x: 25, y: 14, duration: 35, delay: 1 },
  { size: 150, x: 72, y: 82, duration: 28, delay: 5 },
  { size: 120, x: 12, y: 85, duration: 32, delay: 8 },
];

const BASE_CYCLE = 8500;
const FLOATER_COUNT = 8;

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInZone = (zone) => ({
  x: zone.xMin + Math.random() * (zone.xMax - zone.xMin),
  y: zone.yMin + Math.random() * (zone.yMax - zone.yMin),
});

function AmbientBlob({ className, size, x, y, duration, delay, radius }) {
  const drift = useMemo(() => ({
    x: (Math.random() - 0.5) * 200,
    y: (Math.random() - 0.5) * 200,
  }), []);
  return (
    <motion.div
      className={`absolute blur-3xl ${className}`}
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%`, borderRadius: radius }}
      animate={{
        x: [0, drift.x, -drift.x * 0.5, 0],
        y: [0, drift.y, -drift.y * 0.5, 0],
        scale: [1, 1.2, 0.9, 1],
        borderRadius: [radius, "50% 60% 40% 50%", radius],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function GradientStreak({ className, width, angle, y, duration, delay }) {
  return (
    <motion.div
      className={`absolute h-px bg-gradient-to-r ${className}`}
      style={{ width: `${width}%`, left: 0, top: `${y}%`, rotate: `${angle}deg` }}
      animate={{ x: ["-120%", "250%"] }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    />
  );
}

function Particle({ color, size, x, duration, delay }) {
  return (
    <motion.div
      className={`absolute rounded-full ${color}`}
      style={{ width: size, height: size, left: `${x}%`, bottom: "5%" }}
      animate={{ y: [0, "-80vh"], opacity: [0, 0.6, 0.5, 0] }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    />
  );
}

function AmbientRing({ size, x, y, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full border border-amber-400/15 dark:border-amber-400/22"
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
  const cycle = BASE_CYCLE + index * 1200;
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
        opacity: [0, 0.8, 0.75, 0.8, 0.7, 0],
        scale: [0.3, scale, scale * 1.15, scale * 0.95, scale * 1.1, 0.3],
      }}
      transition={{
        duration: cycle / 1000,
        times: [0, 0.12, 0.3, 0.5, 0.85, 1],
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
      {STREAKS.map((s, i) => <GradientStreak key={`streak-${i}`} {...s} />)}
      {PARTICLES.map((p, i) => <Particle key={`particle-${i}`} {...p} />)}
      {Array.from({ length: FLOATER_COUNT }, (_, i) => (
        <Floater key={i} pool={pool} index={i} />
      ))}
    </div>
  );
}