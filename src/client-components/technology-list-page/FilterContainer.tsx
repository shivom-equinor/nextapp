import React, { useEffect } from "react";
import styled from "styled-components";

import SectionBlock from "../_shared/SectionBlock";
import FilterSection from "./FilterSection";
import { IFilterSectionUpdated, ITechnologyDetails } from "@/api/models";
import { SecondaryButton } from "../_shared/buttons";
import Arrow from "../../styles/assets/icons/arrow-long-left.svg";
import { ws } from "../../styles/constants";
import ClearFilters from "./ClearFilters";
import { AccordionSkeleton } from "../_shared/skeleton-screens/AccordionSkeleton";
import { IFilterAndCountDetails } from "./models";

/* This component should be connected to state just like in "technologylistpage.tsx", and send relevant states as props to smaller components  */
interface FilterContainerProps {
  filterSections: IFilterSectionUpdated[];
  isFetching: boolean;
  isLoading: boolean;
  solnOrgSearchTerm: string;
  selectedGroup: string;
  selectedView: string;
  solutionList: ITechnologyDetails[];
  selectedFilters: any;
  handleToggle: () => void;
  handleSolnOrgSearch: (value: string) => void;
  handleSelectedFilter: (key: string, value: string) => void;
}

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${ws.padding};
`;

const FilterContainer: React.FunctionComponent<FilterContainerProps> = ({
  isLoading,
  filterSections,
  solnOrgSearchTerm,
  handleToggle,
  handleSolnOrgSearch,
  isFetching,
  solutionList,
  selectedGroup,
  selectedView,
  selectedFilters,
  handleSelectedFilter,
}) => {
  const filterWithMySolutions: IFilterSectionUpdated = {
    displayName: "My solutions",
    name: "myTechnology",
    type: "CheckBox",
    values: ["My solutions"],
  };

  const filterWithSolutionsIFollow: IFilterSectionUpdated = {
    displayName: "Solutions I follow",
    name: "myFavoriteTechnology",
    type: "CheckBox",
    values: ["Solutions I follow"],
  };

  const filterWithIsWaitlist: IFilterSectionUpdated = {
    displayName: "Waitlisted Solutions",
    name: "isWaitlist",
    type: "CheckBox",
    values: ["Waitlisted Solutions"],
  };

  const close = () => handleToggle();

  return (
    <>
      <SectionBlock>
        <TopRow>
          <SecondaryButton
            icon={Arrow}
            label="FILTERS"
            onClick={close}
            disabled={false}
          />
          <ClearFilters
            handleSolnOrgSearch={handleSolnOrgSearch}
            solnOrgSearchTerm={solnOrgSearchTerm}
          />
        </TopRow>

        {/* My solutions & I follow filter */}
        {isFetching || isLoading ? (
          <AccordionSkeleton numberOfSections={2} />
        ) : (
          <>
            {filterSections &&
              filterSections.length > 0 &&
              filterSections
                .filter(
                  (filterValue: any) =>
                    filterValue.displayName ===
                      filterWithMySolutions.displayName ||
                    filterValue.displayName ===
                      filterWithSolutionsIFollow.displayName ||
                    filterValue.displayName === filterWithIsWaitlist.displayName
                )
                .map((filterOption: any, index: number) => {
                  return (
                    <FilterSection
                      key={index}
                      filterData={filterOption}
                      showHeading={false}
                      borderBottom={false}
                      selectedFilters={selectedFilters}
                      handleSelectedFilter={handleSelectedFilter}
                    />
                  );
                })}
          </>
        )}

        {/* Other filters */}
        {isFetching || isLoading ? (
          <AccordionSkeleton numberOfSections={8} />
        ) : (
          filterSections &&
          filterSections.length > 0 &&
          filterSections
            .filter(
              (filterDetails: any) =>
                filterDetails.displayName !==
                  filterWithSolutionsIFollow.displayName &&
                filterDetails.displayName !==
                  filterWithMySolutions.displayName &&
                filterDetails.displayName !== filterWithIsWaitlist.displayName
            )
            .map((section: any, key: number) => (
              <FilterSection
                key={key}
                filterData={section}
                solnOrgSearchTerm={solnOrgSearchTerm}
                selectedFilters={selectedFilters}
                handleSolnOrgSearch={handleSolnOrgSearch}
                handleSelectedFilter={handleSelectedFilter}
              />
            ))
        )}
      </SectionBlock>
    </>
  );
};

export default FilterContainer;
