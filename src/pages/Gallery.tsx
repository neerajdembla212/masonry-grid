import MasonryGrid from "../components/masonry-grid/MasonryGrid";
import { useFetchPhotos } from "../hooks/useFetchPhotos";

export default function Gallery() {
  const { photos, incrementPage, decrementPage, page } = useFetchPhotos();

  if (!photos.length) {
    return <div>Loading Photos...</div>;
  }
  return (
    <>
    <div style={{ position: "fixed", zIndex: 10, top: 10,color: "red" }}> 
      page: {page}
    </div>
    <MasonryGrid
      photos={photos}
      onReachEnd={incrementPage}
      onReachStart={decrementPage}
      ></MasonryGrid>
      </>
  );
}
