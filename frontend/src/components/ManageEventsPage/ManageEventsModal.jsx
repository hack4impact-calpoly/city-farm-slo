import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "@mui/material/Modal";

export default function ManageEventsModal({ children, open, handleClose }) {
  const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 75%;
    min-height: 75%;
    width: 75%;
    height: 75%;
  `;

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContainer>{children}</ModalContainer>
    </Modal>
  );
}

// Example
/* <ManageEventsModal open={open} handleClose={() => {}}}>
  <WarningModal
    handleModalClose={() => setOpen(false)}
    header="Warning"
    text="Scheduled for past date"
    type="Suggestion"
    continueAction={() => setOpen(false)}
  />
</ManageEventsModal> */

ManageEventsModal.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
