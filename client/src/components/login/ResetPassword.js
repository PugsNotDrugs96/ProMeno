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

function ResetPassword() {
  const { email, token } = useParams();
  const userRef = useRef();
  const errRef = useRef();
  const responseRef = useRef();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [isValidLink, setisValidLink] = useState(false);

  useEffect(() => {
    setErrMsg("");
    setResponseMsg("");
  }, [password1, password2]);

  useEffect(() => {
    (async () => {
      const response = await validateLink(email, token);
      if (response.status === 200) {
        setisValidLink(true);
      }
    })();
  }, [email, token]);

  useEffect(() => {
    setErrMsg("");
  }, [password1, password2]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setErrMsg("Lösenorden matchar inte");
      errRef.current.focus();
    } else {
      try {
        const response = await resetPassword(email, password1);
        if (response.status === 200) {
          setResponseMsg("Ditt lösenord har återställts");
        }
        responseRef.current.focus();
      } catch (err) {
        if (!err?.response) {
          setErrMsg("Inget svar från servern");
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
        <Container>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Col>
                  <h1 className="text-center text-info text-black">
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
                    onChange={(e) => setPassword1(e.target.value)}
                    value={password1}
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
                    onChange={(e) => setPassword2(e.target.value)}
                    value={password2}
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
