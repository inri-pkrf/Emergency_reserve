import { Home } from "lucide-react";

export default function HomeFloatingButton() {
  return (
    <a
      href="https://totem-smart-flow.base44.app"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#F4B889] text-white shadow-lg transition hover:scale-105 hover:bg-[#F0A978]"
      aria-label="חזרה לדף הבית"
    >
      <Home className="h-7 w-7" strokeWidth={2.2} />
    </a>
  );
}