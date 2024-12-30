import React, { useState, useEffect } from "react";
import styled from "styled-components";

import CheckboxSymbol from "../../../styles/assets/icons/checkbox.svg";
import { remCalc } from "../../../styles/functions";
import {
  whitespace,
  colors,
  interactiveColors,
  numericValue,
} from "../../../styles/constants";
import Image from "next/image";

export interface CheckboxProps {
  label: string;
  name: string;
  value: string;
  uniqueId: string;
  disabled?: boolean;
  isPreChecked?: boolean;
  overrideCheck?: boolean;
  onBlur?: any;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<any>) => void;
}

interface LabelProps {
  checked: boolean;
  readOnly: boolean;
  isDisabled: boolean;
}

const CheckboxWrapper = styled.div`
  input:focus + label > svg {
    /* Temporary color code, waiting for proper design*/
    box-shadow: 0 0 0 ${remCalc(2.08)} ${interactiveColors.focusInverted};
  }

  input[readOnly] + label {
    .checked rect {
      fill: ${colors.slateBlue.sb70};
    }

    .unchecked rect {
      /* Temporary color code, waiting for proper design*/
      fill: #f5f6f7;
    }
  }
`;

const Label = styled.label<LabelProps>`
  display: flex;
  align-items: center;
  padding: ${whitespace.xs};
  margin: 0;

  span {
    padding: 0 0 0 0.8rem;
    font-size: ${remCalc(14)};
    line-height: 1rem;
    font-weight: ${(props) =>
      props.checked ? numericValue.value600 : numericValue.value500};
  }

  svg {
    flex-shrink: 0;
  }

  .checked {
    display: ${(props) =>
      props.checked && !props.isDisabled ? "block" : "none"};
  }

  .unchecked {
    display: ${(props) =>
      props.checked || props.isDisabled ? "none" : "block"};
  }

  .disabled {
    display: ${(props) => (props.isDisabled ? "block" : "none")};
  }

  &:hover {
    background-color: ${interactiveColors.bgHoverLighter};

    .unchecked {
      stroke: ${colors.mossGreen.standard};
      stroke-width: 2;
    }
  }
`;

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  label,
  value,
  name,
  uniqueId,
  disabled,
  isPreChecked = false,
  overrideCheck = false,
  onChange,
  onBlur,
  readOnly = false,
}) => {
  const [isChecked, setIsChecked] = useState(isPreChecked);

  useEffect(() => {
    setIsChecked(isPreChecked);
  }, [isPreChecked]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    if (!readOnly) {
      // Checking the checkbox
      setIsChecked(!isChecked);
      // Passing the change to the parent component
      onChange && onChange(e);
    }
  };
  return (
    <CheckboxWrapper>
      <input
        id={uniqueId}
        disabled={disabled}
        type="checkbox"
        className="visually-hidden"
        name={name}
        onChange={(e) => handleChange(e)}
        checked={overrideCheck ? isPreChecked : isChecked}
        value={value}
        onBlur={onBlur}
        readOnly={readOnly}
      />
      <Label
        checked={overrideCheck ? isPreChecked : isChecked}
        isDisabled={!!disabled}
        readOnly={readOnly}
      >
        <CheckboxSymbol />
        <span>{label}</span>
      </Label>
    </CheckboxWrapper>
  );
};

export default Checkbox;
