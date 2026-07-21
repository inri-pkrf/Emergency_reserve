import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const WAR_LOGOS = [
  "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/534ee255f_image.png",
  "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/367d6554b_image.png",
  "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/b14ce6c26_image.png",
];

const TEXT_COLORS = [
  "text-slate-400 dark:text-slate-500",
  "text-amber-500/60 dark:text-amber-400/50",
  "text-blue-500/50 dark:text-blue-400/40",
  "text-slate-500 dark:text-slate-600",
  "text-amber-600/50 dark:text-amber-300/40",
  "text-sky-500/40 dark:text-sky-400/30",
];

const BASE_CYCLE = 6500;
const FLOATER_COUNT = 7;

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function Floater({ pool, index }) {
  const [tick, setTick] = useState(0);
  const cycle = BASE_CYCLE + index * 800;

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), cycle);
    return () => clearInterval(id);
  }, [cycle]);

  const data = useMemo(() => {
    const item = pick(pool);
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 75 + 12;
    const scale = 0.5 + Math.random() * 0.6;
    const color = pick(TEXT_COLORS);
    const fontSize = 11 + Math.random() * 9;
    return { item, x, y, scale, color, fontSize };
  }, [tick, pool]);

  const { item, x, y, scale, color, fontSize } = data;

  return (
    <motion.div
      key={tick}
      initial={{ opacity: 0, scale: 0.3, x: "-50%", y: "-50%" }}
      animate={{
        opacity: [0, 0.55, 0.45, 0],
        scale: [0.3, scale, scale, 0.3],
      }}
      transition={{
        duration: cycle / 1000,
        times: [0, 0.2, 0.8, 1],
        ease: "easeInOut",
      }}
      style={{ position: "absolute", left: `${x}%`, top: `${y}%` }}
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
      {Array.from({ length: FLOATER_COUNT }, (_, i) => (
        <Floater key={i} pool={pool} index={i} />
      ))}
    </div>
  );
}