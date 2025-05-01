import styled from "styled-components";
import MasonryGrid from "../components/masonry-grid/MasonryGrid";
import { useFetchPhotos } from "../hooks/useFetchPhotos";

export default function Gallery() {
  const { photos, incrementPage, page } = useFetchPhotos();

  if (!photos.length) {
    return <div style={{ height: "100%" }}>Loading Photos...</div>;
  }
  return (
    <GridWrapper>
      <div style={{ position: "fixed", zIndex: 10, top: 10, color: "red" }}>
        page: {page}
      </div>
      <MasonryGrid
        photos={photos}
        onReachEnd={incrementPage}
      ></MasonryGrid>
    </GridWrapper>
  );
}

const GridWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;
