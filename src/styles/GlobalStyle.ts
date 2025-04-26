import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
    box-sizing: border-box;
}

html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: ${(props) => props.theme.fontFamily};
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.textPrimary};
}

a {
    text-decoration: none;
    color: inherit;
}

img {
	max-width: 100%;
	height: auto;
	vertical-align: middle;
	display: inline-block;
}
`;

export default GlobalStyle;
