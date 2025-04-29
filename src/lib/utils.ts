export const getMasonryColumnCount = (containerWidth: number): number => {
  if (containerWidth >= 2048) {
    return 4;
  }
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
