import { QueryClient } from "@tanstack/react-query";
import LandingPage from "@/client-components/landing-page/LandingPage";
import { getMyTechnologies } from "@/api/technologyAPIs";

export default async function Page() {
  const queryClient = new QueryClient();

  // Method to prefetch data in React Query v5
  await queryClient.prefetchQuery({
    queryKey: ["myTechnologies"],
    queryFn: getMyTechnologies,
    staleTime: 30 * 60 * 1000,
  });

  const dehydratedState = queryClient.getQueryData(["myTechnologies"]);

  return <LandingPage dehydratedState={dehydratedState} />;
}
