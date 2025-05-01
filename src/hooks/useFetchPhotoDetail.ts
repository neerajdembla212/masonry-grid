import { useEffect, useState } from "react";
import { fetchPexelsPhotoDetail } from "../services/pexelsApi";
import { Photo } from "../types/photo";

export const useFetchPhotoDetails = (id: string) => {
  const [isFetching, setIsFetching] = useState(false);
  const [photo, setPhoto] = useState<Photo>();

  useEffect(() => {
    let ignore = false;

    async function fetchPhotoDetail() {
      if (!id) {
        return;
      }
      setIsFetching(true);
      const photo = await fetchPexelsPhotoDetail(id);
      if (photo && !ignore) {
        setPhoto(photo);
      }
      setIsFetching(false);
    }

    fetchPhotoDetail();

    return () => {
      ignore = true;
    };
  }, [id]);

  return { photo, isFetching };
};
