import { styled } from "styled-components";
import { Photo } from "../../types/photo";
import PhotoCard from "../photo-card/PhotoCard";
import {
  DESKTOP_COLUMN_COUNT,
  LARGE_SCREENS_COLUMN_COUNT,
  MOBILE_COLUMN_COUNT,
  TAB_COLUMN_COUNT,
} from "../../config/config";

interface MasonryGridProps {
  photos: Photo[];
}
export default function MasonryGrid({ photos }: MasonryGridProps) {
  return (
    <Gridwrapper>
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </Gridwrapper>
  );
}

const Gridwrapper = styled.div`
    column-count: ${DESKTOP_COLUMN_COUNT};
    column-gap: 1rem;
    padding: 1rem;
    max-width: 1024px;
    margin: 0 auto;

    @media(max-width: 768px) {
        column-count: ${TAB_COLUMN_COUNT};
    }

    @media(max-width: 480px) {
        column-count: ${MOBILE_COLUMN_COUNT};
    }

    @media(min-width: 1024px) {
        column-count: ${LARGE_SCREENS_COLUMN_COUNT};
    }

`;
