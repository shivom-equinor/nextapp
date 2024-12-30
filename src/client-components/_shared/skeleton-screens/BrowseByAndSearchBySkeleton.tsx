import React from "react";
import styled from "styled-components";

import { Line, LighterLine } from "./_skeleton-bases";

const Label = styled<any>(Line)`
  width: 65px !important;
`;

const Dropdown = styled<any>(LighterLine)`
  height: 33px;
  margin-bottom: 0;
`;

export const BrowseByAndSearchBySkeleton = () => (
  <div>
    <Label />
    <Dropdown />
  </div>
);
