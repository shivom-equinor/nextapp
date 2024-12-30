import React from "react";
import styled from "styled-components";

import {
  ws,
  borderColors,
  colors,
  whitespace,
  errorColors,
  clearBtnColor,
  numericValue,
  fontStyle,
} from "../../../styles/constants";
import { remCalc } from "../../../styles/functions";
import { FieldLabel as Label } from "./_framework/FieldLabel";
import Close from "../../../styles/assets/icons/x.svg";
import { Button } from "../buttons/Button";

interface TextFieldProps {
  uniqueId: string;
  label: string;
  visibleLabel?: boolean;
  isNumberInput?: boolean;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.ChangeEvent<any>) => void;
  onFocus?: (e: React.ChangeEvent<any>) => void;
  onKeyDown?: (e: React.ChangeEvent<any>) => void;
  defaultValue?: string;
  placeholder?: string;
  helpText?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  errors?: string;
  linkOnSameLine?: boolean;
  touched?: boolean;
  hyperLink?: string;
  hyperLinkText?: string;
  reference?: React.RefObject<HTMLInputElement>;
  autoComplete?: boolean;
  onClearBtnClick?: () => void;
  showClearButton?: boolean;
  value?: string;
  maxlength?: number;
  name?: string; // This is optional and added for only to get the corporate search value
  isHelpInfoVisible?: boolean;
}

interface WrapperProps {
  haserror: boolean | any;
}

const Wrapper = styled.div<WrapperProps>`
  margin-bottom: ${whitespace.l};
  input {
    display: block;
    width: ${numericValue.value100}%;
    height: 46px;
    background-color: ${(props) =>
      props.haserror ? errorColors.background : "white"};
    border: ${remCalc(0.96)} solid ${borderColors.standard};
    padding: ${whitespace.xxs} ${ws.padding};
    font-size: 1rem;

    ::placeholder {
      font-style: ${fontStyle.italic};
      color: ${colors.slateBlue.sb70};
    }

    &[readOnly] {
      /* Temporary color code because design not provided */
      background-color: #f5f6f7;
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const ClearButton = styled(Button)`
  background-color: transparent;
  position: absolute;
  right: ${remCalc(4)};
  bottom: calc(50% - 14px);
  padding: ${whitespace.xs};

  > svg {
    width: ${remCalc(8)};
    height: ${remCalc(8)};
    opacity: 0.8;

    > path {
      fill: ${clearBtnColor};
      stroke: ${clearBtnColor};
      stroke-width: 0.8;
    }
  }
`;

const TextField: React.FC<TextFieldProps> = ({
  uniqueId,
  label,
  visibleLabel = true,
  isNumberInput,
  required,
  helpText,
  errors,
  linkOnSameLine,
  touched = false,
  hyperLink,
  hyperLinkText,
  reference,
  autoComplete = true,
  showClearButton = false,
  onClearBtnClick,
  defaultValue,
  value,
  maxlength,
  isHelpInfoVisible = true,
  ...props
}) => {
  const inputValue: string = value ? value : defaultValue ? defaultValue : "";

  const hasValidationError = !!errors && touched;

  return (
    <Wrapper haserror={"false"}>
      <Label
        id={uniqueId}
        label={label}
        className={visibleLabel ? "" : "visually-hidden"}
        required={required}
      />
      <InputWrapper>
        <input
          id={uniqueId}
          type={isNumberInput ? "number" : "text"}
          ref={reference}
          autoComplete={!autoComplete ? "off" : undefined}
          value={inputValue}
          maxLength={maxlength ? maxlength : undefined}
          {...props}
        />

        {/* Clear icon */}
        {showClearButton && inputValue.length > 0 && (
          <ClearButton icon={Close} onClick={onClearBtnClick} />
        )}
      </InputWrapper>
      {/* {isHelpInfoVisible && (
        <HelpText
          haserror={hasValidationError}
          errorMessage={errors}
          linkOnSameLine={linkOnSameLine}
          helpText={helpText}
          hyperLink={hyperLink}
          hyperLinkText={hyperLinkText}
        />
      )} */}
    </Wrapper>
  );
};

export default TextField;
