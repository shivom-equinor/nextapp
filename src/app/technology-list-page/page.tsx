"use client";
import dynamic from "next/dynamic";

// Dynamically import TechnologyListPage
const TechnologyListPage = dynamic(
  () => import("@/client-components/technology-list-page/TechnologyListPage"),
  { ssr: false }
);

const TechnologyListingPage = () => {
  return (
    <>
      <TechnologyListPage />
    </>
  );
};

export default TechnologyListingPage;
