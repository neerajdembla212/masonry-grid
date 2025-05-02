import { LayoutAttributes } from "./layout-attributes";
import { MasonryElement } from "./masonry-element";

export interface Photo extends MasonryElement {
  alt: string;
  photographer?: string;
  loading?: "eager" | "lazy";
  avg_color: string;
}

export type PositionedPhoto = Omit<Photo, "height" | "width"> &
  LayoutAttributes;
