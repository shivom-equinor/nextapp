import {
  getGroupsAndViews,
  getSolutionFiltersAndBrowseByRoles,
  getTechnologyList,
} from "@/api/technologyAPIs";
import TechnologyListPage from "@/client-components/technology-list-page/TechnologyListPage";

// Function to fetch all required data for the page
const fetchData = async () => {
  const [technologiesList, filters, groupsAndViews] = await Promise.all([
    getTechnologyList(),
    getSolutionFiltersAndBrowseByRoles(),
    getGroupsAndViews(),
  ]);

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

  function countSolutionsForFilters(filters: any, solutions: any) {
    let result: any = [];

    // Iterate through each filter object in the filters array
    filters?.forEach((filter: any) => {
      let filterResult: any = {
        name: filter.name,
        displayName: filter.displayName,
        type: filter.type,
        values: [],
      };

      // For each value in the filter's values array
      filter.values?.forEach((filterValue: any) => {
        let count = 0;

        // Special handling for the "myTechnology" filter
        if (filter.name === "myTechnology") {
          // Count all solutions where myTechnology value is "1"
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
          // For other filters, count how many solutions match the current filter value
          count = solutions.filter((solution: any) => {
            return solution[filter.name]?.includes(filterValue);
          }).length;
        }

        // Push the value and its count into the filter's result
        filterResult.values.push({ value: filterValue, count: count });
      });

      // Add this filter's result to the main result array
      result.push(filterResult);
    });

    return result;
  }

  const solutionListFilters = [
    ...filters.solutionListFilters,
    ...mySolutionsStaticFilters,
  ];

  const filtersWithCount = countSolutionsForFilters(
    solutionListFilters,
    technologiesList?.technologyDetails
  );

  const updatedFilters = {
    ...filters,
    solutionListFilters: filtersWithCount,
  };

  return {
    technologiesList,
    updatedFilters,
    groupsAndViews,
  };
};

// Static generation using the new approach
const TechnologyListPageServer = async () => {
  const { technologiesList, updatedFilters, groupsAndViews } =
    await fetchData();

  return (
    <TechnologyListPage
      technologyList={technologiesList}
      filters={updatedFilters}
      groupsAndViews={groupsAndViews}
    />
  );
};

// Set revalidation time for ISR (Incremental Static Regeneration)
export const revalidate = 1800000; // Revalidate the page every 60 seconds

export default TechnologyListPageServer;
