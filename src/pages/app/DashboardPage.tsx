import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { getProfile } from "@/features/auth/api/auth-api";
import type { ProfileResponse } from "@/features/auth/types/auth.types";

export default function DashboardPage() {
  const [profile, setProfile] = useState<ProfileResponse["data"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      try {
        const response = await getProfile();

        if (!cancelled) {
          setProfile(response.data);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load your account information.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse space-y-5">
          <div className="h-8 w-48 rounded bg-surface-muted" />
          <div className="h-24 rounded-2xl bg-surface-muted" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-32 rounded-2xl bg-surface-muted" />
            <div className="h-32 rounded-2xl bg-surface-muted" />
            <div className="h-32 rounded-2xl bg-surface-muted" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold text-text">Unable to load dashboard</h1>
          <p className="mt-2 text-sm text-text-secondary">
            {error || "Your profile could not be loaded."}
          </p>
          <Link to="/login" className="mt-5 inline-block">
            <Button>Return to login</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Dashboard</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-text sm:text-3xl">
              Welcome back{profile.name ? `, ${profile.name}` : ""}
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              {profile.companyName || profile.email}
            </p>
          </div>

          <Link to="/content/create">
            <Button rightIcon={<ArrowRight className="size-4" />}>Create content</Button>
          </Link>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface-bright p-5">
            <p className="text-sm text-text-secondary">Credits remaining</p>
            <p className="mt-2 text-3xl font-bold text-text">{profile.credits.remaining}</p>
            <p className="mt-1 text-xs text-text-muted">
              {profile.credits.used} used of {profile.credits.total}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface-bright p-5">
            <p className="text-sm text-text-secondary">Plan</p>
            <p className="mt-2 text-3xl font-bold capitalize text-text">
              {profile.isUserPremium ? "Premium" : "Free"}
            </p>
            <p className="mt-1 text-xs text-text-muted">Current account status</p>
          </div>

          <div className="rounded-2xl border border-border bg-surface-bright p-5">
            <p className="text-sm text-text-secondary">Onboarding</p>
            <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-success">
              <CheckCircle2 className="size-5" />
              Complete
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface-bright p-5 sm:p-6">
            <h2 className="text-base font-semibold text-text">Brand profile</h2>

            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Company
                </dt>
                <dd className="mt-1 text-sm text-text">{profile.companyName}</dd>
              </div>

              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Industry
                </dt>
                <dd className="mt-1 text-sm text-text">{profile.industry}</dd>
              </div>

              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Brand voice
                </dt>
                <dd className="mt-1 text-sm text-text">{profile.brandVoice.tone}</dd>
              </div>

              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Marketing goal
                </dt>
                <dd className="mt-1 text-sm text-text">
                  {profile.marketingGoal || "Not configured"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-surface-bright p-5 sm:p-6">
            <h2 className="text-base font-semibold text-text">Selected platforms</h2>

            {profile.platforms.length > 0 ? (
              <div className="mt-5 space-y-3">
                {profile.platforms.map((platform) => {
                  return (
                    <div
                      key={platform}
                      className="flex items-center gap-3 rounded-xl bg-surface-muted px-4 py-3"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-bold uppercase text-white">
                        {platform.slice(0, 2)}
                      </span>

                      <span className="text-sm font-medium capitalize text-text">{platform}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="mt-5 text-sm text-text-secondary">No platforms have been configured.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
