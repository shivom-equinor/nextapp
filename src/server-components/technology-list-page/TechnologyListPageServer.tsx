import {
  getGroupsAndViews,
  getSolutionFiltersAndBrowseByRoles,
  getTechnologyList,
  // getTechnologyListDetails,
} from "@/api/technologyAPIs";
import TechnologyListPage from "@/client-components/technology-list-page/TechnologyListPage";

const fetchTechnologies = async () => {
  const response = await getTechnologyList();

  // const response = await getTechnologyListDetails("Default", "All solutions");
  return response;
};

const fetchFilters = async () => {
  const response = await getSolutionFiltersAndBrowseByRoles();
  return response;
};

const fetchGroupsAndViews = async () => {
  const response = await getGroupsAndViews();
  return response;
};

const TechnologyListPageServer = async () => {
  const [technologiesList, filters, groupsAndViews] = await Promise.all([
    fetchTechnologies(),
    fetchFilters(),
    fetchGroupsAndViews(),
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

  return (
    <TechnologyListPage
      technologyList={technologiesList}
      filters={updatedFilters}
      groupsAndViews={groupsAndViews}
    />
  );
};

export default TechnologyListPageServer;
