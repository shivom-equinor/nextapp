import React, { useState } from "react";
import styled from "styled-components";
import uniqueId from "lodash/uniqueId";

import Modal from "./Modal";
import { whitespace, ws } from "../../styles/constants";
import { remCalc } from "../../styles/functions";
import { SecondaryButton, PrimaryButton, TertiaryButton } from "./buttons";
import Checkbox from "../_shared/form-elements/Checkbox";
import SanitizeHtml from "../../helpers/SanitizeHtml";

interface ConfirmationModalProps {
  isOpen: boolean;
  isSoftValidationMessage?: boolean;
  handleClose: () => void;
  message: string;
  additionalInfo?: string;
  confirmLabel: string;
  handleConfirm: () => void;
  alternativeLabel?: string;
  handleAlternative?: () => void;
  cancelLabel?: string;
  isSubmitting?: boolean;
  isCheckBoxVisible?: boolean;
  checkboxMsg?: string;
}

interface MessageBodyProps {
  isSoftValidationMessage?: boolean;
}

const Body = styled.div<MessageBodyProps>`
  font-size: ${(props) =>
    props.isSoftValidationMessage ? remCalc(18) : remCalc(26)};
  padding: ${ws.padding} 4rem ${whitespace.l};
  text-align: ${(props) => (props.isSoftValidationMessage ? "left" : "center")};
`;

const Footer = styled.div`
  padding: ${ws.padding} 5rem;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;

    button {
      text-transform: uppercase;
    }
  }

  button + button {
    margin-left: ${ws.padding};
  }
`;

const Section = styled.div`
  margin-left: ${whitespace.l};
`;

const AdditionalInfo = styled.div`
  font-size: ${remCalc(22)};
  padding: ${ws.padding} 4rem ${whitespace.l};
  text-align: center;
`;

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  isSoftValidationMessage = false,
  handleClose,
  message,
  additionalInfo,
  confirmLabel,
  alternativeLabel,
  handleConfirm,
  handleAlternative,
  cancelLabel = "Cancel",
  isSubmitting = false,
  isCheckBoxVisible = false,
  checkboxMsg,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const body = (
    <Body isSoftValidationMessage={isSoftValidationMessage}>
      <SanitizeHtml dirtyHtml={message} type="div" />
    </Body>
  );

  const extraInfo = additionalInfo && (
    <AdditionalInfo>{additionalInfo}</AdditionalInfo>
  );

  const checkboxInfo = isCheckBoxVisible && checkboxMsg && (
    <Section>
      <Checkbox
        uniqueId={uniqueId()}
        label={checkboxMsg}
        value=""
        name=""
        onChange={(event) => setIsChecked(!isChecked)}
      />
    </Section>
  );

  const finalMessage = (
    <>
      {body} {extraInfo} {checkboxInfo}
    </>
  );

  const footer = (
    <Footer>
      <TertiaryButton
        label={cancelLabel}
        onClick={handleClose}
        disabled={isSubmitting}
      ></TertiaryButton>
      <div>
        {alternativeLabel && handleAlternative && (
          <SecondaryButton
            label={alternativeLabel}
            onClick={handleAlternative}
            disabled={isSubmitting}
          />
        )}

        <PrimaryButton
          label={confirmLabel.toUpperCase()}
          onClick={handleConfirm}
          disabled={isSubmitting || (isCheckBoxVisible && !isChecked)}
        />
      </div>
    </Footer>
  );

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      body={finalMessage}
      footer={footer}
    ></Modal>
  );
};

export default ConfirmationModal;
