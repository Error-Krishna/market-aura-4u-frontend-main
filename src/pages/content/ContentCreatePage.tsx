import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Mail, FileText } from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

import { useProfile } from "@/features/auth";
import { useGenerateContent } from "@/features/content/hooks/use-content";
import { generateContentSchema } from "@/features/content/schemas/content.schemas";

import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/feedback/toast-store";
import { cn } from "@/lib/utils/cn";
import { formatNumber } from "@/lib/utils/format";

const PLATFORM_ICONS = {
  instagram: FaInstagram,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  email: Mail,
  blog: FileText,
};

const PLATFORM_LABEL: Record<string, string> = {
  instagram: "Instagram",
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  email: "Email",
  blog: "Blog",
};

const CONTENT_TYPES = [
  "Product Announcement",
  "Educational",
  "Thought Leadership",
  "Case Study",
  "Trends",
  "Brand Awareness",
];

export default function ContentCreatePage() {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const generateMutation = useGenerateContent();

  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState(CONTENT_TYPES[0]);
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState<string | null>(null);

  const brandPlatforms = profile?.platforms ?? [];

  const handleSubmit = async () => {
    setError(null);

    // NOTE: the backend currently only accepts a single `prompt` string — it
    // auto-selects platforms from the user's brand profile and has no
    // separate contentType/instructions fields. We fold those extra inputs
    // into the prompt itself so the richer UI still has a real effect,
    // rather than silently dropping them.
    const composedPrompt = [
      contentType ? `Content type: ${contentType}.` : null,
      prompt.trim(),
      instructions.trim() ? `Additional instructions: ${instructions.trim()}` : null,
    ]
      .filter(Boolean)
      .join(" ");

    const result = generateContentSchema.safeParse({ prompt: composedPrompt });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Please describe the content you want.");
      return;
    }

    try {
      const response = await generateMutation.mutateAsync({ prompt: composedPrompt });
      toast.success("Content generated!", "Your AI-generated content is ready to review.");
      navigate(`/content/${response.job.id}`);
    } catch (mutationError) {
      const message =
        mutationError instanceof Error ? mutationError.message : "Unable to generate content.";
      setError(message);
      toast.error("Generation failed", message);
    }
  };

  return (
    <>
      <Topbar
        title="Create Content"
        description="Generate brand-aligned content for your social media."
        actions={
          profile && (
            <div className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text sm:flex">
              <Sparkles className="size-4 text-primary-hover" />
              {formatNumber(profile.credits.remaining)} / {formatNumber(profile.credits.total)}{" "}
              Credits Remaining
            </div>
          )
        }
      />

      <div className="grid grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <Card className="lg:col-span-2">
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="prompt">What would you like to create?</Label>
              <p className="mb-2 text-xs text-text-muted">
                Describe the content you want AI to generate.
              </p>
              <Textarea
                id="prompt"
                rows={5}
                maxLength={1000}
                showCount
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Create a LinkedIn post announcing our new AI Analytics feature that helps businesses track real-time performance effortlessly."
              />
            </div>

            <div>
              <Label>Platforms this will be generated for</Label>
              <p className="mb-2 text-xs text-text-muted">
                Based on the platforms you selected during onboarding.
              </p>

              <div className="flex flex-wrap gap-2">
                {brandPlatforms.length === 0 && (
                  <p className="text-sm text-text-muted">
                    No platforms selected yet — update this in{" "}
                    <span className="font-medium text-text">Settings</span>.
                  </p>
                )}

                {brandPlatforms.map((platform) => {
                  const Icon = PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS] ?? FileText;

                  return (
                    <span
                      key={platform}
                      className="flex items-center gap-2 rounded-lg border border-primary/40 bg-primary-soft px-3 py-2 text-sm font-medium text-primary-hover"
                    >
                      <Icon className="size-4" />
                      {PLATFORM_LABEL[platform] ?? platform}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="contentType">Content Type (Optional)</Label>
                <Select
                  id="contentType"
                  value={contentType}
                  onChange={(event) => setContentType(event.target.value)}
                >
                  {CONTENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="instructions">Additional Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  rows={1}
                  maxLength={500}
                  value={instructions}
                  onChange={(event) => setInstructions(event.target.value)}
                  placeholder="e.g. Use a professional and confident tone..."
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger">
                {error}
              </p>
            )}

            <Button
              size="lg"
              fullWidth
              isLoading={generateMutation.isPending}
              leftIcon={<Sparkles className="size-4" />}
              onClick={() => void handleSubmit()}
            >
              {generateMutation.isPending ? "Generating content..." : "Generate Content"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="p-5 pb-0">
              <h3 className="text-base font-semibold text-text">Brand Summary</h3>
              <p className="mt-1 text-xs text-text-muted">Overview of your brand context.</p>
            </div>

            <CardContent className="space-y-4">
              <SummaryRow label="Company" value={profile?.companyName || "—"} />
              <SummaryRow label="Industry" value={profile?.industry || "—"} />
              <SummaryRow label="Brand Tone" value={profile?.brandVoice.tone || "—"} />
            </CardContent>
          </Card>

          <Card>
            <div className="p-5 pb-0">
              <h3 className="text-base font-semibold text-text">How it Works</h3>
            </div>

            <CardContent>
              <ol className="space-y-4">
                {[
                  "Describe your content idea",
                  "Our AI analyzes your brand",
                  "Content is generated for your platforms",
                  "Review, refine & publish",
                ].map((step, index) => (
                  <li key={step} className={cn("flex gap-3 text-sm text-text-secondary")}>
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary-hover">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-text-muted">{label}</p>
      <p className="text-sm font-medium text-text">{value}</p>
    </div>
  );
}
