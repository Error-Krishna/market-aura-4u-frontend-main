import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size">;

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, ...props }, ref) => {
    return (
      <label className={cn("relative inline-flex h-6 w-11 shrink-0 cursor-pointer", className)}>
        <input ref={ref} type="checkbox" checked={checked} className="peer sr-only" {...props} />
        <span
          className={cn(
            "absolute inset-0 rounded-full bg-border-strong transition-colors duration-150",
            "peer-checked:[background:var(--gradient-brand)]",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          )}
        />
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform duration-150",
            "peer-checked:translate-x-5",
          )}
        />
      </label>
    );
  },
);

Switch.displayName = "Switch";
