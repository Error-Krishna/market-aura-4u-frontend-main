import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";

import { LazyPage } from "./components/LazyPage";
import { PublicRoute } from "./components/PublicRoute";
import { RouteErrorBoundary } from "./components/RouteErrorBoundary";

const HomePage = lazy(() => import("@/pages/public/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/public/NotFoundPage"));

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
            element: (
              <LazyPage>
                <HomePage />
              </LazyPage>
            ),
          },
        ],
      },
    ],
  },
  {
    errorElement: <RouteErrorBoundary />,
    path: "*",
    element: (
      <LazyPage>
        <NotFoundPage />
      </LazyPage>
    ),
  },
]);
