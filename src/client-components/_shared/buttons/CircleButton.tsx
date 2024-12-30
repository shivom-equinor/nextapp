import React from "react";
import styled from "styled-components";
import { Button, ButtonProps } from "./Button";
import { colors, whitespace, disabled } from "../../../styles/constants";
import { remCalc } from "../../../styles/functions";

interface CircleButtonProps extends ButtonProps {
  ariaLabel: string;
  icon: any;
}

const StyledCircleButton = styled(Button)`
  padding: ${whitespace.xs};
  border-radius: 50%;
  background-color: ${colors.mossGreen.standard};
  border: none;
  color: white;

  svg {
    height: ${remCalc(14)};
    width: ${remCalc(14)};
    margin: 0;

    .changeable-stroke {
      stroke: white;
    }
    .changeable-fill {
      fill: white;
    }
  }

  :hover,
  :focus {
    background-color: ${colors.mossGreen.dark};
  }

  :active {
    background-color: ${colors.slateBlue.standard};
  }

  &[disabled] {
    background-color: ${disabled};
    border-color: ${disabled};
  }
`;

export const CircleButton: React.FunctionComponent<CircleButtonProps> = ({
  ...props
}) => {
  return <StyledCircleButton label={undefined} {...props} />;
};
