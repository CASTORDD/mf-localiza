import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePagination } from "./usepagination";

const mockedNuqs = vi.hoisted(() => ({
  setPage: vi.fn(),
  setPer: vi.fn(),
}));

vi.mock("nuqs", () => ({
  parseAsInteger: {
    withDefault: (value: number) => value,
  },
  useQueryState: (key: string) => {
    if (key === "_page") {
      return [2, mockedNuqs.setPage];
    }

    return [10, mockedNuqs.setPer];
  },
}));

describe("usePagination", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns query params and setters", () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.page).toBe(2);
    expect(result.current.per).toBe(10);
    expect(result.current.setPage).toBe(mockedNuqs.setPage);
    expect(result.current.setPer).toBe(mockedNuqs.setPer);
  });

  it("increments page on goToNext", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.goToNext();
    });

    expect(mockedNuqs.setPage).toHaveBeenCalledTimes(1);
    const updater = mockedNuqs.setPage.mock.calls[0][0] as (page: number) => number;
    expect(updater(2)).toBe(3);
  });

  it("decrements page with minimum bound at 1 on goToPrev", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.goToPrev();
    });

    expect(mockedNuqs.setPage).toHaveBeenCalledTimes(1);
    const updater = mockedNuqs.setPage.mock.calls[0][0] as (page: number) => number;
    expect(updater(5)).toBe(4);
    expect(updater(1)).toBe(1);
  });
});
