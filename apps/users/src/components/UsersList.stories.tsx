import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { UsersProvider } from "@/providers/UsersProvider";
import UsersList from "./UsersList";
import type { User } from "@/types/user.types";

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@localiza.com",
    cpf: "123.456.789-00",
    role: "admin",
    status: "active",
    department: "Engineering",
    createdAt: "2024-01-15",
    lastLogin: "2025-04-19",
  },
  {
    id: "2",
    name: "Bob Silva",
    email: "bob@localiza.com",
    cpf: "987.654.321-00",
    role: "operator",
    status: "inactive",
    department: "Operations",
    createdAt: "2024-03-10",
    lastLogin: "2025-03-01",
  },
  {
    id: "3",
    name: "Carol Santos",
    email: "carol@localiza.com",
    cpf: "456.123.789-00",
    role: "viewer",
    status: "pending",
    department: "Support",
    createdAt: "2025-01-20",
    lastLogin: "2025-04-10",
  },
];

function mockFetch(response: unknown) {
  const original = window.fetch;
  window.fetch = () =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response),
    } as Response);
  return () => {
    window.fetch = original;
  };
}

function withProviders(Story: () => ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <UsersProvider>
        <NuqsTestingAdapter>
          <Story />
        </NuqsTestingAdapter>
      </UsersProvider>
    </QueryClientProvider>
  );
}

const meta: Meta<typeof UsersList> = {
  title: "Components/UsersList",
  component: UsersList,
  decorators: [withProviders],
};

export default meta;

type Story = StoryObj<typeof UsersList>;

export const Default: Story = {
  name: "With users",
  beforeEach: () =>
    mockFetch({ data: MOCK_USERS, items: 3, pages: 3, next: null, last: 1 }),
};

export const WithPagination: Story = {
  name: "With pagination",
  beforeEach: () =>
    mockFetch({ data: MOCK_USERS, items: 50, pages: 50, next: 2, last: 5 }),
};

export const Empty: Story = {
  name: "Empty list",
  beforeEach: () =>
    mockFetch({ data: [], items: 0, pages: 0, next: null, last: 1 }),
};

export const Loading: Story = {
  name: "Loading",
  beforeEach: () => {
    const original = window.fetch;
    window.fetch = () => new Promise(() => {});
    return () => {
      window.fetch = original;
    };
  },
};

export const ServerError: Story = {
  name: "Server error",
  beforeEach: () => {
    const original = window.fetch;
    window.fetch = () => Promise.reject(new Error("Internal Server Error"));
    return () => {
      window.fetch = original;
    };
  },
};

export const ApiError: Story = {
  name: "API error (payload)",
  beforeEach: () => {
    const original = window.fetch;
    window.fetch = () =>
      Promise.resolve({
        ok: false,
        statusText: "Unauthorized",
      } as Response);
    return () => {
      window.fetch = original;
    };
  },
};
