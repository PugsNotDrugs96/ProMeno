import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext";
import {
  Button,
  Container,
  Form,
  Col,
  FloatingLabel,
  Image,
  Modal,
} from "react-bootstrap";
import { registerUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Lotus from "../../assets/lotus.svg";
import { Link } from "react-router-dom";
import ConsentForm from "../register/ConsentForm";

const initialState = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function Register() {
  const { setUser } = useContext(UserContext);
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [authStep, setAuthMode] = useState(1);
  const [newUser, setNewUser] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [regConf, setRegConf] = useState(true);
  const passVerification = {
    isLenthy: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpclChr: false,
    confirmPass: false,
  };
  const [passwordError, setPasswordError] = useState(passVerification);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleStepOneClick = (event) => {
    event.preventDefault();
    if (message === "test123") {
      setMessage("");
      setAuthMode("step2");
    }
  };

  const handleKeyChange = (event) => {
    setMessage(event.target.value);
  };

  const handleStepTwoSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(passwordError).every((item) => item === true)) {
      try {
        const response = await registerUser(
          newUser.name,
          newUser.email,
          newUser.password
        );
        if (response.status === 200) {
          setUser(newUser.email, newUser.password, newUser.passwordConfirm);
          setSuccess(true);
        }
      } catch (err) {
        setRegConf(false);
        if (!err?.response) {
          setErrMsg("Inget svar från servern");
        } else if (err?.response.status === 409) {
          setErrMsg("E-post redan registrerad");
        } else {
          setErrMsg("Något gick fel, försök igen eller kontakta vår support");
        }
      }
      const response = await registerUser(
        newUser.name,
        newUser.email,
        newUser.password
      );
      if (response.status === 200) {
        setUser(newUser.email, newUser.password, newUser.passwordConfirm);
        setSuccess(true);
      }
    }
  };

  //useEffect(() => {}, [newUser]);

  const handleStepTwoChange = (e) => {
    const { name, value } = e.target;

    setNewUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    if (name === "password") {
      const isLenthy = value.length >= 8;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpclChr = /[!,?,@,#,$,%,&]/.test(value);

      /*       setPasswordError({
        ...passwordError,
        isLenthy,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpclChr,
      }); */

      setPasswordError((prevState) => {
        return {
          ...prevState,
          isLenthy,
          hasUpper,
          hasLower,
          hasNumber,
          hasSpclChr,
        };
      });
    }
    ///If-sats som kontrollerar att password och passwordconfirm är det samma. (funkar inte)?
    if (name === "passwordConfirm") {
      /*setPasswordError({
        ...passwordError,
        confirmPass: newUser.password === value
      }) */

      if (e.target.value === newUser.password) {
        setPasswordError((prevState) => {
          return {
            ...prevState,
            confirmPass: true,
          };
        });
      } else {
        setPasswordError((prevState) => {
          return {
            ...prevState,
            confirmPass: false,
          };
        });
      }
    }
  };

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  //Vad ska detta användas till? Hälsningar Alex
  function LoadingButton() {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
      if (isLoading) {
        simulateNetworkRequest().then(() => {
          setLoading(false);
        });
      }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
      <Button
        variant="primary"
        className="btn btn-success btn-lg mb-4 gap-3"
        style={{ width: "18rem" }}
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? "Skickar vidare..." : " Registrera"}
      </Button>
    );
  }

  if (authStep === "step2") {
    return (
      <>
        {success ? (
          navigate("/home")
        ) : (
          <Container className="content">
            <Form onSubmit={handleStepTwoSubmit} id="form">
              <Col>
                {" "}
                <h1
                  className="text-center text-info text-black"
                  id="reg-text-1"
                >
                  {" "}
                  Registrera dig
                </h1>{" "}
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
                  name="name"
                  autoComplete="off"
                  className="form-control"
                  value={newUser.name}
                  onChange={handleStepTwoChange}
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
                  value={newUser.email}
                  onChange={handleStepTwoChange}
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
                  value={newUser.password}
                  onChange={handleStepTwoChange}
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
                  value={newUser.passwordConfirm}
                  onChange={handleStepTwoChange}
                  required
                />
              </FloatingLabel>
              <Form.Text>
                {!passwordError.confirmPass &&
                  newUser.passwordConfirm.length > 0 && (
                    <div className="text-danger col-md-5 mx-auto col-lg-5 mt-3 mb-3">
                      Lösenorden matchar inte
                    </div>
                  )}
              </Form.Text>
              <Form.Text>
                {!regConf && (
                  <div className="text-danger col-md-5 mx-auto col-lg-5 mt-3 mb-3">
                    {errMsg}
                  </div>
                )}
              </Form.Text>

              {/*Disable funktionen bör göra så att knappen inte är klickbar, fungerar inte. Vet inte varför */}
              <div className="text-center">
                <Button
                  className="btn btn-success btn-lg mb-4 gap-3"
                  style={{ width: "18rem" }}
                  variant="primary"
                  type="submit"
                  disable={Object.values(passwordError).includes(false)}
                >
                  Registrera
                </Button>
                <p>
                  Har du redan ett konto? <a href="/login">Logga in</a>
                </p>
                <p>
                  Genom att registrera dig så godkänner du våra{" "}
                  <Link
                    onClick={handleShow}
                    variant="link"
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
              </div>

              <hr className="col-md-5 mx-auto col-lg-5 mb-3"></hr>
              <Form.Group
                className="col-md-5 mx-auto col-lg-5 mb-3"
                controlId="formControll"
              >
                <Form.Text>
                  <ul>
                    <li
                      className={
                        passwordError.isLenthy
                          ? "text-success"
                          : "text-secondary"
                      }
                    >
                      {" "}
                      Minst 8 karaktärer{" "}
                    </li>
                    <li
                      className={
                        passwordError.hasUpper
                          ? "text-success"
                          : "text-secondary"
                      }
                    >
                      Minst en storbokstav
                    </li>
                    <li
                      className={
                        passwordError.hasLower
                          ? "text-success"
                          : "text-secondary"
                      }
                    >
                      Minst en liten bokstav
                    </li>
                    <li
                      className={
                        passwordError.hasNumber
                          ? "text-success"
                          : "text-secondary"
                      }
                    >
                      Minst en siffra
                    </li>
                    <li
                      className={
                        passwordError.hasSpclChr
                          ? "text-success"
                          : "text-secondary"
                      }
                    >
                      Minst en av specialtecken e.x ! ? @ #
                    </li>
                  </ul>
                </Form.Text>
              </Form.Group>
            </Form>
            <Modal show={show} onHide={handleClose} animation={false} size="lg">
              <Modal.Body>
                <ConsentForm />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Stäng
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        )}
      </>
    );
  }

  return (
    <Container className="content">
      <Col>
        {" "}
        <h1 className="text-center text-info text-black" id="reg-text-2">
          {" "}
          Registrera dig
        </h1>{" "}
      </Col>
      <Form>
        <h3 className="text-center">Steg 1</h3>
        <FloatingLabel
          className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
          controlId="floatingInput"
          label="Registeringskod"
        >
          <Form.Control
            as="input"
            placeholder="Skriv registreringskoden här.."
            onChange={handleKeyChange}
            onSubmit={handleStepOneClick}
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
          </Button>{" "}
          <Button
            className="btn btn-success btn-lg mb-4 gap-3"
            style={{ width: "18rem" }}
            variant="primary"
            type="submit"
            onClick={handleStepOneClick}
          >
            Nästa
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Register;
