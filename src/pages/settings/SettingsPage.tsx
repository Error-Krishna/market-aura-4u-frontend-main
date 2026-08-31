import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent } from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <>
      <Topbar
        title="Settings"
        description="Manage your preferences, notifications, and account settings."
      />

      <div className="px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent>
            <p className="text-sm text-text-secondary">
              Settings management is coming soon. In the meantime, you can update your profile from
              the Profile page.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
