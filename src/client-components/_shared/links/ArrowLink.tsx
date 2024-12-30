import React from "react";
import Link, { LinkProps } from "./Link";
import styled from "styled-components";
import ArrowRight from "../../../styles/assets/icons/arrow-right-small.svg";
import { colors } from "../../../styles/constants";
import Image from "next/image";

/**
 * The ArrowLink component should be used for block element links ending with an arrow.
 */

const StyledArrowLink = styled(Link)`
  text-decoration: none;
  display: block;
  > span {
    text-decoration: none;
  }

  img {
    width: 0.7em;
    height: 0.5em;
    margin-bottom: 0.1em;
  }

  :hover {
    text-decoration: underline;

    img path {
      stroke: ${colors.mossGreen.dark};
    }
  }

  :active img path {
    stroke: ${colors.slateBlue.standard};
  }
`;

const ArrowLink: React.FC<LinkProps> = ({ children, ...props }) => (
  <StyledArrowLink {...props}>
    {children} <Image src={ArrowRight} alt="" />
  </StyledArrowLink>
);

export default ArrowLink;
