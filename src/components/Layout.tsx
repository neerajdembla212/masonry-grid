import { ReactNode } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header>
        <Link to="/">Masonry Gallery</Link>
      </Header>
      <Main>{children}</Main>
      <Footer></Footer>
    </>
  );
}

const Header = styled.header`
  padding: 1rem;
  background: var(--header-background);
  color: var(--header-text);
  text-align: center;
`;

const Main = styled.main`
  padding: 2rem;
`;

const Footer = styled.footer`
  padding: 1rem;
  background: var(--footer-background);
  color: var(--text-secondary);
  text-align: center;
  margin-top: auto;
`;
