import React from "react";
import styled from "styled-components";
import Image from "next/image";

import {
  z,
  whitespace,
  borderColors,
  boxShadowColors,
  numericValue,
} from "../../styles/constants";
import SpinnerIcon from "../../styles/assets/icons/spinner.svg";
import { remCalc } from "../../styles/functions";
import Progressbar from "./Progressbar";

interface SpinnerProps {
  title?: string;
  message?: string;
  loadValue?: number;
  progressBarHeight?: string;
  mode?: string;
  isProgressBar?: boolean;
}

const BackDrop = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.6);
  content: "";
  z-index: calc(${z.modal} - 1);
  height: ${numericValue.value100}vh;
`;

const LoadingSpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: ${z.modal};

  .p-progressbar {
    width: 630px;
  }

  svg {
    -webkit-animation: spin 2s linear infinite;
    -moz-animation: spin 2s linear infinite;
    -ms-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;

  width: 50%;
  background-color: white;
  text-align: center;
  margin-top: ${whitespace.xs};
  padding: ${whitespace.m};
  border-radius: ${remCalc(10)};
  border: ${remCalc(0.96)} solid ${borderColors.tableBorder};
  box-shadow: ${remCalc(2.08)} ${remCalc(2.08)} ${boxShadowColors.table};
`;

const Spinner: React.FC<SpinnerProps> = ({
  title,
  message,
  loadValue,
  progressBarHeight,
  mode,
  isProgressBar,
}) => {
  return (
    <BackDrop>
      <LoadingSpinnerContainer>
        {isProgressBar ? (
          <Progressbar
            loadValue={loadValue ? loadValue : 0}
            progressBarHeight={progressBarHeight ? progressBarHeight : "6px"}
            mode={mode ? mode : "indeterminate"}
          />
        ) : (
          <Image src={SpinnerIcon} alt="" />
        )}

        {(message || title) && (
          <Message>
            {title && <h1>{title}</h1>}
            {message && <div>{message}</div>}
          </Message>
        )}
      </LoadingSpinnerContainer>
    </BackDrop>
  );
};

export default Spinner;
