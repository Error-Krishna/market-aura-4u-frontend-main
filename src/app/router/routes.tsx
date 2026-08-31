import { createBrowserRouter } from "react-router-dom";

import AccountPage from "@/pages/account/AccountPage";
import DashboardPage from "@/pages/app/DashboardPage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import BillingPage from "@/pages/billing/BillingPage";
import ContentPage from "@/pages/content/ContentPage";
import ContentCreatePage from "@/pages/content/ContentCreatePage";
import ContentDetailPage from "@/pages/content/ContentDetailPage";
import OnboardingPage from "@/pages/onboarding/OnboardingPage";
import HomePage from "@/pages/public/HomePage";
import NotFoundPage from "@/pages/public/NotFoundPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import SocialAccountsPage from "@/pages/social/SocialAccountsPage";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import OnboardingLayout from "@/layouts/OnboardingLayout";
import PublicLayout from "@/layouts/PublicLayout";

import { OnboardingRoute } from "./components/OnboardingRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { RouteErrorBoundary } from "./components/RouteErrorBoundary";

export const router = createBrowserRouter([
  {
    errorElement: <RouteErrorBoundary />,
    element: <PublicLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
        ],
      },
    ],
  },
  {
    errorElement: <RouteErrorBoundary />,
    element: <AuthLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/signup",
            element: <SignupPage />,
          },
        ],
      },
    ],
  },
  {
    errorElement: <RouteErrorBoundary />,
    element: <OnboardingLayout />,
    children: [
      {
        element: <OnboardingRoute />,
        children: [
          {
            path: "/onboarding",
            element: <OnboardingPage />,
          },
        ],
      },
    ],
  },
  {
    errorElement: <RouteErrorBoundary />,
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/content",
            element: <ContentPage />,
          },
          {
            path: "/content/create",
            element: <ContentCreatePage />,
          },
          {
            path: "/content/:jobId",
            element: <ContentDetailPage />,
          },
          {
            path: "/social",
            element: <SocialAccountsPage />,
          },
          {
            path: "/billing",
            element: <BillingPage />,
          },
          {
            path: "/account",
            element: <AccountPage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
  {
    errorElement: <RouteErrorBoundary />,
    path: "*",
    element: <NotFoundPage />,
  },
]);
