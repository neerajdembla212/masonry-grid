import { PexelsPhoto } from "../types/pexelsPhoto";
import { Photo } from "../types/photo";

// Following function maps the response from pexels (PexelsPhoto) to type that we use for rendering on UI layer (Photo)
export const mapPexelsPhoto = (
  photo: PexelsPhoto,
  srcPreference: keyof PexelsPhoto["src"] = "original"
): Photo => {
  return {
    id: `${photo.id}`,
    alt: photo.alt,
    src: photo.src[srcPreference],
    photographer: photo.photographer,
    height: photo.height,
    width: photo.width,
    loading: "lazy",
    avg_color: photo.avg_color,
  };
};
