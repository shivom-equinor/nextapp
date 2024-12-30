import React from "react";
import styled from "styled-components";

import { colors, whitespace, numericValue } from "../../styles/constants";
import { remCalc } from "../../styles/functions";
import Tag from "./Tag";
import { trlNotApplicable } from "../_shared/constants";

interface TRLProps {
  stage: string;
  trl: string;
  trlText: string;
  status?: string;
  cardType?: string;
}

interface CardTypeProps {
  cardType?: string;
}

const FlexWrapper = styled.div<CardTypeProps>`
  display: flex;
  align-items: ${(props) =>
    props.cardType?.trim().toLowerCase() === "ifollow" ? "baseline" : "center"};
`;

const PhaseAndSatusWrapper = styled.div<CardTypeProps>`
  div {
    border: ${remCalc(0.96)} solid ${colors.mistBlue.dark};
  }
  display: flex;
  flex-direction: ${(props) =>
    props.cardType?.trim().toLowerCase() === "ifollow" ? "row" : "column"};
  align-items: ${(props) =>
    props.cardType?.trim().toLowerCase() === "ifollow"
      ? "baseline"
      : "initial"};
  div:first-child {
    margin-bottom: ${whitespace.xxs};
  }
`;

const Description = styled.div`
  line-height: 1rem;

  h5 {
    font-weight: ${numericValue.value600};
    margin-bottom: 0;
  }

  > * {
    font-size: ${remCalc(14)};
    line-height: 1rem;
    display: inline;
  }
`;

const Bold = styled.span`
  font-weight: ${numericValue.value600};
`;

const TRLdescription: React.FC<TRLProps> = ({
  stage,
  status,
  cardType,
  trl,
  trlText,
}) => {
  const isStopped = status && status.trim().toLowerCase() === "stopped";
  const isTechReplacedOrObsolete =
    status &&
    (status.trim().toLowerCase() === "replaced" ||
      status.trim().toLowerCase() === "obsolete");

  return (
    <FlexWrapper cardType={cardType}>
      <PhaseAndSatusWrapper cardType={cardType}>
        {stage && <Tag label={stage} />}
        {status && (
          <Tag
            label={isStopped ? "Stopped" : status}
            backgroundColor={
              isStopped || isTechReplacedOrObsolete
                ? colors.red.energic
                : colors.lichenGreen.standard
            }
          />
        )}
      </PhaseAndSatusWrapper>
      <Description>
        {trl && (
          <h5>
            TRL
            {trl.trim().toLowerCase() === trlNotApplicable.toLowerCase()
              ? ""
              : trl}
          </h5>
        )}
        {trlText ? (
          <span>
            <Bold> - </Bold>
            {trlText}
          </span>
        ) : (
          <span>
            <Bold> - </Bold>
            N/A
          </span>
        )}
      </Description>
    </FlexWrapper>
  );
};

export default TRLdescription;
