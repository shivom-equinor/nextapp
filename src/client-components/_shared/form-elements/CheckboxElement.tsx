import {
  colors,
  interactiveColors,
  numericValue,
  whitespace,
} from "@/styles/constants";
import { remCalc } from "@/styles/functions";
import { useEffect, useState } from "react";
import styled from "styled-components";

export interface CheckboxProps {
  label: string;
  name: string;
  value: string;
  uniqueId: string;
  isPreChecked?: boolean;
  overrideCheck?: boolean;
  onChange?: (e: React.ChangeEvent<any>) => void;
}

interface LabelProps {
  checked: boolean;
}

const Label = styled.label<LabelProps>`
  display: flex;
  align-items: center;
  padding: ${whitespace.xs};

  span {
    padding: 0 0 0 0.3rem;
    font-size: ${remCalc(14)};
    line-height: 1rem;
    font-weight: ${(props) =>
      props.checked ? numericValue.value600 : numericValue.value500};
  }

  svg {
    flex-shrink: 0;
  }

  .checked {
    display: ${(props) => (props.checked ? "block" : "none")};
  }

  .unchecked {
    display: ${(props) => (props.checked ? "none" : "block")};
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  padding-left: 8px;

  &:hover {
    background-color: ${interactiveColors.bgHoverLighter};

    .unchecked {
      stroke: ${colors.mossGreen.standard};
      stroke-width: 2;
    }
  }

  .custom-checkbox {
    margin-top: 5px;
    position: relative;
    width: 22px; /* Adjust size */
    height: 22px; /* Adjust size */
  }
  .custom-checkbox input {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  /* Checkbox Background */
  .custom-checkbox span {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid #888;
    transition: background-color 0.3s, border-color 0.3s;
  }

  /* Checkmark */
  .custom-checkbox span::after {
    content: "";
    position: absolute;
    left: 9px;
    top: 6px;
    width: 5px; /* Adjust checkmark width */
    height: 8px; /* Adjust checkmark height */
    border: solid #fff;
    border-width: 0 2.2px 2.2px 0;
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.3s;
  }

  /* Checked State */
  .custom-checkbox input:checked + span {
    background-color: #243746;
    border-color: #243746;
  }
  .custom-checkbox input:checked + span::after {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  width: 23px;
`;

const CheckboxElement: React.FC<CheckboxProps> = ({
  label,
  name,
  value,
  uniqueId,
  isPreChecked = false,
  overrideCheck = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(isPreChecked);

  useEffect(() => {
    setIsChecked(isPreChecked);
  }, [isPreChecked]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    // Checking the checkbox
    setIsChecked(!isChecked);
    // Passing the change to the parent component
    onChange && onChange(e);
  };

  return (
    <CheckboxWrapper>
      <Wrapper>
        <label className="custom-checkbox">
          <input
            id={uniqueId}
            type="checkbox"
            name={name}
            value={value}
            checked={overrideCheck ? isPreChecked : isChecked}
            onChange={(e) => handleChange(e)}
          />
          <span></span>
        </label>
      </Wrapper>
      <Label checked={overrideCheck ? isPreChecked : isChecked}>
        <span>{label}</span>
      </Label>
    </CheckboxWrapper>
  );
};

export default CheckboxElement;
