import { Photo } from "../types/photo";

export const mockPhotos: Photo[] = [
  {
    id: "12345",
    alt: "Test Photo",
    src: "https://images.pexels.com/photos/12345/pexels-original-12345.jpeg",
    photographer: "Test Photograper",
    height: 4000,
    width: 6000,
    loading: "lazy",
    avg_color: "blue"
  },
  {
    id: "6789",
    src: "https://images.pexels.com/photos/6789/pexels-original-6789.jpeg",
    alt: "Test Photo",
    photographer: "Test Photograper",
    height: 3000,
    width: 6000,
    loading: "lazy",
    avg_color: "red"
  },
];
