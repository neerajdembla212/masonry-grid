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

    const photos = (pexelsPhotos ?? []).map((pexelsPhoto: PexelsPhoto) =>
      mapPexelsPhoto(pexelsPhoto)
    );
    if (photos) {
      console.log("photos ", photos);
      return photos;
    }
  } catch (err) {
    throw Error(`Api Error: Pexels get photos error ${err}`);
  }
}

export async function fetchPexelsPhotoDetail(
  id: string
): Promise<Photo | undefined> {
  if (!id) {
    return;
  }
  try {
    const pexelsPhoto = await http.get<PexelsPhoto>(`photos/${id}`);
    const photo = mapPexelsPhoto(pexelsPhoto, "portrait");
    if (photo) {
      console.log("photo ", photo);
      return photo;
    }
  } catch (err) {}
}
