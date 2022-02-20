import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
// import { isMobile } from "react-device-detect";

export default function HomeModal({ children, open, handleClose }) {
  const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 80%;
    min-height: 70%;
    display: flex;
    justify-content: center;
  `;

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContainer>{children}</ModalContainer>
    </Modal>
  );
}

HomeModal.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
