import React, { useState, useEffect} from "react";
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
  
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
  
  function LoadingButton() {
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      if (isLoading) {
        simulateNetworkRequest().then(() => {
          setLoading(false);
        });
      }
    }, [isLoading]);
  
    const handleClick = () => setLoading(true);
  
    return (
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? 'Loggar in...' : ' Skicka'}
      </Button>
    );
  }

  if (authMode === "signin") {
    return (
      <Container>
          <Col> <h1 className="text-center text-info text-black "> Logga in</h1> </Col>
          <div className="text-center">Inte registrerad ännu? {" "}
            <span className="link-primary" onClick={changeAuthMode}>Registrera här!</span>
          </div>
        <Row >
          <Col>
            <Form className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"> 
              <Form.Group controlId="formBasicEmail">
                <Form.Label>E-post adress</Form.Label>
                <Form.Control type="email" placeholder="Ange ditt mail.." />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Lösenord</Form.Label>
                <Form.Control type="password" placeholder="Ange ditt lösenord.." />
              </Form.Group>
              <div className="text-center mt-3">
              <LoadingButton/>
              <p> Glömt <a href="/">lösenord?</a></p>
              </div>
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
