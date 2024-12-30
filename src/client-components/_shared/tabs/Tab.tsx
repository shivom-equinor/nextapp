import React from "react";
import styled from "styled-components";

import { remCalc } from "../../../styles/functions";
import {
  colors,
  numericValue,
  whitespace,
  ws,
} from "../../../styles/constants";
import { addWBSBtnLabel } from "../constants";

export interface TabProps {
  tabRef?: React.RefObject<HTMLButtonElement>;
  onClick?: () => void;
  label: string;
  disabled: boolean;
  role: string;
  ariaSelected: boolean;
  id: string;
  className?: string;
  fullWidth: boolean;
  icon?: any;
}

const TabButton = styled.button<TabProps>`
  font-size: ${remCalc(14)};
  line-height: ${remCalc(18)};
  padding: ${(props) =>
    props.fullWidth ? whitespace.xs : `${whitespace.xs} ${ws.padding}`};
  flex-grow: ${(props) => (props.fullWidth ? "1" : "0")};
  border: ${remCalc(0.96)} solid ${colors.slateBlue.sb50};
  background-color: ${(props) =>
    props.ariaSelected ? colors.slateBlue.standard : "white"};
  color: ${(props) =>
    props.disabled
      ? colors.slateBlue.sb70
      : props.ariaSelected
      ? "white"
      : colors.slateBlue.standard};
  pointer-events: ${(props) =>
    props.ariaSelected && !(props.label === addWBSBtnLabel) ? "none" : "all"};
  font-weight: ${numericValue.value600};

  :hover {
    background-color: ${colors.mossGreen.mg20};
    color: ${colors.mossGreen.dark};
  }

  :disabled {
    background-color: ${colors.slateBlue.sb30};
    color: ${colors.slateBlue.sb70};
  }

  @media (max-width: 992px) {
    span {
      white-space: normal;
    }
  }

  :hover,
  :focus {
    .changeable-fill {
      fill: #fff;
    }
    .changeable-stroke {
      stroke: #fff;
    }
    > svg > g > path {
      fill: ${colors.slateBlue.standard};
    }
  }

  > span {
    margin-left: ${remCalc(4.8)};
  }
`;

const Tab: React.FC<TabProps> = ({
  tabRef,
  onClick,
  label,
  disabled = false,
  ariaSelected,
  role,
  id,
  className,
  fullWidth,
  icon,
}) => {
  const Icon = icon;
  return (
    <TabButton
      ref={tabRef}
      type="button"
      id={id}
      role={role}
      ariaSelected={ariaSelected}
      label={label}
      disabled={disabled}
      onClick={onClick}
      className={className}
      fullWidth={fullWidth}
    >
      {icon && <Icon />}
      <span>{label}</span>
    </TabButton>
  );
};

export default Tab;
