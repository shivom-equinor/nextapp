import React from "react";
import styled from "styled-components";

import { colors, numericValue, transitions } from "../../styles/constants";
import { remCalc } from "../../styles/functions";

interface TagProps {
  label: string;
  backgroundColor?: string;
}
interface TagcolorProps {
  backgroundColor?: string;
}
const StyledTag = styled.div<TagcolorProps>`
  line-height: ${remCalc(14)};
  font-size: ${remCalc(12)};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : colors.mistBlue.dark};
  font-weight: ${numericValue.value600};
  text-align: center;
  padding: ${remCalc(6)} ${remCalc(12)};
  margin-right: 12px;
  word-break: normal;
  border-radius: 24px;
  transition: ${transitions.bgHover};
`;

const Tag = ({ label, backgroundColor }: TagProps) => {
  return <StyledTag backgroundColor={backgroundColor}>{label}</StyledTag>;
};

export default Tag;
