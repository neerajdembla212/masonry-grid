import { RefObject, useEffect } from "react";

export function useIntersectionObserver<T extends HTMLElement>(
  callbackFn: () => void,
  targetRef: RefObject<T | null>,
  options?: {
    rootRef?: RefObject<HTMLElement | null>;
    rootMargin?: number | string;
  }
) {
  const { rootRef = null, rootMargin = 0 } = options ?? {};
  useEffect(() => {
    if (!targetRef.current) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            callbackFn();
          }
        }
      },
      {
        root: rootRef?.current ?? null,
        rootMargin:
          typeof rootMargin === "number" ? `${rootMargin}px` : rootMargin,
      }
    );

    observer.observe(targetRef.current);
    return () => {
      observer.disconnect();
    };
  }, [targetRef, rootRef, callbackFn]);
}
