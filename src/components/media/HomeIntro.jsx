import { ArrowLeft } from "lucide-react";
import ThemeControls from "@/components/media/ThemeControls";
import IntroAnimation from "@/components/media/IntroAnimation";

const LOGO_LIGHT = "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/d7a412404_collegeLogoText.png";
const LOGO_DARK = "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/015a95113_whiteLogo.png";

export default function HomeIntro({ theme, onTheme, onEnter, syncError, categories }) {
  return <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-5 py-12" dir="rtl">
    <div className="fixed top-4 left-4 z-40"><ThemeControls theme={theme} onTheme={onTheme} /></div>
    <IntroAnimation categories={categories} />
    <div className="relative z-10 flex flex-col items-center gap-8 text-center">
      <img src={theme === "dark" ? LOGO_DARK : LOGO_LIGHT} alt="המכללה הלאומית לאיתנות ישראלית" className="h-auto w-72 rounded-2xl sm:w-96" />
      <h1 className="text-5xl font-black leading-tight text-slate-950 dark:text-white sm:text-7xl">מאגרי חירום</h1>
      <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">ארכיון דיגיטלי דינמי המרכז תיעוד מלחמות, מבצעים ופעילויות פיקוד העורף.<br />מנוע סינון חכם מבוסס תגיות המאפשר ניווט מהיר ואיתור תכנים דומים ומשלימים.</p>
      {syncError && <p className="max-w-md rounded-2xl border border-amber-300/50 bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">הגיליון אינו זמין כרגע לצפייה ציבורית. ודאו שהגיליון משותף לציבור.</p>}
      <button onClick={() => onEnter("")} className="inline-flex items-center gap-3 rounded-full bg-amber-400 px-8 py-4 text-lg font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300">התחלה <ArrowLeft className="h-5 w-5" /></button>
    </div>
  </section>;
}