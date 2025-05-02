import { renderHook, waitFor } from "@testing-library/react";
import { useFetchPhotos } from "./useFetchPhotos";
import { fetchPexelsPhotos } from "../services/pexelsApi";
import { describe, vi, it, Mock, expect } from "vitest";
import { mockPhotos } from "../__mocks__/photos.mock";

vi.mock("../services/pexelsApi", () => ({
  fetchPexelsPhotos: vi.fn(),
}));

describe("useFetchPhotos", () => {
  it("should fetch photos correctly and store them in state", async () => {
    (fetchPexelsPhotos as Mock).mockResolvedValue(mockPhotos);

    const { result } = renderHook(() => useFetchPhotos());

    await waitFor(() => {
      expect(result.current.photos).toEqual(mockPhotos);
    });

    expect(fetchPexelsPhotos).toHaveBeenCalledTimes(1);
  });
});
