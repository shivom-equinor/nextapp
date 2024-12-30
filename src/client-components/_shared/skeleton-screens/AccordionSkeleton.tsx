import React from "react";
import styled from "styled-components";
import { Line } from "./_skeleton-bases";
import { ws, borderColors } from "../../../styles/constants";
import { remCalc } from "../../../styles/functions";

interface AccordionSkeletonProps {
  numberOfSections: number;
}

const Wrapper = styled.div`
  border-bottom: ${remCalc(0.96)} solid ${borderColors.standard};
  padding-top: ${ws.padding};
`;

const Heading = styled<any>(Line)`
  width: 60%;
`;

export const AccordionSkeleton: React.FC<AccordionSkeletonProps> = ({
  numberOfSections,
}) => {
  const createSections = () => {
    let table = [];

    for (let i = 0; i < numberOfSections; i++) {
      table.push(
        <Wrapper key={i}>
          <Heading />
        </Wrapper>
      );
    }
    return table;
  };

  return <>{createSections()}</>;
};
