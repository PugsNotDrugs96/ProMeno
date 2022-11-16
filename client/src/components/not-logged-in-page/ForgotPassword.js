import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getResetPasswordLink } from "../../api/api";

function ForgotPassword() {
  const responseRef = useRef();
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

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
    <Container>
      <Col>
        <h1 className="text-center text-info text-black">
          Återställ ditt lösenord
        </h1>
        <p className="text-center text-info text-black">
          Ange den epostadress som är kopplad till ditt konto så skickar vi en
          återställningslänk.
        </p>
      </Col>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label>Email</Form.Label>
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
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Återställ ditt lösenord
              </Button>
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