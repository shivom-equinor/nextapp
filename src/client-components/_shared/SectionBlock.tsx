import React from "react";
import styled from "styled-components";

import { ws } from "../../styles/constants";

interface SectionBlockProps {
  heading?: string;
  className?: string;
  children: React.ReactNode;
}

const Block = styled.section`
  background-color: white;
  padding: ${ws.padding};
  margin-bottom: ${ws.margin};
`;

const SectionBlock: React.FunctionComponent<SectionBlockProps> = ({
  heading,
  className,
  children,
}) => {
  return (
    <Block className={className}>
      {heading && <h2>{heading}</h2>}
      {children}
    </Block>
  );
};

export default SectionBlock;
