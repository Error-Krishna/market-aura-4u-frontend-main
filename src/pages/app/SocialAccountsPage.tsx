import { Link } from "react-router-dom";

export default function SocialAccountsPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="text-3xl font-bold">Social Accounts</h1>
      <div className="glass-card space-y-4 rounded-2xl bg-surface/30 p-6 backdrop-blur-sm">
        <p className="font-semibold">
          Social account connections and automatic publishing are unavailable in this MVP.
        </p>
        <p className="text-text-secondary">
          Generate content, review it, and copy it to your chosen platform.
        </p>
        <Link to="/content/create" className="inline-block font-semibold text-primary underline">
          Create content
        </Link>
      </div>
    </div>
  );
}
