import React, { useContext, useRef, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { changePassword } from "../../api/api";
import UserContext from "../../UserContext";

const ChangePassword = () => {
  const { user } = useContext(UserContext);
  const responseRef = useRef();
  const userRef = useRef();
  const errRef = useRef();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [responseMsg, setResponseMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
    setResponseMsg("");
  }, [currentPassword, password1, password2]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setErrMsg("Lösenorden matchar inte");
      errRef.current.focus();
    } else {
      try {
        const response = await changePassword(user, currentPassword, password1);
        console.log(response.status);
        if (response.status === 200) {
          setResponseMsg("Ditt lösenord har ändrats");
          responseRef.current.focus();
        }
      } catch (err) {
        if (!err?.response) {
          setErrMsg("Inget svar från servern");
        } else if (err.response?.status === 401) {
          setErrMsg("Det nuvarande lösenordet som du angav är felaktigt");
        } else {
          setErrMsg("Något gick fel, försök igen eller kontakta vår support");
        }
        errRef.current.focus();
      }
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [password1, password2, currentPassword]);

  return (
    <Container>
      <Col>
        <h1 className="text-center text-info text-black"> Ändra lösenord</h1>{" "}
      </Col>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="col-md-5 mx-auto col-lg-5 mb-3"
              controlId="formBasicEmail"
            >
              <Form.Control
                type="password"
                ref={userRef}
                autoComplete="off"
                className="form-control"
                placeholder="Nuvarande lösenord"
                name="current-password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
                required
              />
            </Form.Group>
            <Form.Group
              className="col-md-5 mx-auto col-lg-5 mb-3"
              controlId="formBasicPassword"
            >
              <Form.Control
                type="password"
                className="form-control"
                placeholder="Nytt lösenord"
                onChange={(e) => setPassword1(e.target.value)}
                value={password1}
                required
              />
            </Form.Group>
            <Form.Group
              className="col-md-5 mx-auto col-lg-5 mb-3"
              controlId="formBasicPassword"
            >
              <Form.Control
                type="password"
                className="form-control"
                placeholder="Upprepa lösenord"
                onChange={(e) => setPassword2(e.target.value)}
                value={password2}
                required
              />
            </Form.Group>
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
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
