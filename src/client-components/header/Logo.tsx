import React from "react";
import styled from "styled-components";

import Link from "../_shared/links/Link";
import { remCalc } from "../../styles/functions";
import { numericValue, whitespace } from "../../styles/constants";
import logo from "../../styles/assets/img/co-lab-logo.svg";

interface LogoProps {
  isClickable?: boolean;
}

const StyledLogo = styled(logo)`
  /* padding: ${whitespace.xxs} ${remCalc(6)} ${remCalc(10)}; */
  margin: ${whitespace.xxs} ${remCalc(6)};
  width: ${numericValue.value100}%;
`;

const LogoContainer: React.FC = () => {
  return <StyledLogo />;
};

const Logo: React.FC<LogoProps> = ({ isClickable = true }) => {
  return (
    <>
      {isClickable ? (
        <Link to="/">
          <LogoContainer />
        </Link>
      ) : (
        <LogoContainer />
      )}
    </>
  );
};

export default Logo;
