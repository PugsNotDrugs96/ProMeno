import React, { useContext, useRef, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { changePassword } from "../../api/api";
import UserContext from "../../UserContext";
import "./ChangePassword.css";
import PasswordReqList from "./PasswordReqList";

const ChangePassword = () => {
  const { user } = useContext(UserContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  const responseRef = useRef();
  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    setErrMsg("");
  }, [password1, confirmPassword, currentPassword]);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
    setResponseMsg("");
  }, [currentPassword, password1, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== confirmPassword) {
      setErrMsg("Lösenorden matchar inte");
      errRef.current.focus();
    } else {
      try {
        const response = await changePassword(user, currentPassword, password1);
        if (response.status === 200) {
          setResponseMsg("Ditt lösenord har ändrats");
          responseRef.current.focus();
        }
      } catch (err) {
        if (!err?.response) {
          setErrMsg("Inget svar från servern");
        } else if (err.response?.status === 401) {
          setErrMsg("Det nuvarande lösenordet som du angav är felaktigt");
        } else if (err?.response.status === 403) {
          setErrMsg("Lösenordets krav är ej uppfyllda");
        }
        errRef.current.focus();
      }
    }
  };

  return (
    <Container className="content">
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Col>
              <h1
                className="text-center text-info text-black"
                id="pwd-change-1"
              >
                {" "}
                Ändra lösenord
              </h1>{" "}
            </Col>
            <FloatingLabel
              className="col-md-5 mx-auto col-lg-5 mb-3"
              controlId="formBasicEmail"
              label="Nuvarande lösenord"
            >
              <Form.Control
                type="password"
                ref={userRef}
                autoComplete="off"
                className="form-control"
                name="current-password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
                required
              />
            </FloatingLabel>
            <FloatingLabel
              className="col-md-5 mx-auto col-lg-5 mb-3"
              controlId="formBasicPassword"
              label="Nytt lösenord"
            >
              <Form.Control
                type="password"
                name="password1"
                className="form-control"
                onChange={(e) => setPassword1(e.target.value)}
                value={password1}
                required
              />
            </FloatingLabel>
            <FloatingLabel
              className="col-md-5 mx-auto col-lg-5 mb-3"
              controlId="formBasicPassword"
              label="Upprepa lösenord"
            >
              <Form.Control
                type="password"
                name="password2"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </FloatingLabel>
            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                className="btn btn-success btn-lg mb-4 gap-3"
                style={{ width: "18rem" }}
              >
                Ändra lösenord
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
            <PasswordReqList />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
