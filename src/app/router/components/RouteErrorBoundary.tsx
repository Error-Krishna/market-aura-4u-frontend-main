import type { ReactNode } from "react";

interface RouteErrorBoundaryProps {
  children: ReactNode;
}

export function RouteErrorBoundary({ children }: RouteErrorBoundaryProps) {
  return children;
}
