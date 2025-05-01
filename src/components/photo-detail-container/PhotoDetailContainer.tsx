import styled from "styled-components";
import { useFetchPhotoDetails } from "../../hooks/useFetchPhotoDetail";
import Image from "../ui/image/Image";
import { useMemo, useRef } from "react";
import { useResizeObserver } from "../../hooks/useResizeObserver";
import { extractSizeFromPexelsUrl } from "../../lib/utils";
import { Photo } from "../../types/photo";
import { useNavigate } from "react-router-dom";

export default function PhotoDetailContainer({ id }: { id: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { photo } = useFetchPhotoDetails(id);
  const navigate = useNavigate();

  const { height: containerHeight } =
    useResizeObserver<HTMLDivElement>(containerRef);
  console.log("poto details ", photo);
  const updatedPhoto: Photo | undefined = useMemo(() => {
    if (!photo) {
      return;
    }
    const { height = 1, width = 1 } = extractSizeFromPexelsUrl(photo.src);
    const renderedHeight = Math.floor(0.6 * containerHeight);
    const aspectRatio = width / height;
    const renderedWidth = Math.floor(renderedHeight * aspectRatio);
    return {
      ...photo,
      height: renderedHeight,
      width: renderedWidth,
    };
  }, [containerHeight, photo]);

  return (
    <Container ref={containerRef}>
      {updatedPhoto && (
        <>
          <div
            style={{
              width: updatedPhoto.width,
              height: updatedPhoto.height,
            }}
          >
            <Image {...updatedPhoto} />
          </div>
          <DetailsContainer>
            <TextLine>Photo Credits: {updatedPhoto.photographer}</TextLine>
            <TextLine>You are enjoying "{updatedPhoto.alt}"</TextLine>
            <button onClick={() => navigate(-1)}>Back to Gallery</button>
          </DetailsContainer>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100dvh;
  width: 75dvw;
  justify-content: space-around;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextLine = styled.div`
  margin-bottom: 1rem;
`;
