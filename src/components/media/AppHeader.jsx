import ThemeControls from "@/components/media/ThemeControls";

const LOGO_LIGHT = "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/d7a412404_collegeLogoText.png";
const LOGO_DARK = "https://media.base44.com/images/public/6a5cb44eb599d294f260c3f8/015a95113_whiteLogo.png";

export default function AppHeader({ theme, onTheme }) {
  return <header className="fixed top-0 left-0 right-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85" dir="rtl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
      <img src={theme === "dark" ? LOGO_DARK : LOGO_LIGHT} alt="המכללה הלאומית לאיתנות ישראלית" className="h-11 w-auto rounded-lg sm:h-14" />
      <ThemeControls theme={theme} onTheme={onTheme} />
    </div>
  </header>;
}