import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightElement, error, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 flex items-center text-text-muted">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          className={cn(
            "h-10 w-full rounded-lg border bg-surface px-3 text-sm text-text placeholder:text-text-muted focus:outline-none",
            "border-border-strong focus:border-primary",
            error && "border-danger focus:border-danger",
            leftIcon && "pl-9",
            rightElement && "pr-10",
            className,
          )}
          {...props}
        />

        {rightElement && <span className="absolute right-3 flex items-center">{rightElement}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
