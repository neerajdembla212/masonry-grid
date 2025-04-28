export const extractHeightFromPexelsUrl = (url: string): number | null => {
  const match = url.match(/[?&]h=(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

export const extractWidthFromPexelsUrl = (url: string): number | null => {
  const match = url.match(/[?&]w=(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

export const getMasonryColumnCount = (containerWidth: number): number => {
  if (containerWidth >= 1024) {
    return 3;
  }
  if (containerWidth >= 768) {
    return 2;
  }
  if (containerWidth >= 480) {
    return 1;
  }
  return 0;
};
