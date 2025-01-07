import dynamic from "next/dynamic";

export const metadata = {
  revalidate: 0,
};

// Dynamically import LandingPage
const LandingPage = dynamic(
  () => import("@/client-components/landing-page/LandingPage")
);

const Home: React.FC = () => {
  return (
    <>
      <LandingPage />
    </>
  );
};

export default Home;
