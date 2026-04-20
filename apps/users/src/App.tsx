import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsersList from "./components/UsersList";
import { NuqsAdapter } from "nuqs/adapters/react";
import { UsersProvider } from "./providers/UsersProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <UsersProvider>
          <UsersList />
        </UsersProvider>
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
