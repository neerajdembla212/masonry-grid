import { useState } from "react";
import styled from "styled-components";

interface TextInputProps {
  placeholder?: string;
  value?: string;
}
export default function TextInput({
  value = "",
  placeholder = "",
}: TextInputProps) {
  const [textValue, setTextValue] = useState(value);
  console.log("textValue ", textValue);
  return (
    <Container>
      <input
        className="text-input"
        type="text"
        value={textValue}
        placeholder={placeholder}
        onChange={(e) => setTextValue(e.target.value)}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  .text-input {
    padding: 8px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.surfacePrimary};
  }
`;
