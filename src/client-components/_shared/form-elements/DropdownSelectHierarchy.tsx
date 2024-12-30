import React, { useState } from "react";
import styled from "styled-components";

import {
  colors,
  borderColors,
  whitespace,
  ws,
  interactiveColors,
  z,
  disabledColors,
  errorColors,
  numericValue,
  fontStyle,
} from "../../../styles/constants";
import { remCalc } from "../../../styles/functions";
import SemanticArrow from "../../../styles/assets/icons/semantic-arrow.svg";
import Close from "../../../styles/assets/icons/x.svg";
import { FieldLabel } from "./_framework/FieldLabel";

interface DropdownHierarchyProps {
  label: string;
  options: IOptionSection[];
  uniqueId: string;
  handleChange: (section: string, option: string) => void;
  state?: ISelectedOption;
  maxHeight?: string;
  handleOnOpen?: () => void;
  handleOnClose?: () => void;
  handleOnToggle?: () => void;
  disabled?: boolean;
  placeholder?: string;
  isClearable?: boolean;
  handleOnClear?: () => void;
  maxWidthForView?: number;
  topBottomSpacing?: string;
  hasError?: boolean | undefined;
}

export interface IOptionSection {
  heading: string;
  options: string[];
}

export interface ISelectedOption {
  heading: string;
  optionName: string;
}

interface OptionProps {
  isSelected: boolean;
}

interface DropdownDisplayProps {
  disabled?: boolean;
  hasError: boolean | undefined;
}

interface MenuProps {
  maxHeight?: string;
}

interface FlexDivStyleProps {
  maxWidthForView?: number;
  topBottomSpacing?: string;
}

interface PlaceholderStyledProps {
  topBottomSpacing?: string;
}

const DropdownWrapper = styled.div`
  position: relative;
  width: ${numericValue.value100}%;
`;

const DropdownDisplay = styled.div<DropdownDisplayProps>`
  border: ${remCalc(0.96)} solid
    ${(props) => (props.hasError ? errorColors.border : borderColors.standard)};
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    !!props.disabled ? `${disabledColors.background}` : "white"};
  ${(props) => props.disabled && `opacity: 0.8`};

  ${(props) =>
    !!props.disabled &&
    `> svg > g {
    > rect {
      fill: transparent;
    }
    > path {
      fill: ${disabledColors.standard};
    }
  }`}
`;

const FlexDiv = styled.div<FlexDivStyleProps>`
  display: flex;

  > div {
    ${(props) =>
      props.topBottomSpacing
        ? `
      padding: ${props.topBottomSpacing} ${ws.padding};
    `
        : `
      padding: ${whitespace.xs} ${ws.padding};
    `};
    :first-child {
      ${(props) =>
        props.maxWidthForView &&
        `
    width: ${remCalc(props.maxWidthForView)}; 

    `};
    }
  }
`;

const DisplaySelectedSection = styled.div`
  border-right: ${remCalc(0.96)} solid ${borderColors.standard};
  font-weight: ${numericValue.value600};
`;

const Placeholder = styled.div<PlaceholderStyledProps>`
  ${(props) =>
    props.topBottomSpacing
      ? `
      padding: ${props.topBottomSpacing} ${ws.padding};
    `
      : `
      padding: ${whitespace.xs} ${ws.padding};
    `};
  font-style: ${fontStyle.italic};
  color: ${colors.slateBlue.sb70};
  font-size: ${remCalc(14)};
`;

const ArrowIcon = styled(SemanticArrow)`
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  margin-right: ${whitespace.xs};
`;

const Menu = styled.div<MenuProps>`
  position: absolute;
  top: ${numericValue.value100}%;
  left: 0;
  padding: ${whitespace.xs} 0;
  border: ${remCalc(0.96)} solid ${borderColors.standard};
  border-top: 0;
  background-color: white;
  width: ${numericValue.value100}%;
  z-index: ${z.dropdown};
  max-height: ${(props) =>
    props.maxHeight ? props.maxHeight : `${numericValue.value500}px`};
  overflow-y: auto;
`;

const SectionHeading = styled.div`
  font-weight: ${numericValue.value600};
  font-size: ${remCalc(18)};
  padding: ${ws.padding} ${ws.padding} ${whitespace.xs};
  margin-bottom: ${whitespace.xxs};
  display: flex;
  align-items: center;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: ${whitespace.xs};
    bottom: 0;
    width: calc(${numericValue.value100}% - ${ws.padding});
    height: ${remCalc(0.96)};
    border-bottom: ${remCalc(0.96)} solid ${borderColors.standard};
  }
`;

const Option = styled.div<OptionProps>`
  padding: ${whitespace.xs} ${ws.padding};

  ${(props) =>
    props.isSelected &&
    `
    background-color: ${colors.lichenGreen.lg50}; 
    font-weight: ${numericValue.value600};
    `};

  &:hover {
    ${(props) =>
      !props.isSelected &&
      `
    cursor: pointer;
    background-color: ${interactiveColors.bgHover};`}
  }
`;

const ClearWrapper = styled.div`
  cursor: pointer;
  padding: 0 ${whitespace.xs};

  > svg {
    width: ${whitespace.xs};
    height: ${whitespace.xs};

    > path {
      fill: ${colors.slateBlue.standard};
    }
  }
`;

const DropdownSelectHierarchy: React.FC<DropdownHierarchyProps> = ({
  label,
  uniqueId,
  options,
  state,
  handleChange,
  maxHeight,
  handleOnOpen,
  handleOnClose,
  handleOnToggle,
  disabled = false,
  placeholder,
  isClearable = true,
  handleOnClear,
  maxWidthForView,
  topBottomSpacing,
  hasError,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (
    e: React.SyntheticEvent,
    section: string,
    option: string
  ) => {
    // preventing bubbling
    e.stopPropagation();

    // prevent onChange call if same option is re-selected
    !(state && state.heading === section && state.optionName === option) &&
      handleChange(section, option);
    close();
  };

  const open = () => {
    if (!disabled) {
      setIsOpen(true);
      handleOnOpen && handleOnOpen();
    }
  };

  const close = () => {
    if (!disabled) {
      setIsOpen(false);
      handleOnClose && handleOnClose();
    }
  };

  const toggleOpen = (e: React.SyntheticEvent) => {
    if (!disabled) {
      e.stopPropagation();
      setIsOpen(!isOpen);
      handleOnToggle && handleOnToggle();
    }
  };

  const handleClearBtnClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      e.stopPropagation();
      setIsOpen(false);
      handleOnClear && handleOnClear();
    }
  };

  return (
    <>
      <FieldLabel label={label} id={uniqueId} />
      <DropdownWrapper onBlur={close} tabIndex={0} onClick={open}>
        <DropdownDisplay
          onClick={(e) => toggleOpen(e)}
          disabled={disabled}
          hasError={hasError}
        >
          <div>
            {state ? (
              <FlexDiv
                maxWidthForView={maxWidthForView}
                topBottomSpacing={topBottomSpacing}
              >
                {state.heading !== "Default" && (
                  <DisplaySelectedSection>
                    {state.heading}
                  </DisplaySelectedSection>
                )}
                <div>{state.optionName}</div>
              </FlexDiv>
            ) : (
              <Placeholder topBottomSpacing={topBottomSpacing}>
                {placeholder ? placeholder : "Select"}
              </Placeholder>
            )}
          </div>
          {!!isClearable && handleOnClear && state ? (
            <ClearWrapper
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                handleClearBtnClick(e)
              }
            >
              <Close />
            </ClearWrapper>
          ) : (
            <ArrowIcon />
          )}
        </DropdownDisplay>
        {isOpen && (
          <Menu maxHeight={maxHeight}>
            {options.map((section, key) => (
              <div key={key}>
                {section.heading !== "Default" && (
                  <SectionHeading>{section.heading}</SectionHeading>
                )}

                {section.options.map((option, key) => (
                  <Option
                    key={key}
                    onClick={(e) =>
                      handleOptionSelect(e, section.heading, option)
                    }
                    isSelected={
                      !!(
                        state &&
                        state.heading === section.heading &&
                        state.optionName === option
                      )
                    }
                  >
                    {option}
                  </Option>
                ))}
              </div>
            ))}
          </Menu>
        )}
      </DropdownWrapper>
    </>
  );
};

export default DropdownSelectHierarchy;
