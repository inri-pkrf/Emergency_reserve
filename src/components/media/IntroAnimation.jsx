import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WAR_LOGOS = [
  { src: "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/534ee255f_image.png", name: "שאגת הארי" },
  { src: "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/367d6554b_image.png", name: "עם לביא" },
  { src: "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/b14ce6c26_image.png", name: "פיקוד העורף" },
];

const LOGO_INTERVAL = 4500;
const FOLDER_INTERVAL = 2800;
const FADE_DURATION = 1.4;

export default function IntroAnimation({ categories = [] }) {
  const [logoIdx, setLogoIdx] = useState(0);
  const [folderIdx, setFolderIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setLogoIdx((i) => (i + 1) % WAR_LOGOS.length), LOGO_INTERVAL);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!categories.length) return;
    const id = setInterval(() => setFolderIdx((i) => (i + 1) % categories.length), FOLDER_INTERVAL);
    return () => clearInterval(id);
  }, [categories.length]);

  const safeFolderIdx = categories.length ? folderIdx % categories.length : 0;

  return (
    <div className="flex flex-col items-center gap-3" dir="rtl">
      <div className="relative">
        <div className="absolute inset-0 -m-6 rounded-full bg-amber-400/10 blur-2xl dark:bg-amber-400/15" />
        <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-slate-950 shadow-2xl ring-1 ring-white/10 sm:h-32 sm:w-32">
          <AnimatePresence mode="wait">
            <motion.img
              key={logoIdx}
              src={WAR_LOGOS[logoIdx].src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-contain p-2"
            />
          </AnimatePresence>
        </div>
      </div>
      <div className="h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={logoIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
            className="block text-sm font-bold tracking-wide text-slate-500 dark:text-slate-400"
          >
            {WAR_LOGOS[logoIdx].name}
          </motion.span>
        </AnimatePresence>
      </div>
      {categories.length > 0 && (
        <div className="h-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${safeFolderIdx}-${categories[safeFolderIdx]}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="block text-xs font-medium text-slate-400 dark:text-slate-500"
            >
              {categories[safeFolderIdx]}
            </motion.span>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}