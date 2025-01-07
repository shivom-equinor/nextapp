import Header from "@/client-components/header/Header";
import { getUserDetails } from "@/api/technologyAPIs";

const getData = async () => {
  const response = await getUserDetails();

  return response;
};

const ServerHeader = async () => {
  const data = await getData();

  return <Header userDetails={data} />;
};

export default ServerHeader;
