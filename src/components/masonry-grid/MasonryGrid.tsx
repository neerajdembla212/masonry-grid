import { styled } from "styled-components";
import { Photo } from "../../types/photo";
import PhotoCard from "../photo-card/PhotoCard";
import {
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { getMasonryColumnCount } from "../../lib/utils";
import { useResizeObserver } from "../../hooks/useResizeObserver";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle";
import { PHOTO_VISIBLE_RATIO } from "../../config/config";
import { useCalculateMasonryGridLayout } from "../../hooks/useCalculateMasonryGridLayout";
import { SkeletonCard } from "../skeleton-card/SkeletonCard";
import { useLatest } from "../../hooks/useLatest";

interface MasonryGridProps {
  photos: Photo[];
  onReachEnd?: () => void;
  gutter?: number;
}

export default function MasonryGrid({
  photos,
  onReachEnd,
  gutter = 16,
}: MasonryGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewPortHeight] = useState(0);
  const prevScrollTopRef = useRef(0);
  const scrollTopRef = useRef(0);
  const viewportHeightRef = useRef(0);

  // calculate container width based on screen size
  const { width: containerWidth } =
    useResizeObserver<HTMLDivElement>(scrollContainerRef);

  // decide on number of columns to render based on containerWidth
  const gridColumnCount = useMemo(() => {
    return getMasonryColumnCount(containerWidth);
  }, [containerWidth]);

  // setViewport height correctly before browser paint
  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      setViewPortHeight(scrollContainerRef.current.clientHeight);
    }
  });

  // once container width, column number is final the calculate top and left of each photo relative to the container and keep track of each column height progressively
  const { positionedElements: allPositionedPhotos, totalHeight } =
    useCalculateMasonryGridLayout<Photo>({
      containerWidth,
      columnCount: gridColumnCount,
      gutter,
      elements: photos,
    });

  // once we have calculations for all photos in positioned photos, we decide the virtual rendering window based on these calculations

  const visiblePhotos = useMemo(() => {
    if (!viewportHeight || !allPositionedPhotos.length) return [];

    const buffer = Math.max(viewportHeight, 1000);
    const visibleStart = scrollTopRef.current - buffer;
    const visibleEnd = scrollTopRef.current + viewportHeight + buffer;

    return allPositionedPhotos.filter((photo) => {
      const allowedPhotoHeightInWindow = Math.floor(
        PHOTO_VISIBLE_RATIO * photo.renderHeight
      );
      const photoOffsetInWindow = photo.top + allowedPhotoHeightInWindow;

      return (
        photoOffsetInWindow >= visibleStart && photoOffsetInWindow <= visibleEnd
      );
    });
  }, [allPositionedPhotos.length, scrollTop, viewportHeight]);

  const updateScrollState = useMemo(
    () =>
      throttle(() => {
        setScrollTop(scrollTopRef.current);
        setViewPortHeight(viewportHeightRef.current);
      }, 100),
    []
  );

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const scrollElement = event.currentTarget;
      scrollTopRef.current = scrollElement.scrollTop;
      viewportHeightRef.current = scrollElement.clientHeight;
      updateScrollState();
    },
    [updateScrollState]
  );

  // Until now the virtual rendering, re-calculation on scroll is ready, now we detect onReachEnd during scroll and fetch more photos
  const latestOnReachEnd = useLatest(onReachEnd);

  const debouncedOnReachEnd = useMemo(() => {
    return debounce(
      () => {
        latestOnReachEnd.current?.();
      },
      300,
      { leading: true, trailing: false }
    );
  }, []);

  // detect id user scroll is near bottom
  useEffect(() => {
    if (!viewportHeightRef.current || !totalHeight) {
      return;
    }
    const scrollBottom = scrollTopRef.current + viewportHeightRef.current;
    const threshold = Math.floor(0.3 * viewportHeightRef.current);

    const prevScrollTop = prevScrollTopRef.current;

    const isScrollingDown = scrollTopRef.current > prevScrollTop;

    const nearBottom = scrollBottom + threshold >= totalHeight;

    prevScrollTopRef.current = scrollTopRef.current;

    if (isScrollingDown && nearBottom) {
      debouncedOnReachEnd?.();
    }
  }, [scrollTop, viewportHeight, totalHeight, debouncedOnReachEnd]);

  return (
    <GridScrollWrapper ref={scrollContainerRef} onScroll={handleScroll}>
      <Gridwrapper
        style={{ height: totalHeight || "100vh", minHeight: "100vh" }}
      >
        {totalHeight === 0 &&
          [...new Array(10)].map((_, i) => (
            <SkeletonCard
              key={`skeleton-${i}`}
              width={250}
              height={200 + i * 10}
            />
          ))}
        {visiblePhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </Gridwrapper>
    </GridScrollWrapper>
  );
}

const Gridwrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 80vh;
`;
const GridScrollWrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
`;
