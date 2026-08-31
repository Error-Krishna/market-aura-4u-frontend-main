import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils/cn";

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn("size-5 animate-spin text-primary-hover", className)} />;
}

export function PageSpinner() {
  return (
    <div className="flex min-h-[40vh] w-full items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
}
