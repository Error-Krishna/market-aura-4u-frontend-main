import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth";
import { useOnboarding } from "@/features/onboarding";
import { OnboardingStepper } from "@/features/onboarding";
import {
  ONBOARDING_PLATFORMS,
  type OnboardingPlatform,
} from "@/features/onboarding/types/onboarding.types";
import {
  onboardingSchema,
  type OnboardingFormData,
} from "@/features/onboarding/schemas/onboarding.schemas";
import { cn } from "@/lib/utils/cn";

const platformLabels: Record<OnboardingPlatform, string> = {
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  email: "Email",
  blog: "Blog",
};

const STEPS = ["Business Info", "Audience & Positioning", "Platforms"];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const onboarding = useOnboarding();
  const [step, setStep] = useState(1);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      brandTone: "",
      uvp: "",
      targetAudience: "",
      platforms: [],
    },
    mode: "onChange",
  });

  const platforms = getValues("platforms");

  const togglePlatform = (platform: OnboardingPlatform) => {
    const current = (platforms as OnboardingPlatform[]) || [];
    const next = current.includes(platform)
      ? current.filter((p) => p !== platform)
      : [...current, platform];
    setValue("platforms", next, { shouldValidate: true });
  };

  const nextStep = async () => {
    let fields: (keyof OnboardingFormData)[] = [];
    if (step === 1) fields = ["companyName", "industry", "brandTone"];
    else if (step === 2) fields = ["uvp", "targetAudience"];
    else if (step === 3) fields = ["platforms"];

    const isValid = await trigger(fields);
    if (isValid) {
      setStep((s) => Math.min(s + 1, 3));
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const [searchParams] = useSearchParams();
  const instagramSuccess = searchParams.get("instagramSuccess") === "true";
  const onSubmit = async (data: OnboardingFormData) => {
    setServerError("");
    try {
      await onboarding.mutateAsync(data);
      await refreshProfile();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Unable to complete onboarding.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Set up your brand</h1>
          <p className="mt-2 text-text-secondary">Tell us about your business.</p>
        </div>

        <div className="mt-8 flex justify-center">
          <OnboardingStepper currentStep={step} totalSteps={3} />
        </div>

        <div className="mt-6 text-center text-sm font-medium text-text-muted">
          Step {step} of 3: {STEPS[step - 1]}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 glass-card rounded-2xl bg-surface/40 p-8 backdrop-blur-sm"
        >
          {instagramSuccess && (
            <div className="rounded-xl border border-success/30 bg-success/10 p-4 text-sm text-success">
              ✅ Instagram account connected successfully! Complete the rest of your profile below.
            </div>
          )}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Company name</label>
                <input
                  {...register("companyName")}
                  className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-danger">{errors.companyName.message}</p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Industry</label>
                <input
                  {...register("industry")}
                  className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {errors.industry && (
                  <p className="mt-1 text-sm text-danger">{errors.industry.message}</p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Brand Tone</label>
                <input
                  {...register("brandTone")}
                  className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {errors.brandTone && (
                  <p className="mt-1 text-sm text-danger">{errors.brandTone.message}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Unique Value Proposition</label>
                <textarea
                  {...register("uvp")}
                  rows={4}
                  className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {errors.uvp && <p className="mt-1 text-sm text-danger">{errors.uvp.message}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Target Audience</label>
                <textarea
                  {...register("targetAudience")}
                  rows={4}
                  className="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {errors.targetAudience && (
                  <p className="mt-1 text-sm text-danger">{errors.targetAudience.message}</p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="mb-3 block text-sm font-medium">Select Platforms</label>
              <div className="grid gap-3 sm:grid-cols-2">
                {ONBOARDING_PLATFORMS.map((platform) => {
                  const selected = platforms?.includes(platform) || false;
                  return (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => togglePlatform(platform)}
                      className={cn(
                        "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition",
                        selected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/50 bg-background/30 text-text-secondary hover:bg-background/50",
                      )}
                    >
                      {platformLabels[platform]}
                      {selected && <Check className="size-4" />}
                    </button>
                  );
                })}
              </div>
              {errors.platforms && (
                <p className="mt-2 text-sm text-danger">{errors.platforms.message}</p>
              )}
            </div>
          )}

          {serverError && (
            <div className="mt-4 rounded-xl border border-danger/30 bg-danger/5 p-3 text-sm text-danger">
              {serverError}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
              Back
            </Button>
            {step === 3 ? (
              <Button type="submit" isLoading={onboarding.isPending}>
                Complete Setup
              </Button>
            ) : (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
