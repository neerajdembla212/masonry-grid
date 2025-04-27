import { useEffect, useState } from "react";
import { Photo } from "../types/photo";
import { fetchPexelsPhotos } from "../services/pexelsApi";

export const useFetchPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    let ignore = false; // using ignore for race conditions (if any)

    async function fetchPhotos() {
      const photos = await fetchPexelsPhotos();
      if (!ignore && photos) {
        setPhotos(photos);
      }
    }

    fetchPhotos();

    return () => {
      ignore = true;
    };
  }, []);

  return photos;
};
