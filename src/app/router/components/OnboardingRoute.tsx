import type { ReactNode } from "react";

interface OnboardingRouteProps {
  children: ReactNode;
}

export function OnboardingRoute({ children }: OnboardingRouteProps) {
  return children;
}
