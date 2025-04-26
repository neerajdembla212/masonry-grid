export const theme = {
  background: "#fafafa",
  textPrimary: "#222",
  textSecondary: "#555",
  headerBackground: "#222",
  headerText: "#fff",
  footerBackground: "#eee",
  surfaceBackground: "#fff",
  fontFamily: `'Helvetica Neue', Helvetica, Arial, sans-serif`,
};

export type ThemeType = typeof theme;

// Extend styled-components DefaultTheme
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
