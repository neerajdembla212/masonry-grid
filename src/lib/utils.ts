export const getMasonryColumnCount = (containerWidth: number): number => {
  if (!containerWidth) {
    return 0;
  }
  const increaseColBreakpointDelta = 300; // after every 400 px increase in screen width increment col by 1
  const cols = Math.floor(containerWidth / increaseColBreakpointDelta);
  return Math.max(cols, 2); // keeping minimum column count as 2
};

export const buildImageUrl = (
  src: string,
  height: number,
  width: number
): string => {
  return `${src}?auto=compress&cs=tinysrgb&h=${height}&w=${width}`;
};

export const extractSizeFromPexelsUrl = (
  url: string
): { width: number | undefined; height: number | undefined } => {
  const heightMatch = url.match(/[?&]h=(\d+)/);
  const widthMatch = url.match(/[?&]w=(\d+)/);

  return {
    height: heightMatch ? parseInt(heightMatch[1], 10) : undefined,
    width: widthMatch ? parseInt(widthMatch[1], 10) : undefined,
  };
};

// preload utility
export const preloadGallery = () => import("../pages/Gallery");
export const preloadDetail = () => import("../pages/Detail");