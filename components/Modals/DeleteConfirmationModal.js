import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteConfirmationModal = ({
  show,
  onHide,
  onDelete,
  title,
  confirmText,
  confirmButtonText,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{confirmText}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={onDelete}>
          {confirmButtonText ? confirmButtonText : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
