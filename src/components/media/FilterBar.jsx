import { useState } from "react";
import { X, ChevronDown, Search } from "lucide-react";
import { tagColor } from "@/lib/tagColors";

const Select = ({ label, value, options, onChange, onFocus, onBlur }) => <label className="relative min-w-36 flex-1">
  <span className="mb-1 block font-bold text-slate-500 dark:text-slate-400 text-xl">{label}</span>
  <div className="relative">
    <select value={value} onChange={(e) => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pl-9 text-sm font-medium outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 dark:border-white/10 dark:bg-slate-900">{value ? <option value={value}>{value}</option> : <option value="">הכול</option>}{options.filter((option) => option !== value).map((option) => <option key={option} value={option}>{option}</option>)}</select>
    <ChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
  </div>
</label>;

export default function FilterBar({ options, filters, setFilters }) {
  const [openSelect, setOpenSelect] = useState(null);
  const change = (key) => (value) => { setFilters((current) => ({ ...current, [key]: value })); setOpenSelect(null); };
  const activeFilters = [["category", filters.category], ["type", filters.type], ["tag", filters.tag]].filter(([, value]) => value);
  return <>
    {openSelect && <div className="fixed inset-0 z-20 bg-black/40" onClick={() => setOpenSelect(null)} />}
    <div className="fixed top-[65px] left-0 right-0 z-30 border-b border-slate-200 bg-slate-50/95 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <h1 className="mb-2 font-black text-slate-950 dark:text-white text-5xl no-underline">מאגרי חירום</h1>
        <div className="flex flex-wrap gap-2">
          <label className="relative min-w-36 flex-1">
            <span className="mb-1 block text-xl font-bold text-slate-500 dark:text-slate-400">חיפוש</span>
            <div className="relative">
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input type="text" value={filters.search} onChange={(e) => change("search")(e.target.value)} placeholder="הקלד\י את שם הקובץ..." className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-9 pl-9 text-sm font-medium outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 dark:border-white/10 dark:bg-slate-900" />
              {filters.search && <button onClick={() => change("search")("")} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X className="h-4 w-4" /></button>}
            </div>
          </label>
          <Select label="מקור / קטגוריה" value={filters.category} options={options.categories} onChange={change("category")} onFocus={() => setOpenSelect("category")} onBlur={() => setOpenSelect(null)} />
          <Select label="סוג קובץ" value={filters.type} options={options.types} onChange={change("type")} onFocus={() => setOpenSelect("type")} onBlur={() => setOpenSelect(null)} />
          <Select label="תגית" value={filters.tag} options={options.tags} onChange={change("tag")} onFocus={() => setOpenSelect("tag")} onBlur={() => setOpenSelect(null)} />
        </div>
        {activeFilters.length > 0 && <div className="mt-2 flex flex-wrap items-center gap-2">{activeFilters.map(([key, value]) => <button key={key} onClick={() => change(key)("")} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${tagColor(value)}`}>{value} <X className="h-3 w-3" /></button>)}<button onClick={() => setFilters({ category: "", type: "", tag: "", date: "", search: "" })} className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10"><X className="h-3 w-3" /> ניקוי</button></div>}
      </div>
    </div>
  </>;
}