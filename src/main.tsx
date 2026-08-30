import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { QueryProvider } from "./app/providers/QueryProvider";
import { AuthProvider } from "./features/auth";

import "./index.css";
import "@/styles/globals.css";
import "@/styles/tokens.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </StrictMode>,
);
