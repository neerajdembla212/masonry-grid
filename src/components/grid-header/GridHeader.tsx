import styled from "styled-components";
import TextInput from "../common/text-input/TextInput";

export default function GridHeader() {
  return (
    <Container>
      <TextInput placeholder="Type to search" />
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem 0;
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
