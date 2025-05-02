import ErrorBoundary from "../components/common/error-boundary/ErrorBoundary";
import GridContainer from "../components/grid-container/GridContainer";

export default function Gallery() {
  return (
    <ErrorBoundary fallbackUI={(
      <div>We are working on the fixing the gallery, Feel free to use other features meanwhile</div>
    )}>
      <GridContainer />;
    </ErrorBoundary>
  );
}
