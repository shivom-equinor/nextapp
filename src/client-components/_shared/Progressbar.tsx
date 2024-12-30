import React from "react";
import styled from "styled-components";
import { ProgressBar } from "primereact/progressbar";

import { whitespace, colors, numericValue } from "../../styles/constants";

interface ProgressBarProps {
  loadValue: number;
  progressBarHeight: string;
  mode: string;
}

const LoadingProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${whitespace.xl};
  .p-progressbar {
    width: ${numericValue.value100}%;
    .p-progressbar-value {
      background: ${colors.mossGreen.standard};
    }
  }
`;

const Message = styled.div`
  margin-top: ${whitespace.xs};
`;

const Progressbar: React.FC<ProgressBarProps> = ({
  loadValue,
  progressBarHeight,
  mode,
}) => {
  return (
    <LoadingProgressBarContainer>
      <Message>
        <h1>{`${loadValue}%`}</h1>
      </Message>

      <ProgressBar
        mode={mode}
        style={{ height: `${progressBarHeight}` }}
        value={loadValue}
      />
    </LoadingProgressBarContainer>
  );
};

export default Progressbar;
