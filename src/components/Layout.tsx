import { ReactNode } from "react";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutWrapper>
      <Main>{children}</Main>
      <Footer>
        <a href="https://www.pexels.com">Photos provided by Pexels</a>
      </Footer>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

const Main = styled.main`
  padding: 2rem;
  flex: 1;
  display: flex;
  justify-contents: center;
  align-items: center;
`;

const Footer = styled.footer`
  padding: 1rem;
  background: var(--footer-background);
  color: var(--text-secondary);
  text-align: center;
  margin-top: auto;
`;
