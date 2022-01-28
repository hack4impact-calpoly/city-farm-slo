import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "@mui/material/Modal";

export default function HomeModal({ children, open, handleClose }) {
  const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 400px;
    background-color: white;
    border-radius: 12px;
    padding: 8px;
  `;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer>{children}</ModalContainer>
    </Modal>
  );
}

HomeModal.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
