import { Suspense } from "react";
import Loading from "./loading"; // Import the loading component

export default function TechnologyListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      {/* Suspense will display the loader while the page is loading */}
      {children} {/* Renders the child pages */}
    </Suspense>
  );
}
