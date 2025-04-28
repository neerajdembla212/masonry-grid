import { RefObject, useEffect, useState } from "react";

export function useResizeObserver<T extends HTMLElement>(
  ref: RefObject<T | null>
) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);
  return width;
}
