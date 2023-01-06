import React, { useContext, useRef, useState, useEffect } from "react";
import UserContext from "../../UserContext";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Modal,
  FloatingLabel,
} from "react-bootstrap";
import { deleteAccount } from "../../api/api";
import "./removeAccount.css";

function RemoveAccount() {
  const { setUser } = useContext(UserContext);
  const userRef = useRef();
  const errRef = useRef();
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setUser(null);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteAccount(password);
      if (response.status === 200) {
        handleShow();
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Inget svar från servern");
      } else if (err.response?.status === 400) {
        setErrMsg("Vi kan inte hitta ditt konto");
      } else if (err.response?.status === 401) {
        setErrMsg("Fel lösenord");
      } else {
        setErrMsg("Något gick fel, försök igen");
      }
      errRef.current.focus();
    }
  };

  return (
    <Container className="content">
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Col>
              <h1
                className="form-header text-center text-info text-black"
                id="acc-remove-text"
              >
                Avregistrera dig
              </h1>
              <div className="text-center col-md-5 mx-auto col-lg-5 mb-3">
                <p>
                  Ta bort ditt konto hos ProMeno och avregistrera dig från allt
                  deltagande i vår forskningsstudie. Det här går inte att ångra.
                </p>
              </div>
            </Col>
            <FloatingLabel
              className="col-md-5 mx-auto col-lg-5 mb-3"
              controlId="formBasicEmail"
              label="Skriv in ditt lösenord"
            >
              <Form.Control
                type="password"
                ref={userRef}
                autoComplete="off"
                className="form-control"
                name="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </FloatingLabel>

            <div className="text-center">
              <Button
                variant="danger"
                type="submit"
                className="btn btn-success btn-lg mb-4 gap-3"
                style={{ width: "20rem" }}
              >
                Jag önskar ta bort mitt konto.
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
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>Du har inte längre ett konto hos oss på ProMeno</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClose}
            className="btn btn-success btn-lg mb-4 gap-3"
            style={{ width: "18rem" }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RemoveAccount;
