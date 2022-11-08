import React, { useState } from "react";
import Register from "./Register";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Auth(props) {
  let [authMode, setAuthMode] = useState("signin");
  const [mail, setMail] = useState(""); 
  const [password, setPassword] = useState("1"); 


  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleChange = event => {
    setMail(event.target.value);
    setPassword(event.target.value);
  }

  const handleClick = event => {
    event.preventDefault();

    if(mail === "test@123.se"){
      setMail("")
      // ska kontorlleras och skickas
    }
    if(password === "test123")
      setPassword("")
      // ska kontorlleras och skickas

  };

  if (authMode === "signin") {
    return (
      <Container>
          <Col> <h1 className="text-center text-info"> Logga in</h1> </Col>
          <div className="text-center">Inte registrerad ännu? {" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Registrera här!
            </span>
          </div>
        <Row>
          <Col>
            <Form>
              <Form.Group className="col-md-5 mb-3" controlId="formBasicEmail">
                <Form.Label>E-post adress</Form.Label>
                <Form.Control type="email" placeholder="Ange ditt mail" />
              </Form.Group>
              <Form.Group className="col-md-5 mb-3" controlId="formBasicPassword">
                <Form.Label>Lösenord</Form.Label>
                <Form.Control type="password" placeholder="Ange ditt lösenord" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Skicka
              </Button>
              <span> Glömt <a href="/">lösenord?</a></span>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
        <Register/>  
  );
}
export default Auth;
