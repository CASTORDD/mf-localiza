import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import Pagination from "./pagination";
import { UsersContext } from "@/context/users-context";

type MockUsersResponse = {
  data: never[];
  items: number;
  pages: number;
  next?: number | null;
  last?: number;
};

function withContext(
  usersResponse: MockUsersResponse,
  searchParams?: Record<string, string>,
) {
  return (Story: () => ReactNode) => (
    <UsersContext.Provider
      value={{
        usersResponse,
        setUsersResponse: () => {},
        userId: null,
        setUserId: () => {},
      }}
    >
      <NuqsTestingAdapter searchParams={searchParams}>
        <Story />
      </NuqsTestingAdapter>
    </UsersContext.Provider>
  );
}

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const FirstPage: Story = {
  name: "First Page",
  decorators: [
    withContext(
      { data: [], items: 100, pages: 100, next: 2, last: 10 },
      { _page: "1", _per_page: "10" },
    ),
  ],
};

export const MiddlePage: Story = {
  name: "Middle Page",
  decorators: [
    withContext(
      { data: [], items: 100, pages: 100, next: 5, last: 10 },
      { _page: "4", _per_page: "10" },
    ),
  ],
};

export const LastPage: Story = {
  name: "Last Page",
  decorators: [
    withContext(
      { data: [], items: 100, pages: 100, next: null, last: 10 },
      { _page: "10", _per_page: "10" },
    ),
  ],
};

export const FewPages: Story = {
  name: "Few Pages (3 total)",
  decorators: [
    withContext(
      { data: [], items: 30, pages: 30, next: 2, last: 3 },
      { _page: "1", _per_page: "10" },
    ),
  ],
};

export const Hidden: Story = {
  name: "Hidden (single page)",
  decorators: [
    withContext(
      { data: [], items: 5, pages: 5, next: null, last: 1 },
      { _page: "1", _per_page: "10" },
    ),
  ],
};
