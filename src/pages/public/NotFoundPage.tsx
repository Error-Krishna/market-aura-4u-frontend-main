import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary-soft text-primary-hover">
        <Compass className="size-8" />
      </div>

      <div>
        <p className="text-sm font-semibold text-primary-hover">404</p>
        <h1 className="mt-2 text-3xl font-semibold text-text">Page not found</h1>
        <p className="mt-2 max-w-sm text-sm text-text-secondary">
          The page you're looking for doesn't exist or may have been moved.
        </p>
      </div>

      <Link to="/dashboard">
        <Button>Back to Dashboard</Button>
      </Link>
    </main>
  );
}
