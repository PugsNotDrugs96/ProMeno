import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { getResetPasswordLink } from "../../api/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const responseRef = useRef();
  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
    setResponseMsg("");
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getResetPasswordLink(email);
      if (response.status === 201) {
        setResponseMsg(
          "En återställningslänk har skickats till din mailadress"
        );
        responseRef.current.focus();
        setIsDisabled(true);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Inget svar från servern");
      } else if (err.response?.status === 401) {
        setErrMsg("Det finns inget konto hos oss med den mailadressen");
      } else {
        setErrMsg("Något gick fel, försök igen eller kontakta vår support");
      }
      errRef.current.focus();
    }
  };

  return (
    <Container className="content">
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Col>
              <h1
                className="form-header text-center text-info text-black"
                id="forgot-pwd-text"
              >
                Återställ ditt lösenord
              </h1>
              <p className="text-center text-info text-black">
                Ange den epostadress som är kopplad till ditt konto så skickar
                vi en återställningslänk.
              </p>
            </Col>
            <FloatingLabel
              className="col-sm-7 col-10 mx-auto mt-3 mb-3"
              controlId="floatingInput"
              label="Email"
            >
              <Form.Control
                type="email"
                placeholder="Ange din email"
                ref={userRef}
                autoComplete="off"
                className="form-control"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </FloatingLabel>
            <div className="text-center">
              <Button
                type="submit"
                className="btn-success btn-lg col-10 col-sm-7 col-10 mb-3 mx-auto"
                disabled={isDisabled ? true : false}
              >
                Återställ ditt lösenord
              </Button>
            </div>
            <hr className="col-md-5 mx-auto col-lg-5 mb-3"></hr>
            <p
              ref={errRef}
              className={
                errMsg ? "errmsg text-danger text-center mt-2" : "offscreen"
              }
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <p
              ref={responseRef}
              className={
                responseMsg
                  ? "responseMsg text-success text-center mt-2"
                  : "offscreen"
              }
              aria-live="assertive"
            >
              {responseMsg}
            </p>
            <div className="text-center">
              <Link to="/login">Tillbaka till inloggningen</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default ForgotPassword;
