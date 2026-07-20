import MediaCard from "@/components/media/MediaCard";

export default function Gallery({ items, onOpen, syncError }) {
  return <main className="mx-auto max-w-7xl px-4 pt-[225px] pb-7 sm:px-6" dir="rtl">
    <div className="mb-5 flex items-end justify-between"><h2 className="text-2xl font-black text-slate-950 dark:text-white">{items.length} פריטים</h2></div>
    {syncError && <div className="mb-5 rounded-2xl border border-amber-300/50 bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">לא ניתן היה לגשת לגיליון. ודאו שהגיליון פתוח לצפייה ציבורית.</div>}
    {items.length ? <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">{items.map((item) => <MediaCard key={item.id} item={item} onOpen={onOpen} />)}</div> : <div className="rounded-3xl border border-dashed border-slate-300 py-20 text-center text-slate-500 dark:border-white/15"><p className="text-lg font-bold text-slate-700 dark:text-slate-300">אין פריטים להצגה</p><p className="mt-1 text-sm">שנו את המסננים.</p></div>}
  </main>;
}