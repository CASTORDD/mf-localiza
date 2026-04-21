import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import Filters from "./filters";

function withNuqs(searchParams?: Record<string, string>) {
  return (Story: () => ReactNode) => (
    <NuqsTestingAdapter searchParams={searchParams}>
      <Story />
    </NuqsTestingAdapter>
  );
}

const meta: Meta<typeof Filters> = {
  title: "Components/Filters",
  component: Filters,
  decorators: [withNuqs()],
};

export default meta;

type Story = StoryObj<typeof Filters>;

export const Default: Story = {
  name: "Empty (no filters)",
};

export const WithName: Story = {
  name: "With name filter",
  decorators: [withNuqs({ "name:contains": "Alice" })],
};

export const WithEmail: Story = {
  name: "With email filter",
  decorators: [withNuqs({ "email:contains": "alice@example.com" })],
};

export const WithRole: Story = {
  name: "With role filter (admin)",
  decorators: [withNuqs({ "role:eq": "admin" })],
};

export const WithStatus: Story = {
  name: "With status filter (active)",
  decorators: [withNuqs({ "status:eq": "active" })],
};

export const AllFilters: Story = {
  name: "All filters applied",
  decorators: [
    withNuqs({
      "name:contains": "Alice",
      "email:contains": "alice@example.com",
      "role:eq": "admin",
      "status:eq": "active",
    }),
  ],
};
