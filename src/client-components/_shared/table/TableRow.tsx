import React, { useRef } from "react";
import styled, { css } from "styled-components";

import { ITechnologyDetails, IColumn } from "@/api/models";
import Tag from "../Tag";
import Link from "../links/Link";
import ClickableArea from "../../../helpers/ClickableArea";
import { remCalc } from "../../../styles/functions";
import {
  colors,
  interactiveColors,
  borderColors,
  errorColors,
  textColor,
  transitions,
  ws,
  whitespace,
  numericValue,
} from "../../../styles/constants";
import { technologyStatus } from "../../_shared/constants";
import ContentWithHighlightedSearchText from "../../technology-list-page/_shared/ContentWithHighlightedSearchText";

interface TableProps {
  technology: ITechnologyDetails;
  columns: IColumn[];
  isFilterOpen?: boolean;
  searchText?: string;
}

interface TableColProps {
  isFilterOpen?: boolean;
}

const StyledRow = styled<any>(ClickableArea)`
  transition: ${transitions.bgHover};
  cursor: pointer;
  border-bottom: ${remCalc(0.96)} solid ${borderColors.standard};
  box-sizing: border-box;

  :hover {
    background-color: ${interactiveColors.bgHover};
  }
`;

const Title = styled(Link)`
  color: ${textColor};
  text-decoration: none;
  span {
    text-decoration: none;
  }
  :hover {
    color: ${textColor};
    text-decoration: none;
  }
`;

const TechIDStyles = css`
  :nth-child(2) {
    width: 8rem;
    max-width: 8rem;
  }
`;

const TableData = styled.td<TableColProps>`
  padding: ${ws.padding} ${whitespace.xs};
  word-break: break-word;
  line-height: 1.2em;
  font-size: ${remCalc(14)};

  max-width: 12rem;
  ${(props) => props.isFilterOpen && TechIDStyles}

  -webkit-transition: width 0.3s ease-in-out, max-width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out, max-width 0.3s ease-in-out;
`;

const Overdue = styled.div`
  color: ${errorColors.text};
  font-weight: ${numericValue.value500};
  text-align: center;
`;

const Textcenter = styled.div`
  text-align: center;
`;

const ProjectCategoryCount = styled.div`
  color: ${colors.mossGreen.standard};
  font-weight: ${numericValue.value600};
`;

const TechnologyRow = ({
  technology,
  columns,
  isFilterOpen,
  searchText,
}: TableProps) => {
  const linkRef: any = useRef();

  const renderCell = (
    technology: ITechnologyDetails,
    value: keyof ITechnologyDetails
  ) => {
    switch (value) {
      case "projectCategories":
        return (
          technology.projectCategories &&
          technology.projectCategories.length > 0 && (
            <div>
              {technology.projectCategories.length > 2 ? (
                <>
                  <div>
                    {technology.projectCategories.slice(0, 2).join(", ")}
                  </div>
                  <ProjectCategoryCount>
                    {`+${technology.projectCategories.length - 2}`}
                  </ProjectCategoryCount>
                </>
              ) : (
                <div>{technology.projectCategories.join(", ")}</div>
              )}
            </div>
          )
        );
      case "status":
        return (
          technology.status && (
            <Tag
              label={technology.status}
              backgroundColor={
                technology.status.toLowerCase().trim() ===
                  technologyStatus.stopped ||
                technology.status.toLowerCase().trim() ===
                  technologyStatus.replaced ||
                technology.status.toLowerCase().trim() ===
                  technologyStatus.obsolete
                  ? colors.red.energic
                  : colors.lichenGreen.standard
              }
            />
          )
        );
      case "phase":
        return (
          technology.currentStage && <Tag label={technology.currentStage} />
        );
      case "nextTDGDate":
        return technology.nextTDGDate &&
          technology.isNextTDGOverDue &&
          technology.isNextTDGOverDue === "1" ? (
          <Overdue>
            <div>{technology.nextTDGDate}</div>
            <div>Overdue</div>
          </Overdue>
        ) : (
          <Textcenter>
            <div>{technology.nextTDGDate}</div>
          </Textcenter>
        );
      case "technologyName":
        return (
          <Title
            to={`${technology.technologyPageURL}/summary`}
            // innerRef={linkRef}
            prefetch={false}
          >
            {searchText ? (
              <ContentWithHighlightedSearchText
                content={technology.technologyName}
                searchText={searchText}
              />
            ) : (
              technology.technologyName
            )}
          </Title>
        );
      case "techId":
        return (
          <>
            {searchText ? (
              <ContentWithHighlightedSearchText
                content={technology.techId}
                searchText={searchText}
              />
            ) : (
              technology.techId
            )}
          </>
        );
      default:
        return technology[value];
    }
  };

  return (
    <StyledRow linkRef={linkRef} type="tr">
      {columns.map((column, key) => (
        <TableData key={key} isFilterOpen={isFilterOpen}>
          {renderCell(technology, column.value)}
        </TableData>
      ))}
    </StyledRow>
  );
};

export default TechnologyRow;
