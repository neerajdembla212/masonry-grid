import { DEFAULT_FALLBACK_PHOTO } from "../../config/config";
import { Photo } from "../../types/types";

export default function Image({ src, loading = "lazy", ...rest }: Photo) {
  return (
    <img
      className="photo-card-image"
      src={src?.original}
      loading={loading}
      {...rest}
      onError={(e) => (e.currentTarget.src = DEFAULT_FALLBACK_PHOTO)}
    />
  );
}
