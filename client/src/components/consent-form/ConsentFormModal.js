import "./consentForm.css";
import React from "react";
import ConsentForm from "./ConsentForm";
import { Button, Modal } from "react-bootstrap";

function ConsentFormModal(props) {
  const { showConsentForm, setShowConsentForm } = props;

  const handleClose = () => {
    setShowConsentForm(false);
  };

  return (
    <Modal
      show={showConsentForm}
      onHide={handleClose}
      animation={false}
      size="lg"
    >
      <Modal.Body>
        <ConsentForm />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Stäng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ConsentFormModal;
