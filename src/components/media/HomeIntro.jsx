import { ArrowLeft } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/d7a412404_collegeLogoText.png";

export default function HomeIntro({ onEnter, syncError }) {
  return <section className="mx-auto flex min-h-[calc(100vh-65px)] max-w-7xl flex-col items-center justify-center gap-8 px-5 py-12 text-center" dir="rtl">
    <img src={LOGO_URL} alt="המכללה הלאומית לאיתנות ישראלית" className="h-auto w-64 rounded-2xl sm:w-80" />
    <h1 className="text-5xl font-black leading-tight text-slate-950 dark:text-white sm:text-7xl">מאגרי חירום</h1>
    {syncError && <p className="max-w-md rounded-2xl border border-amber-300/50 bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">הגיליון אינו זמין כרגע לצפייה ציבורית. לאחר עדכון הרשאת השיתוף, לחצו על כפתור הסנכרון למעלה.</p>}
    <button onClick={() => onEnter("")} className="inline-flex items-center gap-3 rounded-full bg-amber-400 px-8 py-4 text-lg font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300">התחלה <ArrowLeft className="h-5 w-5" /></button>
  </section>;
}