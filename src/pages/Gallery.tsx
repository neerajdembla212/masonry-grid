import MasonryGrid from "../components/masonry-grid/MasonryGrid";
import { Photo } from "../types/types";

const dummyPhotos: Photo[] = [
  {
    id: "1",
    alt: "Photo 1",
    src: {
      original: "https://picsum.photos/300/400?random=1",
      large2x: "https://picsum.photos/300/400?random=1",
      large: "https://picsum.photos/300/400?random=1",
      medium: "https://picsum.photos/300/400?random=1",
      small: "https://picsum.photos/300/400?random=1",
      portrait: "https://picsum.photos/300/400?random=1",
      landscape: "https://picsum.photos/300/400?random=1",
      tiny: "https://picsum.photos/300/400?random=1",
    },
    height: 400,
    width: 300,
  },
  {
    id: "2",
    alt: "Photo 2",
    src: {
      original: "https://picsum.photos/300/500?random=2",
      large2x: "https://picsum.photos/300/500?random=2",
      large: "https://picsum.photos/300/500?random=2",
      medium: "https://picsum.photos/300/500?random=2",
      small: "https://picsum.photos/300/500?random=2",
      portrait: "https://picsum.photos/300/500?random=2",
      landscape: "https://picsum.photos/300/500?random=2",
      tiny: "https://picsum.photos/300/500?random=2",
    },
    height: 500,
    width: 300,
  },
  {
    id: "3",
    alt: "Photo 3",
    src: {
      original: "https://picsum.photos/300/300?random=3",
      large2x: "https://picsum.photos/300/300?random=3",
      large: "https://picsum.photos/300/300?random=3",
      medium: "https://picsum.photos/300/300?random=3",
      small: "https://picsum.photos/300/300?random=3",
      portrait: "https://picsum.photos/300/300?random=3",
      landscape: "https://picsum.photos/300/300?random=3",
      tiny: "https://picsum.photos/300/300?random=3",
    },
    height: 300,
    width: 300,
  },
  {
    id: "4",
    alt: "Photo 4",
    src: {
      original: "https://picsum.photos/300/600?random=4",
      large2x: "https://picsum.photos/300/600?random=4",
      large: "https://picsum.photos/300/600?random=4",
      medium: "https://picsum.photos/300/600?random=4",
      small: "https://picsum.photos/300/600?random=4",
      portrait: "https://picsum.photos/300/600?random=4",
      landscape: "https://picsum.photos/300/600?random=4",
      tiny: "https://picsum.photos/300/600?random=4",
    },
    height: 600,
    width: 300,
  },
];
export default function Gallery() {
  return <MasonryGrid photos={dummyPhotos.concat(dummyPhotos)}></MasonryGrid>;
}
