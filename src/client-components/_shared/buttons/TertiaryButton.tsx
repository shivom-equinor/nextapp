import React from "react";
import styled from "styled-components";

import { Button, ButtonProps } from "./Button";
import { colors } from "../../../styles/constants";

const ButtonBase = styled(Button)`
  background-color: transparent;
  color: ${colors.mossGreen.standard};

  :hover,
  :focus {
    background-color: ${colors.mossGreen.mg20};
    color: ${colors.mossGreen.dark};
  }

  :active {
    color: ${colors.slateBlue.standard};
    background-color: ${colors.mossGreen.mg35};
  }
`;

export const TertiaryButton: React.FunctionComponent<ButtonProps> = ({
  ...props
}) => {
  return <ButtonBase {...props}></ButtonBase>;
};
