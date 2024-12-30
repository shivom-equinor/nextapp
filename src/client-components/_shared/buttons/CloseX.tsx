import React from "react";
import styled from "styled-components";
import { colors } from "../../../styles/constants";
import CloseIcon from "../../../styles/assets/icons/close-circle.svg";
import Image from "next/image";

interface CloseXProps {
  onClick: () => void;
  className?: string;
}

const CloseButton = styled.button`
  background-color: transparent;
  border: none;

  :hover,
  :focus {
    .changable-fill {
      fill: ${colors.mossGreen.dark};
    }
    .changable-stroke {
      stroke: ${colors.mossGreen.dark};
    }
  }

  :active {
    .changable-fill {
      fill: ${colors.slateBlue.standard};
    }
    .changable-stroke {
      stroke: ${colors.slateBlue.standard};
    }
  }
`;

export const CloseX: React.FC<CloseXProps> = ({ onClick, className }) => {
  return (
    <CloseButton className={className} type="button" onClick={onClick}>
      <Image src={CloseIcon} alt="" />
      <span className="visually-hidden">Close</span>
    </CloseButton>
  );
};
