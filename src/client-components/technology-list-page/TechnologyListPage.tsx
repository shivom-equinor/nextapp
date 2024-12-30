"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";

import TechnologyListContainer from "./TechnologyListContainer";
import FilterContainer from "./FilterContainer";
import BrowseByContainer from "./BrowseByContainer";
import { numericValue, whitespace } from "../../styles/constants";
import { remCalc } from "../../styles/functions";
import { TABLE_VIEW } from "./constants";
import { ITechnologyDetails } from "../../api/models";
import {
  getGroupsAndViews,
  getSolutionFiltersAndBrowseByRoles,
  getTechnologyList,
  getTechnologyListDetails,
} from "@/api/technologyAPIs";
import { IFilterSectionUpdated } from "@/modals/TechnologyListModals";

interface TechnologyListProps {
  technologyList: any;
  filters: any;
  groupsAndViews: any;
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

const TechnologyListPage: React.FC<TechnologyListProps> = ({
  technologyList,
  filters,
  groupsAndViews,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [solnOrgSearchTerm, setSolnOrgSearchTerm] = useState("");
  const [defaultView, setDefaultView] = useState(TABLE_VIEW);
  const [hasUnsavedChange, setHasUnsavedChange] = useState(false);
  const groupName = "Default";
  const viewName = "All solutions";
  const [techList, setTechList] = useState(
    technologyList ? technologyList : null
  );
  const [isFetchingSolutionList, setIsFetchingSolutionList] = useState(false);
  const [isFetchingFilters, setIsFetchingFilters] = useState(false);
  const [columns, setColumns] = useState(filters?.solutionListColumns);
  const [allFilters, setFilters] = useState(filters?.solutionListFilters);
  const [browseByRoles, setBrowseByRoles] = useState(filters?.browseByRoles);
  const [groupAndViewName, setGroupAndViewName] = useState(
    groupsAndViews ? groupsAndViews : []
  );
  // const mySolutionsStaticFilters = [
  //   {
  //     displayName: "My solutions",
  //     name: "myTechnology",
  //     type: "CheckBox",
  //     values: ["My solutions"],
  //   },
  //   {
  //     displayName: "Solutions I follow",
  //     name: "myFavoriteTechnology",
  //     type: "CheckBox",
  //     values: ["Solutions I follow"],
  //   },
  //   {
  //     displayName: "Waitlisted Solutions",
  //     name: "isWaitlist",
  //     type: "CheckBox",
  //     values: ["Waitlisted Solutions"],
  //   },
  // ];

  const handleSearch = (value: string): void => setSearchTerm(value);
  const handleSolnOrgSearch = (value: string): void =>
    setSolnOrgSearchTerm(value);
  const handleToggle = () => setIsFilterOpen(!isFilterOpen);
  const handleUnsavedChange = (hasUnsavedChange: boolean) =>
    setHasUnsavedChange(hasUnsavedChange);

  // useEffect(() => {
  //   setIsFetchingSolutionList(true);
  //   setIsFetchingFilters(true);
  //   getTechnologyList()
  //     .then((data: any) => {
  //       setTechList(data);
  //       setIsFetchingSolutionList(false); // TODO : use for skeleton loading
  //     })
  //     .catch(() => {
  //       setIsFetchingSolutionList(false);
  //     });

  //   getSolutionFiltersAndBrowseByRoles()
  //     .then((data: any) => {
  //       setBrowseByRoles(data.browseByRoles);
  //       setFilters([
  //         ...data.solutionListFilters,
  //         ...mySolutionsStaticFilters,
  //       ] as any);
  //       setColumns(data.solutionListColumns);
  //       setIsFetchingFilters(false); // TODO : use for skeleton loading
  //     })
  //     .catch(() => {
  //       setIsFetchingFilters(false);
  //     });

  //   getGroupsAndViews()
  //     .then((data: any) => {
  //       setGroupAndViewName(data);
  //       setIsFetchingFilters(false); // TODO : use for skeleton loading
  //     })
  //     .catch(() => {
  //       setIsFetchingFilters(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   setTechList(technologyList);
  //   setFilters(filters.solutionListFilters);
  //   setBrowseByRoles(filters.browseByRoles);
  //   setColumns(filters.solutionListColumns);
  //   setGroupAndViewName(groupsAndViews);
  // }, []);

  // useEffect(() => {
  //   getTechnologyListDetails("Default", "All solutions");
  // }, []);

  const handleDefaultView = (pageView: string) => setDefaultView(pageView);

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
