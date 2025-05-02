import styled from "styled-components";
import { PositionedPhoto } from "../../types/photo";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import Image from "../ui/image/Image";
import { memo } from "react";
import { preloadDetail } from "../../lib/utils";

interface PhotoCardProps {
  photo: PositionedPhoto;
}

function PhotoCard({ photo }: PhotoCardProps) {
  const { renderHeight, renderWidth, renderSrc, avg_color, ...rest } = photo;

  return (
    <Card
      style={{
        top: photo.top,
        left: photo.left,
        containIntrinsicHeight: photo.renderHeight,
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
          avg_color={avg_color}
        />
        <Overlay className="overlay" onMouseEnter={preloadDetail}>
          <OverlayText>View Details</OverlayText>
        </Overlay>
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

  &:hover .overlay {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  &.overlay {
    pointer-events: auto;
  }
`;
const OverlayText = styled.span`
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.6);
  padding: 6px 12px;
  border-radius: 4px;
`;
export default memo(PhotoCard);
