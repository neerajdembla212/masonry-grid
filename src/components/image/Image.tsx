import { DEFAULT_FALLBACK_PHOTO } from "../../config/config";
import { Photo } from "../../types/photo";

export default function Image({ ...rest }: Photo) {
  return (
    <img
      className="photo-card-image"
      {...rest}
      onError={(e) => (e.currentTarget.src = DEFAULT_FALLBACK_PHOTO)}
    />
  );
}
