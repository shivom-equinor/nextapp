import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";

import { Line, VerticalLine, Circle } from "./_skeleton-bases";

const ColCircle = styled(Col)`
  position: relative;
  vertical-align: middle;
  text-align: center;
  display: table-cell;
  left: -2%;
`;

const ColWrapper = styled(Col)`
  padding-bottom: 1rem;
`;

export const InfoLinksSkeleton = () => (
  <>
    <Row>
      <ColCircle md={1}>
        <Circle />
      </ColCircle>
      <Col></Col>
    </Row>
    <Row>
      <ColWrapper md={1}>
        <VerticalLine />
      </ColWrapper>
      <Col>
        <Line />
        <Line />
        <Line />
      </Col>
    </Row>
  </>
);
