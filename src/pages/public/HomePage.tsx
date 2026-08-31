import { ArrowRight, Check, Sparkles, WandSparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const features = [
  {
    icon: Sparkles,
    title: "AI-powered content",
    description:
      "Turn a simple idea into polished marketing content without starting from a blank page.",
  },
  {
    icon: WandSparkles,
    title: "Built for your brand",
    description:
      "Keep your audience, goals, tone, and brand context at the center of every generation.",
  },
  {
    icon: ArrowRight,
    title: "Create and publish",
    description: "Move from idea to ready-to-use content through one focused workflow.",
  },
];

const workflow = [
  "Tell us about your business",
  "Choose what you want to create",
  "Generate, review, and publish",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm text-white">
              M
            </span>
            Market Aura
          </Link>

          <nav
            className="hidden items-center gap-7 text-sm text-text-secondary md:flex"
            aria-label="Primary navigation"
          >
            <a href="#features" className="transition-colors hover:text-text">
              Features
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-text">
              How it works
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </Container>
      </header>

      <main>
        <section className="border-b border-border">
          <Container className="grid min-h-[680px] items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-secondary">
                <Sparkles className="size-4 text-primary" />
                Smarter marketing content, faster
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-bold tracking-[-0.04em] text-text sm:text-6xl lg:text-7xl">
                Create marketing content that feels like your brand.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
                Market Aura helps you turn ideas into high-quality content for your business,
                audience, and marketing goals — without the repetitive work.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/signup">
                  <Button size="lg" rightIcon={<ArrowRight className="size-4" />}>
                    Start creating
                  </Button>
                </Link>

                <a href="#features">
                  <Button variant="outline" size="lg">
                    Explore features
                  </Button>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-secondary">
                {["AI-assisted creation", "Brand-aware workflow", "Multiple platforms"].map(
                  (item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <Check className="size-4 text-primary" />
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-8 rounded-[3rem] bg-primary/5 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative rounded-2xl border border-border bg-surface p-4 shadow-xl sm:p-6">
                <div className="rounded-xl border border-border bg-surface-bright p-5">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <p className="text-sm font-semibold">Create content</p>
                      <p className="mt-1 text-xs text-text-muted">Your next marketing idea</p>
                    </div>

                    <span className="rounded-md bg-primary-soft px-2 py-1 text-xs font-semibold text-primary">
                      AI ready
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <p className="text-xs font-medium text-text-secondary">Content goal</p>
                      <div className="mt-2 rounded-lg border border-border bg-background px-3 py-3 text-sm">
                        Launch our new product
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-text-secondary">Generated result</p>
                      <div className="mt-2 rounded-lg border border-border bg-background p-4 text-sm leading-6 text-text-secondary">
                        Introduce your audience to something new with a clear message, strong value
                        proposition, and a reason to take the next step.
                      </div>
                    </div>

                    <Button fullWidth rightIcon={<ArrowRight className="size-4" />}>
                      Generate content
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="features" className="py-20 lg:py-28">
          <Container>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-primary">Everything in one workflow</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Less busywork. More useful content.
              </h2>
              <p className="mt-4 text-base leading-7 text-text-secondary">
                Focus on your marketing strategy while Market Aura handles the repetitive content
                creation work.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {features.map(({ icon: Icon, title, description }) => (
                <article key={title} className="rounded-xl border border-border bg-surface p-6">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="how-it-works" className="border-y border-border bg-surface py-20 lg:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold text-primary">How it works</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  From idea to content in a few focused steps.
                </h2>
              </div>

              <div className="space-y-4">
                {workflow.map((step, index) => (
                  <div
                    key={step}
                    className="flex gap-4 rounded-xl border border-border bg-surface-bright p-5"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold">{step}</h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        {index === 0 &&
                          "Give Market Aura the context it needs to understand your business."}
                        {index === 1 &&
                          "Select the content type and platforms that match your current goal."}
                        {index === 2 &&
                          "Review the result, make your final adjustments, and move it forward."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 lg:py-28">
          <Container>
            <div className="rounded-2xl bg-secondary px-6 py-14 text-center text-white sm:px-10">
              <p className="text-sm font-semibold text-white/70">Ready when you are</p>
              <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                Turn your next marketing idea into content.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
                Start with your business context and let Market Aura help you build from there.
              </p>

              <div className="mt-8">
                <Link to="/signup">
                  <Button size="lg" rightIcon={<ArrowRight className="size-4" />}>
                    Get started
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <Container className="flex flex-col gap-3 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Market Aura.</span>
          <div className="flex gap-5">
            <Link to="/login" className="hover:text-text">
              Log in
            </Link>
            <Link to="/signup" className="hover:text-text">
              Sign up
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  );
}
