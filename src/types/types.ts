export interface Photo {
  id: string;
  src?: {
    [size in
      | "original"
      | "large"
      | "large2x"
      | "medium"
      | "small"
      | "portrait"
      | "landscape"
      | "tiny"]: string;
  };
  alt?: string;
  height: number;
  width: number;
  loading?: "eager" | "lazy";
}
