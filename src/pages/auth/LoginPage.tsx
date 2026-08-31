import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { loginSchema, type LoginFormData } from "@/features/auth/schemas/auth.schemas";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await login(data);

      if (user.isOnboarded) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/onboarding", { replace: true });
      }
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Unable to login.",
      });
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background: "var(--color-background)",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "2.5rem",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              margin: 0,
              marginBottom: "0.5rem",
              fontSize: "2rem",
              color: "var(--color-text)",
            }}
          >
            Welcome back
          </h1>

          <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
            Sign in to continue to Market Aura.
          </p>
        </div>

        <form
          onSubmit={(event) => {
            void handleSubmit(onSubmit)(event);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 600,
                color: "var(--color-text)",
              }}
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register("email")}
              style={{
                width: "100%",
                padding: "0.75rem 0.875rem",
                border: "1px solid var(--color-border-strong)",
                borderRadius: "var(--radius-md)",
                outline: "none",
              }}
            />

            {errors.email && (
              <p
                style={{
                  marginTop: "0.375rem",
                  color: "var(--color-danger)",
                  fontSize: "var(--text-sm)",
                }}
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 600,
                color: "var(--color-text)",
              }}
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              {...register("password")}
              style={{
                width: "100%",
                padding: "0.75rem 0.875rem",
                border: "1px solid var(--color-border-strong)",
                borderRadius: "var(--radius-md)",
                outline: "none",
              }}
            />

            {errors.password && (
              <p
                style={{
                  marginTop: "0.375rem",
                  color: "var(--color-danger)",
                  fontSize: "var(--text-sm)",
                }}
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {errors.root && (
            <p
              style={{
                margin: 0,
                padding: "0.75rem",
                background: "var(--color-danger-soft)",
                color: "var(--color-danger)",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--text-sm)",
              }}
            >
              {errors.root.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "0.8rem 1rem",
              border: "none",
              borderRadius: "var(--radius-md)",
              background: "var(--color-primary)",
              color: "var(--color-text)",
              fontWeight: 600,
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
            color: "var(--color-text-secondary)",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "var(--color-text)",
              fontWeight: 600,
            }}
          >
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
}
