import { styled } from "styled-components";
import { Photo, PositionedPhoto } from "../../types/photo";
import PhotoCard from "../photo-card/PhotoCard";
import { useEffect, useMemo, useRef, useState } from "react";
import { getMasonryColumnCount } from "../../lib/utils";
import { useResizeObserver } from "../../hooks/useResizeObserver";

interface MasonryGridProps {
  photos: Photo[];
  columnGap?: number;
}

export default function MasonryGrid({ photos }: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // calculate container width based on screen size
  const containerWidth = useResizeObserver<HTMLDivElement>(containerRef);
  const gridColumnCount = useMemo(() => {
    return getMasonryColumnCount(containerWidth);
  }, [containerWidth]);

  const positionedPhotos = useMemo(() => {
    if (gridColumnCount === 0) {
      return [];
    }
    const columnGap = 16; //px
    const containerInnerWidth =
      containerWidth - columnGap * (gridColumnCount - 1); // This is the width available for our columns
    const columnWidth = Math.floor(containerInnerWidth / gridColumnCount); // this column width will also be the render width of photos

    // Now we keep track of all column heights, initiating columns with 0 height
    let columnHeights = new Array<number>(gridColumnCount).fill(0);
    return photos.map((photo) => {
      // calculate top based on column heights
      // first we decide which column the photo will be placed in
      const selectedColumn = Math.min(...columnHeights); // we always select column with minimum height
      const selectedColumnIndex = columnHeights.indexOf(selectedColumn);
      const top = selectedColumn;

      const aspectRatio = photo.height / photo.width;
      const renderHeight = Math.floor(aspectRatio * columnWidth);

      // now we update the columnHeight using height of this photo
      columnHeights[selectedColumnIndex] += renderHeight;

      // now we calculate left for the photo based on column width
      const left = selectedColumnIndex * (columnWidth + columnGap);

      return {
        ...photo,
        top,
        left,
        renderHeight,
        renderWidth: columnWidth,
      } satisfies PositionedPhoto;
    });
  }, [gridColumnCount, photos]);
  // once container width is final the calculate top and left of each photo relative to the container

  return (
    <Gridwrapper ref={containerRef}>
      Width: {containerWidth}
      {positionedPhotos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </Gridwrapper>
  );
}

const Gridwrapper = styled.div`
  position: relative;
  width: 100%;
`;
