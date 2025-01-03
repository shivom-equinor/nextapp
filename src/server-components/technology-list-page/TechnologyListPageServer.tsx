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

  const updatedFilters = {
    ...filters,
    solutionListFilters: [
      ...filters.solutionListFilters,
      ...mySolutionsStaticFilters,
    ],
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
export const revalidate = 1800; // Revalidate the page every 60 seconds

export default TechnologyListPageServer;
