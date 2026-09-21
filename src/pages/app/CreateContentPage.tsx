import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { useGenerateContent } from "@/features/content";
import type { GeneratedContent } from "@/features/content/types/content.types";

const schema = z.object({
  prompt: z.string().min(5, "Please provide at least 5 characters."),
});

type FormData = z.infer<typeof schema>;

export default function CreateContentPage() {
  const [result, setResult] = useState<GeneratedContent | null>(null);

  const generate = useGenerateContent();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const response = await generate.mutateAsync({
      prompt: data.prompt,
    });

    setResult(response.job.generatedContent ?? null);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create Content</h1>

        <p className="mt-1 text-text-secondary">
          Describe what you want to create. Content will be generated for the platforms selected
          during onboarding.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="prompt" className="mb-2 block text-sm font-medium">
            Your Idea / Prompt
          </label>

          <textarea
            id="prompt"
            {...register("prompt")}
            rows={5}
            className="w-full rounded-2xl border border-border/50 bg-surface/30 p-4 text-sm backdrop-blur-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="e.g., Write a launch post for our new product..."
          />

          {errors.prompt && <p className="mt-1 text-sm text-danger">{errors.prompt.message}</p>}
        </div>

        <Button type="submit" size="lg" isLoading={generate.isPending}>
          Generate Content
        </Button>
      </form>

      {generate.isError && (
        <div className="rounded-xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
          {generate.error instanceof Error ? generate.error.message : "Failed to generate content."}
        </div>
      )}

      {generate.isSuccess && result && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Generated Content</h2>

          {result.twitter?.map((post, index) => (
            <ContentCard key={`twitter-${index}`} platform="Twitter / X" content={post.text} />
          ))}

          {result.linkedin?.map((post, index) => (
            <ContentCard key={`linkedin-${index}`} platform="LinkedIn" content={post} />
          ))}

          {result.blog?.map((post, index) => (
            <ContentCard key={`blog-${index}`} platform="Blog" content={post} />
          ))}

          {result.instagram && (
            <ContentCard platform="Instagram" content={result.instagram.caption} />
          )}

          {result.email && (
            <ContentCard
              platform="Email"
              content={`${result.email.subject}\n\n${result.email.body}`}
            />
          )}
        </div>
      )}
    </div>
  );
}

interface ContentCardProps {
  platform: string;
  content: string;
}

function ContentCard({ platform, content }: ContentCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface/30 p-6 backdrop-blur-sm">
      <h3 className="mb-3 text-lg font-medium">{platform}</h3>

      <p className="whitespace-pre-wrap text-text-secondary">{content}</p>

      <div className="mt-4">
        <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(content)}>
          Copy
        </Button>
      </div>
    </div>
  );
}
