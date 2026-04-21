import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsersList from "./components/UsersList";
import { NuqsAdapter } from "nuqs/adapters/react";
import { UsersProvider } from "./providers/UsersProvider";
import { ErrorBoundary } from "react-error-boundary";
import SystemMessage from "./components/system-messages";
import { Button } from "./components/ui/button";

const queryClient = new QueryClient();

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <SystemMessage type="error" className="flex-col gap-2">
      <p className="font-semibold">Algo inesperado aconteceu</p>
      <p className="text-sm">{error.message}</p>
      <Button variant="outline" onClick={resetErrorBoundary}>
        Recarregar
      </Button>
    </SystemMessage>
  );
}

export default function App() {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <UsersProvider>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <UsersList />
          </ErrorBoundary>
        </UsersProvider>
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
