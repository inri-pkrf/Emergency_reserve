import { Moon, Sun, RefreshCw } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/d7a412404_collegeLogoText.png";

export default function AppHeader({ theme, onTheme, onSync, syncing }) {
  return <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85" dir="rtl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
      <img src={LOGO_URL} alt="המכללה הלאומית לאיתנות ישראלית" className="h-11 w-auto rounded-lg sm:h-14" />
      <div className="flex gap-2">
        <button onClick={onSync} disabled={syncing} aria-label="סנכרון הגיליון" className="rounded-full border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"><RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} /></button>
        <button onClick={onTheme} aria-label="החלפת מצב תצוגה" className="rounded-full bg-amber-400 p-2.5 text-slate-950 transition hover:bg-amber-300">{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
      </div>
    </div>
  </header>;
}