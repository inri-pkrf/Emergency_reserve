import { useState, useEffect } from "react";
import { Moon, Sun, Maximize, Minimize } from "lucide-react";

export default function ThemeControls({ theme, onTheme, className = "" }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  };
  return <div className={`flex gap-2 ${className}`}>
    <button onClick={toggleFullscreen} aria-label="מסך מלא" className="rounded-full border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10">{isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}</button>
    <button onClick={onTheme} aria-label="החלפת מצב תצוגה" className="rounded-full bg-amber-400 p-2.5 text-slate-950 transition hover:bg-amber-300">{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
  </div>;
}