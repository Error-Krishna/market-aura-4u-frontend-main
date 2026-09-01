import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Sparkles, TrendingUp } from "lucide-react";
import { getProfile } from "@/features/auth/api/auth-api";
import type { ProfileResponse } from "@/features/auth/types/auth.types";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const [profile, setProfile] = useState<ProfileResponse["data"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getProfile()
      .then((res) => {
        if (mounted) setProfile(res.data);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!profile) return null;

  const stats = [
    {
      label: "Credits Remaining",
      value: profile.credits.remaining,
      sub: `${profile.credits.used} used of ${profile.credits.total}`,
      icon: Zap,
    },
    {
      label: "Plan",
      value: profile.isUserPremium ? "Premium" : "Free",
      sub: "Current status",
      icon: Sparkles,
    },
    {
      label: "Platforms",
      value: profile.platforms.length,
      sub: "Configured",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back{profile.name ? `, ${profile.name}` : ""}
          </h1>
          <p className="mt-1 text-text-secondary">
            {profile.companyName || "Your brand dashboard"}
          </p>
        </div>
        <Link to="/content/create">
          <Button size="lg" rightIcon={<ArrowRight className="size-4" />}>
            Create New Content
          </Button>
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value, sub, icon: Icon }) => (
          <div key={label} className="glass-card rounded-2xl bg-surface/40 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-secondary">{label}</span>
              <Icon className="size-5 text-primary" />
            </div>
            <p className="mt-3 text-3xl font-bold">{value}</p>
            <p className="mt-1 text-xs text-text-muted">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-2xl bg-surface/40 p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold">Brand Profile</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-text-muted">Company</dt>
              <dd className="font-medium">{profile.companyName || "—"}</dd>
            </div>
            <div>
              <dt className="text-text-muted">Industry</dt>
              <dd className="font-medium">{profile.industry || "—"}</dd>
            </div>
            <div>
              <dt className="text-text-muted">Brand Voice</dt>
              <dd className="font-medium">{profile.brandVoice.tone}</dd>
            </div>
            <div>
              <dt className="text-text-muted">Marketing Goal</dt>
              <dd className="font-medium">{profile.marketingGoal || "—"}</dd>
            </div>
          </dl>
        </div>

        <div className="glass-card rounded-2xl bg-surface/40 p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold">Active Platforms</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.platforms.length > 0 ? (
              profile.platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                >
                  {p}
                </span>
              ))
            ) : (
              <p className="text-text-muted">No platforms configured</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
