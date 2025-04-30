import { Photo, PositionedPhoto } from "../types/photo";

export const getMasonryColumnCount = (containerWidth: number): number => {
  if (!containerWidth) {
    return 0;
  }
  const increaseColBreakpointDelta = 250; // after every 250 px increase in screen width increment col by 1
  const cols = Math.floor(containerWidth / increaseColBreakpointDelta);
  return Math.max(cols, 2); // keeping minimul column count as 2
};
