import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import { resetPassword, validateLink } from "../../api/api";
import EmptyPage from "../EmptyPage";
import PasswordReqList from "./PasswordReqList";

function ResetPassword() {
  const { email, token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [isValidLink, setIsValidLink] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const userRef = useRef();
  const errRef = useRef();
  const responseRef = useRef();

  useEffect(() => {
    setErrMsg("");
    setResponseMsg("");
  }, [password, confirmPassword]);

  useEffect(() => {
    (async () => {
      const response = await validateLink(email, token);
      if (response.status === 200) {
        setIsValidLink(true);
        setErrMsg("");
      }
    })();
  }, [email, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrMsg("Lösenorden matchar inte");
      errRef.current.focus();
    } else {
      try {
        const response = await resetPassword(email, password);
        if (response.status === 200) {
          setResponseMsg("Ditt lösenord har återställts");
          setIsDisabled(true);
        }
        responseRef.current.focus();
      } catch (err) {
        if (!err?.response) {
          setErrMsg("Inget svar från servern");
        } else if (err?.response.status === 403) {
          setErrMsg("Lösenordets krav är ej uppfyllda");
        } else {
          setErrMsg("Något gick fel, försök igen eller kontakta vår support");
        }
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {isValidLink ? (
        <Container className="content">
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Col>
                  <h1 className="form-header text-center text-info text-black">
                    Skapa ett nytt lösenord
                  </h1>
                </Col>

                <FloatingLabel
                  className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
                  controlId="formPassword1"
                  label="Nytt lösenord"
                >
                  <Form.Control
                    type="password"
                    ref={userRef}
                    autoComplete="off"
                    className="form-control"
                    name="password1"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel
                  className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
                  controlId="formPassword2"
                  label="Upprepa lösenord"
                >
                  <Form.Control
                    type="password"
                    ref={userRef}
                    autoComplete="off"
                    className="form-control"
                    name="password2"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                  />
                </FloatingLabel>
                <div className="text-center">
                  <Button
                    className="btn btn-success btn-lg mb-4 gap-3"
                    style={{ width: "18rem" }}
                    variant="primary"
                    type="submit"
                    disabled={isDisabled ? true : false}
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
                <div className="text-center">
                  <Link to="/login">Tillbaka till inloggningen</Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      ) : (
        <EmptyPage />
      )}
    </>
  );
}
export default ResetPassword;
