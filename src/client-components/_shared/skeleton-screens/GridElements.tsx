import React from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";

export const LeftCol = ({ children }: any) => <Col xs={8}>{children}</Col>;

export const RightCol = ({ children }: any) => <Col xs={4}>{children}</Col>;

const StyledIndentWrapper = styled.div`
  padding: 0;
`;

export const IndentWrapper = ({ children }: any) => (
  <StyledIndentWrapper>{children}</StyledIndentWrapper>
);
