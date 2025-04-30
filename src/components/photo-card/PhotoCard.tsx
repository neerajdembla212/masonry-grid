import styled from "styled-components";
import { PositionedPhoto } from "../../types/photo";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import Image from "../image/Image";
import { memo } from "react";

interface PhotoCardProps {
  photo: PositionedPhoto;
}

function PhotoCard({ photo }: PhotoCardProps) {
  const { renderHeight, renderWidth, renderSrc, ...rest } = photo;
  return (
    <Card
      style={{
        top: photo.top,
        left: photo.left,
      }}
    >
      <Link
        to={routes.photoDetail.replace(":id", photo.id)}
        aria-label={`View details for ${photo.alt}`}
      >
        <Image
          {...rest}
          height={renderHeight}
          width={renderWidth}
          src={renderSrc}
        />
      </Link>
    </Card>
  );
}

const Card = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.surfaceBackground};

  .photo-card-image {
    object-fit: cover;
    border-radius: 5px;
    will-change: transform, opacity;
    transition: opacity 0.15s ease;
  }
`;

export default memo(PhotoCard);
