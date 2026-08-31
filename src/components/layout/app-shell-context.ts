import { createContext, useContext } from "react";

export interface AppShellContextValue {
  openMobileNav: () => void;
}

export const AppShellContext = createContext<AppShellContextValue>({
  openMobileNav: () => {},
});

export function useAppShell(): AppShellContextValue {
  return useContext(AppShellContext);
}
