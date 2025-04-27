export interface Photo {
  id: string;
  src: string;
  alt: string;
  photographer?: string;
  height: number;
  width: number;
  loading?: "eager" | "lazy";
}
