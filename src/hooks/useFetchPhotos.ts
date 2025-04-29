import { useCallback, useEffect, useRef, useState } from "react";
import { Photo } from "../types/photo";
import { fetchPexelsPhotos } from "../services/pexelsApi";
import { useLatest } from "./useLatest";

export const useFetchPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const isFetchingRef = useLatest(isFetching);
  const directionRef = useRef<"next" | "prev">("next");

  useEffect(() => {
    let ignore = false; // using ignore for race conditions (if any)

    async function fetchPhotos() {
      setIsFetching(true);
      const fetchedPhotos = await fetchPexelsPhotos({
        page,
      });
      if (!ignore && fetchedPhotos) {
        if (directionRef.current === "prev") {
          setPhotos((photos) => [...fetchedPhotos, ...photos]);
        } else {
          setPhotos((photos) => [...photos, ...fetchedPhotos]);
        }
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
      directionRef.current = "next";
      setPage((p) => p + count);
    }
  }, []);

  const decrementPage = useCallback((count: number = 1) => {
    if (!isFetchingRef.current) {
      directionRef.current = "prev";
      setPage((prevPage) => {
        if (prevPage > 0) {
          return prevPage - count;
        }
        return prevPage;
      });
    }
  }, []);

  return { photos, incrementPage, decrementPage, page };
};
