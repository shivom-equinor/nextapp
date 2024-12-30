"use client";
import styled from "styled-components";

import { backgrounds, numericValue, ws } from "@/styles/constants";

const StyledContainer = styled.div`
  background-color: ${backgrounds.main};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: ${numericValue.value100}vh;
`;

const StyledMain = styled.main`
  margin-top: ${ws.margin};
  margin-bottom: ${ws.margin};
  flex-grow: 1;
`;

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledContainer>
      <StyledMain className="container">{children}</StyledMain>
    </StyledContainer>
  );
};

export default Container;
