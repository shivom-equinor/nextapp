import React from "react";
import styled from "styled-components";
import { ws } from "../../../styles/constants";
import { Line, LighterLine } from "./_skeleton-bases";

const CountLine = styled<any>(LighterLine)`
  width: 210px;
`;

const Row = styled.div`
  display: flex;
  position: relative;
  background-color: white;
  padding-bottom: ${ws.padding};
`;

interface DividerProps {
  leftPosition: number;
}

const Divider = styled.div<DividerProps>`
  background-color: white;
  width: ${ws.margin};
  height: ${ws.padding};
  position: absolute;
  top: 0;
  left: ${(props) => props.leftPosition}%;
`;

export const TechListSkeleton = () => {
  const dividers = (
    <>
      <Divider leftPosition={25} />
      <Divider leftPosition={45} />
      <Divider leftPosition={57} />
      <Divider leftPosition={75} />
      <Divider leftPosition={85} />
    </>
  );

  const createTableRows = () => {
    let table = [];

    for (let i = 0; i < 20; i++) {
      table.push(
        <Row key={i}>
          {dividers}
          <LighterLine />
        </Row>
      );
    }
    return table;
  };
  return (
    <div>
      <Row>
        {dividers}
        <Line />
      </Row>
      {createTableRows()}
    </div>
  );
};

export const CountSkeleton = () => <CountLine />;
