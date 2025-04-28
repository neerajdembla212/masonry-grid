import { DESKTOP_COLUMN_COUNT } from "../config/config";
import { PexelsPhoto } from "../types/pexelsPhoto";
import { Photo } from "../types/photo";

// Following function maps the response from pexels (PexelsPhoto) to type that we use for rendering on UI layer (Photo)
export const mapPexelsPhoto = (photo: PexelsPhoto, index: number): Photo => {
  return {
    id: `${photo.id}`,
    alt: photo.alt,
    src: photo.src.original,
    photographer: photo.photographer,
    height: photo.height,
    width: photo.width,
    loading: index < DESKTOP_COLUMN_COUNT ? "eager" : "lazy",
  };
};
