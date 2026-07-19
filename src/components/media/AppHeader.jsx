import { Moon, Sun, RefreshCw } from "lucide-react";

export default function AppHeader({ theme, onTheme, onSync, syncing }) {
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl dark:bg-slate-950/85 bg-white/90">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-right">
        <span className="block font-black tracking-tight text-slate-950 dark:text-white text-lg">מאכר</span>
        <span className="block text-[10px] tracking-[.18em] text-slate-500 dark:text-slate-400">ארכיון מדיה חי</span>
      </button>
      <div className="flex gap-2">
        <button onClick={onSync} disabled={syncing} aria-label="סנכרון הגיליון" className="rounded-full border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"><RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} /></button>
        <button onClick={onTheme} aria-label="החלפת מצב תצוגה" className="rounded-full bg-amber-400 p-2.5 text-slate-950 transition hover:bg-amber-300">{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
      </div>
    </div>
  </header>;
}