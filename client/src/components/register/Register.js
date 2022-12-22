import React, { useState, useEffect, useContext, useRef } from "react";
import "./Register.css";
import {
  Button,
  Container,
  Form,
  Col,
  FloatingLabel,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import { Link } from "react-router-dom";
import { registerUser } from "../../api/api";
import Lotus from "../../assets/lotus.svg";
import PasswordReqList from "../form/PasswordReqList";
import ConsentFormModal from "../consentForm/ConsentFormModal";

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
        setUser(email, password);
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
              <h1 className="text-center text-info text-black" id="reg-text-1">
                Registrera dig
              </h1>
            </Col>
            <Image
              src={Lotus}
              alt="..."
              width="100"
              length="100"
              className="rounded mx-auto d-block"
            ></Image>
            <FloatingLabel
              className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
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
              className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
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
              className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
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
              className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
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

            <div className="text-center">
              <Button
                className="btn btn-success btn-lg mb-4 gap-3"
                style={{ width: "18rem" }}
                variant="primary"
                type="submit"
              >
                Registrera
              </Button>

              <p>
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

            <hr className="col-md-5 mx-auto col-lg-5 mb-3" />
            <PasswordReqList />
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
