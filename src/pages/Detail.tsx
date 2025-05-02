import { useParams } from "react-router-dom";
import PhotoDetailContainer from "../components/photo-detail-container/PhotoDetailContainer";
import styled from "styled-components";
import ErrorBoundary from "../components/common/error-boundary/ErrorBoundary";

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return;
  }
  return (
    <ErrorBoundary
      fallbackUI={<div>This Photo details will be available shortly!</div>}
    >
      <PageWrapper>
        <PhotoDetailContainer id={id} />;
      </PageWrapper>
    </ErrorBoundary>
  );
}

const PageWrapper = styled.div`
  width: 100dvw;
  display: flex;
  justify-content: center;
`;
