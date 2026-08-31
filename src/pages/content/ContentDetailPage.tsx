import { useState } from "react";
import type { ElementType, ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, Copy, Download, Mail, RefreshCw, Rocket, FileText, Check } from "lucide-react";

import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import { useContentHistory, usePublishContent } from "@/features/content/hooks/use-content";
import type { ContentPlatform } from "@/features/content/types/content.types";

import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { PageSpinner } from "@/components/feedback/Spinner";
import { EmptyState } from "@/components/feedback/EmptyState";
import { toast } from "@/components/feedback/toast-store";
import { formatDateTime } from "@/lib/utils/format";

const PLATFORM_META: Record<
  string,
  {
    label: string;
    icon: ElementType;
    publishable: boolean;
  }
> = {
  twitter: {
    label: "Twitter / X",
    icon: FaTwitter,
    publishable: true,
  },
  linkedin: {
    label: "LinkedIn",
    icon: FaLinkedin,
    publishable: true,
  },
  instagram: {
    label: "Instagram",
    icon: FaInstagram,
    publishable: true,
  },
  email: {
    label: "Email",
    icon: Mail,
    publishable: true,
  },
  blog: {
    label: "Blog",
    icon: FileText,
    publishable: false,
  },
};

export default function ContentDetailPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useContentHistory();
  const publishMutation = usePublishContent();

  const job = data?.jobs.find((item) => item.id === jobId);

  if (isLoading) {
    return <PageSpinner />;
  }

  if (!job) {
    return (
      <>
        <Topbar title="Content Detail" />

        <div className="px-4 sm:px-6 lg:px-8">
          <EmptyState
            title="Content not found"
            description="This content may have been deleted or the link is incorrect."
            action={
              <Link
                to="/content"
                className="text-sm font-semibold text-primary-hover hover:underline"
              >
                Back to Content History
              </Link>
            }
          />
        </div>
      </>
    );
  }

  const generated = job.generatedContent;

  const handlePublish = async (platform: ContentPlatform) => {
    try {
      const response = await publishMutation.mutateAsync({
        jobId: job.id,
        platforms: [platform],
      });

      const result = response.results[0];

      if (result?.success) {
        toast.success(`Published to ${PLATFORM_META[platform]?.label ?? platform}`);
      } else {
        toast.error("Publish failed", result?.message ?? "Something went wrong.");
      }
    } catch (error) {
      toast.error("Publish failed", error instanceof Error ? error.message : undefined);
    }
  };

  return (
    <>
      <Topbar
        title="Content Detail"
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/content")}
            leftIcon={<ArrowLeft className="size-4" />}
          >
            Back
          </Button>
        }
      />

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <StatusBadge status={job.status} />

          <p className="text-sm text-text-muted">Created {formatDateTime(job.createdAt)}</p>
        </div>

        <Card className="mb-6">
          <CardContent>
            <p className="text-sm font-medium text-text-muted">Original prompt</p>

            <p className="mt-1 text-text">{job.originalContent}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.platforms.map((platform) => {
                const meta = PLATFORM_META[platform];
                const Icon = meta?.icon ?? FileText;

                return (
                  <span
                    key={platform}
                    className="flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-text-secondary"
                  >
                    <Icon className="size-3.5" />

                    {meta?.label ?? platform}
                  </span>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {job.status === "processing" && (
          <EmptyState
            icon={<RefreshCw className="size-5 animate-spin" />}
            title="Still generating..."
            description="This content is being generated. Refresh in a moment to see the result."
          />
        )}

        {job.status === "failed" && (
          <EmptyState
            title="Generation failed"
            description={job.error ?? "Something went wrong while generating this content."}
            action={
              <Link
                to="/content/create"
                className="text-sm font-semibold text-primary-hover hover:underline"
              >
                Try again →
              </Link>
            }
          />
        )}

        {job.status === "completed" && generated && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {generated.instagram && (
              <PlatformContentCard
                platform="instagram"
                onPublish={() => void handlePublish("instagram")}
                isPublishing={publishMutation.isPending}
              >
                {generated.instagram.image_url && (
                  <img
                    src={generated.instagram.image_url}
                    alt=""
                    className="mb-3 aspect-square w-full rounded-lg object-cover"
                  />
                )}

                <CopyableText text={generated.instagram.caption} />
              </PlatformContentCard>
            )}

            {generated.twitter?.map((tweet, index) => (
              <PlatformContentCard
                key={`twitter-${index}`}
                platform="twitter"
                onPublish={() => void handlePublish("twitter")}
                isPublishing={publishMutation.isPending}
              >
                {tweet.image_url && (
                  <img
                    src={tweet.image_url}
                    alt=""
                    className="mb-3 aspect-square w-full rounded-lg object-cover"
                  />
                )}

                <CopyableText text={tweet.text} />
              </PlatformContentCard>
            ))}

            {generated.linkedin?.map((post, index) => (
              <PlatformContentCard
                key={`linkedin-${index}`}
                platform="linkedin"
                onPublish={() => void handlePublish("linkedin")}
                isPublishing={publishMutation.isPending}
              >
                <CopyableText text={post} />
              </PlatformContentCard>
            ))}

            {generated.email && (
              <PlatformContentCard
                platform="email"
                onPublish={() => void handlePublish("email")}
                isPublishing={publishMutation.isPending}
              >
                <p className="mb-2 text-sm font-semibold text-text">
                  Subject: {generated.email.subject}
                </p>

                <CopyableText text={generated.email.body} />
              </PlatformContentCard>
            )}

            {generated.blog?.map((post, index) => (
              <PlatformContentCard key={`blog-${index}`} platform="blog">
                <CopyableText text={post} />
              </PlatformContentCard>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function PlatformContentCard({
  platform,
  children,
  onPublish,
  isPublishing,
}: {
  platform: string;
  children: ReactNode;
  onPublish?: () => void;
  isPublishing?: boolean;
}) {
  const meta = PLATFORM_META[platform];
  const Icon = meta?.icon ?? FileText;

  return (
    <Card>
      <div className="flex items-center gap-2 border-b border-border p-4">
        <Icon className="size-4 text-text-secondary" />

        <p className="text-sm font-semibold text-text">{meta?.label ?? platform}</p>
      </div>

      <CardContent>{children}</CardContent>

      {onPublish && (
        <div className="flex items-center gap-2 border-t border-border p-4">
          <Button variant="outline" size="sm">
            Regenerate
          </Button>

          <Button
            size="sm"
            className="flex-1"
            leftIcon={<Rocket className="size-4" />}
            isLoading={isPublishing}
            onClick={onPublish}
          >
            Publish
          </Button>
        </div>
      )}
    </Card>
  );
}

function CopyableText({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div>
      <p className="text-sm whitespace-pre-line text-text">{text}</p>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-text-muted">Characters: {text.length}</p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => void handleCopy()}
            className="flex size-8 items-center justify-center rounded-md text-text-muted hover:bg-surface-muted hover:text-text"
            aria-label="Copy"
          >
            {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
          </button>

          <button
            onClick={() => downloadTextFile(text)}
            className="flex size-8 items-center justify-center rounded-md text-text-muted hover:bg-surface-muted hover:text-text"
            aria-label="Download"
          >
            <Download className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function downloadTextFile(text: string): void {
  const blob = new Blob([text], {
    type: "text/plain",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "content.txt";
  link.click();

  URL.revokeObjectURL(url);
}
