import { http } from "../lib/http";

export async function fetchPhotos() {
  try {
    const photos = await http.get('curated');
    console.log("photos ", photos);
  } catch (err) {
    throw Error(`Pexels get photos error ${err}`);
  }
}
