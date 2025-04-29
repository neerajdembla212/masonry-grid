import { http } from "../lib/http";
import { PexelsPhoto } from "../types/pexelsPhoto";
import { Photo } from "../types/photo";
import { mapPexelsPhoto } from "./pexelsMapper";

export async function fetchPexelsPhotos(
  queryParams?: Record<string, string | number>
): Promise<Photo[] | undefined> {
  try {
    const { photos: pexelsPhotos } = await http.get<{ photos: PexelsPhoto[] }>(
      "curated",
      {
        queryParams,
      }
    );

    const photos = (pexelsPhotos ?? []).map(
      (pexelsPhoto: PexelsPhoto, index: number) =>
        mapPexelsPhoto(pexelsPhoto, index)
    );
    if (photos) {
      console.log("photos ", photos);
      return photos;
    }
  } catch (err) {
    throw Error(`Api Error: Pexels get photos error ${err}`);
  }
}
