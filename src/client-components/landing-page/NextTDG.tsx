import React from "react";
import styled from "styled-components";
import Image from "next/image";

import { remCalc } from "../../styles/functions";
import Calendar from "../../styles/assets/icons/calendar.svg";
import { colors, errorColors, numericValue } from "../../styles/constants";

interface TRLProps {
  nextTDG: string;
  text: string;
  date: string;
  withIcon?: boolean;
  isNextTDGOverDue?: string;
  status?: string;
}

interface TDGDateProps {
  isNextTDGOverDue: boolean;
}

interface MilestoneHeadingProps {
  isEndedTechnology: boolean;
}

const TDGWrapper = styled.div`
  display: flex;
`;

const Icon = styled.div`
  flex: 0 0 20px;
  margin-right: 10px;
`;

interface DescriptionProps {
  withIcon: boolean;
}

const Description = styled.div<DescriptionProps>`
  h5 {
    font-weight: ${numericValue.value600};
    margin-bottom: 0;
  }

  > * {
    font-size: ${remCalc(14)};
    line-height: 1rem;
    display: ${(props) => (props.withIcon ? "block" : "inline")};
  }
`;

const TRL = styled.span<DescriptionProps>`
  font-weight: ${(props) =>
    props.withIcon ? numericValue.value400 : numericValue.value600};
`;

const TDGDate = styled.span<TDGDateProps>`
  color: ${(props) =>
    props.isNextTDGOverDue ? errorColors.text : colors.slateBlue.standard};
  font-weight: ${(props) =>
    props.isNextTDGOverDue ? `${numericValue.value500}` : "normal"};
`;

const MilestoneHeading = styled.h5<MilestoneHeadingProps>`
  display: ${(props) => (props.isEndedTechnology ? "inline" : "block")};
`;

const NextTDG: React.FC<TRLProps> = ({
  nextTDG,
  text,
  date,
  withIcon,
  isNextTDGOverDue,
  status,
}) => {
  return (
    <TDGWrapper>
      {withIcon && (
        <Icon>
          <Image src={Calendar} alt=""></Image>
        </Icon>
      )}
      <Description withIcon={!!withIcon}>
        <MilestoneHeading
          isEndedTechnology={
            status &&
            (status.trim().toLowerCase() === "replaced" ||
              status.trim().toLowerCase() === "obsolete")
              ? true
              : false
          }
        >
          Next milestone:{" "}
        </MilestoneHeading>
        {status &&
        (status.trim().toLowerCase() === "replaced" ||
          status.trim().toLowerCase() === "obsolete")
          ? "N/A"
          : nextTDG &&
            text &&
            date && (
              <span>
                <TRL withIcon={!!withIcon}>{nextTDG} - </TRL>
                {text} - &nbsp;
                {date && (
                  <TDGDate
                    isNextTDGOverDue={
                      isNextTDGOverDue === "1" || isNextTDGOverDue === "true"
                        ? true
                        : false
                    }
                  >
                    {date}
                  </TDGDate>
                )}
              </span>
            )}
      </Description>
    </TDGWrapper>
  );
};

export default NextTDG;
