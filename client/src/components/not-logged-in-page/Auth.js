import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { loginUser } from "../../api/api";
import UserContext from "../../UserContext";

function Auth() {
  const { setUser } = useContext(UserContext);
  let navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      if (response.status === 200) {
        setUser(email, password);
        setEmail("");
        setPassword("");
        setSuccess(true);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Inget svar från servern");
      } else if (err.response?.status === 401) {
        setErrMsg("Fel e-postadress eller lösenord, försök igen.");
      } else {
        setErrMsg("Något gick fel, försök igen eller kontakta vår support");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        navigate("/home")
      ) : (
        <Container>
          <Col>
            {" "}
            <h1 className="text-center text-info text-black"> Logga in</h1>{" "}
          </Col>
          <div className="text-center">
            Inte registrerad ännu?{" "}
            <span>
              <a href="/register">Registrera här!</a>
            </span>
          </div>
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
                    ref={userRef}
                    autoComplete="off"
                    className="form-control"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="col-md-5 mx-auto col-lg-5 mb-3"
                  controlId="formBasicPassword"
                >
                  <Form.Label>Lösenord</Form.Label>
                  <Form.Control
                    type="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </Form.Group>
                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Logga in
                  </Button>
                  <p>
                    Glömt <a href="/forgot-password">lösenordet?</a>
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
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
export default Auth;
