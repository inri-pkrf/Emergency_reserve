import { X } from "lucide-react";

const Select = ({ label, value, options, onChange }) => <label className="min-w-36 flex-1"><span className="mb-1 block text-[11px] font-bold text-slate-500 dark:text-slate-400">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-400 dark:border-white/10 dark:bg-slate-900"> <option value="">הכול</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;

export default function FilterBar({ options, filters, setFilters }) {
  const change = (key) => (value) => setFilters((current) => ({ ...current, [key]: value }));
  const active = Object.values(filters).some(Boolean);
  return <div className="sticky top-[73px] z-30 border-b border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95" dir="rtl">
    <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1">
      <Select label="מקור / קטגוריה" value={filters.category} options={options.categories} onChange={change("category")} />
      <Select label="סוג קובץ" value={filters.type} options={options.types} onChange={change("type")} />
      <Select label="תגית" value={filters.tag} options={options.tags} onChange={change("tag")} />
      <Select label="תאריך" value={filters.date} options={options.dates} onChange={change("date")} />
      {active && <button onClick={() => setFilters({ category: "", type: "", tag: "", date: "" })} className="mt-5 flex h-10 shrink-0 items-center gap-1 rounded-xl px-3 text-sm text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10"><X className="h-4 w-4" /> ניקוי</button>}
    </div>
  </div>;
}