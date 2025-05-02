import { describe, expect, it } from "vitest";
import { mapPexelsPhoto } from "./pexelsMapper";
import { PexelsPhoto } from "../types/pexelsPhoto";
import { mockPexelsPhotos } from "../__mocks__/pexelPhotos.mock";
import { Photo } from "../types/photo";
import { mockPhotos } from "../__mocks__/photos.mock";

const mockPexelsPhoto: PexelsPhoto = mockPexelsPhotos[0];
const mockPhoto: Photo = mockPhotos[0];

describe("mapPexelsPhoto", () => {
  it('should map photo with default srcPreference as "original"', () => {
    const result = mapPexelsPhoto(mockPexelsPhoto);

    expect(result).toEqual(mockPhoto);
  });

  it("should map photo using provided srcPreference", () => {
    const result = mapPexelsPhoto(mockPexelsPhoto, "large");

    expect(result.src).toBe(
      "https://images.pexels.com/photos/12345/pexels-large-12345.jpeg"
    );
  });

  it("should return id as string", () => {
    const result = mapPexelsPhoto(mockPexelsPhoto);

    expect(typeof result.id).toBe("string");
  });
});
