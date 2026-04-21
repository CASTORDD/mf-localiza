import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useGetUsers from "./useGetUsers";

const mocked = vi.hoisted(() => ({
  useQuery: vi.fn(),
  setUsersResponse: vi.fn(),
  getUsers: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: mocked.useQuery,
}));

vi.mock("./useUsers", () => ({
  default: () => ({
    setUsersResponse: mocked.setUsersResponse,
  }),
}));

vi.mock("@/services/users-services", () => ({
  getUsers: mocked.getUsers,
  ApiError: class ApiError extends Error {
    code: number;
    constructor(code: number, message: string) {
      super(message);
      this.code = code;
    }
  },
}));

describe("useGetUsers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("configures query with expected key and query function", async () => {
    mocked.useQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    renderHook(() =>
      useGetUsers({
        page: 3,
        per: 25,
        role: "admin",
        status: "active",
        name: "john",
        email: "john@mail.com",
      }),
    );

    expect(mocked.useQuery).toHaveBeenCalledTimes(1);
    const queryOptions = mocked.useQuery.mock.calls[0][0];
    expect(queryOptions.queryKey).toEqual([
      "USER_LIST",
      3,
      25,
      "admin",
      "active",
      "john",
      "john@mail.com",
    ]);

    mocked.getUsers.mockResolvedValue({ data: [], items: 0 });
    await queryOptions.queryFn();

    expect(mocked.getUsers).toHaveBeenCalledWith(
      3,
      25,
      "admin",
      "active",
      "john",
      "john@mail.com",
    );
  });

  it("stores response in users context when query returns valid payload", () => {
    const response = { data: [{ id: "1" }], items: 1 };

    mocked.useQuery.mockReturnValue({
      data: response,
      isLoading: false,
      isError: false,
    });

    renderHook(() => useGetUsers({ page: 1, per: 10 }));

    expect(mocked.setUsersResponse).toHaveBeenCalledWith(response);
  });

  it("clears users response when query fails", () => {
    mocked.useQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    renderHook(() => useGetUsers({ page: 1, per: 10 }));

    expect(mocked.setUsersResponse).toHaveBeenCalledWith(null);
  });

  it("clears context and is idempotent when data and isError are both falsy", () => {
    mocked.useQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    renderHook(() => useGetUsers({ page: 1, per: 10 }));

    expect(mocked.setUsersResponse).not.toHaveBeenCalled();
  });
});
