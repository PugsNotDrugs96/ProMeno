import LoginContext from "../../UserContext";
import React, { useContext, useRef, useEffect, useState } from "react";
import { changePassword } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ChangePasswordForm = () => {
  const { user } = useContext(LoginContext);
  let navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [currentPassword, password1, password2]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setErrMsg("Lösenorden matchar inte");
      errRef.current.focus();
    } else {
      try {
        const response = await changePassword(user, currentPassword, password1);
        console.log(response);
        if (response.status === 200) {
          setCurrentPassword("");
          setPassword1("");
          setPassword2("");
          setSuccess(true);
        }
      } catch (err) {
        if (!err?.response) {
          setErrMsg("Inget svar från servern");
        } else if (err.response?.status === 400) {
          setErrMsg("Gammalt lösenord stämmer inte");
        } else {
          setErrMsg("Byte av lösenord lyckades inte");
        }
        errRef.current.focus();
      }
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [password1, password2, currentPassword]);

  return (
    <>
      {success ? (
        navigate("/profile")
      ) : (
        <Container>
          <Col>
            <h1 className="text-center text-info text-black"> Logga in</h1>{" "}
          </Col>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="col-md-5 mx-auto col-lg-5 mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Nuvarande lösenord</Form.Label>
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
                </Form.Group>
                <Form.Group
                  className="col-md-5 mx-auto col-lg-5 mb-3"
                  controlId="formBasicPassword"
                >
                  <Form.Label>Nytt lösenord</Form.Label>
                  <Form.Control
                    type="password"
                    className="form-control"
                    onChange={(e) => setPassword1(e.target.value)}
                    value={password1}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="col-md-5 mx-auto col-lg-5 mb-3"
                  controlId="formBasicPassword"
                >
                  <Form.Label>Upprepa lösenord</Form.Label>
                  <Form.Control
                    type="password"
                    className="form-control"
                    onChange={(e) => setPassword2(e.target.value)}
                    value={password2}
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
      )}
    </>
  );
};

export default ChangePasswordForm;
