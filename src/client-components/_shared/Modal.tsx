import React from "react";
import styled from "styled-components";
import { Modal as BootstrapModal } from "react-bootstrap";

import {
  borderColors,
  ws,
  whitespace,
  z,
  numericValue,
} from "../../styles/constants";
import { CloseX } from "../_shared/buttons";
import { remCalc } from "../../styles/functions";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  body: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  closeOnOutsideClick?: boolean;
  enforceFocus?: boolean;
  isCloseBtnVisible?: boolean;
}

const StyledModal = styled(BootstrapModal)`
  z-index: ${z.modal};
  .modal-dialog {
    max-width: ${numericValue.value700}px;
    margin: 5rem auto;
  }
  .modal-content {
    background-color: white;
    border: none;
    border-radius: 0;
  }
`;

const Header = styled.div`
  padding: ${ws.padding};
  padding-bottom: 0;
  display: flex;
  justify-content: flex-end;
`;

const Body = styled.div`
  font-size: ${remCalc(26)};
  padding: ${ws.padding} ${whitespace.l};
`;

const Footer = styled.div`
  border-top: ${remCalc(0.96)} solid ${borderColors.standard};
  padding: ${ws.padding};
`;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  body,
  footer,
  header,
  closeOnOutsideClick = true,
  enforceFocus = true,
  isCloseBtnVisible = true,
}) => {
  return (
    <StyledModal
      show={isOpen}
      onHide={handleClose}
      backdrop={closeOnOutsideClick ? true : "static"}
      enforceFocus={enforceFocus}
    >
      <Header>
        {header}
        {isCloseBtnVisible && <CloseX onClick={handleClose} />}
      </Header>
      <Body>{body}</Body>
      {footer && <Footer>{footer}</Footer>}
    </StyledModal>
  );
};

export default Modal;
