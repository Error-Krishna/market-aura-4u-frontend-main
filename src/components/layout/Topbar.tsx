import { useState, type ReactNode } from "react";
import { Bell, Menu } from "lucide-react";

import { cn } from "@/lib/utils/cn";

import { useAppShell } from "./app-shell-context";

interface TopbarProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  notificationCount?: number;
}

export function Topbar({ title, description, actions, notificationCount = 0 }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const { openMobileNav } = useAppShell();

  return (
    <header className="flex items-start justify-between gap-4 px-4 pt-6 pb-4 sm:px-6 lg:px-8">
      <div className="flex items-start gap-3">
        <button
          onClick={openMobileNav}
          className="mt-1 shrink-0 rounded-lg p-1.5 text-text hover:bg-surface-muted lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>

        <div>
          <h1 className="text-2xl font-semibold text-text sm:text-[1.75rem]">{title}</h1>
          {description && <p className="mt-1 text-sm text-text-secondary">{description}</p>}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {actions}

        <div className="relative">
          <button
            onClick={() => setNotifOpen((open) => !open)}
            className="relative flex size-10 items-center justify-center rounded-full border border-border bg-surface text-text hover:bg-surface-muted"
            aria-label="Notifications"
          >
            <Bell className="size-[18px]" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-4.5 items-center justify-center rounded-full bg-danger text-[10px] font-semibold text-white">
                {notificationCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div
              className={cn(
                "absolute top-full right-0 z-30 mt-2 w-72 rounded-xl border border-border bg-surface p-2 shadow-lg",
              )}
            >
              {notificationCount > 0 ? (
                <p className="px-3 py-6 text-center text-sm text-text-secondary">
                  You have {notificationCount} new notification
                  {notificationCount === 1 ? "" : "s"}.
                </p>
              ) : (
                <p className="px-3 py-6 text-center text-sm text-text-secondary">
                  You're all caught up.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
