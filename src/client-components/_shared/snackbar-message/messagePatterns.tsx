import React from "react";
import styled from "styled-components";

import Link from "../../_shared/links/Link";
import { colors, numericValue } from "../../../styles/constants";

const StyledLabel = styled.label`
  font-weight: ${numericValue.value600};
`;
const StyledLi = styled.li`
  list-style: none;
  > span {
    color: ${colors.red.energic};
  }
`;

export const validationHeading =
  "Mandatory fields are incorrect or missing information";
export const appErrorHeading = "The application encountered an error.";
export const networkErrorHeading = "A network error occurred.";

export const APIErrorBodyMessage = (
  <span>
    Please wait a moment before trying again. If you still encounter errors
    please contact &nbsp;
    <Link to="https://equinor.service-now.com/selfservice/" external={true}>
      Services @ Equinor
    </Link>
  </span>
);

export const ValidationBody: React.FC<any> = ({ children }) => (
  <div>
    Please check and correct the following <ul>{children}</ul>
  </div>
);

interface IErrorProps {
  label: any;
  errors: string[];
  keyIndex: number;
}

export const ErrorListItem: React.FC<IErrorProps> = ({
  label,
  errors,
  keyIndex,
}) => (
  <StyledLi key={keyIndex}>
    <StyledLabel>{label}</StyledLabel> {" - "}
    {errors.map((error: string, index: number) => (
      <React.Fragment key={index}>
        {index > 0 && ", "}
        <span>{error}</span>
      </React.Fragment>
    ))}
  </StyledLi>
);
