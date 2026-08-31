import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { QueryProvider } from "./app/providers/QueryProvider";
import { AuthProvider } from "./features/auth/components/AuthProvider";
import { router } from "./app/router";

import "@/styles/globals.css";
import "@/styles/tokens.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryProvider>
  </StrictMode>,
);
