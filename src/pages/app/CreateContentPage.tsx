import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { useGenerateContent } from "@/features/content";
import { ONBOARDING_PLATFORMS } from "@/features/onboarding";
import { cn } from "@/lib/utils/cn";
import { Check } from "lucide-react";

const schema = z.object({
  prompt: z.string().min(10, "Please provide at least 10 characters."),
  platforms: z.array(z.string()).min(1, "Select at least one platform."),
});

type FormData = z.infer<typeof schema>;

export default function CreateContentPage() {
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const generate = useGenerateContent();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { platforms: [] },
  });

  const selectedPlatforms = useWatch({
    control,
    name: "platforms",
  });

  const togglePlatform = (platform: string) => {
    const current = selectedPlatforms || [];
    const next = current.includes(platform)
      ? current.filter((p) => p !== platform)
      : [...current, platform];

    setValue("platforms", next, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    const response = await generate.mutateAsync({
      prompt: data.prompt,
      platforms: data.platforms,
    });

    setResult(response.generatedContent);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create Content</h1>
        <p className="mt-1 text-text-secondary">
          Describe what you want to create and select platforms.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Your Idea / Prompt</label>

          <textarea
            {...register("prompt")}
            rows={5}
            className="w-full rounded-2xl border border-border/50 bg-surface/30 p-4 text-sm backdrop-blur-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="e.g., Write a launch post for our new product..."
          />

          {errors.prompt && <p className="mt-1 text-sm text-danger">{errors.prompt.message}</p>}
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium">Select Platforms</label>

          <div className="flex flex-wrap gap-3">
            {ONBOARDING_PLATFORMS.map((platform) => {
              const selected = selectedPlatforms?.includes(platform) || false;

              return (
                <button
                  key={platform}
                  type="button"
                  onClick={() => togglePlatform(platform)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
                    selected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/50 bg-surface/20 text-text-secondary hover:bg-surface/40",
                  )}
                >
                  {selected && <Check className="size-4" />}

                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </button>
              );
            })}
          </div>

          {errors.platforms && (
            <p className="mt-1 text-sm text-danger">{errors.platforms.message}</p>
          )}
        </div>

        <Button type="submit" size="lg" isLoading={generate.isPending}>
          Generate Content
        </Button>
      </form>

      {generate.isSuccess && result && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Generated Content</h2>

          <div className="space-y-6">
            {Object.entries(result).map(([platform, content]) => (
              <div
                key={platform}
                className="glass-card rounded-2xl bg-surface/30 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-2 text-lg font-medium capitalize">{platform}</h3>

                <p className="whitespace-pre-wrap text-text-secondary">{content}</p>

                <div className="mt-4 flex gap-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      alert(`Publishing to ${platform}...`);
                    }}
                  >
                    Publish
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(content)}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
