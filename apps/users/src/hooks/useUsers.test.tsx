import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UsersContext } from "@/context/users-context";
import useUsers from "./useUsers";

describe("useUsers", () => {
  it("throws when used without provider", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    expect(() => renderHook(() => useUsers())).toThrow(
      "useUsers must be used within UsersProvider",
    );

    consoleErrorSpy.mockRestore();
  });

  it("returns context value when provider is present", () => {
    const contextValue = {
      userId: null,
      setUserId: vi.fn(),
      usersResponse: null,
      setUsersResponse: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <UsersContext.Provider value={contextValue}>
        {children}
      </UsersContext.Provider>
    );

    const { result } = renderHook(() => useUsers(), { wrapper });

    expect(result.current).toBe(contextValue);
  });
});
