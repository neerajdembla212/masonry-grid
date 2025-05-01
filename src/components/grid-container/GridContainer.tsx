import styled from "styled-components";
import MasonryGrid from "../../components/masonry-grid/MasonryGrid";
import { useFetchPhotos } from "../../hooks/useFetchPhotos";
import GridHeader from "../grid-header/GridHeader";
import { useWindowSize } from "../../hooks/useWindowSize";
import { getMasonryColumnCount } from "../../lib/utils";

export default function GridContainer() {
  const { width: containerWidth } = useWindowSize();
  const columns = getMasonryColumnCount(containerWidth);
  const photosPerPage = Math.max(columns * 3, 15);

  const { photos, incrementPage } = useFetchPhotos(photosPerPage);

  if (!photos.length) {
    return <div style={{ height: "100%" }}>Loading Photos...</div>;
  }

  return (
    <GridWrapper>
      <GridHeader />
      <MasonryGrid photos={photos} onReachEnd={incrementPage}></MasonryGrid>
    </GridWrapper>
  );
}

const GridWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
