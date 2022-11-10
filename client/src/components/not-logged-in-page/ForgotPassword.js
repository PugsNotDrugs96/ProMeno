import React, { useState, useEffect, useRef, useContext } from "react";
import { forgotPassword } from "../../api/api";
import UserContext from "../../UserContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ForgotPassword() {
  const { setUser } = useContext(UserContext);
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email);
      if (response.status === 200) {
        setErrMsg(
          "Du har fått ett mail i din inkorg för att återställa lösenordet"
        );
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Inget svar från servern");
      } else if (err.response?.status === 400) {
        setErrMsg(
          "E-postadressen finns inte hos oss. Kontrollera att du skrev rätt"
        );
      } else if (err.response?.status === 401) {
        setErrMsg("Inte autentiserad");
      } else {
        setErrMsg("Inloggning lyckades inte");
      }
      errRef.current.focus();
    }
  };

  return (
    <Container>
      <Col>
        <h1 className="text-center text-info text-black"> Glömt lösenord</h1>{" "}
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
                Skicka
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
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default ForgotPassword;
