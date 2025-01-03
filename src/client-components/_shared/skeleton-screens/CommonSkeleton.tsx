"use client";
import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";

import { ws, whitespace, colors } from "../../../styles/constants";
import { Line, LighterLine, Circle, BigBox, Picture } from "./_skeleton-bases";
import { LeftCol, RightCol, IndentWrapper } from "./GridElements";
import { InfoLinksSkeleton } from "./InfoLinksSkeleton";

const Wrapper = styled<any>(Row)`
  /* margin-top: 3rem; */
  background: white;
  padding-top: ${whitespace.m};
`;

const BigLine = styled<any>(LighterLine)`
  height: 3rem;
`;

const Heading = styled<any>(Line)`
  width: 80%;
  height: ${ws.margin};
  margin-bottom: 2.5rem;
`;

const LineFirst = styled<any>(Line)`
  width: 60%;
`;

const LineSecond = styled<any>(Line)`
  width: 65%;
  margin-bottom: 3rem;
`;
const SmallText = styled<any>(Line)`
  width: 30%;
`;

const PaddingDiv = styled.div`
  padding-top: ${whitespace.l};
`;

const PaddingCol = styled<any>(Col)`
  padding-left: 0;
`;

export const CommonSkeleton = () => (
  <Wrapper>
    <LeftCol>
      <IndentWrapper>
        <Heading />
        <LineFirst />
        <LineSecond />
        <BigBox>
          <SmallText />
          <Line />
          <Line />
          <SmallText />
          <PaddingDiv>
            <SmallText />
            <Line />
            <Line />
            <Line />
            <Line />
          </PaddingDiv>
        </BigBox>
        <BigLine />
        <BigLine />
        <BigLine />
        <BigLine />
        <BigLine />
      </IndentWrapper>
    </LeftCol>
    <RightCol>
      <InfoLinksSkeleton />
      <PaddingDiv>
        <Picture>
          <SmallText />
          <Line />
          <Row>
            <Col md={2}>
              <Circle />
            </Col>
            <PaddingCol>
              <SmallText />
              <Line />
              <Line />
            </PaddingCol>
          </Row>
        </Picture>
      </PaddingDiv>
      <PaddingDiv>
        <Picture>
          <SmallText />
          <Line />
          <Line />
          <Line />
          <Row>
            <Col>
              <Row>
                <Col md={2}>
                  <Circle />
                </Col>
                <Col>
                  <SmallText />
                </Col>
              </Row>
            </Col>
            <PaddingCol>
              <Row>
                <Col md={2}>
                  <Circle />
                </Col>
                <Col>
                  <SmallText />
                </Col>
              </Row>
            </PaddingCol>
          </Row>
        </Picture>
      </PaddingDiv>
    </RightCol>
  </Wrapper>
);
