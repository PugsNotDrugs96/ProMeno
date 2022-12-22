import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Col, FloatingLabel } from "react-bootstrap";

function CodeValidatorForm() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const errRef = useRef();
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [code]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code === "test123") {
      setSuccess(true);
    } else {
      setErrMsg("Felaktig kod");
    }
  };

  return (
    <>
      {success ? (
        navigate("/register")
      ) : (
        <Container className="content">
          <Col>
            <h1 className="text-center text-info text-black" id="reg-text-2">
              Registrera dig
            </h1>
          </Col>
          <Form onSubmit={handleSubmit}>
            <h3 className="text-center">Steg 1</h3>
            <FloatingLabel
              className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
              controlId="floatingInput"
              label="Registeringskod"
            >
              <Form.Control
                as="input"
                ref={userRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              ></Form.Control>
            </FloatingLabel>
            <div className="text-center mx-auto mt-3 ">
              <Button
                className="btn btn-success btn-lg mb-4 gap-3"
                style={{ width: "18rem" }}
                href="/"
                variant="secondary"
                type="submit"
              >
                Tillbaka
              </Button>
              <Button
                className="btn btn-success btn-lg mb-4 gap-3"
                style={{ width: "18rem" }}
                variant="primary"
                type="submit"
              >
                Nästa
              </Button>
              <p
                ref={errRef}
                className={
                  errMsg ? "errmsg text-danger text-center mt-2" : "offscreen"
                }
                aria-live="assertive"
              >
                {errMsg}
              </p>
            </div>
          </Form>
        </Container>
      )}
    </>
  );
}
export default CodeValidatorForm;
