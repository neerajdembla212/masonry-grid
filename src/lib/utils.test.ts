import { describe, it, expect } from "vitest";
import { extractHeightFromPexelsUrl, extractWidthFromPexelsUrl } from "./utils";

describe("extractHeightFromPexelsUrl", () => {
  it("Should extract height from url correctly", () => {
    const url =
      "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg?h=400&w=600";
    const height = extractHeightFromPexelsUrl(url);
    expect(height).toBe(400);
  });

  it("Should return null if height parameter was missing", () => {
    const url =
      "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg?w=600";
    const height = extractHeightFromPexelsUrl(url);
    expect(height).toBe(null);
  });
});

describe("extractWidthFromPexelsUrl", () => {
  it("Should extract width from url correctly", () => {
    const url =
      "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg?h=400&w=600";
    const height = extractWidthFromPexelsUrl(url);
    expect(height).toBe(600);
  });

  it("Should return null if width parameter was missing", () => {
    const url =
      "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg?h=600";
    const height = extractWidthFromPexelsUrl(url);
    expect(height).toBe(null);
  });
});
