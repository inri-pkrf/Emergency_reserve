import { useEffect, useMemo, useState } from "react";
import { SHEET_URL, THEME_KEY } from "@/config/media";
import { parseCsv, rowsToMedia } from "@/lib/mediaParser";
import { loadMedia, mergeMedia, updateMedia } from "@/lib/mediaDb";
import AppHeader from "@/components/media/AppHeader";
import HomeIntro from "@/components/media/HomeIntro";
import FilterBar from "@/components/media/FilterBar";
import Gallery from "@/components/media/Gallery";
import MediaDetail from "@/components/media/MediaDetail";
import DetailBar from "@/components/media/DetailBar";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";

const unique = (values) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "he"));
const visibleStatus = new Set(["קובץ נמצא", "קובץ חדש"]);

export default function Home() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [media, setMedia] = useState(loadMedia);
  const [view, setView] = useState("home");
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({ category: "", type: "", tag: "", date: "", search: "" });
  const [syncError, setSyncError] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "dark");
  const sync = async () => { setSyncError(false); try { const response = await fetch(SHEET_URL); if (!response.ok) throw new Error("sync"); const text = await response.text(); if (text.includes("Sign in") || text.includes("ServiceLogin")) throw new Error("private"); const sheetMedia = rowsToMedia(parseCsv(text)); let overrideMap = new Map(); try { const overrides = await base44.entities.MediaOverride.list(); overrideMap = new Map(overrides.map((o) => [o.media_id, o])); } catch (e) { console.error("Override fetch failed:", e); } const withOverrides = sheetMedia.map((item) => { const override = overrideMap.get(item.id); if (!override) return item; return { ...item, displayName: override.display_name || item.displayName, description: override.description || item.description || "", manuallyEdited: Boolean(override.display_name || override.description) }; }); const next = mergeMedia(withOverrides); setMedia(next); } catch { setSyncError(true); } };
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); localStorage.setItem(THEME_KEY, theme); }, [theme]);
  useEffect(() => { sync(); }, []);
  const activeMedia = useMemo(() => media.filter((item) => visibleStatus.has(item.status)), [media]);
  const options = useMemo(() => ({ categories: unique(activeMedia.map((item) => item.category)), types: unique(activeMedia.map((item) => item.type)), tags: unique(activeMedia.flatMap((item) => item.tags)), dates: unique(activeMedia.map((item) => item.manualDate)) }), [activeMedia]);
  const filtered = useMemo(() => activeMedia.filter((item) => (!filters.category || item.category === filters.category) && (!filters.type || item.type === filters.type) && (!filters.tag || item.tags.includes(filters.tag)) && (!filters.date || item.manualDate === filters.date) && (!filters.search || item.displayName.toLowerCase().includes(filters.search.toLowerCase()))), [activeMedia, filters]);
  const similarItems = useMemo(() => selected ? activeMedia.filter((item) => item.category === selected.category && item.id !== selected.id) : [], [activeMedia, selected]);
  const enter = (category) => { setFilters({ category, type: "", tag: "", date: "", search: "" }); setView("gallery"); };
  const openItem = (item) => { setSelected(item); setView("detail"); window.scrollTo(0, 0); };
  const save = (id, changes) => { const next = updateMedia(id, changes); setMedia(next); setSelected(next.find((item) => item.id === id)); base44.entities.MediaOverride.filter({ media_id: id }).then((existing) => { if (existing.length > 0) { base44.entities.MediaOverride.update(existing[0].id, { display_name: changes.displayName, description: changes.description }); } else { base44.entities.MediaOverride.create({ media_id: id, display_name: changes.displayName, description: changes.description }); } }).catch((e) => console.error("Override save failed:", e)); };
  return <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">{view !== "home" && <AppHeader theme={theme} onTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />}{view === "home" && <HomeIntro theme={theme} onTheme={() => setTheme(theme === "dark" ? "light" : "dark")} onEnter={enter} syncError={syncError} categories={options.categories} />}{view === "gallery" && <><FilterBar options={options} filters={filters} setFilters={setFilters} /><Gallery items={filtered} onOpen={openItem} syncError={syncError} /></>}{view === "detail" && selected && <><DetailBar item={selected} /><MediaDetail item={selected} onBack={() => setView("gallery")} onSave={save} isAdmin={isAdmin} similarItems={similarItems} onOpen={openItem} /></>}</div>;
}