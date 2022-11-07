import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


function Register(props) {
  const [message, setMessage] = useState(""); 
  const [authStep, setAuthMode] = useState("step1");

  const handleChange = event => {
    setMessage(event.target.value);
  }

  const handleClick = event => {
    event.preventDefault();

    if(message === "test123"){
      setMessage("")
      setAuthMode("step2");
    }
  };

  if(authStep === "step2"){
    return (
    //   <div className="container">
    //   <div className="col-md-5 mx-auto col-lg-5">
    //     <form className="p-4 p-md-5 border rounded-3 bg-light">
    //     <h3 className="text-center">Steg 2</h3>
    //       <div className="form-floating mb-3">
    //         <input type="email" className="form-control"
    //         id="e-post" name="e-post" value={message} 
    //         placeholder="Skriv e-postadress här.."
    //         onChange={handleChange}/>
    //         <label for="floatingInput">E-post</label>
    //       </div>
    //       <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleClick}>Registrera</button>
    //       <hr className="my-4" />
    //       <small className="text-muted">Genom att trycka på knappen registrera så godkänner jag villkoren för att delta i studien.</small>
    //     </form>
    //   </div>
    // </div>

    <Container>
      <Col> <h1 className="text-center text-info"> Registrera dig!</h1> </Col>
      <Form>
        <h3 className="col-md-5 mb-3">Steg 2</h3>
        <Form.Group className="col-md-5 mb-3" controlId="formBasicEmail">
          <Form.Label>E-post adress</Form.Label>
          <Form.Control type="email" placeholder="Ange ditt mail här.." onChange={handleChange}/>
        </Form.Group>    
          <Button  className="mr-2" variant="primary"  type="submit" onClick={handleClick}>
            Registrera 
          </Button>
          <div>
            <Form.Text className="text-muted">
            Genom att trycka på knappen registrera så godkänner jag villkoren för att delta i studien.    
            </Form.Text>
          </div>
      </Form>
    </Container>
    )
  }

  return (
    // <div className="container">
    //   <div className="col-md-5 mx-auto col-lg-5">
    //     <form className="p-4 p-md-5 border rounded-3 bg-light" >
    //     <h3 className="text-center">Steg 1</h3>
    //       <div className="form-floating mb-3">
    //         <input type="text" className="form-control" id="regCode" name="regCode" value={message} placeholder="Skriv registreringskoden här.." onChange={handleChange}/>
    //         <label for="floatingInput">Registreringskod</label>
    //       </div>
    //       <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleClick}>Nästa</button>
    //     </form>
    //   </div>
    // </div>

    <Container>
      <Col> <h1 className="text-center text-info"> Registrera dig!</h1> </Col>
      <Form>
        <h3 className="text-center mb-3">Steg 1</h3>
        <Form.Label>Registreringskod</Form.Label>
        <Form.Group className="col-md-5 mb-3" controlId="textarea">
          <Form.Control
            as="input"
            size="md"
            placeholder="Skriv registreringskoden här.." onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <div>
          <Button variant="primary"  type="submit" onClick={handleClick}>
            Nästa 
          </Button>
          <Button variant="secondary"  type="submit">
            Tillbaka
          </Button>
        </div>
      </Form>
    </Container>

  );
}

export default Register;
