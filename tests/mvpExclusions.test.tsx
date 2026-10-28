// @vitest-environment jsdom
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SocialAccountsPage from "../src/pages/app/SocialAccountsPage";
import HomePage from "../src/pages/public/HomePage";
import BillingPage from "../src/pages/app/BillingPage";

const socialHooks = vi.hoisted(() => ({
  useSocialAccounts: vi.fn(() => ({ data: {}, isLoading: false, error: null })),
  useDisconnectInstagram: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
}));
vi.mock("@/features/social-accounts", () => socialHooks);
const billingHooks = vi.hoisted(() => ({
  useCreateOrder: vi.fn(() => ({ mutateAsync: vi.fn(), isPending: false })),
  useVerifyPayment: vi.fn(() => ({ mutateAsync: vi.fn() })),
}));
vi.mock("@/features/billing", () => billingHooks);
vi.mock("@/features/auth", () => ({ useAuth: () => ({ user: { isPremium: false } }) }));

beforeEach(() => vi.clearAllMocks());
afterEach(cleanup);

test("social accounts show the MVP exclusion without account requests or connection controls", () => {
  render(
    <MemoryRouter>
      <SocialAccountsPage />
    </MemoryRouter>,
  );
  expect(
    screen.getByText(
      /Social account connections and automatic publishing are unavailable in this MVP/i,
    ),
  ).toBeTruthy();
  expect(screen.queryAllByRole("button")).toHaveLength(0);
  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(1);
  expect(links[0].getAttribute("href")).toBe("/content/create");
  expect(socialHooks.useSocialAccounts).not.toHaveBeenCalled();
  expect(socialHooks.useDisconnectInstagram).not.toHaveBeenCalled();
});

test("home describes copying content without promising automated publishing", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
  expect(screen.getByText("Generate, review, and copy")).toBeTruthy();
  expect(screen.queryByText(/publish/i)).toBeNull();
});

test("billing shows the MVP exclusion without payment hooks or upgrade controls", () => {
  render(
    <MemoryRouter>
      <BillingPage />
    </MemoryRouter>,
  );
  expect(screen.getByText(/Payments and subscriptions are unavailable in this MVP/i)).toBeTruthy();
  expect(screen.queryAllByRole("button")).toHaveLength(0);
  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(1);
  expect(links[0].getAttribute("href")).toBe("/content/create");
  expect(screen.queryByText(/\$29|\$99|Unlimited credits/i)).toBeNull();
  expect(billingHooks.useCreateOrder).not.toHaveBeenCalled();
  expect(billingHooks.useVerifyPayment).not.toHaveBeenCalled();
});
