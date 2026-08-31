import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Crown,
  FileText,
  Users,
  PenSquare,
  FileClock,
  Share2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { useProfile } from "@/features/auth";
import { useContentHistory } from "@/features/content/hooks/use-content";
import type { ContentJob } from "@/features/content/types/content.types";

import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/feedback/Skeleton";
import { EmptyState } from "@/components/feedback/EmptyState";
import { formatDate, formatNumber } from "@/lib/utils/format";

const PLATFORM_LABEL: Record<string, string> = {
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook Page",
  email: "Email",
  blog: "Blog",
};

export default function DashboardPage() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: historyData, isLoading: historyLoading } = useContentHistory();

  const recentJobs = (historyData?.jobs ?? []).slice(0, 4);
  const connectedPlatforms = profile?.platforms ?? [];

  const displayName = profile?.name ?? profile?.email?.split("@")[0] ?? "there";

  return (
    <>
      <Topbar title="Dashboard" description={`Welcome back, ${capitalize(displayName)} 👋`} />

      <div className="px-4 sm:px-6 lg:px-8">
        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Zap className="size-5" />}
            label="Monthly Credits"
            loading={profileLoading}
            value={
              profile
                ? `${formatNumber(profile.credits.remaining)} / ${formatNumber(profile.credits.total)}`
                : undefined
            }
            sub="Remaining"
            progress={
              profile ? Math.max(0, 100 - (profile.credits.used / profile.credits.total) * 100) : 0
            }
          />

          <StatCard
            icon={<Crown className="size-5" />}
            label="Subscription"
            loading={profileLoading}
            value={
              profile ? capitalize(profile.isUserPremium ? "Pro Plan" : "Free Plan") : undefined
            }
            sub={profile ? (profile.isUserPremium ? "Active" : "Upgrade for more") : undefined}
            badgeVariant={profile?.isUserPremium ? "success" : "neutral"}
          />

          <StatCard
            icon={<FileText className="size-5" />}
            label="Content Generated"
            loading={historyLoading}
            value={historyData ? formatNumber(historyData.jobs.length) : undefined}
            sub="All time"
          />

          <StatCard
            icon={<Users className="size-5" />}
            label="Connected Accounts"
            loading={profileLoading}
            value={profile ? `${connectedPlatforms.length} / 6` : undefined}
            sub="Connected"
          />
        </div>

        {/* Recent content + Quick actions */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <div className="flex items-center justify-between p-5 pb-0">
              <h3 className="text-base font-semibold text-text">Recent Generated Content</h3>
              <Link
                to="/content"
                className="text-sm font-medium text-primary-hover hover:underline"
              >
                View All
              </Link>
            </div>

            <CardContent>
              {historyLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : recentJobs.length === 0 ? (
                <EmptyState
                  icon={<Sparkles className="size-5" />}
                  title="No content generated yet"
                  description="Create your first AI-generated post to see it here."
                  action={
                    <Link
                      to="/content/create"
                      className="text-sm font-semibold text-primary-hover hover:underline"
                    >
                      Create content →
                    </Link>
                  }
                />
              ) : (
                <div className="space-y-2">
                  {recentJobs.map((job) => (
                    <RecentContentRow key={job.id} job={job} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <div className="p-5 pb-0">
              <h3 className="text-base font-semibold text-text">Quick Actions</h3>
            </div>

            <CardContent className="space-y-2">
              <QuickAction
                to="/content/create"
                icon={<PenSquare className="size-5" />}
                title="Create Content"
                description="Generate brand-specific content with AI"
              />
              <QuickAction
                to="/content"
                icon={<FileClock className="size-5" />}
                title="View Content History"
                description="Browse and manage your content"
              />
              <QuickAction
                to="/social"
                icon={<Share2 className="size-5" />}
                title="Manage Social Accounts"
                description="Connect and manage your platforms"
              />
              <QuickAction
                to="/billing"
                icon={<Crown className="size-5" />}
                title="Upgrade Plan"
                description="Get more credits and premium features"
              />
            </CardContent>
          </Card>
        </div>

        {/* Connected social accounts strip */}
        <Card className="mt-6">
          <div className="flex items-center justify-between p-5 pb-0">
            <h3 className="text-base font-semibold text-text">Connected Social Accounts</h3>
            <Link to="/social" className="text-sm font-medium text-primary-hover hover:underline">
              View All
            </Link>
          </div>

          <CardContent>
            {profileLoading ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {Object.entries(PLATFORM_LABEL).map(([key, label]) => {
                  const isConnected = connectedPlatforms.includes(key);

                  return (
                    <div
                      key={key}
                      className="flex flex-col items-center gap-2 rounded-lg border border-border p-4 text-center"
                    >
                      <p className="text-sm font-medium text-text">{label}</p>
                      <p
                        className={`text-xs font-medium ${isConnected ? "text-success" : "text-text-muted"}`}
                      >
                        {isConnected ? "Connected" : "Not Connected"}
                      </p>
                      <Link
                        to="/social"
                        className={`mt-1 w-full rounded-md px-2 py-1.5 text-xs font-semibold ${
                          isConnected
                            ? "bg-surface-muted text-text hover:bg-border/60"
                            : "bg-primary-soft text-primary-hover hover:bg-primary-soft/70"
                        }`}
                      >
                        {isConnected ? "Manage" : "Connect"}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  loading,
  progress,
  badgeVariant,
}: {
  icon: ReactNode;
  label: string;
  value?: string;
  sub?: string;
  loading?: boolean;
  progress?: number;
  badgeVariant?: "success" | "neutral";
}) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-text-secondary">{label}</p>
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary-soft text-primary-hover">
            {icon}
          </span>
        </div>

        {loading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold text-text">{value}</p>
            {badgeVariant && (
              <StatusBadge status={badgeVariant === "success" ? "active" : "free"} />
            )}
          </div>
        )}

        {typeof progress === "number" && (
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
            <div
              className="h-full rounded-full [background:var(--gradient-brand)]"
              style={{ width: `${100 - progress}%` }}
            />
          </div>
        )}

        {sub && !loading && <p className="text-xs text-text-muted">{sub}</p>}
      </CardContent>
    </Card>
  );
}

function RecentContentRow({ job }: { job: ContentJob }) {
  const title = job.originalContent?.slice(0, 60) || "Untitled content";

  return (
    <Link
      to={`/content/${job.id}`}
      className="flex items-center justify-between gap-4 rounded-lg border border-border p-3 hover:bg-surface-muted"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text">{title}</p>
        <p className="mt-0.5 text-xs text-text-muted">
          {job.platforms.map((p) => PLATFORM_LABEL[p] ?? p).join(", ")} ·{" "}
          {formatDate(job.createdAt)}
        </p>
      </div>

      <StatusBadge status={job.status} />
    </Link>
  );
}

function QuickAction({
  to,
  icon,
  title,
  description,
}: {
  to: string;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-lg border border-border p-3 hover:border-primary/40 hover:bg-primary-soft/40"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-hover">
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-text">{title}</p>
        <p className="truncate text-xs text-text-muted">{description}</p>
      </div>

      <ArrowRight className="size-4 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
