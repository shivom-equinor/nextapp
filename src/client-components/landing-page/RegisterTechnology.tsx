import React from "react";
import styled from "styled-components";

import { PrimaryButton } from "../_shared/buttons";
import Plus from "../../styles/assets/icons/plus-sign.svg";
import { ws, numericValue, whitespace } from "../../styles/constants";
import { remCalc } from "../../styles/functions";
import NextLink from "../_shared/links/Link";

const RegistrationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  height: ${numericValue.value100}%;
  max-height: ${remCalc(140)};
  padding-bottom: calc(${ws.margin} + 1rem);

  img {
    height: 1rem;
    margin-top: -0.125rem;
    margin-right: ${whitespace.xxs};
  }

  span {
    text-decoration: none !important;
  }
`;

const RegisterTechnology = () => {
  const registerTechnology = () => {
    // router.push("/pitch/createNewPitch");
  };

  return (
    <RegistrationContainer>
      <NextLink to="/pitch" prefetch={false}>
        <PrimaryButton
          label="REGISTER SOLUTION"
          icon={Plus}
          onClick={registerTechnology}
        />
      </NextLink>
    </RegistrationContainer>
  );
};

export default RegisterTechnology;
