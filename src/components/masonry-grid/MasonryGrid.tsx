import { styled } from "styled-components";
import { Photo, PositionedPhoto } from "../../types/photo";
import PhotoCard from "../photo-card/PhotoCard";
import { useCallback, useMemo, useRef, useState, useLayoutEffect } from "react";
import { getMasonryColumnCount } from "../../lib/utils";
import { useResizeObserver } from "../../hooks/useResizeObserver";
import { debounce } from "lodash";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { PHOTO_VISIBLE_RATIO } from "../../config/config";
import { useCalculateMasonryGridLayout } from "../../hooks/useCalculateMasonryGridLayout";

interface MasonryGridProps {
  photos: Photo[];
  onReachEnd?: () => void;
  onReachStart?: () => void;
  gutter?: number;
}

export default function MasonryGrid({
  photos,
  onReachEnd,
  onReachStart,
  gutter = 16,
}: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewPortHeight] = useState(0);
  const isTicking = useRef(false);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);

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
    const buffer = Math.floor(0.1 * viewportHeight);
    const visibleStart = scrollTop - buffer;
    const visibleEnd = scrollTop + viewportHeight + buffer;

    return allPositionedPhotos.filter((photo) => {
      const allowedPhotoHeightInWindow = Math.floor(
        PHOTO_VISIBLE_RATIO * photo.renderHeight
      );
      const photoOffsetInWindow = photo.top + allowedPhotoHeightInWindow;

      return (
        photoOffsetInWindow >= visibleStart && photoOffsetInWindow <= visibleEnd
      );
    });
  }, [allPositionedPhotos, scrollTop, viewportHeight]);

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const scrollElement = event.currentTarget;

    if (!isTicking.current) {
      isTicking.current = true;
      requestAnimationFrame(() => {
        setScrollTop(scrollElement.scrollTop);
        setViewPortHeight(scrollElement.clientHeight);
        isTicking.current = false;
      });
    }
  }, []);

  // Until now the virtual rendering, re-calculation on scroll is ready, now we detect onReachEnd during scroll and fetch more photos
  const debouncedOnReachEnd = useRef(
    debounce(() => {
      onReachEnd?.();
    }, 300)
  ).current;

  const debouncedOnReachStart = useRef(
    debounce(() => {
      onReachStart?.();
    }, 300)
  ).current;

  useIntersectionObserver<HTMLDivElement>(
    debouncedOnReachEnd,
    bottomSentinelRef,
    {
      rootRef: scrollContainerRef,
      rootMargin: "20%",
    }
  );

  useIntersectionObserver<HTMLDivElement>(
    debouncedOnReachStart,
    topSentinelRef,
    {
      rootRef: scrollContainerRef,
      rootMargin: "20%",
    }
  );

  return (
    <GridScrollWrapper ref={scrollContainerRef} onScroll={handleScroll}>
      <div style={{ position: "fixed", zIndex: 10, color: "red" }}>
        viewportHeight: {viewportHeight} , gridColumnCount: {gridColumnCount} ,
        scrollTop: {scrollTop} , containerHeight: {containerWidth} ,
        containerWidth: {containerWidth} , totalHeight: {totalHeight} ,
        bottomThreshold: {0.2 * containerWidth}, topThreshold:
        {0.2 * containerWidth}, scrollBottomOffset:
        {scrollTop + viewportHeight}
      </div>
      <Sentinel ref={topSentinelRef} />
      <Gridwrapper ref={containerRef} style={{ height: totalHeight }}>
        {visiblePhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </Gridwrapper>
      <Sentinel ref={bottomSentinelRef} />
    </GridScrollWrapper>
  );
}

const Gridwrapper = styled.div`
  position: relative;
  width: 100%;
`;
const GridScrollWrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
`;

const Sentinel = styled.div`
  height: 1px;
  width: 100%;
  border: 1px solid;
`;
