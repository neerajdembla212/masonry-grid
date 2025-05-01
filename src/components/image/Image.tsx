import { useState } from "react";
import { DEFAULT_FALLBACK_PHOTO } from "../../config/config";
import { Photo } from "../../types/photo";
import { styled } from "styled-components";

export default function Image({ ...rest }: Photo) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <Placeholder />}
      <img
        className="photo-card-image"
        {...rest}
        onLoad={() => setLoaded(true)}
        onError={(e) => (e.currentTarget.src = DEFAULT_FALLBACK_PHOTO)}
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
          top: 0,
          left: 0
        }}
      />
    </>
  );
}

const Placeholder = styled.div`
  background: linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 75%);
  width: 100%;
  height: 100%;
  position: absolute;
`;
