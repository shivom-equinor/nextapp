import React from "react";
import styled from "styled-components";
import { skeleton, ws } from "../../../styles/constants";
import { Line, LighterLine } from "./_skeleton-bases";
import { remCalc } from "../../../styles/functions";

const Card = styled.div`
  height: 184px;
  margin-bottom: ${ws.padding};
  padding: ${ws.padding};
  display: flex;

  > :last-child {
    flex-grow: 1;
    padding-top: ${remCalc(4.8)};
    padding-left: ${ws.padding};
  }
`;

const Picture = styled.div`
  flex-shrink: 0;
  height: 152px;
  width: 152px;
  background-color: ${skeleton.light};
`;

const HeadingFirst = styled<any>(Line)`
  width: 48%;
`;

const HeadingSecond = styled<any>(Line)`
  width: 26%;
`;

export const MyTechCardSkeleton = () => (
  <Card>
    <Picture></Picture>
    <div>
      <HeadingFirst />
      <HeadingSecond />
      <br></br>
      <Line />
      <Line />
    </div>
  </Card>
);

const Wrapper = styled.div`
  position: relative;
`;

const Tabs = styled<any>(LighterLine)`
  height: 36px;
  width: 379px;
  margin-bottom: 12px;
`;

interface DividerProps {
  leftPosition: number;
}

const Divider = styled.div<DividerProps>`
  background-color: white;
  width: ${remCalc(4.8)};
  height: 36px;
  position: absolute;
  top: 0;
  left: ${(props) => props.leftPosition}px;
`;

export const MyTechTabSkeleton = () => (
  <Wrapper>
    <Divider leftPosition={133} />
    <Divider leftPosition={246} />
    <Tabs />
  </Wrapper>
);
