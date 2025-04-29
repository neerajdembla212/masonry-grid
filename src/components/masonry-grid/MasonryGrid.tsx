import { styled } from "styled-components";
import { Photo, PositionedPhoto } from "../../types/photo";
import PhotoCard from "../photo-card/PhotoCard";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { getMasonryColumnCount } from "../../lib/utils";
import { useResizeObserver } from "../../hooks/useResizeObserver";
import { debounce } from "lodash";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { PHOTO_VISIBLE_RATIO } from "../../config/config";

interface MasonryGridProps {
  photos: Photo[];
  onReachEnd?: () => void;
  onReachStart?: () => void;
}

export default function MasonryGrid({
  photos,
  onReachEnd,
  onReachStart,
}: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewPortHeight] = useState(0);
  const isTicking = useRef(false);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);

  // calculate container width based on screen size
  const { width: containerWidth, height: containerHeight } =
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
  const { positionedPhotos, totalHeight } = useMemo(() => {
    if (gridColumnCount === 0) {
      return {
        positionedPhotos: [],
        totalHeight: 0,
      };
    }
    // initialising variables
    const columnGap = 16; //px
    const rowGap = 16; //px
    const buffer = Math.floor(0.1 * containerHeight); //px
    const containerInnerWidth =
      containerWidth - columnGap * (gridColumnCount - 1); // This is the width available for our columns
    const columnWidth = Math.floor(containerInnerWidth / gridColumnCount); // This column width will also be the render width of photos
    const virtualWindowTop = scrollTop - buffer;
    const virtualWindowBottom = scrollTop + viewportHeight + buffer;
    let columnHeights = new Array<number>(gridColumnCount).fill(0); // To keep track of all column heights, initiating columns with 0 height
    let shortestColumnIndex = 0;
    const positionedPhotos: PositionedPhoto[] = [];

    for (const photo of photos) {
      // calculate top based on column heights
      // first we decide which column the photo will be placed in
      const top = columnHeights[shortestColumnIndex];

      const aspectRatio = photo.height / photo.width;
      const renderHeight = Math.floor(aspectRatio * columnWidth);

      // now we update the columnHeight using height of this photo
      columnHeights[shortestColumnIndex] += renderHeight + rowGap;

      // now we calculate left for the photo based on column width
      const left = shortestColumnIndex * (columnWidth + columnGap);

      // we also update the shortest column based on latest column heights
      shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

      // now we build the url to render based on height and width we calculated
      const renderSrc = `${photo.src}?auto=compress&cs=tinysrgb&h=${renderHeight}&w=${columnWidth}`;

      // we decide if the photo is in the viewport for rendering
      const photoBottomOffset = top + renderHeight; // offset of photo bottom relative to the container
      const photoTopOffset = top; // offset of photo top relative to the container

      if (
        photoBottomOffset >= virtualWindowTop &&
        photoTopOffset <= virtualWindowBottom
      ) {
        positionedPhotos.push({
          ...photo,
          top,
          left,
          renderHeight,
          renderWidth: columnWidth,
          renderSrc,
        });
      }
    }
    const totalHeight = Math.max(...columnHeights);
    return {
      positionedPhotos,
      totalHeight,
    };
  }, [gridColumnCount, photos, viewportHeight, containerWidth, containerHeight]);

  // once we have calculations for all photos in positioned photos, we decide the virtual rendering window based on these calculations

  const visiblePhotos = useMemo(() => {
    const buffer = Math.floor(0.1 * viewportHeight);
    const visibleStart = scrollTop - buffer;
    const visibleEnd = scrollTop + viewportHeight + buffer;

    return positionedPhotos.filter((photo) => {
      const allowedPhotoHeightInWindow = Math.floor(PHOTO_VISIBLE_RATIO * photo.renderHeight);
      const photoOffsetInWindow = photo.top + allowedPhotoHeightInWindow;

      return  photoOffsetInWindow >= visibleStart && photoOffsetInWindow <= visibleEnd;
    });
  }, [positionedPhotos, scrollTop, viewportHeight]);

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
