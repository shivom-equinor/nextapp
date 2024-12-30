import React from "react";
import styled from "styled-components";

import {
  colors,
  ws,
  whitespace,
  disabledColors,
} from "../../../styles/constants";
import AddIcon from "../../../styles/assets/icons/plus-sign-filled.svg";
import { ButtonProps, Button } from "./Button";
import { remCalc } from "../../../styles/functions";

const ActionButton = styled(Button)`
  background-color: transparent;
  border-color: transparent;
  border-radius: ${remCalc(0)};
  color: ${(props) =>
    props.disabled ? disabledColors.button : colors.mossGreen.standard};
  padding: ${ws.paddingHalf} ${whitespace.sm};

  .changeable-fill {
    fill: ${(props) =>
      props.disabled ? disabledColors.button : colors.mossGreen.standard};
  }

  .changeable-stroke {
    stroke: ${(props) =>
      props.disabled ? disabledColors.button : colors.mossGreen.standard};
  }

  :hover {
    background-color: ${(props) =>
      props.disabled ? disabledColors.background : colors.mossGreen.mg20};
    border-color: ${(props) =>
      props.disabled ? disabledColors.background : colors.mossGreen.mg20};
    color: ${(props) =>
      props.disabled ? disabledColors.button : colors.mossGreen.standard};

    .changeable-fill {
      fill: ${(props) =>
        props.disabled ? disabledColors.button : colors.mossGreen.standard};
    }

    .changeable-stroke {
      stroke: ${(props) =>
        props.disabled ? disabledColors.button : colors.mossGreen.standard};
    }

    > svg > g > path {
      fill: #fff;
    }
  }
  :active {
    background-color: ${(props) =>
      props.disabled ? disabledColors.background : colors.mossGreen.mg35};
    border-color: ${(props) =>
      props.disabled ? disabledColors.background : colors.mossGreen.mg35};
    color: ${(props) =>
      props.disabled ? disabledColors.button : colors.mossGreen.dark};
    outline: none;

    .changeable-fill {
      fill: ${(props) =>
        props.disabled ? disabledColors.button : colors.mossGreen.dark};
    }

    .changeable-stroke {
      stroke: ${(props) =>
        props.disabled ? disabledColors.button : colors.mossGreen.dark};
    }
  }
`;

export const AddButton: React.FunctionComponent<ButtonProps> = ({
  ...props
}) => {
  return <ActionButton icon={AddIcon} {...props} />;
};
