import styled from "styled-components";

export default function GridHeader() {
  return (
    <Container>
      <h3>Masonry Grid</h3>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem 0;
  height: 10vh;
  display: flex;
  justify-content: center;
`;
