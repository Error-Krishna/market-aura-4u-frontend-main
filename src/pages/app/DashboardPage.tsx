import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FilePlus2,
  FileText,
  MoreHorizontal,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils/cn";

const stats = [
  {
    label: "Content created",
    value: "24",
    change: "+18%",
    icon: FileText,
  },
  {
    label: "Published",
    value: "18",
    change: "+12%",
    icon: CheckCircle2,
  },
  {
    label: "Audience reached",
    value: "12.8K",
    change: "+24%",
    icon: Users,
  },
  {
    label: "Engagement",
    value: "8.4%",
    change: "+6.2%",
    icon: TrendingUp,
  },
];

const recentContent = [
  {
    title: "Summer campaign announcement",
    platform: "Instagram",
    status: "Published",
    date: "Today",
  },
  {
    title: "Product launch announcement",
    platform: "LinkedIn",
    status: "Published",
    date: "Yesterday",
  },
  {
    title: "Weekly industry insights",
    platform: "Twitter",
    status: "Draft",
    date: "Yesterday",
  },
  {
    title: "Customer success story",
    platform: "Instagram",
    status: "Processing",
    date: "Aug 29",
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles = {
    Published: "bg-success/10 text-success",
    Draft: "bg-surface-muted text-text-secondary",
    Processing: "bg-warning/10 text-warning",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold",
        styles[status as keyof typeof styles] ?? "bg-surface-muted text-text-secondary",
      )}
    >
      {status}
    </span>
  );
}

export default function DashboardPage() {
  return (
    <Container className="py-6 sm:py-8 lg:py-10">
      <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">Welcome back</p>

          <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
            Your marketing workspace
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
            Create, manage, and track your marketing content from one place.
          </p>
        </div>

        <Link
          to="/content/create"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
        >
          <FilePlus2 className="size-4" />
          Create content
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-start justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-semibold text-success">
                <TrendingUp className="size-3" />
                {change}
              </span>
            </div>

            <p className="mt-5 text-2xl font-bold tracking-tight text-text">{value}</p>

            <p className="mt-1 text-xs text-text-muted">{label}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
            <div>
              <h2 className="text-sm font-semibold text-text">Recent content</h2>
              <p className="mt-1 text-xs text-text-muted">Your latest content activity</p>
            </div>

            <Link
              to="/content"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              View all
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-border">
            {recentContent.map((item) => (
              <div key={item.title} className="flex items-center gap-4 px-5 py-4 sm:px-6">
                <div className="hidden size-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-text-secondary sm:flex">
                  <FileText className="size-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text">{item.title}</p>

                  <p className="mt-1 text-xs text-text-muted">
                    {item.platform} · {item.date}
                  </p>
                </div>

                <StatusBadge status={item.status} />

                <button
                  type="button"
                  aria-label={`More options for ${item.title}`}
                  className="hidden rounded-lg p-2 text-text-muted hover:bg-surface-muted hover:text-text sm:block"
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-secondary p-6 text-white">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary">
            <Zap className="size-5" />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-white/45">
            Monthly usage
          </p>

          <div className="mt-2 flex items-end justify-between gap-3">
            <h2 className="text-3xl font-bold">72</h2>
            <span className="pb-1 text-xs text-white/50">of 100 credits</span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[72%] rounded-full bg-primary" />
          </div>

          <div className="mt-6 flex items-start gap-3">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-xs leading-5 text-white/55">
              You have 28 credits remaining this month. Upgrade when you need more content
              generation.
            </p>
          </div>

          <Link
            to="/billing"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-secondary transition hover:bg-white/90"
          >
            Manage plan
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Link
          to="/content/create"
          className="group rounded-2xl border border-border bg-surface p-5 transition hover:border-primary/40 hover:shadow-sm"
        >
          <FilePlus2 className="size-5 text-primary" />
          <h3 className="mt-4 text-sm font-semibold text-text">Create content</h3>
          <p className="mt-1 text-xs leading-5 text-text-secondary">
            Generate a new piece of platform-ready content.
          </p>
          <ArrowRight className="mt-4 size-4 text-text-muted transition group-hover:translate-x-1 group-hover:text-primary" />
        </Link>

        <Link
          to="/content"
          className="group rounded-2xl border border-border bg-surface p-5 transition hover:border-primary/40 hover:shadow-sm"
        >
          <Clock3 className="size-5 text-info" />
          <h3 className="mt-4 text-sm font-semibold text-text">Content history</h3>
          <p className="mt-1 text-xs leading-5 text-text-secondary">
            Review previous generations, drafts, and published content.
          </p>
          <ArrowRight className="mt-4 size-4 text-text-muted transition group-hover:translate-x-1 group-hover:text-primary" />
        </Link>

        <Link
          to="/social"
          className="group rounded-2xl border border-border bg-surface p-5 transition hover:border-primary/40 hover:shadow-sm"
        >
          <Users className="size-5 text-success" />
          <h3 className="mt-4 text-sm font-semibold text-text">Connect accounts</h3>
          <p className="mt-1 text-xs leading-5 text-text-secondary">
            Connect social platforms to publish your content.
          </p>
          <ArrowRight className="mt-4 size-4 text-text-muted transition group-hover:translate-x-1 group-hover:text-primary" />
        </Link>
      </section>
    </Container>
  );
}
