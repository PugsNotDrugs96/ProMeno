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
    // return (
      // <div className="container ">
      //   <div className="col-md-5 mx-auto col-lg-5">
      //     <form className="p-4 p-md-5 border rounded-3 bg-light">
      //       <h3 className="text-center">Logga in</h3>
      //       <div className="text-center">Inte registrerad ännu? {" "}
      //         <span className="link-primary" onClick={changeAuthMode}>
      //           Registrera här!
      //         </span>
      //       </div>
      //       <div className="form-floating mb-3">
      //       <input type="email" className="form-control"
      //       id="e-post" name="e-post" value={mail} 
      //       // placeholder="Skriv e-postadress här.."
      //       onChange={handleChange}/>
      //       <label for="floatingInput">E-post</label>
      //       </div>
      //       <div className="form-floating mb-3">
      //         <input
      //           type="password"
      //           className="form-control"
      //           // placeholder="Ange ditt lösenord"
      //           // onChange={handleChange}
      //           />

      //         <label for="floatingInput">Lösenord</label>

      //       </div>
      //       <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleClick}>Skicka</button>

      //       <p className="text-center mt-2">
      //         Glömt <a href="/">lösenord?</a>
      //       </p>
      //   </form>
      //   </div>
        
      // </div>
    // );

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
