// useResizeObserver.test.tsx

import { act, renderHook } from "@testing-library/react";
import { useResizeObserver } from "./useResizeObserver";
import { vi, describe, beforeAll, it, expect } from "vitest";

describe("useResizeObserver", () => {
  // Mock ResizeObserver
  beforeAll(() => {
    globalThis.ResizeObserver = class {
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
    };
  });

  it("should initialize width to 0", () => {
    const ref = {
      current: document.createElement("div"),
    } as React.RefObject<HTMLDivElement>;
    const { result } = renderHook(() => useResizeObserver(ref));

    expect(result.current).toStrictEqual({ width: 0, height: 0 });
  });

  it("should update width when ResizeObserver callback is triggered", () => {
    let resizeCallback: (entries: ResizeObserverEntry[]) => void = () => {};

    // Custom mock to capture the callback
    globalThis.ResizeObserver = class {
      observe = vi.fn();
      disconnect = vi.fn();
      constructor(callback: (entries: ResizeObserverEntry[]) => void) {
        resizeCallback = callback;
      }
    } as any;

    const ref = {
      current: document.createElement("div"),
    } as React.RefObject<HTMLDivElement>;
    const { result } = renderHook(() => useResizeObserver(ref));

    // Simulate ResizeObserver firing with a fake entry
    act(() => {
      resizeCallback([
        {
          contentRect: { width: 250, height: 300 },
        } as ResizeObserverEntry,
      ]);
    });

    expect(result.current).toStrictEqual({ width: 250, height: 300 });
  });
});
