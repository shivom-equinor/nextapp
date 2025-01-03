// app/landing-page/page.tsx

import LandingPage from "@/client-components/landing-page/LandingPage";
import { getMyTechnologies } from "@/api/technologyAPIs";

// Set revalidation interval to 30 minutes (1800 seconds)
export const revalidate = 1800;

async function getData() {
  const response = await getMyTechnologies();
  return response;
}

export default async function Page() {
  // Fetching data during build or revalidation
  const data = await getData();

  // Rendering the page with fetched data
  return <LandingPage data={data} />;
}
