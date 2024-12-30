import React from "react";
import styled from "styled-components";
import { colors, numericValue, whitespace } from "../../styles/constants";
import { remCalc } from "../../styles/functions";

export interface ToolTipProps {
  text: string;
  maxWidth?: number;
  children: any;
  className?: string;
}

interface TooltipWrapperProps {
  toolTipTextCount: number;
  maxWidth?: number;
}

const TooltipWrapper = styled.div<TooltipWrapperProps>`
  position: relative;

  /* This property used to apply css to microsoft edge specific*/
  @supports (-ms-ime-align: auto) {
    > span {
      white-space: nowrap;
    }
  }

  > span {
    visibility: hidden;
    width: max-content;
    max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : "auto")};
    background-color: ${colors.slateBlue.standard};
    color: white;
    text-align: left;
    padding: ${(props) =>
      props.toolTipTextCount > 100
        ? `${whitespace.sm} ${whitespace.m}`
        : `${whitespace.xs} 10px`};
    margin-top: ${remCalc(4.8)};
    position: absolute;
    z-index: 1;
    font-size: ${remCalc(14)};
    left: 50%;
    transform: translateX(-50%);
    margin-left: -${remCalc(4.8)};
  }

  :hover > span {
    visibility: ${(props) => (props.toolTipTextCount ? "visible" : "hidden")};
  }

  > span::after {
    content: " ";
    position: absolute;
    bottom: ${numericValue.value100}%;
    left: 50%;
    transform: translateX(-50%);
    border-width: ${remCalc(4.8)};
    border-style: solid;
    border-color: transparent transparent ${colors.slateBlue.standard}
      transparent;
  }
`;

const ToolTip: React.FC<ToolTipProps> = ({
  text,
  maxWidth,
  children,
  className,
}) => {
  return (
    <TooltipWrapper
      toolTipTextCount={text.length}
      maxWidth={maxWidth}
      className={className}
    >
      {children}
      {text && <span>{text}</span>}
    </TooltipWrapper>
  );
};

export default ToolTip;
