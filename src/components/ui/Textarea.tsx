import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  maxLength?: number;
  showCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, maxLength, showCount, value, ...props }, ref) => {
    const length = typeof value === "string" ? value.length : 0;

    return (
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          maxLength={maxLength}
          className={cn(
            "w-full resize-y rounded-lg border bg-surface px-3 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none",
            "border-border-strong focus:border-primary",
            error && "border-danger focus:border-danger",
            showCount && maxLength && "pb-6",
            className,
          )}
          {...props}
        />

        {showCount && maxLength && (
          <span className="absolute right-3 bottom-2 text-xs text-text-muted">
            {length}/{maxLength}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
