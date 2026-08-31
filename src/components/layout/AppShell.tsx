import { useState, type ReactNode } from "react";

import { AppShellContext } from "./app-shell-context";
import { Sidebar } from "./Sidebar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar mobileOpen={mobileNavOpen} onMobileClose={() => setMobileNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppShellContext.Provider value={{ openMobileNav: () => setMobileNavOpen(true) }}>
          <main className="flex-1 pb-12">{children}</main>
        </AppShellContext.Provider>
      </div>
    </div>
  );
}
