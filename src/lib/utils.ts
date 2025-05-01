export const getMasonryColumnCount = (containerWidth: number): number => {
  if (!containerWidth) {
    return 0;
  }
  const increaseColBreakpointDelta = 300; // after every 400 px increase in screen width increment col by 1
  const cols = Math.floor(containerWidth / increaseColBreakpointDelta);
  return Math.max(cols, 2); // keeping minimum column count as 2
};
