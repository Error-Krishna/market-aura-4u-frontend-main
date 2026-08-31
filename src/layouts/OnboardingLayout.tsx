import { Outlet } from "react-router-dom";

export default function OnboardingLayout() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <Outlet />
    </main>
  );
}
