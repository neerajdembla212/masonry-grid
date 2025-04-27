import styled from "styled-components";
import { Photo } from "../../types/photo";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import Image from "../image/Image";

interface PhotoCardProps {
  photo: Photo;
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <Card>
      <Link to={routes.photoDetail.replace(":id", photo.id)}>
        <Image {...photo} />
      </Link>
    </Card>
  );
}

const Card = styled.div`
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.surfaceBackground};
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;

  .photo-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;
