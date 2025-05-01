import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Photo } from "../types/photo";
import { fetchPexelsPhotos } from "../services/pexelsApi";
import { useLatest } from "./useLatest";

export const useFetchPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const isFetchingRef = useLatest(isFetching);

  // we are keeping track of all the photo ids to remove any duplicate photos coming from pexels api (noticed this in page 8 and 9 there are some photos that are returned by pexel which are exactly same, this causes flickering in masonry)
  const availablePhotoIds = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const photo of photos) {
      map.set(photo.id, true);
    }
    return map;
  }, [photos]);

  useEffect(() => {
    let ignore = false; // using ignore for race conditions (if any)

    async function fetchPhotos() {
      setIsFetching(true);
      const fetchedPhotos = await fetchPexelsPhotos({
        page,
      });
      if (!ignore && Array.isArray(fetchedPhotos)) {
        const uniqueFetchedPhotos = fetchedPhotos.filter(
          (fetchedPhoto) => !availablePhotoIds.get(fetchedPhoto.id)
        );
        setPhotos((photos) => [...photos, ...uniqueFetchedPhotos]);
      }
      setIsFetching(false);
    }

    fetchPhotos();

    return () => {
      ignore = true;
    };
  }, [page]);

  const incrementPage = useCallback((count: number = 1) => {
    if (!isFetchingRef.current) {
      setPage((p) => p + count);
    }
  }, []);

  const decrementPage = useCallback((count: number = 1) => {
    if (!isFetchingRef.current) {
      setPage((prevPage) => {
        if (prevPage > 0) {
          return prevPage - count;
        }
        return prevPage;
      });
    }
  }, []);

  return { photos, incrementPage, page };
};
