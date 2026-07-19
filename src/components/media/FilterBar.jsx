import { X } from "lucide-react";

const Select = ({ label, value, options, onChange }) => <label className="min-w-36 flex-1"><span className="mb-1 block text-[11px] font-bold text-slate-500 dark:text-slate-400">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-400 dark:border-white/10 dark:bg-slate-900"> <option value="">הכול</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;

export default function FilterBar({ options, filters, setFilters }) {
  const change = (key) => (value) => setFilters((current) => ({ ...current, [key]: value }));
  const activeFilters = [["category", filters.category], ["type", filters.type], ["tag", filters.tag]].filter(([, value]) => value);
  return <div className="sticky top-[65px] z-30 border-b border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95" dir="rtl">
    <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
      <Select label="מקור / קטגוריה" value={filters.category} options={options.categories} onChange={change("category")} />
      <Select label="סוג קובץ" value={filters.type} options={options.types} onChange={change("type")} />
      <Select label="תגית" value={filters.tag} options={options.tags} onChange={change("tag")} />
    </div>
    {activeFilters.length > 0 && <div className="mx-auto mt-2 flex max-w-7xl flex-wrap items-center gap-2">{activeFilters.map(([key, value]) => <button key={key} onClick={() => change(key)("")} className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900 dark:bg-amber-400/15 dark:text-amber-200">{value} <X className="h-3 w-3" /></button>)}<button onClick={() => setFilters({ category: "", type: "", tag: "", date: "" })} className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10"><X className="h-3 w-3" /> ניקוי</button></div>}
  </div>;
}