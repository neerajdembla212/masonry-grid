import { RefObject, useEffect, useState } from "react";

export function useResizeObserver<T extends HTMLElement>(
  ref: RefObject<T | null>
) {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);
  return size;
}
