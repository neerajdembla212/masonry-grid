import MasonryGrid from "../components/masonry-grid/MasonryGrid";
import { useFetchPhotos } from "../hooks/useFetchPhotos";

export default function Gallery() {
  const photos = useFetchPhotos();

  return <MasonryGrid photos={photos}></MasonryGrid>;
}
