import { Link2, Link2Off } from "lucide-react";
import { useSocialAccounts, useDisconnectInstagram } from "@/features/social-accounts";
import { Button } from "@/components/ui/Button";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function SocialAccountsPage() {
  const { data, isLoading, error } = useSocialAccounts();
  const disconnect = useDisconnectInstagram();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (error) {
    return <p className="text-danger">Failed to load social accounts.</p>;
  }

  const instagram = data?.instagram;
  const userId = localStorage.getItem("userId") || "";

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Social Accounts</h1>
        <p className="mt-1 text-text-secondary">Connect your social media platforms.</p>
      </div>

      <div className="glass-card rounded-2xl bg-surface/30 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <InstagramIcon className="size-8 text-primary" />
            <div>
              <h3 className="font-semibold">Instagram</h3>
              <p className="text-sm text-text-secondary">
                {instagram?.isConnected ? "Connected" : "Not connected"}
              </p>
            </div>
          </div>
          {instagram?.isConnected ? (
            <Button
              variant="outline"
              onClick={() => disconnect.mutate()}
              isLoading={disconnect.isPending}
            >
              <Link2Off className="mr-2 size-4" />
              Disconnect
            </Button>
          ) : (
            <a
              href={`http://localhost:5000/api/v1/auth/instagram/login?userId=${userId}`}
              className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-sm font-semibold text-background shadow-lg shadow-secondary/20 transition hover:shadow-secondary/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link2 className="mr-2 size-4" />
              Connect Instagram
            </a>
          )}
        </div>
        {instagram?.isConnected && (
          <p className="mt-2 text-xs text-text-muted">
            Connected as Instagram ID: {instagram.instagramId}
          </p>
        )}
      </div>
    </div>
  );
}
