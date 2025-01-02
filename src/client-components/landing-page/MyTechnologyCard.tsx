import React, { useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";

import {
  colors,
  ws,
  whitespace,
  textColor,
  interactiveColors,
  transitions,
  borderColors,
  numericValue,
} from "../../styles/constants";
import { remCalc } from "../../styles/functions";
import ClickableArea from "../../helpers/ClickableArea";
import TRLdescription from "../_shared/TRLdescription";
import NextTDG from "./NextTDG";
import Customers from "./Customers";
import NoImage from "../_shared/NoImage";

interface MyTechnologyCardProps {
  technology: any;
}

const MyTechnologyClickableCard = styled<any>(ClickableArea)`
  display: flex;
  border: ${remCalc(0.96)} solid ${borderColors.standard};
  background-color: ${colors.mistBlue.mb50};
  margin-bottom: ${ws.padding};
  padding: ${ws.padding};
  transition: ${transitions.bgHover};
  cursor: pointer;
  border-bottom: ${remCalc(0.96)} solid ${borderColors.standard};
  box-sizing: border-box;

  :hover {
    text-decoration: none;
    color: ${textColor};
    background-color: ${interactiveColors.bgHover};

    *:after,
    *:before {
      border-color: ${colors.slateBlue.standardTransparent} !important;
    }
  }

  :hover,
  :focus {
    border-color: ${colors.slateBlue.standard};
  }
`;

const TechImg = styled.img`
  width: ${numericValue.value100}%;
  height: ${numericValue.value100}%;
  border: ${remCalc(0.96)} solid ${colors.slateBlue.standardTransparent};
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(${numericValue.value100}% - 150px - 1rem);

  @media (max-width: 768px) {
    width: calc(${numericValue.value100}% - ${numericValue.value100}px - 1rem);
  }
`;

interface HeadingLineProps {
  isKeepSecret?: boolean;
}

const HeadingLine = styled.div<HeadingLineProps>`
  display: flex;
  width: ${numericValue.value100}%;
  margin-bottom: ${(props) =>
    props.isKeepSecret ? `-${ws.padding}` : `${ws.paddingHalf}`};
`;

const StatusLine = styled.div`
  flex-grow: 1;

  h5 {
    font-size: ${remCalc(14)};
    font-weight: ${numericValue.value600};
    margin-bottom: ${whitespace.xxs};

    > span {
      padding-left: 0.5rem;
      font-weight: ${numericValue.value400};
    }
  }

  p {
    font-size: ${remCalc(14)};
    line-height: ${remCalc(18)};
  }
`;

const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
`;

const DetailsLine = styled(Row)`
  line-height: 1rem;
  padding-top: ${whitespace.m};
  position: relative;

  :before {
    content: "";
    position: absolute;
    top: 0;
    left: ${whitespace.m};
    border-top: ${remCalc(0.96)} solid ${borderColors.standard};
    height: ${remCalc(0.96)};
    width: calc(${numericValue.value100}% - ${whitespace.l});
  }

  > div:not(:last-child) {
    position: relative;

    &:after {
      content: "";
      position: absolute;
      top: ${whitespace.m};
      right: 0;
      border-left: ${remCalc(0.96)} solid ${borderColors.standard};
      width: ${remCalc(0.96)};
      height: calc(${numericValue.value100}% - ${whitespace.l});
    }
  }
`;

const Heading = styled.h3`
  margin-bottom: 0;
  flex-grow: 1;
  line-height: 1.2rem;
  font-size: ${remCalc(18)};
`;

const TechId = styled.div`
  font-weight: ${numericValue.value500};
  font-size: ${remCalc(14)};
  line-height: 1rem;
  text-align: right;
  padding-left: 1.2rem;
  flex: 0 0 7.5rem;
`;

const KeepSecretPara = styled.p`
  font-weight: ${numericValue.value600};
  color: ${colors.red.energic};
`;

const HeadingLink = styled(Link)`
  color: ${textColor};
  text-decoration: none;

  :hover {
    color: ${textColor};
    text-decoration: none;
  }
`;
const Imagediv = styled.div`
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  margin-right: 1rem;
  object-fit: cover;

  @media (max-width: 768px) {
    width: ${numericValue.value100}px;
    height: ${numericValue.value100}px;
  }
`;
const MyTechnologyCard = ({ technology }: MyTechnologyCardProps) => {
  const linkRef: any = useRef();

  const {
    techId,
    shortStatus,
    currentStage,
    status,
    communication,
    trl,
    trlText,
    firstUserCustomer,
    otherCustomersCount,
    nextTDG,
    nextTDGDate,
    tdgText,
    techImageURL,
    technologyPageURL,
    statusUpdatedDate,
    isNextTDGOverDue,
  } = technology;

  const count = Number(otherCustomersCount);
  /* show placeholder on ms edge only when image error */
  const isEdge = true;
  const [hasImageError, setHasImageError] = useState(false);
  const handleImageError = () => {
    setHasImageError(true);
  };

  return (
    <MyTechnologyClickableCard linkRef={linkRef} type="div">
      <Imagediv>
        <NoImage />
      </Imagediv>
      <Content>
        <HeadingLine
          isKeepSecret={communication.trim().toLowerCase() === "keep secret"}
        >
          <Heading className="ellipsis">
            <HeadingLink href={`${technologyPageURL}/summary`} prefetch={false}>
              {technology.technologyName}
            </HeadingLink>
          </Heading>

          <TechId>
            {techId === "N/A" ? "No ID yet" : `ID: ${techId}`}
            {communication.trim().toLowerCase() === "keep secret" && (
              <KeepSecretPara>{communication}</KeepSecretPara>
            )}
          </TechId>
        </HeadingLine>

        <StatusLine>
          <h5>
            Short status <span>{statusUpdatedDate}</span>
          </h5>
          <p>{shortStatus ? shortStatus : "No status updated yet."}</p>
        </StatusLine>

        <DetailsLine className="border-hover-styles">
          <Col md={5}>
            <TRLdescription
              trl={trl}
              stage={currentStage}
              trlText={trlText}
              status={status}
            />
          </Col>

          <StyledCol md={3}>
            <Customers firstCustomer={firstUserCustomer} count={count} />
          </StyledCol>

          <StyledCol md={4}>
            <NextTDG
              nextTDG={nextTDG}
              text={tdgText}
              date={nextTDGDate}
              isNextTDGOverDue={isNextTDGOverDue}
            />
          </StyledCol>
        </DetailsLine>
      </Content>
    </MyTechnologyClickableCard>
  );
};

export default MyTechnologyCard;
