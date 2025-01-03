import React, { SyntheticEvent } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import Image from "next/image";

import { colors, numericValue } from "../../../styles/constants";
import ExternalSvg from "../../../styles/assets/icons/external.svg";

export interface LinkProps {
  to: string;
  external?: boolean;
  withExternalIcon?: boolean;
  className?: string;
  innerref?: any;
  prefetch?: boolean;
  /*
   * Use an onClick event with history.push when needing to
   * do state changes when navigating to another page.
   */
  children: any;
  pushToHistory?: () => void;
}

const LinkStyles = () => css`
  color: ${colors.mossGreen.standard};
  font-weight: ${numericValue.value600};
  span {
    text-decoration: underline;
  }
  > * {
    display: inline;
  }
  :hover {
    color: ${colors.mossGreen.dark};
    .changeable-stroke {
      stroke: ${colors.mossGreen.dark};
    }
    .changeable-fill {
      fill: ${colors.mossGreen.dark};
    }
  }
  :active {
    color: ${colors.slateBlue.standard};
    .changeable-stroke {
      stroke: ${colors.slateBlue.standard};
    }
    .changeable-fill {
      fill: ${colors.slateBlue.standard};
    }
  }
`;

const RouterLink = styled(Link)`
  ${LinkStyles}
`;

interface ExternalProps {
  hasExternalIcon: boolean;
}

const ExternalLink = styled.a<ExternalProps>`
  ${LinkStyles}
  > span {
    ${(props) => props.hasExternalIcon && "padding-right: 20px;"}
  }
`;

const LinkWithHistoryPush = styled.a`
  ${LinkStyles}
`;

const ExternalIcon = styled(Image)`
  height: 0.8em;
  width: 0.8em;
  margin-left: -12px;
  margin-top: -0.2rem;
  .changeable-stroke {
    stroke: ${colors.mossGreen.standard};
  }
  .changeable-fill {
    fill: ${colors.mossGreen.standard};
  }
`;

/**
 * The Link component should be used for inline links, both external and internal
 */

const NextLink: React.FunctionComponent<LinkProps> = ({
  to,
  external,
  withExternalIcon = false,
  className,
  children,
  innerref,
  prefetch = true,
  pushToHistory,
}) => {
  const onClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (pushToHistory) {
      pushToHistory();
    }
  };

  return external ? (
    <ExternalLink
      className={className}
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      hasExternalIcon={withExternalIcon}
    >
      <span>{children}</span>
      {children && withExternalIcon && (
        <ExternalIcon src={ExternalSvg} alt="" />
      )}
    </ExternalLink>
  ) : pushToHistory ? (
    <LinkWithHistoryPush href={to} className={className} onClick={onClick}>
      <span>{children}</span>
    </LinkWithHistoryPush>
  ) : (
    <RouterLink className={className} prefetch={prefetch} href={to}>
      <span>{children}</span>
    </RouterLink>
  );
};

export default NextLink;
