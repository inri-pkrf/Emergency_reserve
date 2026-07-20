import { tagColor } from "@/lib/tagColors";

export default function DetailBar({ item }) {
  const chips = [...new Set([...item.tags, item.type, item.category])].filter(Boolean);
  return <div className="fixed top-[65px] left-0 right-0 z-30 border-b border-slate-200 bg-slate-50/95 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95" dir="rtl">
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
      <h1 className="mb-2 font-black text-slate-950 dark:text-white text-5xl">מאגרי חירום</h1>
      {chips.length > 0 && <div className="flex flex-wrap gap-2">{chips.map((chip) => <span key={chip} className={`rounded-full px-3 py-1.5 text-xs font-bold ${tagColor(chip)}`}>{chip}</span>)}</div>}
    </div>
  </div>;
}