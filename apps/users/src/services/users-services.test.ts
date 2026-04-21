import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getUsers, ApiError } from "./users-services";

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

  it("throws ApiError when request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      statusText: "Unauthorized",
      status: 401,
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(getUsers(1, 10)).rejects.toThrow(ApiError);
    await expect(getUsers(1, 10)).rejects.toMatchObject({
      code: 401,
      message: "Unauthorized",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:5555/users?&_page=1&_per_page=10",
    );
  });
});
