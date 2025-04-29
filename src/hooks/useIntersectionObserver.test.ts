import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from './useIntersectionObserver';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';

describe('useIntersectionObserver', () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let triggerIntersect: (isIntersecting: boolean) => void;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();

    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: IntersectionObserverCallback) {
        triggerIntersect = (isIntersecting: boolean) => {
          callback([
            {
              isIntersecting,
              target: document.createElement('div'),
              intersectionRatio: 1,
              time: 0,
              boundingClientRect: {} as DOMRectReadOnly,
              intersectionRect: {} as DOMRectReadOnly,
              rootBounds: null,
            }
          ], {} as IntersectionObserver);
        };
      }
      observe = observeMock;
      disconnect = disconnectMock;
    } as any);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should call the callback when the target is intersecting', () => {
    const callback = vi.fn();
    const ref = { current: document.createElement('div') } as React.RefObject<HTMLDivElement>;

    renderHook(() => useIntersectionObserver(callback, ref));

    triggerIntersect(true);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(observeMock).toHaveBeenCalledTimes(1);
  });

  it('should NOT call the callback if not intersecting', () => {
    const callback = vi.fn();
    const ref = { current: document.createElement('div') } as React.RefObject<HTMLDivElement>;

    renderHook(() => useIntersectionObserver(callback, ref));

    triggerIntersect(false);

    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should disconnect the observer on unmount', () => {
    const callback = vi.fn();
    const ref = { current: document.createElement('div') } as React.RefObject<HTMLDivElement>;

    const { unmount } = renderHook(() => useIntersectionObserver(callback, ref));

    unmount();

    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
