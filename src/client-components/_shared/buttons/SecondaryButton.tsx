import React from "react";
import styled from "styled-components";
import { Button, ButtonProps } from "./Button";
import { colors, disabled } from "../../../styles/constants";

const StyledSecondaryButton = styled(Button)`
  background-color: white;
  border-color: ${colors.mossGreen.standard} !important;

  :hover,
  :focus {
    background-color: ${colors.lichenGreen.lg50};
    border-color: ${colors.mossGreen.dark};
  }

  :active {
    background-color: ${colors.lichenGreen.lg50};
    border-color: ${colors.slateBlue.standard};
    color: white;

    .changeable-stroke {
      stroke: white;
    }
    .changeable-fill {
      fill: white;
    }
  }

  &[disabled] {
    background-color: white;
    border-color: ${disabled};
    color: ${disabled};

    .changeable-stroke {
      stroke: ${disabled};
    }
    .changeable-fill {
      fill: ${disabled};
    }
  }
`;

export const SecondaryButton: React.FunctionComponent<ButtonProps> = ({
  ...props
}) => {
  return <StyledSecondaryButton {...props} />;
};
