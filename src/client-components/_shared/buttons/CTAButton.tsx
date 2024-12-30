import React from "react";
import styled from "styled-components";
import { Button, ButtonProps } from "./Button";
import { colors, disabled } from "../../../styles/constants";

const StyledCTAButton = styled(Button)`
  background-color: ${colors.red.energic};
  border-color: ${colors.red.energic};
  color: white;

  > svg > path {
    fill: white;
  }

  :hover,
  :focus {
    background-color: ${colors.red.heritage};
    border-color: ${colors.red.heritage};
  }

  :active {
    background-color: ${colors.slateBlue.standard};
    border-color: ${colors.slateBlue.standard};
  }

  &[disabled] {
    background-color: ${disabled};
    border-color: ${disabled};
  }
`;

export const CTAButton: React.FunctionComponent<ButtonProps> = ({
  ...props
}) => {
  return <StyledCTAButton {...props} />;
};
