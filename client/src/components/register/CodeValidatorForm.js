import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Col,
  FloatingLabel,
  Image,
} from "react-bootstrap";
import { validateCode } from "../../api/api";
import Lotus from "../../assets/lotus.svg";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await validateCode(code);
      console.log(response);
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Inget svar från servern");
      } else if (err?.response.status === 401) {
        setErrMsg("Felaktig kod");
      } else {
        setErrMsg("Något gick fel, försök igen eller kontakta vår support");
      }
      errRef.current.focus();
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
              Registrera dig, steg 1
            </h1>
            <Image
              src={Lotus}
              alt="..."
              width="100"
              length="100"
              className="rounded mx-auto d-block"
            />
          </Col>
          <Form onSubmit={handleSubmit}>
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
            <div className="text-center mx-auto mt-4">
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
            </div>
          </Form>
          <div className="text-center col-md-5 mx-auto col-lg-5 mb-3">
            <p>
              För att skapa ett konto hos ProMeno så behöver du uppge en kod. Du
              får den från din vårdcentral eller annan mottagning som erbjudit
              dig att delta i studien.
            </p>
          </div>
          <p
            ref={errRef}
            className={
              errMsg ? "errmsg text-danger text-center mt-2" : "offscreen"
            }
            aria-live="assertive"
          >
            {errMsg}
          </p>
        </Container>
      )}
    </>
  );
}
export default CodeValidatorForm;
