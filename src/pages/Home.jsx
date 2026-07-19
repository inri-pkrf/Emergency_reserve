import { useEffect, useMemo, useState } from "react";
import { SHEET_URL, THEME_KEY } from "@/config/media";
import { parseCsv, rowsToMedia } from "@/lib/mediaParser";
import { loadMedia, mergeMedia, updateMedia } from "@/lib/mediaDb";
import AppHeader from "@/components/media/AppHeader";
import HomeIntro from "@/components/media/HomeIntro";
import FilterBar from "@/components/media/FilterBar";
import Gallery from "@/components/media/Gallery";
import MediaDetail from "@/components/media/MediaDetail";

const unique = (values) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "he"));
const visibleStatus = new Set(["קובץ נמצא", "קובץ חדש"]);

export default function Home() {
  const [media, setMedia] = useState(loadMedia); const [view, setView] = useState("home"); const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({ category: "", type: "", tag: "", date: "" }); const [syncing, setSyncing] = useState(false); const [syncError, setSyncError] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "dark");
  const sync = async () => { setSyncing(true); setSyncError(false); try { const response = await fetch(SHEET_URL); if (!response.ok) throw new Error("sync"); const text = await response.text(); if (text.includes("Sign in") || text.includes("ServiceLogin")) throw new Error("private"); const next = mergeMedia(rowsToMedia(parseCsv(text))); setMedia(next); } catch { setSyncError(true); } finally { setSyncing(false); } };
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); localStorage.setItem(THEME_KEY, theme); }, [theme]);
  useEffect(() => { sync(); }, []);
  const activeMedia = useMemo(() => media.filter((item) => visibleStatus.has(item.status)), [media]);
  const options = useMemo(() => ({ categories: unique(activeMedia.map((item) => item.category)), types: unique(activeMedia.map((item) => item.type)), tags: unique(activeMedia.flatMap((item) => item.tags)), dates: unique(activeMedia.map((item) => item.manualDate)) }), [activeMedia]);
  const filtered = useMemo(() => activeMedia.filter((item) => (!filters.category || item.category === filters.category) && (!filters.type || item.type === filters.type) && (!filters.tag || item.tags.includes(filters.tag)) && (!filters.date || item.manualDate === filters.date)), [activeMedia, filters]);
  const enter = (category) => { setFilters({ category, type: "", tag: "", date: "" }); setView("gallery"); };
  const save = (id, changes) => { const next = updateMedia(id, changes); setMedia(next); setSelected(next.find((item) => item.id === id)); };
  return <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100"><AppHeader theme={theme} onTheme={() => setTheme(theme === "dark" ? "light" : "dark")} onSync={sync} syncing={syncing} />{view === "home" && <HomeIntro categories={options.categories} onEnter={enter} syncError={syncError} />}{view === "gallery" && <><FilterBar options={options} filters={filters} setFilters={setFilters} /><Gallery items={filtered} onOpen={(item) => { setSelected(item); setView("detail"); window.scrollTo(0, 0); }} syncError={syncError} /></>}{view === "detail" && selected && <MediaDetail item={selected} onBack={() => setView("gallery")} onSave={save} />}</div>;
}