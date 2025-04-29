import { describe, it, expect } from "vitest";
import { getMasonryColumnCount } from "./utils";

describe("getMasonryColumnCount", () => {
  it.each([
    [0, 0],
    [479, 0],
    [480, 1],
    [767, 1],
    [768, 2],
    [1023, 2],
    [1024, 3],
    [2047, 3],
    [2048, 4],
    [3000, 4],
  ])("returns %i columns for container width %i", (width, expected) => {
    expect(getMasonryColumnCount(width)).toBe(expected);
  });
});
