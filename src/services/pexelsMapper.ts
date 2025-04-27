import { DESKTOP_COLUMN_COUNT } from "../config/config";
import {
  extractHeightFromPexelsUrl,
  extractWidthFromPexelsUrl,
} from "../lib/utils";
import { PexelsPhoto } from "../types/pexels";
import { Photo } from "../types/photo";

// Following function maps the response from pexels (PexelsPhoto) to type that we use for rendering on UI layer (Photo)
export const mapPexelsPhoto = (photo: PexelsPhoto, index: number): Photo => {
  const height = extractHeightFromPexelsUrl(photo.src.medium);
  const width = extractWidthFromPexelsUrl(photo.src.medium);
  return {
    id: `${photo.id}`,
    alt: photo.alt,
    src: photo.src.medium,
    photographer: photo.photographer,
    height: height ?? 300,
    width: width ?? 300,
    loading: index < DESKTOP_COLUMN_COUNT ? "eager" : "lazy",
  };
};
