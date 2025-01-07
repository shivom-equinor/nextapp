"use client";
import dynamic from "next/dynamic";

// Dynamically import LandingPage
const LandingPage = dynamic(
  () => import("@/client-components/landing-page/LandingPage"),
  { ssr: false }
);

const Home: React.FC = () => {
  return (
    <>
      <LandingPage />
    </>
  );
};

export default Home;
