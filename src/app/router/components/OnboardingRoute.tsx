import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/use-auth";

export function OnboardingRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-6 animate-spin rounded-full border-2 border-border border-t-primary" />
      </div>
    );
  }

  if (user?.isOnboarded) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
