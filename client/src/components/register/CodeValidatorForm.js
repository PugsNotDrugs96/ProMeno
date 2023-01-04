import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, FloatingLabel, Image } from "react-bootstrap";
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
          <Image
            src={Lotus}
            alt="..."
            width="100"
            length="100"
            className="mx-auto d-block"
          />
          <h1 className="form-header text-center" id="reg-text-2">
            Registrera dig
          </h1>
          <h3 className="text-center">Steg 1</h3>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              className="col-sm-7 col-10 mx-auto mt-3 mb-3"
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
            <div className="d-flex justify-content-center gap-2 mb-4">
              <Button
                className="btn-success btn-lg col-10 col-sm-7 col-10 mx-auto"
                type="submit"
              >
                Nästa
              </Button>
            </div>
          </Form>
          <div className="text-center col-sm-7 col-10 mx-auto mb-3">
            <p>
              För att skapa ett konto hos ProMeno så behöver du uppge en kod. Du
              får den från din vårdcentral eller annan mottagning som har
              erbjudit dig att delta i studien.
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
