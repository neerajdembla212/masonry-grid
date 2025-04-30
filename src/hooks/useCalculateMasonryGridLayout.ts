import { useEffect, useMemo, useRef } from "react";
import { LayoutAttributes } from "../types/layout-attributes";
import { MasonryElement } from "../types/masonry-element";

export function useCalculateMasonryGridLayout<
  T extends MasonryElement
>(options: {
  containerWidth: number;
  elements: T[];
  gutter: number;
  columnCount: number;
}) {
  const layoutCache = useRef<Map<string, T & LayoutAttributes>>(new Map());

  const { containerWidth, elements, gutter, columnCount } = options;

  useEffect(() => {
    layoutCache.current.clear();
  }, [containerWidth, columnCount]);

  return useMemo(() => {
    if (columnCount === 0) {
      return {
        positionedElements: [],
        totalHeight: 0,
      };
    }

    // initialising variables
    const containerInnerWidth = containerWidth - gutter * (columnCount - 1); // This is the width available for our columns
    const columnWidth = Math.floor(containerInnerWidth / columnCount); // This column width will also be the render width of photos
    let columnHeights = new Array<number>(columnCount).fill(0); // To keep track of all column heights, initiating columns with 0 height
    let shortestColumnIndex = 0;
    const positionedElements: (T & LayoutAttributes)[] = [];

    for (const element of elements) {
      // skip calculation if cache hit
      if (layoutCache.current.has(element.id)) {
        const cachedPositionedPhoto = layoutCache.current.get(element.id);
        if (cachedPositionedPhoto) {
          positionedElements.push(cachedPositionedPhoto);
          // calculate the column this photo belong to
          const columnIndex = Math.floor(
            cachedPositionedPhoto.left / (columnWidth + gutter)
          );
          columnHeights[columnIndex] = Math.max(
            columnHeights[columnIndex],
            cachedPositionedPhoto.top +
              cachedPositionedPhoto.renderHeight +
              gutter
          );
        }
        continue;
      }
      // calculate top based on column heights
      // first we decide which column the photo will be placed in
      const top = columnHeights[shortestColumnIndex];

      const aspectRatio = element.height / element.width;
      const renderHeight = Math.floor(aspectRatio * columnWidth); // calculating height of photo by maintaining the aspect ratio

      // now we update the columnHeight using height of this photo
      columnHeights[shortestColumnIndex] += renderHeight + gutter;

      // now we calculate left for the photo based on column width
      const left = shortestColumnIndex * (columnWidth + gutter);

      // we also update the shortest column based on latest column heights
      shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

      // now we build the url to render based on height and width we calculated
      const renderSrc = `${element.src}?auto=compress&cs=tinysrgb&h=${renderHeight}&w=${columnWidth}`;
      const positionedPhoto: T & LayoutAttributes = {
        ...element,
        top,
        left,
        renderHeight,
        renderWidth: columnWidth,
        renderSrc,
      };
      positionedElements.push(positionedPhoto);
      // cache the calculations for future use
      layoutCache.current.set(element.id, positionedPhoto);
    }
    const totalHeight = Math.max(...columnHeights);
    return {
      positionedElements,
      totalHeight,
    };
  }, [containerWidth, elements, columnCount]);
}
