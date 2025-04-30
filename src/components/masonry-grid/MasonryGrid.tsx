import { styled } from "styled-components";
import { Photo } from "../../types/photo";
import PhotoCard from "../photo-card/PhotoCard";
import {
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { getMasonryColumnCount } from "../../lib/utils";
import { useResizeObserver } from "../../hooks/useResizeObserver";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle";
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
  const prevScrollTopRef = useRef(0);

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
    const buffer = Math.floor(0.3 * viewportHeight);
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

  const handleScroll = useMemo(
    () =>
      throttle((event: React.UIEvent<HTMLDivElement>) => {
        const scrollElement = event.currentTarget;
        setScrollTop(scrollElement.scrollTop);
        setViewPortHeight(scrollElement.clientHeight);
      }, 50),
    []
  );

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

  // detect bottom and top reached
  useEffect(() => {
    if (!viewportHeight || !totalHeight) {
      return;
    }
    const scrollBottom = scrollTop + viewportHeight;
    const threshold = Math.floor(0.3 * viewportHeight);

    const prevScrollTop = prevScrollTopRef.current;

    const isScrollingDown = scrollTop > prevScrollTop;
    const isScrollingUp = scrollTop < prevScrollTop;

    const nearBottom = scrollBottom + threshold >= totalHeight;
    const nearTop = scrollTop < threshold;

    prevScrollTopRef.current = scrollTop;

    if (isScrollingDown && nearBottom) {
      debouncedOnReachEnd?.();
    }
    if (isScrollingUp && nearTop) {
      debouncedOnReachStart?.();
    }
  }, [
    scrollTop,
    viewportHeight,
    totalHeight,
    debouncedOnReachEnd,
    debouncedOnReachStart,
  ]);

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
      <Gridwrapper ref={containerRef} style={{ height: totalHeight }}>
        <ScrollTop
          style={{
            top: scrollTop,
          }}
        />
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
`;
const GridScrollWrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
`;

const ScrollTop = styled.div`
  height: 1px;
  width: 100%;
  border: 1px solid;
  position: fixed;
  z-index: 10;
`;
