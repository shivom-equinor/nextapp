import dynamic from "next/dynamic";

// Dynamically import TechnologyListPage
const TechnologyListPage = dynamic(
  () => import("@/client-components/technology-list-page/TechnologyListPage"),
  { ssr: false } // Optional: Disable SSR for this component
);

const TechnologyListingPage = async () => {
  return (
    <>
      {/* <TechnologyListPageServer /> */}
      <TechnologyListPage />
    </>
  );
};

export default TechnologyListPage;
