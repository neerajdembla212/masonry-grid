import styled from "styled-components";
import { useFetchPhotoDetails } from "../../hooks/useFetchPhotoDetail";
import Image from "../common/image/Image";
import { useMemo, useRef } from "react";
import { useResizeObserver } from "../../hooks/useResizeObserver";
import { extractSizeFromPexelsUrl } from "../../lib/utils";
import { Photo } from "../../types/photo";
import { useNavigate } from "react-router-dom";
import { preloadGallery } from "../../lib/utils";

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
      loading: "eager",
      alt: photo.alt || `A photo captured with love by ${photo.photographer}`,
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
            <ImageWrapper
              style={{
                width: updatedPhoto.width,
                height: updatedPhoto.height,
              }}
            >
              <Image {...updatedPhoto} fetchPriority="high" />
            </ImageWrapper>
          </div>
          <DetailsContainer>
            <TextLine>Photo Credits: {updatedPhoto.photographer}</TextLine>
            <TextLine>You are enjoying "{updatedPhoto.alt}"</TextLine>
            <BackButton
              onClick={() => navigate(-1)}
              onMouseEnter={preloadGallery}
            >
              Back to Gallery
            </BackButton>
          </DetailsContainer>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 2rem;
  height: 100dvh;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: contain;
  }
`;

const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  word-wrap: break-word;
`;

const TextLine = styled.div`
  font-size: 1.1rem;
  line-height: 1.4;
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: ${(props) => props.theme.surfacePrimary ?? "#444"};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: start;

  &:hover {
    background-color: ${(props) => props.theme.surfacePrimaryHover ?? "#333"};
  }
`;
