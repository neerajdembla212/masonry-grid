import { renderHook, act } from "@testing-library/react";
import { useWindowSize } from "./useWindowSize";
import { describe, afterEach, it, expect } from "vitest";

describe("useWindowSize", () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  afterEach(() => {
    // Reset after each test
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
    window.dispatchEvent(new Event("resize"));
  });

  it("should return the initial window size", () => {
    window.innerWidth = 1024;
    window.innerHeight = 768;

    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toEqual({ width: 1024, height: 768 });
  });

  it("should update size on window resize", () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      window.innerWidth = 1440;
      window.innerHeight = 900;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({ width: 1440, height: 900 });
  });
});
