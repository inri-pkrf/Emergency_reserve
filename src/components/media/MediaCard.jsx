import { Play } from "lucide-react";
import { mediaUrl } from "@/lib/mediaParser";

export default function MediaCard({ item, onOpen }) {
  return <button onClick={() => onOpen(item)} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl dark:border-white/10 dark:bg-slate-900" dir="rtl">
    <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800">
      {item.type === "תמונה" ? <img src={mediaUrl(item)} alt={item.displayName} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <iframe src={mediaUrl(item)} title={item.displayName} loading="lazy" className="pointer-events-none h-full w-full" />}
      {item.type === "סרטון" && <span className="absolute inset-0 flex items-center justify-center bg-black/20"><span className="rounded-full bg-black/70 p-3 text-white"><Play className="h-6 w-6 fill-current" /></span></span>}
    </div>
    <div className="p-4"><h3 className="line-clamp-2 min-h-12 font-bold leading-6 text-slate-900 dark:text-white">{item.displayName}</h3>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">{item.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-600 dark:bg-white/10 dark:text-slate-300">{tag}</span>)}{item.manualDate && <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] text-amber-900 dark:bg-amber-400/15 dark:text-amber-200">{item.manualDate}</span>}</div>
    </div>
  </button>;
}