import React, { SyntheticEvent } from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import styled from "styled-components";

import {
  colors,
  textColor,
  ws,
  borderColors,
  numericValue,
  fontStyle,
} from "../../../styles/constants";
import { remCalc } from "../../../styles/functions";

export interface IOptions {
  key?: number;
  text: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options: IOptions[];
  handleChange: (data: DropdownProps) => void;
  handleBlur?: (data: DropdownProps) => void;
  selectedValue?: string | string[];
  placeholder?: string;
  myWidth?: number;
  fluid?: boolean;
  multiple?: boolean;
  search?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  showOptionsUpward?: boolean;
}

interface DropdownWidthProps {
  mywidth?: number;
}

interface labelProps {
  label?: string;
}

const DropdownWrapper = styled.div<labelProps>`
  display: flex;
  align-items: center;
  margin-left: ${(props) => (props.label ? ws.padding : 0)};
`;

const Label = styled.label`
  font-size: ${remCalc(14)};
  margin-right: ${ws.paddingHalf};
  margin-bottom: 0;
`;

const StyledDropdown = styled(Dropdown)<DropdownWidthProps>`
  &.ui.selection.dropdown {
    font-size: ${remCalc(14)};
    background-color: white;
    border: ${remCalc(0.96)} solid ${borderColors.standard};
    border-radius: 0;

    > .text {
      color: ${textColor};
      width: ${(props) => (props.mywidth ? `${props.mywidth}rem` : "auto")};
    }

    :hover,
    :focus,
    &.active,
    &.active:hover,
    &.active:focus,
    &.active > .menu,
    &.actie:hover > .menu {
      border-radius: 0 !important;
      cursor: default;
    }

    /* placeholder text */
    &:not(.button) > .default.text {
      font-style: ${fontStyle.italic};
      color: ${colors.slateBlue.sb70};
    }

    /* Options */
    .menu .item {
      color: ${textColor};
      margin: ${remCalc(0)};

      :hover {
        cursor: pointer;
        background-color: ${colors.mossGreen.mg20};
      }
    }

    /* Selected option */
    > .menu .active.item {
      font-weight: ${numericValue.value600};
      color: ${textColor};
      background-color: ${colors.lichenGreen.lg50};
      :hover {
        cursor: default;
      }
    }
  }
`;

const DropdownSelect: React.FunctionComponent<SelectProps> = ({
  label,
  options,
  handleChange,
  handleBlur,
  selectedValue,
  placeholder = "Select",
  myWidth,
  fluid,
  multiple,
  search,
  clearable,
  disabled,
  showOptionsUpward,
}) => {
  const onChange = (e: SyntheticEvent, data: DropdownProps) => {
    handleChange(data);
  };

  return (
    <DropdownWrapper>
      {label && <Label>{label}</Label>}
      <StyledDropdown
        selection
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        onBlur={handleBlur}
        value={selectedValue}
        mywidth={myWidth}
        fluid={fluid}
        multiple={multiple}
        search={search}
        clearable={clearable}
        disabled={disabled}
        upward={showOptionsUpward}
      />
    </DropdownWrapper>
  );
};

export default DropdownSelect;
