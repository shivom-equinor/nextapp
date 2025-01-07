import React from "react";
import styled from "styled-components";

import { ITechnologyDetails } from "@/api/models";
import SolutionTile from "./SolutionTile";
import { AMOUNT_PER_LOAD } from "./constants";
import { TertiaryButton } from "../_shared/buttons";
import ArrowDown from "../../styles/assets/icons/arrow-down-small.svg";
import { whitespace } from "../../styles/constants";

interface TileViewProps {
  techList: ITechnologyDetails[];
  loadMoreData: number;
  handleViewMore: () => void;
  searchText?: string;
}

const ViewMoreButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${whitespace.m};
`;

const TileView: React.FC<TileViewProps> = ({
  techList,
  searchText,
  loadMoreData,
  handleViewMore,
}) => {
  return (
    <>
      {/* Solution tile list */}
      {techList.slice(0, loadMoreData).map((technology, key) => (
        <SolutionTile
          key={key}
          technology={technology}
          searchText={searchText}
        />
      ))}

      {/* View more button */}
      {techList &&
        techList.length > AMOUNT_PER_LOAD &&
        !(loadMoreData >= techList.length) && (
          <ViewMoreButtonContainer>
            <TertiaryButton
              label="View more"
              icon={ArrowDown}
              onClick={handleViewMore}
              iconPositionLeft={false}
            />
          </ViewMoreButtonContainer>
        )}
    </>
  );
};

export default TileView;
