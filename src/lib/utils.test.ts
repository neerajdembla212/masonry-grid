import { describe, it, expect } from "vitest";
import { getMasonryColumnCount } from "./utils";

describe("getMasonryColumnCount", () => {
  it.each([
    [0, 0],
    [479, 2],
    [480, 2],
    [767, 2],
    [768, 2],
    [1023, 3],
    [1024, 3],
    [2047, 6],
    [2048, 6],
    [3000, 10],
  ])("returns %i columns for container width %i", (width, expected) => {
    expect(getMasonryColumnCount(width)).toBe(expected);
  });
});
