import { Photo } from "../types/photo";

export const mockPhotos: Photo[] = [
  {
    id: "12345",
    src: "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg?h=400&w=600",
    alt: "Test Photo",
    photographer: "Test Photograper",
    height: 400,
    width: 600,
    loading: "eager",
  },
  {
    id: "6789",
    src: "https://images.pexels.com/photos/6789/pexels-photo-6789.jpeg?h=300&w=600",
    alt: "Test Photo",
    photographer: "Test Photograper",
    height: 300,
    width: 600,
    loading: "eager",
  },
];
