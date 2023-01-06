import React, { useRef, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { changePassword } from "../../api/api";
import PasswordReqList from "./PasswordReqList";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [isBtnDisabled, setBtnIsDisabled] = useState(false);

  const responseRef = useRef();
  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    setErrMsg("");
  }, [newPassword, confirmPassword, currentPassword]);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
    setResponseMsg("");
  }, [currentPassword, newPassword, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrMsg("Lösenorden matchar inte");
      errRef.current.focus();
    } else {
      try {
        const response = await changePassword(currentPassword, newPassword);
        if (response.status === 200) {
          setResponseMsg("Ditt lösenord har ändrats");
          setErrMsg("");
          responseRef.current.focus();
          setBtnIsDisabled(true);
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
              <h1 className="form-header  text-center" id="pwd-change-1">
                Ändra lösenord
              </h1>
            </Col>
            <FloatingLabel
              className="col-sm-7 col-10 mx-auto mt-3 mb-3"
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
              className="col-sm-7 col-10 mx-auto mt-3 mb-3"
              controlId="formBasicPassword"
              label="Nytt lösenord"
            >
              <Form.Control
                type="password"
                name="password1"
                className="form-control"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
              />
            </FloatingLabel>
            <FloatingLabel
              className="col-sm-7 col-10 mx-auto mt-3 mb-3"
              controlId="formBasicConfirmPassword"
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
                type="submit"
                className="btn-success btn-lg col-10 col-sm-7 col-10 mb-3 mx-auto"
                disabled={isBtnDisabled ? true : false}
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
