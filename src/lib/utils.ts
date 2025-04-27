export const extractHeightFromPexelsUrl = (url: string): number | null => {
  const match = url.match(/[?&]h=(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

export const extractWidthFromPexelsUrl = (url: string): number | null => {
  const match = url.match(/[?&]w=(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};
