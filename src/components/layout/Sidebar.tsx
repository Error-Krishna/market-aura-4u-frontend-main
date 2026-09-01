import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, History, CreditCard, Users, LogOut } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/features/auth";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/content/create", label: "Create Content", icon: FileText },
  { to: "/content/history", label: "History", icon: History },
  { to: "/billing", label: "Billing", icon: CreditCard },
  { to: "/social-accounts", label: "Social Accounts", icon: Users },
];

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="hidden w-64 flex-col border-r border-border/50 bg-surface/20 backdrop-blur-lg lg:flex">
      <div className="flex h-16 items-center border-b border-border/50 px-6">
        <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold">
          <span className="gradient-text">Market Aura</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
              location.pathname === to
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-text-secondary hover:bg-surface hover:text-text",
            )}
          >
            <Icon className="size-5" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-border/50 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-text-secondary transition hover:bg-surface hover:text-text"
        >
          <LogOut className="size-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
