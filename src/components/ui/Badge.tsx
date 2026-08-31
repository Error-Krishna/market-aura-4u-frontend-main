import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral" | "primary";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  neutral: "bg-surface-muted text-text-secondary",
  primary: "bg-primary-soft text-primary-hover",
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

const statusToVariant: Record<string, BadgeVariant> = {
  completed: "success",
  connected: "success",
  active: "success",
  enabled: "success",
  protected: "success",
  processing: "warning",
  pending: "warning",
  failed: "danger",
  disconnected: "neutral",
};

export function StatusBadge({ status }: { status: string }) {
  const variant = statusToVariant[status.toLowerCase()] ?? "neutral";

  return (
    <Badge variant={variant} className="capitalize">
      {status}
    </Badge>
  );
}
