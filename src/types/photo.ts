export interface Photo {
  id: string;
  src: string;
  alt: string;
  photographer?: string;
  height: number;
  width: number;
  loading?: "eager" | "lazy";
}

export type PositionedPhoto = Omit<Photo, "height" | "width"> & {
  top: number;
  left: number;
  renderHeight: number;
  renderWidth: number;
  renderSrc: string;
}
