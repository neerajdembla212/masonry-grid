import { renderHook, waitFor } from "@testing-library/react";
import { useFetchPhotos } from "./useFetchPhotos";
import { fetchPexelsPhotos } from "../services/pexelsApi";
import { describe, vi, it, Mock, expect } from "vitest";
import { Photo } from "../types/photo";

vi.mock("../services/pexelsApi", () => ({
  fetchPexelsPhotos: vi.fn(),
}));

describe("useFetchPhotos", () => {
  it("Should fetch photos correctly and stored in state", async () => {
    const mockPhotos: Photo[] = [
      {
        id: "12345",
        src: "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg?h=400&w=600",
        alt: "Test Photo",
        photographer: "Test Photograper",
        height: 400,
        width: 600,
      },
    ];
    (fetchPexelsPhotos as Mock).mockResolvedValue(mockPhotos);
    const response = renderHook(() => useFetchPhotos());

    await waitFor(() => {
        expect(response.result.current).toEqual(mockPhotos);
    })

    expect(fetchPexelsPhotos).toHaveBeenCalledTimes(1);
  });
});
