// @vitest-environment jsdom
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateContentPage from "../src/pages/app/CreateContentPage";

const contentHooks = vi.hoisted(() => ({
  useGenerateContent: vi.fn(),
  mutateAsync: vi.fn(),
}));
vi.mock("@/features/content", () => ({
  useGenerateContent: contentHooks.useGenerateContent,
}));

beforeEach(() => {
  vi.clearAllMocks();
  contentHooks.useGenerateContent.mockReturnValue({
    mutateAsync: contentHooks.mutateAsync,
    isPending: false,
    isError: false,
    isSuccess: true,
  });
});
afterEach(cleanup);

test("generated results render Facebook and Blog text and tolerate malformed legacy entries", async () => {
  await showResult({
    facebook: ["A useful Facebook announcement", null, {}, ""],
    blog: ["A concise blog draft"],
  });
  expect(screen.getByText("Facebook")).toBeTruthy();
  expect(screen.getByText("A useful Facebook announcement")).toBeTruthy();
  expect(screen.getByText("Blog")).toBeTruthy();
  expect(screen.getByText("A concise blog draft")).toBeTruthy();
  expect(screen.queryByText("[object Object]")).toBeNull();
});

async function showResult(generatedContent: Record<string, unknown>) {
  contentHooks.mutateAsync.mockResolvedValue({ job: { generatedContent } });
  render(<CreateContentPage />);
  fireEvent.change(screen.getByLabelText("Your Idea / Prompt"), {
    target: { value: "Create a launch post" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Generate Content" }));
  await waitFor(() => expect(screen.getByText("Generated Content")).toBeTruthy());
}

test("generated results show ML recommendation details and Instagram carousel slides", async () => {
  await showResult({
    instagram: {
      caption: "A launch caption",
      content_type: "carousel",
      slides: [
        { slide_number: 1, headline: "Meet the product", body: "Built for busy teams." },
        { slide_number: 2, headline: "Why it helps", body: "Save time each week." },
        { slide_number: 3, headline: "Get started", body: "Try it today." },
      ],
    },
    grounding: {
      isGrounded: true,
      recommendation: {
        recommended_content_type: { value: "carousel" },
        predicted_engagement: { value: 0.125, label: "Estimated" },
        recommended_hashtags: ["#launch", "#smallbusiness"],
      },
    },
  });

  expect(screen.getByText("This content was guided by the ML recommender.")).toBeTruthy();
  expect(screen.getByText("Suggested format").parentElement?.textContent).toContain("carousel");
  expect(screen.getByText("12.50% (Estimated)")).toBeTruthy();
  expect(screen.getByText("#launch")).toBeTruthy();
  expect(screen.getByRole("region", { name: "Instagram carousel slides" })).toBeTruthy();
  expect(screen.getByText("Meet the product")).toBeTruthy();
  expect(screen.getByText("Save time each week.")).toBeTruthy();
});

test("ungrounded results explain the fallback and tolerate missing recommendation data", async () => {
  await showResult({
    instagram: { caption: "Fallback caption", content_type: "image" },
    grounding: { isGrounded: false, recommendation: null, reason: "Recommender unavailable" },
  });

  expect(
    screen.getByText("This content was generated without ML recommendation guidance."),
  ).toBeTruthy();
  expect(screen.getByText("Recommender unavailable")).toBeTruthy();
  expect(screen.queryByRole("region", { name: "Instagram carousel slides" })).toBeNull();
  expect(screen.queryByText("Suggested format")).toBeNull();
});
