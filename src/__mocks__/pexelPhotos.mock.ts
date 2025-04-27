import { PexelsPhoto } from "../types/pexelsPhoto";

export const mockPexelsPhotos: PexelsPhoto[] = [
  {
    id: 12345,
    src: {
      medium:
        "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg?h=400&w=600",
      original: "",
      landscape: "",
      large: "",
      large2x: "",
      tiny: "",
      small: "",
      portrait: "",
    },
    alt: "Test Photo",
    photographer: "Test Photograper",
    height: 4000,
    width: 6000,
    photographer_id: 6789,
    photographer_url: "https://images.pexels.com/photographer/6789",
    avg_color: "blue",
  },
  {
    id: 6789,
    src: {
      medium:
        "https://images.pexels.com/photos/6789/pexels-photo-6789.jpeg?h=300&w=600",
      original: "",
      landscape: "",
      large: "",
      large2x: "",
      tiny: "",
      small: "",
      portrait: "",
    },
    alt: "Test Photo",
    photographer: "Test Photograper",
    height: 3000,
    width: 6000,
    photographer_id: 1367,
    photographer_url: "https://images.pexels.com/photographer/1367",
    avg_color: "red",
  },
];
