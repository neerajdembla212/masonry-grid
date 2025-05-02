import { ImgHTMLAttributes, useState } from "react";
import { DEFAULT_FALLBACK_PHOTO } from "../../../config/config";
import { Photo } from "../../../types/photo";

export default function Image({
  avg_color,
  height,
  width,
  ...rest
}: Photo & ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <div style={{ background: avg_color ?? "#ddd" }}>
        <img
          className="photo-card-image"
          height={height}
          width={width}
          {...rest}
          onLoad={() => setLoaded(true)}
          onError={(e) => (e.currentTarget.src = DEFAULT_FALLBACK_PHOTO)}
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.3s ease",
            top: 0,
            left: 0,
          }}
          decoding="async"
        />
      </div>
    </>
  );
}
