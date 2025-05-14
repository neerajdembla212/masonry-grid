import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/common/error-boundary/ErrorBoundary";
import Gallery from "./pages/Gallery";

const Detail = lazy(() => import("./pages/Detail"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Layout>
          <Suspense fallback={<div>Loading page...</div>}>
            <ErrorBoundary>
              <Routes>
                <Route path={routes.home} element={<Gallery />}></Route>
                <Route path={routes.photoDetail} element={<Detail />}></Route>
                <Route path={routes.notFound} element={<NotFound />}></Route>
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
