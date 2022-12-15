import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { resetPassword, validateLink } from "../../api/api";
import EmptyPage from "../EmptyPage";
import UserContext from "../../UserContext";
import "./Login.css";

function ResetPassword() {
  const { email, token } = useParams();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isValidLink, setisValidLink] = useState(false);

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
          setUser(email);
          navigate("/home");
        }
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

                <Form.Group
                  className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
                  controlId="formPassword1"
                >
                  <Form.Control
                    type="password"
                    placeholder="Nytt lösenord"
                    ref={userRef}
                    autoComplete="off"
                    className="form-control"
                    name="password1"
                    onChange={(e) => setPassword1(e.target.value)}
                    value={password1}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
                  controlId="formPassword2"
                >
                  <Form.Control
                    type="password"
                    placeholder="Upprepa lösenord"
                    ref={userRef}
                    autoComplete="off"
                    className="form-control"
                    name="password2"
                    onChange={(e) => setPassword2(e.target.value)}
                    value={password2}
                    required
                  />
                </Form.Group>
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
