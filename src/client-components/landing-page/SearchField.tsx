import React, { useState } from "react";
import styled from "styled-components";

import { CTAButton } from "../_shared/buttons";
import { Button } from "../_shared/buttons/Button";
import Search from "../../styles/assets/icons/search-button.svg";
import Close from "../../styles/assets/icons/x.svg";
import { remCalc } from "../../styles/functions";
import {
  colors,
  ws,
  borderColors,
  errorColors,
  whitespace,
  clearBtnColor,
  numericValue,
  fontStyle,
} from "../../styles/constants";
import {
  MIN_CHAR_LIMIT,
  MAX_CHAR_LIMIT,
  MIN_CHAR_LIMIT_MSG,
  MAX_CHAR_LIMIT_MSG,
} from "../../constants";

interface SearchFieldProps {
  router: any;
}

const Label = styled.label`
  font-size: ${remCalc(22)};
  line-height: ${remCalc(26)};
  font-weight: ${numericValue.value600};
  margin-bottom: ${ws.paddingHalf};
  margin-top: 1rem;
  display: block;
`;

const FlexRow = styled.div`
  margin-bottom: calc(${ws.margin} + 1rem);
`;

const SearchFieldWrapper = styled.div`
  display: flex;
`;

const Input = styled.input`
  display: block;
  background-color: white;
  border: ${remCalc(0.96)} solid ${borderColors.standard};
  padding: ${remCalc(9)} ${whitespace.l} ${remCalc(9)} ${whitespace.m};
  width: ${numericValue.value100}%;

  ::placeholder {
    font-style: ${fontStyle.italic};
    color: ${colors.slateBlue.sb70};
  }
`;

const SearchButton = styled(CTAButton)`
  width: 120px;
  margin: 0 ${ws.padding};
  margin-right: 0;
  > svg {
    margin: auto;
  }
`;

const ShowWarning = styled.div`
  color: ${errorColors.text};
  font-weight: ${numericValue.value600};
  font-size: ${remCalc(14)};
`;

const InputWrapper = styled.div`
  position: relative;
  width: ${numericValue.value100}%;
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

const SearchField: React.FC<SearchFieldProps> = ({ router }) => {
  const [searchValue, setSearchValue] = useState("");
  const [warningText, setWarningText] = useState("");
  const [isSearchBtnDisabled, setIsSearchBtnDisabled] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue: string = e.target.value;
    setSearchValue(searchValue);

    let warning: string = "";
    if (
      searchValue.trim().length >= 1 &&
      searchValue.trim().length < MIN_CHAR_LIMIT
    ) {
      warning = MIN_CHAR_LIMIT_MSG;
      setIsSearchBtnDisabled(true);
    } else if (searchValue.trim().length > MAX_CHAR_LIMIT) {
      warning = MAX_CHAR_LIMIT_MSG;
      setIsSearchBtnDisabled(true);
    } else {
      warning = "";
      setIsSearchBtnDisabled(false);
    }
    setWarningText(warning);
  };

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchValue) {
      if (warningText.trim().length === 0) {
        router.push(
          "/technology-list-page?tech-search-query=" +
            encodeURIComponent(searchValue)
        );
      }
    } else {
      setWarningText(MIN_CHAR_LIMIT_MSG);
    }
  };

  const onClearBtnClick = () => {
    setSearchValue("");
    setWarningText("");
    setIsSearchBtnDisabled(false);
  };

  return (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => searchHandler(e)}>
      <Label htmlFor="landing-page-search">Search for solutions</Label>
      <FlexRow>
        <SearchFieldWrapper>
          <InputWrapper>
            <Input
              type="text"
              id="landing-page-search"
              placeholder="Search for solution name or ID or problem description or proposed solution/outcome"
              name="tech-search-query"
              value={searchValue}
              autoComplete="off" // Avoid suggestions
              onChange={(e) => handleOnChange(e)}
            />

            {/* Clear icon */}
            {searchValue.length > 0 && (
              <ClearButton icon={Close} onClick={onClearBtnClick} />
            )}
          </InputWrapper>

          <SearchButton
            icon={Search}
            ariaLabel="Search"
            isSubmit={true}
            disabled={isSearchBtnDisabled}
          />
        </SearchFieldWrapper>
        {warningText.trim().length > 0 && (
          <ShowWarning>{warningText}</ShowWarning>
        )}
      </FlexRow>
    </form>
  );
};

export default SearchField;
