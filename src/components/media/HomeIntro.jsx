import { ArrowLeft } from "lucide-react";

export default function HomeIntro({ categories, onEnter, syncError }) {
  return <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[1.05fr_.95fr] lg:px-8" dir="rtl">
    <div>
      <p className="mb-5 text-sm font-bold tracking-[.22em] text-amber-500">סיפור • זיכרון • עדות</p>
      <h1 className="max-w-3xl text-5xl font-black leading-[.95] text-slate-950 dark:text-white sm:text-7xl lg:text-8xl">הסיפור של<br /><span className="text-amber-400"></span></h1>
      <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">ארכיון מדיה מתעדכן שמרכז תמונות, סרטונים וסיפורים במקום אחד. בחרו מקור כדי להיכנס לגלריה, או צפו בכל הפריטים יחד.</p>
      {syncError && <p className="mt-5 max-w-xl rounded-2xl border border-amber-300/50 bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">הגיליון אינו זמין כרגע לצפייה ציבורית. לאחר עדכון הרשאת השיתוף, לחצו על כפתור הסנכרון למעלה.</p>}
      <button onClick={() => onEnter("")} className="mt-8 inline-flex items-center gap-3 rounded-full bg-slate-950 px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950">לכל פריטי המדיה <ArrowLeft className="h-4 w-4" /></button>
    </div>
    <div className="rounded-[2rem] border border-slate-200 bg-white/70 p-5 shadow-2xl shadow-slate-200/60 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
      <p className="mb-4 px-2 text-sm font-bold text-slate-500 dark:text-slate-400">בחירה לפי מקור</p>
      <div className="grid max-h-[55vh] grid-cols-1 gap-3 overflow-auto sm:grid-cols-2">{categories.map((category, index) => <button key={category} onClick={() => onEnter(category)} className="group flex min-h-28 flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-right transition hover:border-amber-400 hover:bg-amber-50 dark:border-white/10 dark:bg-slate-900 dark:hover:border-amber-400/70 dark:hover:bg-slate-800"><span className="text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span><span className="font-bold text-slate-900 dark:text-white">{category}</span></button>)}</div>
      {!categories.length && <p className="py-12 text-center text-slate-500">המקורות יופיעו כאן לאחר הסנכרון הראשון.</p>}
    </div>
  </section>;
}