import React, { useState, useEffect, useContext, useRef } from "react";
import "./register.css";
import { Button, Container, Form, Col, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import { registerUser } from "../../api/api";
import PasswordReqList from "../form/PasswordReqList";
import ConsentFormModal from "../consent-form/ConsentFormModal";
import { setToken } from "../../tokenStorage";

function Register() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [showConsentForm, setShowConsentForm] = useState(false);

  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
    setShowConsentForm(false);
  }, [name, email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrMsg("Lösenorden matchar inte");
      errRef.current.focus();
      return;
    }
    try {
      const response = await registerUser(name, email, password);
      if (response.status === 200) {
        const token = response.data;
        setToken(token);
        setUser(token);
        setSuccess(true);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Inget svar från servern");
      } else if (err?.response.status === 409) {
        setErrMsg("E-post redan registrerad");
      } else if (err?.response.status === 403) {
        setErrMsg("Lösenordets krav är ej uppfyllda");
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
          <Form onSubmit={handleSubmit} id="form">
            <Col>
              <h1
                className="form-header text-center text-info text-black"
                id="reg-text-1"
              >
                Registrera dig
              </h1>
              <h3 className="text-center">Steg 2</h3>
            </Col>
            <FloatingLabel
              className="col-sm-7 col-10 mx-auto mt-3 mb-3"
              controlId="floatingInput"
              label="Namn"
            >
              <Form.Control
                type="name"
                autoFocus
                ref={userRef}
                name="name"
                autoComplete="off"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </FloatingLabel>
            <FloatingLabel
              className="col-sm-7 col-10 mx-auto mt-3 mb-3"
              controlId="floatingInput"
              label="Email"
            >
              <Form.Control
                type="email"
                autoComplete="off"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FloatingLabel>
            <FloatingLabel
              className="col-sm-7 col-10 mx-auto mt-3 mb-3"
              controlId="floatingPassword"
              label="Bekräfta lösenord"
            >
              <Form.Control
                type="password"
                className="form-control"
                name="passwordConfirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FloatingLabel>
            <PasswordReqList />

            <div className="text-center">
              <Button
                className="btn-success btn-lg col-10 col-sm-7 col-10 mb-3 mx-auto"
                type="submit"
              >
                Registrera
              </Button>
              <p className="mt-3 mb-1">
                Har du redan ett konto? <a href="/login">Logga in</a>
              </p>
              <p>
                Genom att registrera dig så godkänner du våra{" "}
                <Link
                  variant="link"
                  onClick={(e) => setShowConsentForm(true)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    margin: 0,

                    marginBottom: "5px",
                  }}
                >
                  villkor
                </Link>
              </p>
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
          <ConsentFormModal
            showConsentForm={showConsentForm}
            setShowConsentForm={setShowConsentForm}
          />
        </Container>
      )}
    </>
  );
}

export default Register;
