import dynamic from "next/dynamic";

// Dynamically import LandingPage
const LandingPage = dynamic(
  () => import("@/client-components/landing-page/LandingPage"),
  { ssr: false } // Optional: Disable SSR for this component
);

const Home: React.FC = () => {
  return (
    <>
      {/* <ServerLandingPage /> */}
      <LandingPage />
    </>
  );
};

export default LandingPage;
