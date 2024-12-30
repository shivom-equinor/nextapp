import React from "react";
import styled from "styled-components";
import { Button, ButtonProps } from "./Button";
import { colors, disabled } from "../../../styles/constants";

const StyledPrimaryButton = styled(Button)`
  background-color: ${colors.mossGreen.standard};
  border-color: ${colors.mossGreen.standard};
  color: white;

  > svg > path {
    fill: white;
  }

  :hover,
  :focus {
    background-color: ${colors.mossGreen.dark};
    border-color: ${colors.mossGreen.dark};
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

export const PrimaryButton: React.FunctionComponent<ButtonProps> = ({
  ...props
}) => {
  return <StyledPrimaryButton {...props} />;
};
