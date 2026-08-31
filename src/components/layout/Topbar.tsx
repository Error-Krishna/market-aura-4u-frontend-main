import { Bell, Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    const next = !dark;

    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("market-aura-theme", next ? "dark" : "light");
    setDark(next);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button
        type="button"
        aria-label="Open navigation"
        className="rounded-lg p-2 text-text-secondary hover:bg-surface-muted lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="size-5" />
      </button>

      <div className="hidden lg:block">
        <p className="text-sm font-medium text-text">Dashboard</p>
        <p className="text-xs text-text-muted">Your content workspace</p>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          aria-label="Toggle theme"
          className="rounded-lg p-2.5 text-text-secondary transition hover:bg-surface-muted hover:text-text"
          onClick={toggleTheme}
        >
          {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2.5 text-text-secondary transition hover:bg-surface-muted hover:text-text"
        >
          <Bell className="size-[18px]" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
        </button>

        <div className="ml-2 flex size-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          K
        </div>
      </div>
    </header>
  );
}
