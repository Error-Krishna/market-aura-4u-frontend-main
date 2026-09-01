import { useContentHistory } from "@/features/content";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils/cn";

export default function ContentHistoryPage() {
  const { data, isLoading, error } = useContentHistory();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (error) {
    return <p className="text-danger">Failed to load history.</p>;
  }

  const items = data?.data || [];

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Content History</h1>
        <p className="mt-1 text-text-secondary">All your generated content in one place.</p>
      </div>

      {items.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center text-text-secondary">
          <p>You haven't generated any content yet.</p>
          <p className="mt-2">Head to "Create Content" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl bg-surface/30 p-6 backdrop-blur-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-sm text-text-muted">
                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                  </p>
                  <p className="font-medium line-clamp-1">{item.originalContent}</p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    item.status === "completed" && "bg-success/20 text-success",
                    item.status === "processing" && "bg-yellow-500/20 text-yellow-500",
                    item.status === "failed" && "bg-danger/20 text-danger",
                  )}
                >
                  {item.status}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.platforms.map((p) => (
                  <span
                    key={p}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
