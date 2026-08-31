import { useState, type FormEvent } from "react";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { useCompleteOnboarding } from "@/features/onboarding/hooks/use-onboarding";
import {
  onboardingSchema,
  type OnboardingFormData,
} from "@/features/onboarding/schemas/onboarding.schemas";
import type { OnboardingPlatform } from "@/features/onboarding/types/onboarding.types";

const platforms: { value: OnboardingPlatform; label: string }[] = [
  { value: "twitter", label: "Twitter / X" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "email", label: "Email" },
  { value: "blog", label: "Blog" },
];

const initialForm: OnboardingFormData = {
  companyName: "",
  industry: "",
  brandTone: "Professional",
  uvp: "",
  targetAudience: "",
  platforms: [],
};

export default function OnboardingPage() {
  const { refreshProfile } = useAuth();
  const onboardingMutation = useCompleteOnboarding();

  const [form, setForm] = useState<OnboardingFormData>(initialForm);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof OnboardingFormData, value: string): void => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const togglePlatform = (platform: OnboardingPlatform): void => {
    setForm((current) => ({
      ...current,
      platforms: current.platforms.includes(platform)
        ? current.platforms.filter((item) => item !== platform)
        : [...current.platforms, platform],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const result = onboardingSchema.safeParse(form);

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Please check your details.");
      return;
    }

    try {
      await onboardingMutation.mutateAsync(result.data);
      await refreshProfile();
    } catch (mutationError) {
      setError(
        mutationError instanceof Error ? mutationError.message : "Unable to complete onboarding.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-[var(--color-primary-hover)]">Market Aura</p>

          <h1 className="text-3xl font-semibold text-[var(--color-text)]">
            Let&apos;s set up your brand
          </h1>

          <p className="mt-2 text-[var(--color-text-secondary)]">
            Tell us about your business so Market Aura can create content that sounds like your
            brand.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] sm:p-8"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="companyName" className="mb-2 block text-sm font-medium">
                Company name
              </label>
              <input
                id="companyName"
                value={form.companyName}
                onChange={(event) => updateField("companyName", event.target.value)}
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-3 py-2.5 outline-none focus:border-[var(--color-primary)]"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label htmlFor="industry" className="mb-2 block text-sm font-medium">
                Industry
              </label>
              <input
                id="industry"
                value={form.industry}
                onChange={(event) => updateField("industry", event.target.value)}
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-3 py-2.5 outline-none focus:border-[var(--color-primary)]"
                placeholder="E-commerce, SaaS, fitness..."
              />
            </div>

            <div>
              <label htmlFor="brandTone" className="mb-2 block text-sm font-medium">
                Brand tone
              </label>
              <select
                id="brandTone"
                value={form.brandTone}
                onChange={(event) => updateField("brandTone", event.target.value)}
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2.5 outline-none focus:border-[var(--color-primary)]"
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Playful</option>
                <option>Bold</option>
                <option>Inspirational</option>
                <option>Casual</option>
              </select>
            </div>

            <div>
              <label htmlFor="uvp" className="mb-2 block text-sm font-medium">
                What makes your brand different?
              </label>
              <textarea
                id="uvp"
                value={form.uvp}
                onChange={(event) => updateField("uvp", event.target.value)}
                rows={3}
                className="w-full resize-y rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-3 py-2.5 outline-none focus:border-[var(--color-primary)]"
                placeholder="Describe your unique value proposition..."
              />
            </div>

            <div>
              <label htmlFor="targetAudience" className="mb-2 block text-sm font-medium">
                Who is your target audience?
              </label>
              <textarea
                id="targetAudience"
                value={form.targetAudience}
                onChange={(event) => updateField("targetAudience", event.target.value)}
                rows={3}
                className="w-full resize-y rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-3 py-2.5 outline-none focus:border-[var(--color-primary)]"
                placeholder="Describe the people you want to reach..."
              />
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-medium">Where do you want to publish?</legend>

              <div className="grid gap-3 sm:grid-cols-2">
                {platforms.map((platform) => {
                  const selected = form.platforms.includes(platform.value);

                  return (
                    <label
                      key={platform.value}
                      className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] p-3"
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => togglePlatform(platform.value)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">{platform.label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {error && (
              <p
                role="alert"
                className="rounded-[var(--radius-md)] bg-[var(--color-danger-soft)] px-4 py-3 text-sm text-[var(--color-danger)]"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={onboardingMutation.isPending}
              className="w-full rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-3 font-medium text-[var(--color-text)] transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {onboardingMutation.isPending ? "Setting up your brand..." : "Complete setup"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
