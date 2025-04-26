import { useParams, Link } from "react-router-dom";

function Detail() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Photo Detail Page</h1>
      <p>Photo ID: {id}</p>
      <Link to="/">Back to Gallery</Link>
    </div>
  );
}

export default Detail;
