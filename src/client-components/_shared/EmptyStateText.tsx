import React from "react";
import styled from "styled-components";
import { fontStyle } from "../../styles/constants";

const Text = styled.p`
  padding-bottom: 0;
  font-style: ${fontStyle.italic};
`;

const EmptyStateText: React.FunctionComponent<any> = ({ children }: any) => {
  return <Text>{children}</Text>;
};

export default EmptyStateText;
