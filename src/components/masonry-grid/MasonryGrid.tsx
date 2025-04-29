import { styled } from "styled-components";
import { Photo, PositionedPhoto } from "../../types/photo";
import PhotoCard from "../photo-card/PhotoCard";
import { useCallback, useMemo, useRef, useState, useLayoutEffect } from "react";
import { getMasonryColumnCount } from "../../lib/utils";
import { useResizeObserver } from "../../hooks/useResizeObserver";

interface MasonryGridProps {
  photos: Photo[];
  columnGap?: number;
}

export default function MasonryGrid({ photos }: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewPortHeight] = useState(0);
  const isTicking = useRef(false);

  // calculate container width based on screen size
  const containerWidth = useResizeObserver<HTMLDivElement>(containerRef);

  const gridColumnCount = useMemo(() => {
    return getMasonryColumnCount(containerWidth);
  }, [containerWidth]);
  
  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      setViewPortHeight(scrollContainerRef.current.clientHeight);
    }
  });

  // once container width is final the calculate top and left of each photo relative to the container
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
    const buffer = Math.floor(0.1 * containerWidth); //px
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
  }, [gridColumnCount, photos, viewportHeight, scrollTop]);

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

  return (
    <GridScrollWrapper ref={scrollContainerRef} onScroll={handleScroll}>
      <Gridwrapper ref={containerRef} style={{ height: totalHeight }}>
        Width: {containerWidth}
        {positionedPhotos.map((photo) => (
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
