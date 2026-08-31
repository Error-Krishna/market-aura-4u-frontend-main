import { CheckCircle2, X, XCircle, Info } from "lucide-react";

import { cn } from "@/lib/utils/cn";

import { toastStore, useToasts, type ToastVariant } from "./toast-store";

const variantIcon: Record<ToastVariant, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const variantClasses: Record<ToastVariant, string> = {
  success: "border-success/30 bg-success-soft text-success",
  error: "border-danger/30 bg-danger-soft text-danger",
  info: "border-info/30 bg-info-soft text-info",
};

export function Toaster() {
  const toasts = useToasts();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2">
      {toasts.map((item) => {
        const Icon = variantIcon[item.variant];

        return (
          <div
            key={item.id}
            role="status"
            className={cn(
              "flex items-start gap-3 rounded-lg border bg-surface p-4 shadow-lg",
              variantClasses[item.variant],
            )}
          >
            <Icon className="mt-0.5 size-5 shrink-0" />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-text">{item.title}</p>
              {item.description && (
                <p className="mt-0.5 text-sm text-text-secondary">{item.description}</p>
              )}
            </div>

            <button
              onClick={() => toastStore.dismiss(item.id)}
              className="shrink-0 text-text-muted hover:text-text"
              aria-label="Dismiss"
            >
              <X className="size-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
