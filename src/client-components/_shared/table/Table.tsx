import React from "react";
import styled from "styled-components";

import { ITechnologyDetails, IColumn } from "../../../api/models";
import TechnologyRow from "./TableRow";
import {
  ws,
  borderColors,
  whitespace,
  numericValue,
} from "../../../styles/constants";
import { remCalc } from "../../../styles/functions";
import Arrow from "../../../styles/assets/icons/arrow-down-small.svg";
import SortArrows from "../../../styles/assets/icons/sort-arrows.svg";
import { EXCLUDE_COLUMN_TO_SORT } from "../../technology-list-page/constants";

interface TableProps {
  techList: ITechnologyDetails[];
  columns: IColumn[];
  loadRestrictTableData: number;
  handleTableSort: (column: string, order: string) => void;
  columnToSort: string;
  sortOrder: string;
  isFilterOpen?: boolean;
  searchText?: string;
}

interface TableHeadProps {
  order: string;
}

const TableWrapper = styled.div`
  overflow-x: auto;

  > table {
    width: 100%;
  }
`;

const TableRow = styled.tr`
  white-space: nowrap;
  border-bottom: ${remCalc(0.96)} solid ${borderColors.standard};
`;

const TableHead = styled.th`
  padding: ${ws.padding} ${whitespace.xs};
  font-size: ${remCalc(14)};
  line-height: 1.2em;
  font-weight: ${numericValue.value600};
`;

const TableHeading = styled.span`
  cursor: pointer;
  display: flex;
`;

const ToggleArrow = styled.span<TableHeadProps>`
  svg {
    transform: ${(props) =>
      props.order === "desc" ? "rotate(0deg)" : "rotate(-180deg)"};
    transition: transform 0.3s ease-in-out;
  }
`;

const ArrowUpDown = styled.span`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Table = ({
  techList,
  columns,
  handleTableSort,
  sortOrder,
  columnToSort,
  loadRestrictTableData,
  isFilterOpen,
  searchText,
}: TableProps) => {
  const handleSort = (column: string, order: string): void => {
    const sortDirection = column === columnToSort ? order : "asc";
    handleTableSort(column, sortDirection);
  };

  // Toggle sort order
  const nextSortOrder = sortOrder === "desc" ? "asc" : "desc";

  return (
    <TableWrapper>
      <table>
        <thead>
          <TableRow>
            {columns.map((column, key) => (
              <TableHead
                key={key}
                onClick={() =>
                  column.value !== EXCLUDE_COLUMN_TO_SORT.projectCategories &&
                  handleSort(column.value, nextSortOrder)
                }
              >
                <TableHeading>
                  {column.displayName}&nbsp;&nbsp;
                  {column.value !== EXCLUDE_COLUMN_TO_SORT.projectCategories &&
                    (column.value === columnToSort ? (
                      <ToggleArrow order={sortOrder}>
                        <Arrow />
                      </ToggleArrow>
                    ) : (
                      <ArrowUpDown>
                        <SortArrows />
                      </ArrowUpDown>
                    ))}
                </TableHeading>
              </TableHead>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {techList.slice(0, loadRestrictTableData).map((technology, key) => (
            <TechnologyRow
              key={key}
              technology={technology}
              columns={columns}
              isFilterOpen={isFilterOpen}
              searchText={searchText}
            />
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default Table;
