import React from "react";
import styled from "styled-components";
import { colors, numericValue, ws } from "../../styles/constants";
import { remCalc } from "../../styles/functions";

const NoImagediv = styled.section`
  width: ${numericValue.value100}%;
  height: ${numericValue.value100}%;
  border: ${remCalc(3.04)} dashed ${colors.mossGreen.mg35};
  background-color: white;
`;

const Textdiv = styled.div`
  font-size: ${remCalc(14)};
  padding: ${ws.padding};
  text-align: center;
  color: ${colors.slateBlue.sb70};
  top: 50%;
  transform: translateY(-50%);
  position: relative;
`;
const NoImage = () => (
  <NoImagediv>
    <Textdiv>NO IMAGE</Textdiv>
  </NoImagediv>
);

export default NoImage;
