import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";

const Gallery = lazy(() => import("./pages/Gallery"));
const Detail = lazy(() => import("./pages/Detail"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path={routes.home} element={<Gallery />}></Route>
          <Route path={routes.photoDetail} element={<Detail />}></Route>
          <Route path={routes.notFound} element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
