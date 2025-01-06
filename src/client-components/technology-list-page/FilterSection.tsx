import React, { useState } from "react";
import styled from "styled-components";
import { Collapse } from "react-bootstrap";

import { remCalc } from "../../styles/functions";
import {
  colors,
  interactiveColors,
  ws,
  whitespace,
  numericValue,
} from "../../styles/constants";
import Arrow from "../../styles/assets/icons/arrow-right-small.svg";
import Checkbox from "../_shared/form-elements/Checkbox";
import uniqueId from "lodash/uniqueId";
import { filterTypes } from "./constants";
import TextField from "../_shared/form-elements/TextField";
import { IFilterAndCountDetails, IFilterValueWithCount } from "./models";
import CheckboxElement from "../_shared/form-elements/CheckboxElement";

interface FilterSectionProps {
  filterData: IFilterAndCountDetails;
  solnOrgSearchTerm?: string;
  showHeading?: boolean;
  borderBottom?: boolean;
  selectedFilters: any;
  handleSolnOrgSearch?: (value: string) => void;
  handleSelectedFilter: (key: string, value: string) => void;
}

interface CustomFilter {
  borderBottom?: boolean;
}

const StyledFilterSection = styled.div<CustomFilter>`
  border-bottom: ${(props) =>
    props.borderBottom && `1px solid ${colors.slateBlue.sb50}`};
`;

interface ToggleProps {
  isExpanded: boolean;
}

const ToggleHeading = styled.button<ToggleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: none;
  padding: ${ws.padding} ${whitespace.xs};
  font-weight: ${numericValue.value600};
  font-size: ${remCalc(14)};
  width: ${numericValue.value100}%;
  text-align: left;
  border-radius: 0;

  svg {
    transform: ${(props) =>
      props.isExpanded ? "rotate(-90deg)" : "rotate(90deg)"};
    transition: transform 0.3s ease-in-out;
  }

  &:hover,
  &:focus {
    background-color: ${interactiveColors.bgHover};
    outline: none;
  }
`;

const Options = styled.div<CustomFilter>`
  ${(props) => props.borderBottom && `padding-bottom: ${whitespace.xs};`}
`;

const TextFieldWrapper = styled.div`
  margin: ${whitespace.m} ${remCalc(0)};
  > div {
    margin: ${remCalc(0)};
  }

  input {
    font-size: ${remCalc(14)};
    padding-bottom: ${whitespace.m};

    ::-webkit-input-placeholder {
      white-space: pre-line;
      position: relative;
    }
  }
`;

const FilterSection: React.FunctionComponent<FilterSectionProps> = ({
  filterData,
  showHeading = true,
  borderBottom = true,
  solnOrgSearchTerm,
  selectedFilters,
  // addFilter,
  // removeFilter,
  handleSolnOrgSearch,
  // preselectedFilters,
  handleSelectedFilter,
}) => {
  const openByDefault = !showHeading;
  const { name, type, values, displayName } = filterData;
  const sectionFilters = (filterData as any)[name];

  const [isOpen, setIsOpen] = useState(openByDefault);

  const openAccordion = () => setIsOpen(!isOpen);

  const shouldRenderOptions: boolean = !!(type && values && values.length > 0);

  function isFilterValueAvailable(filterKey: string, filterValue: string) {
    // Check if the filter key exists and the value is in the array
    return (
      selectedFilters[filterKey] &&
      selectedFilters[filterKey].includes(filterValue)
    );
  }

  const renderOptions = () =>
    shouldRenderOptions &&
    values &&
    values.map((option: any, key: number) => {
      return (
        option && (
          <>
            <CheckboxElement
              uniqueId={uniqueId()}
              label={`${option.value as unknown as string} (${option.count})`}
              value={option.value as unknown as string}
              name={name}
              onChange={(e) =>
                handleSelectedFilter(name, option.value as unknown as string)
              }
              isPreChecked={isFilterValueAvailable(
                name,
                option.value as unknown as string
              )}
              overrideCheck={true}
            />
          </>
        )
      );
    });

  return (
    <StyledFilterSection borderBottom={borderBottom}>
      {type.trim().toLowerCase() === filterTypes.input ? (
        <TextFieldWrapper>
          <TextField
            label={displayName}
            uniqueId={uniqueId()}
            placeholder={`Filter ${displayName}`}
            defaultValue={solnOrgSearchTerm ? solnOrgSearchTerm : ""}
            showClearButton={true}
            autoComplete={false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSolnOrgSearch && handleSolnOrgSearch(e.target.value)
            }
            onClearBtnClick={() =>
              handleSolnOrgSearch && handleSolnOrgSearch("")
            }
          />
        </TextFieldWrapper>
      ) : (
        <>
          {showHeading && (
            <ToggleHeading
              onClick={openAccordion}
              aria-expanded={isOpen}
              isExpanded={isOpen}
            >
              <span>{displayName}</span>
              <Arrow />
            </ToggleHeading>
          )}

          <Collapse in={isOpen}>
            <Options borderBottom={borderBottom}>{renderOptions()}</Options>
          </Collapse>
        </>
      )}
    </StyledFilterSection>
  );
};

export default FilterSection;
