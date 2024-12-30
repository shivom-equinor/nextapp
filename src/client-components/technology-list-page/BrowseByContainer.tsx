import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { DropdownProps } from "semantic-ui-react";
import uniqueId from "lodash/uniqueId";

import SectionBlock from "../_shared/SectionBlock";
import DropdownSelectHierarchy, {
  IOptionSection,
  ISelectedOption,
} from "../_shared/form-elements/DropdownSelectHierarchy";
import DropdownSelect from "../_shared/form-elements/DropdownSelect";
import { IGroupAndView } from "../../api/models";
import { BrowseByAndSearchBySkeleton } from "../_shared/skeleton-screens/BrowseByAndSearchBySkeleton";
import { remCalc } from "../../styles/functions";
import {
  whitespace,
  colors,
  borderColors,
  errorColors,
  clearBtnColor,
  fontStyle,
  numericValue,
} from "../../styles/constants";
import { ISelectOption } from "../_shared/form-elements/_framework/formModels";
import { IOptions } from "../_shared/form-elements/DropdownSelect";
import {
  MIN_CHAR_LIMIT,
  MAX_CHAR_LIMIT,
  MIN_CHAR_LIMIT_MSG,
  MAX_CHAR_LIMIT_MSG,
} from "./constants";
import Close from "../../styles/assets/icons/x.svg";
import { Button } from "../_shared/buttons/Button";

interface BrowseByProps {
  groupsAndViews: IGroupAndView[];
  selectedGroup: string;
  selectedView: string;
  selectedMyRole: string;
  browseByRoles: ISelectOption[];
  searchValue: string;
  isFilterOpen: boolean;
}

interface FilterProps {
  isFilterOpen: boolean;
}

const MainSection = styled(SectionBlock)`
  display: flex;
  flex-direction: column;
`;

const BrowseBySection = styled.div<FilterProps>`
  display: flex;
  width: ${(props) => (props.isFilterOpen ? "100%" : "70%")};
  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
  > div:nth-child(1) {
    width: 65%;
  }
  > div:nth-child(2) {
    width: 35%;
    > div > div {
      width: ${numericValue.value100}%;
    }
  }
`;

const BrowseByRoleStyles = css`
  margin-left: ${whitespace.l};
  @media (max-width: 992px) {
    margin: ${whitespace.l} ${remCalc(0)} ${remCalc(0)};
  }
`;

const BrowseByRole = styled.div`
  ${BrowseByRoleStyles}
  > div {
    display: block;

    > label {
      display: block;
      font-size: ${remCalc(14)};
      line-height: 1.2rem;
      font-weight: ${numericValue.value600};
      margin-bottom: 0.5rem;
    }
  }
`;

const HelpText = styled.span`
  margin-bottom: 1rem;
  font-size: ${remCalc(14)};
`;

const SkeletonWrapper = styled.div`
  ${BrowseByRoleStyles};

  div:nth-child(2) {
    width: 25rem;
  }
`;

const SearchBySection = styled.div<FilterProps>`
  width: ${(props) => (props.isFilterOpen ? "100%" : "70%")};
`;

const TextInput = styled.div`
  padding: ${whitespace.xs} 0;

  label {
    font-size: ${remCalc(14)};
    line-height: 1.2rem;
    font-weight: ${numericValue.value600};
  }

  input {
    display: block;
    width: ${numericValue.value100}%;
    height: ${remCalc(38)};
    background-color: white;
    border: ${remCalc(0.96)} solid ${borderColors.standard};
    padding: ${whitespace.xxs} ${whitespace.l} ${whitespace.xxs}
      ${whitespace.xs};
    font-size: ${remCalc(14)};

    ::placeholder {
      font-style: ${fontStyle.italic};
      color: ${colors.slateBlue.sb70};
    }
  }
`;

const ShowWarning = styled.div`
  color: ${errorColors.text};
  font-weight: ${numericValue.value600};
  font-size: ${remCalc(14)};
`;

const SearchBySkeletonWrapper = styled.div`
  margin-top: ${whitespace.xs};

  width: 39rem;
  @media (max-width: 992px) {
    width: ${numericValue.value100}%;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const ClearButton = styled(Button)`
  background-color: transparent;
  position: absolute;
  right: ${remCalc(4)};
  bottom: calc(50% - 14px);
  padding: ${whitespace.xs};

  > svg {
    width: ${remCalc(8)};
    height: ${remCalc(8)};
    opacity: 0.8;

    > path {
      fill: ${clearBtnColor};
      stroke: ${clearBtnColor};
      stroke-width: 0.8;
    }
  }
`;

const BrowseByContainer: React.FC<BrowseByProps> = ({
  groupsAndViews,
  selectedGroup,
  selectedView,
  selectedMyRole,
  browseByRoles,
  searchValue,
  isFilterOpen,
}) => {
  const [dropdownData, setDropdownData] = useState<IOptionSection[]>([]);
  const warningText = "";
  const selectedOption: ISelectedOption = {
    heading: selectedGroup,
    optionName: selectedView,
  };

  useEffect(() => {
    if (!!groupsAndViews && groupsAndViews.length > 0) {
      // Converting data to dropdown format
      const values = groupsAndViews.map((group) => ({
        heading: group.viewGroupName,
        options: group.viewNames,
      }));

      setDropdownData(values);
    }
  }, [groupsAndViews]);

  return (
    <MainSection>
      <BrowseBySection isFilterOpen={isFilterOpen}>
        {/* Browse by category */}
        {groupsAndViews.length > 0 ? (
          <div>
            <DropdownSelectHierarchy
              uniqueId={uniqueId()}
              label="Browse by"
              options={dropdownData}
              state={selectedOption}
              handleChange={() => {}}
              maxHeight="calc(95vh - 223px)"
              isClearable={false}
            />
            <HelpText>
              'Browse by my role' dropdown will be reset upon changing 'Browse
              by' option
            </HelpText>
          </div>
        ) : (
          <BrowseByAndSearchBySkeleton />
        )}

        {/* Browse by my role */}
        {browseByRoles?.length > 0 ? (
          <BrowseByRole>
            <DropdownSelect
              label="Browse by my role"
              options={[]}
              handleChange={() => {}}
              selectedValue={selectedMyRole}
              showOptionsUpward={false}
            />
          </BrowseByRole>
        ) : (
          <SkeletonWrapper>
            <BrowseByAndSearchBySkeleton />
          </SkeletonWrapper>
        )}
      </BrowseBySection>

      {/* Search for solutions */}
      {groupsAndViews.length > 0 && browseByRoles.length > 0 ? (
        <SearchBySection isFilterOpen={isFilterOpen}>
          <TextInput>
            <label>Search for solutions</label>
            <InputWrapper>
              <input
                id="technology-search"
                type="text"
                placeholder="Search for solution name or ID or problem description or proposed solution/outcome"
                value={searchValue}
                autoComplete="off" // Avoid suggestions
                onChange={() => {}}
              />

              {/* Clear icon */}
              {searchValue.length > 0 && (
                <ClearButton icon={Close} onClick={() => {}} />
              )}
            </InputWrapper>
          </TextInput>

          {warningText.trim().length > 0 && (
            <ShowWarning>{warningText}</ShowWarning>
          )}
        </SearchBySection>
      ) : (
        <SearchBySkeletonWrapper>
          <BrowseByAndSearchBySkeleton />
        </SearchBySkeletonWrapper>
      )}
    </MainSection>
  );
};

export default BrowseByContainer;
