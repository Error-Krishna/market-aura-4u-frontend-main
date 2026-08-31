import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Sparkles, PenSquare } from "lucide-react";

import { useContentHistory } from "@/features/content/hooks/use-content";
import type { ContentJob, ContentJobStatus } from "@/features/content/types/content.types";

import { Topbar } from "@/components/layout/Topbar";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/feedback/Skeleton";
import { EmptyState } from "@/components/feedback/EmptyState";
import { formatDateTime } from "@/lib/utils/format";

const PLATFORM_LABEL: Record<string, string> = {
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  email: "Email",
  blog: "Blog",
};

const STATUS_OPTIONS: { value: "all" | ContentJobStatus; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "completed", label: "Completed" },
  { value: "processing", label: "Processing" },
  { value: "failed", label: "Failed" },
];

export default function ContentPage() {
  const { data, isLoading } = useContentHistory();
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ContentJobStatus>("all");

  const jobs = data?.jobs ?? [];

  const platformOptions = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((job) => job.platforms.forEach((p) => set.add(p)));
    return Array.from(set);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        search.trim().length === 0 ||
        job.originalContent.toLowerCase().includes(search.trim().toLowerCase());

      const matchesPlatform = platformFilter === "all" || job.platforms.includes(platformFilter);

      const matchesStatus = statusFilter === "all" || job.status === statusFilter;

      return matchesSearch && matchesPlatform && matchesStatus;
    });
  }, [jobs, search, platformFilter, statusFilter]);

  return (
    <>
      <Topbar
        title="Content History"
        description="View and manage all your AI-generated content."
        actions={
          <Link to="/content/create">
            <Button leftIcon={<PenSquare className="size-4" />} size="sm">
              New Content
            </Button>
          </Link>
        }
      />

      <div className="px-4 sm:px-6 lg:px-8">
        <Card>
          <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
            <Input
              leftIcon={<Search className="size-4" />}
              placeholder="Search content..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="sm:max-w-xs"
            />

            <Select
              value={platformFilter}
              onChange={(event) => setPlatformFilter(event.target.value)}
              className="sm:w-44"
            >
              <option value="all">All Platforms</option>
              {platformOptions.map((platform) => (
                <option key={platform} value={platform}>
                  {PLATFORM_LABEL[platform] ?? platform}
                </option>
              ))}
            </Select>

            <Select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as "all" | ContentJobStatus)}
              className="sm:w-40"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {isLoading ? (
            <div className="space-y-3 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={<Sparkles className="size-5" />}
                title={jobs.length === 0 ? "No content yet" : "No content matches your filters"}
                description={
                  jobs.length === 0
                    ? "Generate your first piece of AI content to see it here."
                    : "Try adjusting your search or filters."
                }
                action={
                  jobs.length === 0 && (
                    <Link
                      to="/content/create"
                      className="text-sm font-semibold text-primary-hover hover:underline"
                    >
                      Create content →
                    </Link>
                  )
                }
              />
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs text-text-muted">
                      <th className="px-5 py-3 font-medium">Content</th>
                      <th className="px-5 py-3 font-medium">Platforms</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Created At</th>
                      <th className="px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job) => (
                      <ContentRow key={job.id} job={job} />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="divide-y divide-border lg:hidden">
                {filteredJobs.map((job) => (
                  <ContentCardRow key={job.id} job={job} />
                ))}
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
}

function ContentRow({ job }: { job: ContentJob }) {
  return (
    <tr className="border-b border-border last:border-0 hover:bg-surface-muted">
      <td className="max-w-xs px-5 py-4">
        <Link
          to={`/content/${job.id}`}
          className="line-clamp-2 font-medium text-text hover:underline"
        >
          {job.originalContent}
        </Link>
      </td>
      <td className="px-5 py-4">
        <div className="flex flex-wrap gap-1">
          {job.platforms.map((p) => (
            <span
              key={p}
              className="rounded-full bg-surface-muted px-2 py-0.5 text-xs text-text-secondary"
            >
              {PLATFORM_LABEL[p] ?? p}
            </span>
          ))}
        </div>
      </td>
      <td className="px-5 py-4">
        <StatusBadge status={job.status} />
      </td>
      <td className="px-5 py-4 whitespace-nowrap text-text-secondary">
        {formatDateTime(job.createdAt)}
      </td>
      <td className="px-5 py-4">
        <Link
          to={`/content/${job.id}`}
          className="text-sm font-medium text-primary-hover hover:underline"
        >
          View
        </Link>
      </td>
    </tr>
  );
}

function ContentCardRow({ job }: { job: ContentJob }) {
  return (
    <Link to={`/content/${job.id}`} className="block p-4 hover:bg-surface-muted">
      <div className="flex items-start justify-between gap-3">
        <p className="line-clamp-2 flex-1 text-sm font-medium text-text">{job.originalContent}</p>
        <StatusBadge status={job.status} />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-text-muted">
        {job.platforms.map((p) => (
          <span key={p} className="rounded-full bg-surface-muted px-2 py-0.5">
            {PLATFORM_LABEL[p] ?? p}
          </span>
        ))}
        <span>· {formatDateTime(job.createdAt)}</span>
      </div>
    </Link>
  );
}
