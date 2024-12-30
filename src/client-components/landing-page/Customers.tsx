import React from "react";
import styled from "styled-components";
import { remCalc } from "../../styles/functions";
import { numericValue } from "../../styles/constants";

interface TRLProps {
  firstCustomer: string;
  count: number;
}

interface CountProps {
  showCount: boolean;
}

const TRL = styled.div`
  width: inherit;
  h5 {
    font-weight: ${numericValue.value600};
    margin-bottom: 0;
  }

  * {
    font-size: ${remCalc(14)};
    line-height: 1rem;
  }
`;

const Description = styled.div<CountProps>`
  display: flex;

  > div:first-child {
    max-width: ${(props) => (props.showCount ? "calc(100% - 2rem)" : "100%")};
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 0.3em;
  }
`;

const TRLdescription: React.FC<TRLProps> = ({ firstCustomer, count }) => {
  const showCount = !!count && count >= 1;
  return (
    <TRL>
      <h5>Customers:</h5>
      {firstCustomer && (
        <Description showCount={showCount}>
          <div>{firstCustomer}</div>
          {showCount && <div>+ {count}</div>}
        </Description>
      )}
    </TRL>
  );
};

export default TRLdescription;
