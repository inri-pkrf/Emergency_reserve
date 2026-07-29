import { Delete, X } from "lucide-react";

const HEBREW_ROWS = [
  ["ק", "ר", "א", "ט", "ו", "ן", "ם", "פ"],
  ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף"],
  ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ"],
];

const ENGLISH_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const Key = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex h-11 min-w-9 flex-1 max-w-[44px] items-center justify-center rounded-lg bg-white text-lg font-bold shadow-sm transition active:scale-90 active:bg-amber-50 dark:bg-slate-800 dark:text-white dark:active:bg-slate-700 ${className}`}
  >
    {children}
  </button>
);

export default function CustomKeyboard({ lang, onKeyPress, onBackspace, onSpace, onToggleLang, onClose }) {
  const rows = lang === "he" ? HEBREW_ROWS : ENGLISH_ROWS;
  return (
    <div className="border-t border-slate-300 bg-slate-100 dark:border-white/10 dark:bg-slate-900" dir="ltr">
      <div className="mx-auto max-w-3xl p-3">
        <div className="mb-2 flex items-center justify-between" dir="rtl">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{lang === "he" ? "מקלדת עברית" : "English Keyboard"}</span>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-full bg-slate-200 px-4 py-1.5 text-sm font-bold text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <X className="h-4 w-4" /> סגור מקלדת
          </button>
        </div>
        {rows.map((row, i) => (
          <div key={i} className="mb-1.5 flex justify-center gap-1.5">
            {row.map((key) => (
              <Key key={key} onClick={() => onKeyPress(key)}>{key}</Key>
            ))}
          </div>
        ))}
        <div className="mt-1.5 flex justify-center gap-1.5">
          <button
            onClick={onToggleLang}
            className="flex h-11 min-w-[60px] items-center justify-center rounded-lg bg-amber-400 text-sm font-bold text-slate-950 shadow-sm transition active:scale-90 active:bg-amber-300"
          >
            {lang === "he" ? "EN" : "עב"}
          </button>
          <button
            onClick={onSpace}
            className="flex h-11 flex-1 max-w-xs items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-500 shadow-sm transition active:scale-95 active:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:active:bg-slate-700"
          >
            רווח
          </button>
          <button
            onClick={onBackspace}
            className="flex h-11 min-w-[60px] items-center justify-center rounded-lg bg-white shadow-sm transition active:scale-90 active:bg-slate-100 dark:bg-slate-800 dark:text-white dark:active:bg-slate-700"
          >
            <Delete className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}