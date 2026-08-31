import {
  BarChart3,
  CreditCard,
  FileText,
  Home,
  Settings,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils/cn";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Content", to: "/content", icon: FileText },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Billing", to: "/billing", icon: CreditCard },
  { label: "Settings", to: "/settings", icon: Settings },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-secondary text-white transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <NavLink to="/dashboard" onClick={onClose} className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold shadow-sm">
              M
            </span>

            <span className="text-sm font-bold tracking-tight">Market Aura</span>
          </NavLink>

          <button
            type="button"
            aria-label="Close navigation"
            className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
            onClick={onClose}
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 px-3 py-5">
          <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white text-secondary shadow-sm"
                      : "text-white/65 hover:bg-white/10 hover:text-white",
                  )
                }
              >
                <Icon className="size-[18px] shrink-0" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Sparkles className="size-4" />
            </div>

            <p className="text-sm font-semibold text-white">Create better content</p>

            <p className="mt-1 text-xs leading-5 text-white/50">
              Turn your ideas into platform-ready marketing content.
            </p>

            <NavLink
              to="/content/create"
              onClick={onClose}
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:brightness-105"
            >
              Create content
            </NavLink>
          </div>
        </div>

        <div className="border-t border-white/10 p-3">
          <NavLink
            to="/account"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-white/70 hover:bg-white/10 hover:text-white"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-white/10">
              <UserRound className="size-4" />
            </span>

            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-white">Your account</span>
              <span className="block truncate text-xs text-white/40">Manage profile</span>
            </span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
