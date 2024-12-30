import React, { useState, useEffect } from "react";
import orderBy from "lodash/orderBy";
import styled, { keyframes } from "styled-components";

import {
  ITechnologyDetails,
  ISelectedFilters,
  IColumn,
} from "../../modals/TechnologyListModals";
import SectionBlock from "../_shared/SectionBlock";
import StandardTable from "../_shared/table/Table";
import {
  ws,
  whitespace,
  fontStyle,
  numericValue,
} from "../../styles/constants";
import { remCalc } from "../../styles/functions";
import {
  SecondaryButton,
  TertiaryButton,
  PrimaryButton,
} from "../_shared/buttons";
import Filter from "../../styles/assets/icons/filter.svg";
import * as constants from "./constants";
import ArrowDown from "../../styles/assets/icons/arrow-down-small.svg";
import {
  TechListSkeleton,
  CountSkeleton,
} from "../_shared/skeleton-screens/TechListSkeleton";
import ToggleButton from "./ToggleButton";
import TileView from "./TileView";

interface TechnologyListPageProps {
  isLoading: boolean;
  isFetchingSolutionList: boolean;
  techList: ITechnologyDetails[];
  columns: IColumn[];
  filters: ISelectedFilters;
  selectedMyRole?: string;
  selectedGroup: string;
  defaultView: string;
  hasUnsavedChange: boolean;
  isFilterOpen?: boolean;
  searchValue?: string;
  solnOrgSearchTerm?: string;
  handleUnsavedChange: (hasUnsavedChange: boolean) => void;
  handleToggle?: () => void;
  handleDefaultView: (pageView: string) => void;
}

interface ButtonWrapperProps {
  isFilterOpen: boolean;
}

const TopRow = styled.div`
  display: flex;
  align-items: center;
  min-height: ${remCalc(44)};
  margin-bottom: ${ws.padding};
`;

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  display: flex;
  flex: 1;

  > button {
    max-height: ${remCalc(44)};
  }
  ${(props) => props.isFilterOpen && `> div { margin-left: ${whitespace.l}; }`}
`;

const ShowCount = styled.div`
  display: flex;
  justify-content: flex-end;

  font-weight: ${numericValue.value500};
  font-size: ${remCalc(14)};
`;

//View more button Parent CSS styling
const ViewMoreButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${ws.padding};
`;

const FavBtnWrapper = styled.div`
  height: 70px;

  > button {
    padding: ${remCalc(7)} ${remCalc(17)};
  }
`;

const BlinkerUnsavedMsg = keyframes`
  50% {
    opacity: 0;
  }
`;

const UnsavedFavMessage = styled.div`
  font-weight: ${numericValue.value500};
  font-size: ${remCalc(14)};
  font-style: ${fontStyle.italic};
  animation: ${BlinkerUnsavedMsg} 3s linear infinite;

  margin-top: ${whitespace.xs};
`;

const TechnologyListContainer = ({
  isFetchingSolutionList,
  techList,
  isLoading,
  columns,
  isFilterOpen,
  handleToggle,
  searchValue,
  defaultView,
  hasUnsavedChange,
  handleDefaultView,
}: TechnologyListPageProps) => {
  // Local state
  const [showCount, setShowCount] = useState(constants.AMOUNT_PER_LOAD);
  const [columnToSort, setColumnToSort] = useState(constants.DEFAULT_COLUMN);
  const [sortOrder, setSortOrder] = useState(constants.ORDER);

  // Set the state for toggle button
  // Default is table view
  // When user comes from search field tile view is set
  const [isTileViewVisible, setIsTileViewVisible] = useState(false);

  useEffect(() => {
    setIsTileViewVisible(defaultView === constants.TILE_VIEW);
  }, [defaultView]);

  // Show 15 more techs in list when clicking "view more"-button
  const viewMoreResults = () =>
    setShowCount(showCount + constants.AMOUNT_PER_LOAD);

  const handleToggleView = (selectedView: string) => {
    if (selectedView === constants.TILE_VIEW) {
      setIsTileViewVisible(true);
      handleDefaultView(constants.TILE_VIEW);
    } else {
      handleDefaultView(constants.TABLE_VIEW);
    }
  };

  // Handling sort
  const handleTableSort = (value: string, order: string): void => {
    setColumnToSort(value);
    setSortOrder(order);
  };

  // Create sorted list of technologies
  const finalTechList =
    techList &&
    orderBy(
      techList.map((item) => {
        item.technologyName = item.technologyName && item.technologyName.trim();
        item.techId = item.techId && item.techId.trim();
        item.communication = item.communication && item.communication.trim();
        item.status = item.status && item.status.trim();
        item.phase = item.currentStage && item.currentStage.trim();
        item.technologyCategory =
          item.technologyCategory && item.technologyCategory.trim();
        item.trl = item.trl && item.trl.trim();
        item.nextTDGDate = item.nextTDGDate && item.nextTDGDate.trim();
        return item;
      }),
      [
        columnToSort === "nextTDGDate"
          ? (columnToSort) => {
              if (columnToSort.nextTDGDate) {
                let dateArray: any = columnToSort.nextTDGDate.split(".");
                [dateArray[0], dateArray[1]] = dateArray && [
                  dateArray[1],
                  dateArray[0],
                ];
                return new Date(dateArray.toString().replace(/,/g, "-"));
              }
            }
          : columnToSort === "technologyName"
          ? (columnToSort) => {
              return (
                columnToSort.technologyName &&
                columnToSort.technologyName.toLowerCase()
              );
            }
          : columnToSort,
      ],
      [sortOrder === "desc" ? "desc" : "asc"]
    );

  return (
    <SectionBlock>
      <TopRow>
        <ButtonWrapper isFilterOpen={!isFilterOpen}>
          {!isFilterOpen && (
            <SecondaryButton
              icon={Filter}
              label="FILTERS"
              onClick={handleToggle}
            />
          )}

          {isFetchingSolutionList ? (
            <CountSkeleton />
          ) : (
            <FavBtnWrapper>
              <PrimaryButton
                label={"Add to my favourite search"}
                onClick={() => {}}
                disabled={false}
              />
              {hasUnsavedChange && (
                <UnsavedFavMessage>
                  {constants.UNSAVED_CHANGES_MSG}
                </UnsavedFavMessage>
              )}
            </FavBtnWrapper>
          )}
        </ButtonWrapper>

        {isFetchingSolutionList ? (
          <CountSkeleton />
        ) : (
          techList &&
          techList.length > 0 && (
            <div>
              <ToggleButton
                defaultView={defaultView}
                handleToggleChange={(value) => handleToggleView(value)}
              />

              <ShowCount>
                {finalTechList.length === 1
                  ? `${finalTechList.length} result`
                  : `${finalTechList.length} results`}{" "}
                found
              </ShowCount>
            </div>
          )
        )}
      </TopRow>

      {isFetchingSolutionList ? (
        <TechListSkeleton />
      ) : finalTechList && finalTechList.length > 0 ? (
        <>
          {isTileViewVisible ? (
            <TileView
              techList={finalTechList}
              searchText={searchValue}
              loadMoreData={showCount}
              handleViewMore={viewMoreResults}
            />
          ) : (
            <>
              {columns && columns.length > 0 && (
                <StandardTable
                  columns={columns}
                  techList={finalTechList}
                  handleTableSort={handleTableSort}
                  columnToSort={columnToSort}
                  sortOrder={sortOrder}
                  loadRestrictTableData={showCount}
                  isFilterOpen={isFilterOpen}
                  searchText={searchValue}
                />
              )}

              {finalTechList &&
                finalTechList.length > constants.AMOUNT_PER_LOAD &&
                !(showCount >= finalTechList.length) && (
                  <ViewMoreButtonContainer>
                    <TertiaryButton
                      label="View more"
                      icon={ArrowDown}
                      onClick={viewMoreResults}
                      iconPositionLeft={false}
                    />
                  </ViewMoreButtonContainer>
                )}
            </>
          )}
        </>
      ) : (
        <p>Could not find any solutions.</p>
      )}
    </SectionBlock>
  );
};

export default TechnologyListContainer;
