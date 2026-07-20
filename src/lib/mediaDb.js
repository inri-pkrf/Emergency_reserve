import { MEDIA_DB_KEY } from "@/config/media";

export function loadMedia() {
  try { return JSON.parse(localStorage.getItem(MEDIA_DB_KEY) || "[]"); }
  catch { return []; }
}

export function storeMedia(items) {
  localStorage.setItem(MEDIA_DB_KEY, JSON.stringify(items));
  return items;
}

export function mergeMedia(incoming) {
  const current = loadMedia();
  const byId = new Map(current.map((item) => [item.id, item]));
  const seen = new Set(incoming.map((item) => item.id));
  const merged = incoming.map((item) => {
    const saved = byId.get(item.id);
    return saved ? { ...saved, ...item } : item;
  });
  current.filter((item) => !seen.has(item.id)).forEach((item) => merged.push(item));
  return storeMedia(merged);
}

export function updateMedia(id, changes) {
  const updated = loadMedia().map((item) => item.id === id ? { ...item, ...changes, manuallyEdited: true } : item);
  return storeMedia(updated);
}