import React from "react";
import styled from "styled-components";

import { remCalc } from "../../../styles/functions";
import { numericValue, textColor, whitespace } from "../../../styles/constants";

/*
 * This component is the base for all buttons.
 * It should not be used directly.
 */
export interface ButtonProps {
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  icon?: any;
  label?: string;
  isSubmit?: boolean;
  disabled?: boolean;
  iconPositionLeft?: boolean; // display icon by default left els right hand side
  isSmall?: boolean;
}

const ButtonBase = styled.button<ButtonProps>`
  font-size: 1rem;
  line-height: ${remCalc(20)};
  padding: ${(props) =>
    props.isSmall
      ? `${whitespace.xxs} ${whitespace.xs}`
      : `${remCalc(11)} ${remCalc(20)}`};
  border-radius: ${remCalc(4.8)};
  border: ${remCalc(0.96)} solid transparent;
  color: ${textColor};
  font-weight: ${numericValue.value600};
  display: flex;
  align-items: center;

  & > svg {
    width: ${remCalc(20)};
    height: ${remCalc(20)};
    margin-left: ${(props) =>
      props.label && !props.iconPositionLeft ? remCalc(6) : "0"};
    margin-right: ${(props) =>
      props.label && props.iconPositionLeft ? remCalc(6) : "0"};
  }

  &[disabled] {
    cursor: default;
  }
`;

export const Button: React.FunctionComponent<ButtonProps> = ({
  onClick,
  className,
  ariaLabel,
  icon,
  label,
  isSubmit = false,
  disabled = false,
  iconPositionLeft = true,
  isSmall = false,
}) => {
  const handleClick = () => {
    if (!disabled && !!onClick) {
      onClick();
    }
  };

  const Icon = icon;
  return (
    <ButtonBase
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
      type={isSubmit ? "submit" : "button"}
      label={label}
      disabled={disabled}
      isSmall={isSmall}
      iconPositionLeft={iconPositionLeft}
    >
      {iconPositionLeft && icon && <Icon />}
      {label && <span>{label}</span>}
      {!iconPositionLeft && icon && <Icon />}
    </ButtonBase>
  );
};
