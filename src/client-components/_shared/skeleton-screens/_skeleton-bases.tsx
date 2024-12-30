import styled, { keyframes } from "styled-components";
import { skeleton, ws, numericValue } from "../../../styles/constants";
import { remCalc } from "../../../styles/functions";

export const ShineLines = keyframes`
  0% { background-position: ${remCalc(0)}; }
  100% { background-position: 1000px; }
`;

export const Line = styled.div`
  height: 1rem;
  background-color: ${skeleton.dark};
  background-image: linear-gradient(
    90deg,
    ${skeleton.dark} ${remCalc(0)},
    ${skeleton.shine} 60px,
    ${skeleton.dark} 120px
  );
  background-size: 1000px;
  width: ${numericValue.value100}%;
  margin-bottom: ${ws.padding};
  animation: ${ShineLines} 1.5s linear infinite;
`;

export const VerticalLine = styled.div`
  height: ${numericValue.value100}%;
  background-color: ${skeleton.dark};
  background-image: linear-gradient(
    90deg,
    ${skeleton.dark} ${remCalc(0)},
    ${skeleton.shine} 60px,
    ${skeleton.dark} 120px
  );
  background-size: 1000px;
  width: 0.5rem;
  margin-bottom: ${ws.padding};
  animation: ${ShineLines} 1.5s linear infinite;
`;

export const BigBox = styled.div`
  height: 348px;
  background-color: ${skeleton.light};
  width: ${numericValue.value100}%;
  margin-bottom: ${ws.padding};
  padding: ${ws.padding};
`;

export const Picture = styled.div`
  height: ${numericValue.value200}px;
  width: ${numericValue.value100}%;
  margin-bottom: ${ws.margin};
  background-color: ${skeleton.light};
  padding: ${ws.padding};
`;

export const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${skeleton.dark};
  display: inline-block;
`;

export const LighterLine = styled.div`
  height: 1rem;
  background-color: ${skeleton.light};
  background-image: linear-gradient(
    90deg,
    ${skeleton.light} ${remCalc(0)},
    ${skeleton.shine} 60px,
    ${skeleton.light} 120px
  );
  background-size: 1000px;
  width: ${numericValue.value100}%;
  margin-bottom: ${ws.padding};
  animation: ${ShineLines} 1.5s linear infinite;
`;
