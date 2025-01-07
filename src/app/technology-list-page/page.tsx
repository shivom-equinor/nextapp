import dynamic from "next/dynamic";

export const metadata = {
  revalidate: 0,
};

// Dynamically import TechnologyListPage
const TechnologyListPage = dynamic(
  () => import("@/client-components/technology-list-page/TechnologyListPage")
);

const TechnologyListingPage = () => {
  return (
    <>
      <TechnologyListPage />
    </>
  );
};

export default TechnologyListingPage;
