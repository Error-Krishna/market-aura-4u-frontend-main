import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, MoreVertical, X } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils/cn";

import { NAV_ITEMS } from "./nav-config";

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-screen w-sidebar shrink-0 flex-col bg-sidebar transition-transform duration-200 lg:sticky lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex size-9 items-center justify-center rounded-lg text-lg font-bold text-white [background:var(--gradient-brand)]">
            S
          </div>

          <button
            onClick={onMobileClose}
            className="text-white/70 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onMobileClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-colors",
                  isActive
                    ? "bg-sidebar-active text-white"
                    : "hover:bg-sidebar-hover hover:text-white",
                )
              }
            >
              <item.icon className="size-[18px] shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <SidebarUserCard />
      </aside>
    </>
  );
}

function SidebarUserCard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate("/login", { replace: true });
  };

  const displayName = user?.email?.split("@")[0] ?? "Account";

  return (
    <div className="relative border-t border-white/10 p-4">
      {menuOpen && (
        <div className="absolute bottom-full left-4 mb-2 w-44 overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-lg">
          <button
            onClick={() => void handleLogout()}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-danger hover:bg-danger-soft"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      )}

      <button
        onClick={() => setMenuOpen((open) => !open)}
        className="flex w-full items-center gap-3 rounded-lg p-1 text-left hover:bg-sidebar-hover"
      >
        <Avatar name={displayName} size="sm" />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white capitalize">{displayName}</p>
          <p className="truncate text-xs text-white/50">{user?.email}</p>
        </div>

        <MoreVertical className="size-4 shrink-0 text-white/50" />
      </button>
    </div>
  );
}
