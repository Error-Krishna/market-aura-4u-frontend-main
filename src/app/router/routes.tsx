import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import OnboardingLayout from "@/layouts/OnboardingLayout";
import PublicLayout from "@/layouts/PublicLayout";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { OnboardingRoute } from "./components/OnboardingRoute";

const HomePage = lazy(() => import("@/pages/public/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/public/NotFoundPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const SignupPage = lazy(() => import("@/pages/auth/SignupPage"));
const DashboardPage = lazy(() => import("@/pages/app/DashboardPage"));
const OnboardingPage = lazy(() => import("@/pages/onboarding/OnboardingPage"));

function PageLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="size-5 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>
  );
}

function lazyElement(element: React.ReactNode) {
  return <Suspense fallback={<PageLoading />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: "/",
            element: lazyElement(<HomePage />),
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: lazyElement(<LoginPage />),
          },
          {
            path: "/signup",
            element: lazyElement(<SignupPage />),
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <OnboardingRoute />,
        children: [
          {
            element: <OnboardingLayout />,
            children: [
              {
                path: "/onboarding",
                element: lazyElement(<OnboardingPage />),
              },
            ],
          },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: "/dashboard",
            element: lazyElement(<DashboardPage />),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: lazyElement(<NotFoundPage />),
  },
]);
