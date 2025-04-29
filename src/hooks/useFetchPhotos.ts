import { useEffect, useState } from "react";
import { Photo } from "../types/photo";
import { fetchPexelsPhotos } from "../services/pexelsApi";

export const useFetchPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let ignore = false; // using ignore for race conditions (if any)

    async function fetchPhotos() {
      setIsFetching(true);
      const photos = await fetchPexelsPhotos({
        page,
      });
      if (!ignore && photos) {
        setPhotos(photos);
      }
      setIsFetching(false);
    }

    fetchPhotos();

    return () => {
      ignore = true;
    };
  }, [page]);

  const incrementPage = (count: number = 1) => {
    if (!isFetching) {
      setPage((p) => p + count);
    }
  };

  const decrementPage = (count: number = 1) => {
    if (!isFetching && page > 0) {
      setPage((p) => p - count);
    }
  };

  return { photos, incrementPage, decrementPage, page };
};
