const ignoredRow = (value = "") => value.startsWith("📂 טבלה עבור:") || value.startsWith("📁 תיקיית אב ראשית:");

export function parseCsv(text) {
  const rows = []; let row = []; let cell = ""; let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i], next = text[i + 1];
    if (char === '"' && quoted && next === '"') { cell += '"'; i += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(cell); cell = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += char;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

function extractFileId(url = "") {
  return url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] || url.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1] || "";
}

function validDate(value = "") {
  const datePart = value.trim().split(/\s+/)[0];
  return /^\d{1,4}[./-]\d{1,2}[./-]\d{1,4}$/.test(datePart) || !Number.isNaN(Date.parse(datePart));
}

export function rowsToMedia(rows) {
  return rows.flatMap((columns) => {
    const [dateAdded = "", rawType = "", originalName = "", link = "", category = "", status = "", rawTags = "", manualDate = ""] = columns.map((v) => v.trim());
    const fileId = extractFileId(link);
    if (!dateAdded || ignoredRow(dateAdded) || !validDate(dateAdded) || !fileId) return [];
    const type = rawType.includes("סרט") ? "סרטון" : rawType.includes("תמונה") ? "תמונה" : "";
    if (!type) return [];
    return [{ id: fileId, dateAdded, type, originalName, displayName: originalName, mediaLink: link, category, status, tags: rawTags.split(",").map((tag) => tag.trim()).filter(Boolean), manualDate, description: "", manuallyEdited: false }];
  });
}

export function mediaUrl(item) {
  return item.type === "סרטון" ? `https://drive.google.com/file/d/${item.id}/preview` : `https://docs.google.com/uc?export=download&id=${item.id}`;
}

export function thumbnailUrl(item, size = "w1000") {
  return `https://drive.google.com/thumbnail?id=${item.id}&sz=${size}`;
}