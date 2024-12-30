import React from "react";
import styled from "styled-components";
import { useSnackbar } from "notistack";

import { colors, numericValue, whitespace } from "../../../styles/constants";
import { remCalc } from "../../../styles/functions";
import SuccessIcon from "../../../styles/assets/icons/check-green.svg";
import ErrorIcon from "../../../styles/assets/icons/warning-red.svg";
import WarningIcon from "../../../styles/assets/icons/warning-yellow.svg";
import DefaultIcon from "../../../styles/assets/icons/info-icon.svg";
import { CloseX } from "../../_shared/buttons";
import ArrowLink from "../../_shared/links/ArrowLink";
import { variants } from "./snackbarConstants";

interface StyleProps {
  type: string;
}

const SnackbarContainer = styled.div<StyleProps>`
  padding: ${whitespace.l};
  display: flex;
  align-items: flex-start;
  background-color: ${(props) =>
    (props.type === `${variants.SUCCESS}` &&
      `${colors.lichenGreen.standard}`) ||
    (props.type === `${variants.ERROR}` && `${colors.red.energic05}`) ||
    (props.type === `${variants.WARNING}` &&
      `${colors.floralWhite.standard}`) ||
    (props.type === `${variants.DEFAULT}` && `${colors.mistBlue.standard}`) ||
    `${colors.mistBlue.standard}`};
  border: ${remCalc(0.96)} solid
    ${(props) =>
      (props.type === `${variants.SUCCESS}` &&
        `${colors.emeraldGreen.standard}`) ||
      (props.type === `${variants.ERROR}` && `${colors.red.energic}`) ||
      (props.type === `${variants.WARNING}` && "#EFC023") ||
      (props.type === `${variants.DEFAULT}` && `${colors.mistBlue.darker}`) ||
      `${colors.mistBlue.darker}`};
  box-shadow: ${remCalc(0)} ${remCalc(3.04)} ${remCalc(6.4)} #00000054;
  margin-top: ${remCalc(60)};
  width: 90vw;
  @media (min-width: 992px) {
    width: 960px;
  }
  @media (min-width: 1200px) {
    width: 1140px;
  }
  @media (min-width: 1260px) {
    width: 1200px;
  }
  @media (min-width: 1380px) {
    width: 1300px;
  }
`;

const IconContainer = styled.div`
  width: ${remCalc(50)};
  margin-top: -${remCalc(2.08)};
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  > p {
    font-weight: ${numericValue.value600};
    margin-bottom: 0;
    font-size: ${remCalc(18)};
    line-height: ${remCalc(24)};
  }
`;

const BodyWrapper = styled.div`
  margin-top: ${remCalc(12)};
  > span {
    font-size: ${remCalc(18)};
  }
`;

const CloseButton = styled(CloseX)`
  position: relative;
  top: -${whitespace.m};
  right: -${whitespace.m};
`;

const StyledArrowLink = styled(ArrowLink)`
  display: inline-block;
`;

interface SnackbarProps {
  forwardedRef: any;
  rest: any;
}

const CustomSnackbarMessage: React.FC<SnackbarProps> = ({
  forwardedRef,
  rest,
}) => {
  const { closeSnackbar } = useSnackbar();
  const closeSnackbarHandler = () => {
    closeSnackbar(rest.id);
  };

  return (
    <SnackbarContainer type={rest.type} ref={forwardedRef}>
      <IconContainer>
        {(rest.type === variants.SUCCESS && <SuccessIcon />) ||
          (rest.type === variants.ERROR && <ErrorIcon />) ||
          (rest.type === variants.WARNING && <WarningIcon />) ||
          (rest.type === variants.DEFAULT && <DefaultIcon />) || (
            <DefaultIcon />
          )}
      </IconContainer>

      <ContentContainer>
        <p>{rest.heading}</p>
        <BodyWrapper>
          {rest.bodyText}
          {rest.url && rest.linkText && (
            <span onClick={closeSnackbarHandler}>
              <StyledArrowLink to={rest.url} external={false}>
                {rest.linkText}
              </StyledArrowLink>
            </span>
          )}
        </BodyWrapper>
      </ContentContainer>

      <CloseButton onClick={closeSnackbarHandler} />
    </SnackbarContainer>
  );
};

export default React.forwardRef((props, ref) => {
  return <CustomSnackbarMessage forwardedRef={ref} rest={props} />;
});
