import { Mock, describe, expect, it, vi } from "vitest";
import { mapPexelsPhoto } from "./pexelsMapper";
import { DESKTOP_COLUMN_COUNT } from "../config/config";
import { PexelsPhoto } from "../types/pexelsPhoto";
import { mockPexelsPhotos } from "../__mocks__/pexelPhotos.mock";
import {
  extractHeightFromPexelsUrl,
  extractWidthFromPexelsUrl,
} from "../lib/utils";
import { Photo } from "../types/photo";
import { mockPhotos } from "../__mocks__/photos.mock";

vi.mock("../lib/utils", () => ({
  extractHeightFromPexelsUrl: vi.fn(),
  extractWidthFromPexelsUrl: vi.fn(),
}));

const mockPexelsPhoto: PexelsPhoto = mockPexelsPhotos[0];
const mockPhoto: Photo = mockPhotos[0];

describe("mapPexelsPhoto", () => {
  it("should correctly map a pexels photo to internal photo format", () => {
    (extractHeightFromPexelsUrl as Mock).mockReturnValue(400);
    (extractWidthFromPexelsUrl as Mock).mockReturnValue(600);

    const mapped = mapPexelsPhoto(mockPexelsPhoto, 0);

    expect(mapped).toEqual(mockPhoto);
  });

  it("should fallback height and width to 300 if utilities return null", () => {
    (extractHeightFromPexelsUrl as Mock).mockReturnValue(null);
    (extractWidthFromPexelsUrl as Mock).mockReturnValue(null);

    const mapped = mapPexelsPhoto(mockPexelsPhoto, 5);

    expect(mapped.height).toBe(300);
    expect(mapped.width).toBe(300);
  });

  it('should set "eager" loading for indexes less than DESKTOP_COLUMN_COUNT', () => {
    (extractHeightFromPexelsUrl as Mock).mockReturnValue(400);
    (extractWidthFromPexelsUrl as Mock).mockReturnValue(600);

    const mapped = mapPexelsPhoto(mockPexelsPhoto, 0);
    expect(mapped.loading).toBe("eager");
  });

  it('should set "lazy" loading for indexes greater than or equal to DESKTOP_COLUMN_COUNT', () => {
    (extractHeightFromPexelsUrl as Mock).mockReturnValue(400);
    (extractWidthFromPexelsUrl as Mock).mockReturnValue(600);

    const mapped = mapPexelsPhoto(mockPexelsPhoto, DESKTOP_COLUMN_COUNT); // Exactly at limit
    expect(mapped.loading).toBe("lazy");
  });
});
