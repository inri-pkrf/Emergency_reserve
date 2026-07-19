import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

const Select = ({ label, value, options, onChange, onFocus, onBlur }) => <label className="relative min-w-36 flex-1">
  <span className="mb-1 block text-[11px] font-bold text-slate-500 dark:text-slate-400">{label}</span>
  <div className="relative">
    <select value={value} onChange={(e) => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pl-9 text-sm font-medium outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 dark:border-white/10 dark:bg-slate-900">{value ? <option value={value}>{value}</option> : <option value="">הכול</option>}{options.filter((option) => option !== value).map((option) => <option key={option} value={option}>{option}</option>)}</select>
    <ChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
  </div>
</label>;

export default function FilterBar({ options, filters, setFilters }) {
  const [openSelect, setOpenSelect] = useState(null);
  const change = (key) => (value) => setFilters((current) => ({ ...current, [key]: value }));
  const activeFilters = [["category", filters.category], ["type", filters.type], ["tag", filters.tag]].filter(([, value]) => value);
  return <>
    {openSelect && <div className="fixed inset-0 z-20 bg-black/40" />}
    <div className="sticky top-[65px] z-30 border-b border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95" dir="rtl">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
        <Select label="מקור / קטגוריה" value={filters.category} options={options.categories} onChange={change("category")} onFocus={() => setOpenSelect("category")} onBlur={() => setOpenSelect(null)} />
        <Select label="סוג קובץ" value={filters.type} options={options.types} onChange={change("type")} onFocus={() => setOpenSelect("type")} onBlur={() => setOpenSelect(null)} />
        <Select label="תגית" value={filters.tag} options={options.tags} onChange={change("tag")} onFocus={() => setOpenSelect("tag")} onBlur={() => setOpenSelect(null)} />
      </div>
      {activeFilters.length > 0 && <div className="mx-auto mt-2 flex max-w-7xl flex-wrap items-center gap-2">{activeFilters.map(([key, value]) => <button key={key} onClick={() => change(key)("")} className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900 dark:bg-amber-400/15 dark:text-amber-200">{value} <X className="h-3 w-3" /></button>)}<button onClick={() => setFilters({ category: "", type: "", tag: "", date: "" })} className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10"><X className="h-3 w-3" /> ניקוי</button></div>}
    </div>
  </>;
}