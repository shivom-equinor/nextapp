import LandingPage from "@/client-components/landing-page/LandingPage";
import { getMyTechnologies } from "../../api/technologyAPIs";

const getData = async () => {
  const response = await getMyTechnologies();

  return response;
};

const ServerLandingPage = async () => {
  const data = await getData();

  return <LandingPage data={data} />;
};

export default ServerLandingPage;
