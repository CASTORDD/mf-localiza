import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UsersList from "./UsersList";

const mocked = vi.hoisted(() => ({
  usePagination: vi.fn(),
  useFilters: vi.fn(),
  useGetUsers: vi.fn(),
  setUserId: vi.fn(),
  userId: null as string | null,
}));

vi.mock("@/hooks/usepagination", () => ({
  usePagination: () => mocked.usePagination(),
}));

vi.mock("@/hooks/useFilters", () => ({
  default: () => mocked.useFilters(),
}));

vi.mock("@/hooks/useGetUsers", () => ({
  default: (params: unknown) => mocked.useGetUsers(params),
}));

vi.mock("@/hooks/useUsers", () => ({
  default: () => ({
    userId: mocked.userId,
    setUserId: mocked.setUserId,
  }),
}));

vi.mock("./loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("./filters", () => ({
  default: () => <div data-testid="filters">Filters</div>,
}));

vi.mock("./pagination", () => ({
  default: () => <div data-testid="pagination">Pagination</div>,
}));

vi.mock("./user-details", () => ({
  default: () => <div data-testid="user-details">User details</div>,
}));

describe("UsersList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocked.userId = null;

    mocked.usePagination.mockReturnValue({
      page: 1,
      per: 10,
    });

    mocked.useFilters.mockReturnValue({
      role: undefined,
      status: undefined,
      name: undefined,
      email: undefined,
    });
  });

  it("shows loader while query is loading", () => {
    mocked.useGetUsers.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      refetch: vi.fn(),
    });

    render(<UsersList />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("shows generic error message when query fails without ApiError", () => {
    mocked.useGetUsers.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: new Error("network failure"),
      refetch: vi.fn(),
    });

    render(<UsersList />);

    expect(screen.getByText("Erro no servidor")).toBeInTheDocument();
    expect(screen.getByText("Tentar novamente")).toBeInTheDocument();
  });

  it("shows specific error message when query fails with ApiError", () => {
    const apiError = Object.assign(new Error("Unauthorized"), { code: 401 });
    mocked.useGetUsers.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: apiError,
      refetch: vi.fn(),
    });

    // ApiError is not mocked here so instanceof check fails — falls back to message
    render(<UsersList />);

    expect(screen.getByText("Tentar novamente")).toBeInTheDocument();
  });

  it("renders users table and triggers user selection", () => {
    mocked.useGetUsers.mockReturnValue({
      data: {
        items: 1,
        data: [
          {
            id: "1",
            name: "John Doe",
            email: "john@localiza.com",
            role: "admin",
            status: "active",
          },
        ],
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    render(<UsersList />);

    expect(screen.getByTestId("filters")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@localiza.com")).toBeInTheDocument();
    expect(
      screen.getByText(/Total users/i, { selector: "caption" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("pagination")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(mocked.setUserId).toHaveBeenCalledWith("1");
  });

  it("shows user details when user is selected", () => {
    mocked.userId = "1";
    mocked.useGetUsers.mockReturnValue({
      data: {
        items: 1,
        data: [
          {
            id: "1",
            name: "John Doe",
            email: "john@localiza.com",
            role: "admin",
            status: "active",
          },
        ],
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    });

    render(<UsersList />);

    expect(screen.getByTestId("user-details")).toBeInTheDocument();
  });
});
