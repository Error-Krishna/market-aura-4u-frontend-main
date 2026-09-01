import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import OnboardingBanner from "@/components/layout/OnboardingBanner";
export default function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-background">
        <OnboardingBanner />

        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
