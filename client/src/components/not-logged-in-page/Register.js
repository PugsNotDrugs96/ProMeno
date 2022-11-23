/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import ConsentForm from "../ConsentForm";

function Register(props) {
  const [message, setMessage] = useState("");
  const [authStep, setAuthMode] = useState(1);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (message === "test123") {
      setMessage("");
      setAuthMode("step2");
    }
  };

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  function LoadingButton() {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
      if (isLoading) {
        simulateNetworkRequest().then(() => {
          setLoading(false);
        });
      }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? "Skickar vidare..." : " Registrera"}
      </Button>
    );
  }

  if (authStep === "step2") {
    return (
      <Container>
        <Col>
          <h1 className="text-center text-info text-black">Registrera dig!</h1>
        </Col>
        <Form className="col-md-5 mx-auto col-lg-5 mt-3 mb-3">
          <h3 className="text-center">Steg 2</h3>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ange ditt email här.."
              onChange={handleChange}
            />
          </Form.Group>
          <div className="text-center mx-auto mt-3">
            <p>
              Genom att registera ett konto så godkänner du våra
              <a
                onClick={handleShow}
                style={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "blue",
                  paddingLeft: "8px",
                }}
              >
                villkor
              </a>
            </p>
            <LoadingButton />
          </div>
        </Form>
        <Modal show={show} onHide={handleClose} animation={false} size="lg">
          <Modal.Body>
            <ConsentForm />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Stäng
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }

  return (
    <Container>
      <Col>
        <h1 className="text-center text-info text-black"> Registrera dig!</h1>{" "}
      </Col>
      <Form className="col-md-5 mx-auto col-lg-5 mt-3 mb-3">
        <h3 className="text-center">Steg 1</h3>
        <Form.Label>Registreringskod</Form.Label>
        <Form.Group controlId="textarea">
          <Form.Control
            as="input"
            placeholder="Skriv registreringskoden här.."
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <div className="text-center mx-auto mt-3 ">
          <Button variant="primary" type="submit" onClick={handleClick}>
            Nästa
          </Button>
          <Button href="/" variant="secondary" type="submit">
            Tillbaka
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Register;
