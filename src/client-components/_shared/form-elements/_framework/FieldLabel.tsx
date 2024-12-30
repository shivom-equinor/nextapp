import React from "react";
import styled from "styled-components";

import { remCalc } from "../../../../styles/functions";
import { numericValue } from "../../../../styles/constants";

interface LabelProps {
  label: string;
  id?: string;
  required?: boolean;
  className?: string;
}

const Label = styled.label`
  display: block;
  font-size: ${remCalc(14)};
  line-height: 1.2rem;
  font-weight: ${numericValue.value600};
`;

const Optional = styled.span`
  font-weight: ${numericValue.value400};
`;

export const FieldLabel: React.FC<LabelProps> = ({
  label,
  id,
  required = true,
  className,
}) => (
  <Label className={className}>
    {label}
    {!required && <Optional> (Optional)</Optional>}
  </Label>
);
