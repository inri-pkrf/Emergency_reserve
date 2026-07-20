import { useState, useEffect } from "react";
import { Moon, Sun, Maximize, Minimize } from "lucide-react";

const LOGO_LIGHT = "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/d7a412404_collegeLogoText.png";
const LOGO_DARK = "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/015a95113_whiteLogo.png";

export default function AppHeader({ theme, onTheme }) {
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
  return <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85" dir="rtl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
      <img src={theme === "dark" ? LOGO_DARK : LOGO_LIGHT} alt="המכללה הלאומית לאיתנות ישראלית" className="h-11 w-auto rounded-lg sm:h-14" />
      <div className="flex gap-2">
        <button onClick={toggleFullscreen} aria-label="מסך מלא" className="rounded-full border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10">{isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}</button>
        <button onClick={onTheme} aria-label="החלפת מצב תצוגה" className="rounded-full bg-amber-400 p-2.5 text-slate-950 transition hover:bg-amber-300">{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
      </div>
    </div>
  </header>;
}