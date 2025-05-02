import { describe, it, expect, beforeEach } from "vitest";
import { useCalculateMasonryGridLayout } from "./useCalculateMasonryGridLayout";
import { renderHook } from "@testing-library/react";
import { Photo } from "../types/photo";
import { mockPhotos } from "../__mocks__/photos.mock";

describe("useCalculateMasonryGridLayout", () => {
  let photos: Photo[];
  let containerWidth: number;
  let columnCount: number;
  let gutter: number;

  beforeEach(() => {
    containerWidth = 1000;
    columnCount = 3;
    gutter = 16;
    mockPhotos
    photos = mockPhotos;
  });

  it("Calculates positioned photos correctly", () => {
    const { result } = renderHook(() =>
      useCalculateMasonryGridLayout<Photo>({
        elements: photos,
        containerWidth,
        columnCount,
        gutter,
      })
    );
    expect(result.current.positionedElements.length).toBe(2);
    result.current.positionedElements.forEach((element) => {
      expect(element.top).toBeTypeOf("number");
      expect(element.left).toBeTypeOf("number");
      expect(element.renderHeight).toBeGreaterThan(0);
      expect(element.renderWidth).toBeGreaterThan(0);
    });
    expect(result.current.totalHeight).toBeGreaterThan(0);
  });

  it("Returns empty array for columnCount 0", () => {
    const { result } = renderHook(() =>
      useCalculateMasonryGridLayout({
        elements: photos,
        containerWidth,
        columnCount: 0,
        gutter,
      })
    );
    expect(result.current.positionedElements).toEqual([]);
    expect(result.current.totalHeight).toBe(0);
  });
});
