import { useRouteError } from "react-router-dom";

export function RouteErrorBoundary() {
  const error = useRouteError();

  return (
    <div style={{ padding: "40px", color: "#c95757" }}>
      <h1>Something went wrong</h1>
      <pre>{error instanceof Error ? error.message : String(error)}</pre>
    </div>
  );
}
