import styled from "styled-components";

export function SkeletonCard({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <Skeleton
      style={{
        width,
        height,
      }}
    />
  );
}

const Skeleton = styled.div`
backgroundColor: "#e0e0e0",
borderRadius: 8,
marginBottom: 16,
animation: "pulse 1.5s ease-in-out infinite"
`;
