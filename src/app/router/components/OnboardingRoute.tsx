import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/use-auth";

export function OnboardingRoute() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.isOnboarded) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
