import { Mock, describe, expect, it, vi } from "vitest";
import { fetchPexelsPhotos } from "./pexelsApi";
import * as HttpModule from "../lib/http";
import { mockPexelsPhotos } from "../__mocks__/pexelPhotos.mock";
import { mockPhotos } from "../__mocks__/photos.mock";

vi.mock(
  "../lib/http",
  async (importOriginal: () => Promise<typeof HttpModule>) => {
    const actual = await importOriginal();
    return {
      ...actual,
      http: {
        ...actual.http,
        get: vi.fn(),
      },
    };
  }
);

describe("fetchPexelsPhotos", () => {
  it("Should fetch pexels photos, map and return the mapped photos", async () => {
    (HttpModule.http.get as Mock).mockResolvedValue({
      photos: mockPexelsPhotos,
    });

    const result = await fetchPexelsPhotos();

    expect(HttpModule.http.get).toHaveBeenCalledTimes(1);
    expect(HttpModule.http.get).toHaveBeenCalledWith("curated");
    expect(result).toEqual(mockPhotos);
  });

  it("should throw an error if API call fails", async () => {
    (HttpModule.http.get as Mock).mockRejectedValue(new Error("Internal Server Error"));

    await expect(fetchPexelsPhotos()).rejects.toThrow("Api Error: Pexels get photos error");
  });
});
