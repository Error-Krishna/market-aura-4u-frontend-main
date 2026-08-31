import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface-bright)]">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--color-secondary)] text-sm font-bold text-white">
              M
            </div>

            <span className="text-sm font-semibold">Market Aura</span>
          </div>

          <span className="text-sm text-[var(--color-text-muted)]">Step {step} of 1</span>
        </Container>
      </header>

      <Container className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
        <section className="w-full max-w-2xl">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold text-[var(--color-primary)]">Get started</p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Set up your workspace</h1>

            <p className="mt-3 max-w-xl text-[var(--color-text-secondary)]">
              Tell us about your business so Market Aura can personalize your content workflow.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-bright)] p-5 shadow-sm sm:p-8">
            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-[var(--color-text)]">Getting started</span>

                <span className="text-[var(--color-text-muted)]">1 / 1</span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-muted)]">
                <div className="h-full w-full rounded-full bg-[var(--color-primary)]" />
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)] p-6 sm:p-8">
              <h2 className="text-lg font-semibold">Onboarding configuration</h2>

              <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                The onboarding API contract is not currently present in the frontend project. We
                will connect the actual fields here as soon as that backend contract is restored.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                rightIcon={<ArrowRight className="size-4" />}
                onClick={() => setStep(1)}
              >
                Continue
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
