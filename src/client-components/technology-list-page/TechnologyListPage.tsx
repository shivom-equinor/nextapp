"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";

import TechnologyListContainer from "./TechnologyListContainer";
import FilterContainer from "./FilterContainer";
import BrowseByContainer from "./BrowseByContainer";
import { numericValue, whitespace } from "../../styles/constants";
import { remCalc } from "../../styles/functions";
import { TABLE_VIEW } from "./constants";
import { IFilterSectionUpdated } from "@/modals/TechnologyListModals";
import {
  getGroupsAndViews,
  getSolutionFiltersAndBrowseByRoles,
  getTechnologyList,
} from "@/api/technologyAPIs";
import { ITechnologyDetails } from "@/api/models";

interface TechnologyListProps {
  // technologyList: any;
  // filters: any;
  // groupsAndViews: any;
}

export interface ToggleProps {
  isFilterExpanded?: boolean;
}

const TechnologyListWrapper = styled.div<ToggleProps>`
  display: flex;

  @media (max-width: 992px) {
    flex-wrap: ${(props) => (props.isFilterExpanded ? "wrap" : "nowrap")};
  }
`;

const Filters = styled.div<ToggleProps>`
  flex-shrink: 0;
  width: ${(props) =>
    props.isFilterExpanded ? `${numericValue.value300}px` : "0px"};
  margin-right: ${(props) => (props.isFilterExpanded ? whitespace.m : "0px")};
  -webkit-transition: width 0.3s ease-in-out, margin-right 0.3s ease-in-out;
  transition: width 0.3s ease-in-out, margin-right 0.3s ease-in-out;
  overflow: hidden;

  @media (max-width: 992px) {
    margin-right: ${remCalc(0)};
  }
`;

const TechnologyList = styled.div<ToggleProps>`
  flex-grow: 1;
  margin-left: ${(props) => (props.isFilterExpanded ? whitespace.m : "0px")};
  width: ${(props) => (props.isFilterExpanded ? "calc(100% - 332px)" : "100%")};
  -webkit-transition: width 0.3s ease-in-out, margin-left 0.3s ease-in-out;
  transition: width 0.3s ease-in-out, margin-left 0.3s ease-in-out;

  @media (max-width: 992px) {
    margin-left: ${remCalc(0)};
    width: ${numericValue.value100}%;
  }
`;

const FavSearchSkeletonWrapper = styled.div`
  background-color: white;
  padding: ${whitespace.m};
`;

const SelectedFavSearch = styled.div`
  margin-bottom: ${whitespace.m};
  font-size: ${remCalc(14)};
  font-weight: ${numericValue.value500};
`;

const TechnologyListPage: React.FC<TechnologyListProps> = (
  {
    // technologyList,
    // filters,
    // groupsAndViews,
  }
) => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [solnOrgSearchTerm, setSolnOrgSearchTerm] = useState("");
  const [defaultView, setDefaultView] = useState(TABLE_VIEW);
  const [hasUnsavedChange, setHasUnsavedChange] = useState(false);
  const groupName = "Default";
  const viewName = "All solutions";
  const [techList, setTechList] = useState<any>(null);
  const [initialTechList, setInitialTechList] = useState<any>(null);
  const [isFetchingSolutionList, setIsFetchingSolutionList] = useState(true);
  const [isFetchingFilters, setIsFetchingFilters] = useState(true);
  const [columns, setColumns] = useState(null);
  const [allFilters, setFilters] = useState(null);
  const [browseByRoles, setBrowseByRoles] = useState(null);
  const [groupAndViewName, setGroupAndViewName] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
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

  const handleSearch = (value: string): void => setSearchTerm(value);
  const handleSolnOrgSearch = (value: string): void =>
    setSolnOrgSearchTerm(value);
  const handleToggle = () => setIsFilterOpen(!isFilterOpen);
  const handleUnsavedChange = (hasUnsavedChange: boolean) =>
    setHasUnsavedChange(hasUnsavedChange);

  useEffect(() => {
    getTechnologyList()
      .then((data: any) => {
        setTechList(data);
        setInitialTechList(data);
        setIsFetchingSolutionList(false); // TODO : use for skeleton loading
      })
      .catch(() => {
        setIsFetchingSolutionList(false);
      });

    getSolutionFiltersAndBrowseByRoles()
      .then((data: any) => {
        setBrowseByRoles(data.browseByRoles);
        setFilters([
          ...data.solutionListFilters,
          ...mySolutionsStaticFilters,
        ] as any);
        setColumns(data.solutionListColumns);
        setIsFetchingFilters(false); // TODO : use for skeleton loading
      })
      .catch(() => {
        setIsFetchingFilters(false);
      });

    getGroupsAndViews()
      .then((data: any) => {
        setGroupAndViewName(data);
      })
      .catch(() => {});
  }, []);

  const handleDefaultView = (pageView: string) => setDefaultView(pageView);

  // Function to dynamically filter values based on the filters object
  function filterValues(filters: any, values: any) {
    return values?.filter((value: any) => {
      // Handle "My solutions" filter with AND logic
      if (filters["myTechnology"]?.includes("My solutions")) {
        // Exclude records where myTechnology is not "1"
        if (value.myTechnology !== "1") {
          return false;
        }
      }

      if (filters["myFavoriteTechnology"]?.includes("Solutions I follow")) {
        // Only include records with myTechnology = "1"
        if (value.myFavoriteTechnology !== "1") {
          return false; // Exclude the record
        }
      }

      if (filters["isWaitlist"]?.includes("Waitlisted Solutions")) {
        // Only include records with myTechnology = "1"
        if (value.isWaitlist !== "1") {
          return false; // Exclude the record
        }
      }

      // Process other filters
      return Object.entries(filters).every(([key, filterValues]) => {
        // Skip "My solutions" as it's already handled
        if (
          key === "myTechnology" ||
          key === "myFavoriteTechnology" ||
          key === "isWaitlist"
        )
          return true;

        // Special handling for projectCategory (array of values)
        if (key === "projectCategories" && Array.isArray(filterValues)) {
          // Ensure that any value in the filterValues array matches the value in value[key]
          return filterValues.some((category: any) =>
            value[key]?.includes(category)
          );
        }

        if (Array.isArray(filterValues)) {
          // OR logic for each filter key
          return filterValues.includes(value[key]);
        }
        return true; // If no filters exist for this key, pass the check
      });
    });
  }

  // Adding filters dynamically
  const addFilter = (filterKey: string, filterValue: string) => {
    setSelectedFilters((prevFilters) => {
      // Create a copy of the previous filters
      const updatedFilters: any = { ...prevFilters };

      if (updatedFilters[filterKey]) {
        // If the filterKey already exists, check if the value exists
        if (updatedFilters[filterKey].includes(filterValue)) {
          // If the value exists, remove it
          updatedFilters[filterKey] = updatedFilters[filterKey].filter(
            (value: any) => value !== filterValue
          );

          // If the array becomes empty, remove the key from the filters
          if (updatedFilters[filterKey].length === 0) {
            delete updatedFilters[filterKey];
          }
        } else {
          // If the value does not exist, add it
          updatedFilters[filterKey].push(filterValue);
        }
      } else {
        // If the filterKey does not exist, initialize it with the new value
        updatedFilters[filterKey] = [filterValue];
      }

      return updatedFilters;
    });
  };

  useEffect(() => {
    // Applying the filters
    const filteredValues = filterValues(
      selectedFilters,
      initialTechList?.technologyDetails
    );
    if (Object.keys(selectedFilters).length === 0) {
      setTechList(initialTechList);
    } else {
      setTechList({ ...initialTechList, technologyDetails: filteredValues });
    }
  }, [selectedFilters, initialTechList]);

  useEffect(() => {
    function countSolutionsForFilters(filters: any, solutions: any) {
      console.log("filters", filters);
      console.log("solutions", solutions);
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
      console.log("result", result);
      return result;
    }

    const filtersWithCount = countSolutionsForFilters(
      allFilters,
      initialTechList?.technologyDetails
    );

    setFilters(filtersWithCount);
  }, [isFetchingFilters, isFetchingSolutionList]);

  return (
    <>
      <h1>Solutions</h1>

      <TechnologyListWrapper isFilterExpanded={isFilterOpen}>
        <Filters isFilterExpanded={isFilterOpen}>
          <FilterContainer
            selectedGroup={groupName}
            selectedView={viewName}
            handleToggle={handleToggle}
            solnOrgSearchTerm={solnOrgSearchTerm}
            handleSolnOrgSearch={handleSolnOrgSearch}
            isLoading={isFetchingFilters}
            filterSections={allFilters as unknown as IFilterSectionUpdated[]}
            isFetching={isFetchingFilters}
            solutionList={techList as unknown as ITechnologyDetails[]}
            selectedFilters={selectedFilters}
            handleSelectedFilter={addFilter}
          />
        </Filters>
        <TechnologyList isFilterExpanded={isFilterOpen}>
          <BrowseByContainer
            searchValue={searchTerm}
            isFilterOpen={isFilterOpen}
            browseByRoles={browseByRoles}
            groupsAndViews={groupAndViewName}
            selectedGroup={groupName}
            selectedView={viewName}
            selectedMyRole={""}
          />
          <TechnologyListContainer
            isFetchingSolutionList={isFetchingSolutionList}
            techList={
              techList?.technologyDetails as unknown as ITechnologyDetails[]
            }
            isFilterOpen={isFilterOpen}
            handleToggle={handleToggle}
            searchValue={searchTerm}
            solnOrgSearchTerm={solnOrgSearchTerm}
            defaultView={defaultView}
            hasUnsavedChange={hasUnsavedChange}
            handleUnsavedChange={handleUnsavedChange}
            isLoading={isFetchingSolutionList}
            filters={allFilters}
            columns={columns}
            selectedGroup={groupName}
            handleDefaultView={handleDefaultView}
          />
        </TechnologyList>
      </TechnologyListWrapper>
    </>
  );
};

export default TechnologyListPage;
