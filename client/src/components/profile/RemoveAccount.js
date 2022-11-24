import React, { useContext, useRef, useState, useEffect } from "react";
import UserContext from "../../UserContext";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { deleteAccount } from "../../api/api";

function RemoveAccount() {
  const { user, setUser } = useContext(UserContext);
  const userRef = useRef();
  const errRef = useRef();
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setUser("");
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
      const response = await deleteAccount(user, password);
      if (response.status === 200) {
        handleShow();
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Inget svar från servern");
      } else if (err.response?.status === 400) {
        setErrMsg("Lösenordet stämmer inte");
      } else {
        setErrMsg("Något gick fel, försök igen");
      }
      errRef.current.focus();
    }
  };

  return (
    <Container>
      <Col>
        <h1 className="text-center text-info text-black">Radera konto</h1>
        <div className="text-center m-10">
          <p>
            Radera ditt konto hos ProMeno och avregistrera dig från allt
            deltagande i vår forskningsstudie. Det här går inte att ångra.
          </p>
        </div>
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
                placeholder="Skriv in ditt lösenord"
                ref={userRef}
                autoComplete="off"
                className="form-control"
                name="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="danger" type="submit">
                Jag önskar radera mitt konto.
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
        <Modal.Body>Ditt konto har raderats</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RemoveAccount;
