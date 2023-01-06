import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Image,
  Form,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { loginUser } from "../../api/api";
import UserContext from "../../UserContext";
import Lotus from "../../assets/lotus.svg";

function Login() {
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
        setUser(email);
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
        <Container className="content">
          <Image
            src={Lotus}
            alt="..."
            width="100"
            length="100"
            className="mx-auto d-block mb-3"
          />
          <Row>
            <Col>
              <Form onSubmit={handleSubmit} id="form">
                <Col>
                  <h1
                    className="form-header text-center text-info text-black"
                    id="login-text"
                  >
                    Logga in
                  </h1>
                </Col>
                <FloatingLabel
                  className="col-sm-7 col-10 mx-auto mt-3 mb-3"
                  controlId="floatingInput"
                  label="Email"
                >
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
                </FloatingLabel>
                <FloatingLabel
                  className="col-sm-7 col-10 mx-auto mt-3 mb-3"
                  controlId="floatingPassword"
                  label="Lösenord"
                >
                  <Form.Control
                    type="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </FloatingLabel>
                <div className="text-center">
                  <Button
                    className="btn-success btn-lg col-10 col-sm-7 col-10 mb-3 mx-auto"
                    type="submit"
                  >
                    Logga in
                  </Button>

                  <p id="pwd-text">
                    Glömt <a href="/forgot-password">lösenordet?</a>
                  </p>
                </div>
                <br></br>
                <hr className="col-md-5 mx-auto col-lg-5 mb-3"></hr>
                <Form.Text className="text-center">
                  <p className="col-md-5 mx-auto col-lg-5 mt-3 mb-3">
                    Inte registrerad ännu? <a href="/code">Registrera här!</a>
                  </p>
                </Form.Text>
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
export default Login;
