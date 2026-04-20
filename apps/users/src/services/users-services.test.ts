import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getUsers } from "./users-services";

describe("getUsers", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns users payload when request succeeds", async () => {
    const payload = { data: [{ id: "1" }], items: 1 };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await getUsers(2, 20, "admin", "active", "john", "mail");

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:5555/users?role:eq=admin&status:eq=active&name:contains=john&email:contains=mail&_page=2&_per_page=20",
    );
    expect(result).toEqual(payload);
  });

  it("returns normalized error payload when request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      statusText: "Unauthorized",
      status: 401,
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await getUsers(1, 10);

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:5555/users?&_page=1&_per_page=10",
    );
    expect(result).toEqual({
      data: null,
      error: "Unauthorized",
      code: 401,
    });
  });
});
