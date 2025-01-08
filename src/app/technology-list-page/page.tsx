// app/technology-list/page.tsx (Server Component)

import { QueryClient, dehydrate } from "@tanstack/react-query";
import {
  getTechnologyList,
  getSolutionFiltersAndBrowseByRoles,
  getGroupsAndViews,
} from "@/api/technologyAPIs";
import TechnologyListPage from "@/client-components/technology-list-page/TechnologyListPage";

export default async function TechnologyListingPage() {
  const queryClient = new QueryClient();

  // Prefetch the data for all three API calls
  const technologyListData = await queryClient.fetchQuery({
    queryKey: ["technologyList"],
    queryFn: getTechnologyList,
    staleTime: 30 * 60 * 1000,
  });

  const filtersData = await queryClient.fetchQuery({
    queryKey: ["solutionFiltersAndBrowseByRoles"],
    queryFn: getSolutionFiltersAndBrowseByRoles,
    staleTime: 30 * 60 * 1000,
  });

  const groupsAndViews = await queryClient.fetchQuery({
    queryKey: ["groupsAndViews"],
    queryFn: getGroupsAndViews,
    staleTime: 30 * 60 * 1000,
  });

  // Calculate filters with count based on the fetched data
  function countSolutionsForFilters(filters: any, solutions: any) {
    let result: any = [];

    filters?.forEach((filter: any) => {
      let filterResult: any = {
        name: filter.name,
        displayName: filter.displayName,
        type: filter.type,
        values: [],
      };

      filter.values?.forEach((filterValue: any) => {
        let count = 0;

        if (filter.name === "myTechnology") {
          count = solutions.filter(
            (solution: any) => solution.myTechnology === "1"
          ).length;
        } else if (filter.name === "myFavoriteTechnology") {
          count = solutions.filter(
            (solution: any) => solution.myFavoriteTechnology === "1"
          ).length;
        } else if (filter.name === "isWaitlist") {
          count = solutions.filter(
            (solution: any) => solution.isWaitlist === "1"
          ).length;
        } else {
          count = solutions.filter((solution: any) => {
            return solution[filter.name]?.includes(filterValue);
          }).length;
        }

        filterResult.values.push({ value: filterValue, count: count });
      });

      result.push(filterResult);
    });

    return result;
  }

  const mySolutionsStaticFilters = [
    {
      displayName: "My solutions",
      name: "myTechnology",
      type: "CheckBox",
      values: ["My solutions"],
    },
    {
      displayName: "Solutions I follow",
      name: "myFavoriteTechnology",
      type: "CheckBox",
      values: ["Solutions I follow"],
    },
    {
      displayName: "Waitlisted Solutions",
      name: "isWaitlist",
      type: "CheckBox",
      values: ["Waitlisted Solutions"],
    },
  ];

  // Calculate filters with count on the server
  const filtersWithCount = countSolutionsForFilters(
    [...filtersData.solutionListFilters, ...mySolutionsStaticFilters],
    technologyListData.technologyDetails
  );

  // Dehydrate the query client state
  const dehydratedState = dehydrate(queryClient);

  // Pass the dehydrated state and filtersWithCount to the client component
  return (
    <TechnologyListPage
      initialData={{ ...dehydratedState, filtersWithCount }}
    />
  );
}
