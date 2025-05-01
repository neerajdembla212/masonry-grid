import styled from "styled-components";
import { PositionedPhoto } from "../../types/photo";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import Image from "../ui/image/Image";
import { memo } from "react";

interface PhotoCardProps {
  photo: PositionedPhoto;
  showPlaceholder?: boolean;
}

function PhotoCard({ photo, showPlaceholder }: PhotoCardProps) {
  const { renderHeight, renderWidth, renderSrc, ...rest } = photo;

  if (showPlaceholder) {
    return <PlaceholderCard />;
  }

  return (
    <Card
      style={{
        top: photo.top,
        left: photo.left,
        containIntrinsicHeight: photo.renderHeight
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
  content-visibility: auto;

  .photo-card-image {
    object-fit: cover;
    border-radius: 5px;
    will-change: transform, opacity;
    transition: opacity 0.15s ease;
  }
`;

const PlaceholderCard = styled.div`
    width: 200,
    height: 250,
    background: "#f0f0f0",
    borderRadius: 4,
    marginBottom: 16,
`;
export default memo(PhotoCard);
