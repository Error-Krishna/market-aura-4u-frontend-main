import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import AppLayout from "@/layouts/AppLayout";
import PublicLayout from "@/layouts/PublicLayout";

const HomePage = lazy(() => import("@/pages/public/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/public/NotFoundPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const SignupPage = lazy(() => import("@/pages/auth/SignupPage"));
const DashboardPage = lazy(() => import("@/pages/app/DashboardPage"));

function PageLoading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="size-5 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
    </div>
  );
}

function lazyElement(element: React.ReactNode) {
  return <Suspense fallback={<PageLoading />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: lazyElement(<HomePage />),
      },
    ],
  },
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
  {
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: lazyElement(<DashboardPage />),
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
  {
    path: "*",
    element: lazyElement(<NotFoundPage />),
  },
]);
