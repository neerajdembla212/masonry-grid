import { useParams } from "react-router-dom";
import PhotoDetailContainer from "../components/photo-detail-container/PhotoDetailContainer";
import styled from "styled-components";

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return;
  }
  return (
    <PageWrapper>
      <PhotoDetailContainer id={id} />;
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100dvw;
  display: flex;
  justify-content: center;
`;
