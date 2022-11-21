import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { registerUser } from "../../api/api";
import { useNavigate } from "react-router-dom";


function Register(props) {
  const { setUser } = useContext(UserContext);
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [authStep, setAuthMode] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [success, setSuccess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await registerUser(email, password, passwordConfirm)
      if (response.status === 200) {
        setUser(email, password, passwordConfirm);
        setEmail("");
        setPassword("");
        setPasswordConfirm("")
        setSuccess(true);
      } 
    }


  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (message === "test123") {
      setMessage("");
      setAuthMode("step2");
    }
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
        {isLoading ? 'Skickar vidare...' : ' Registrera'}
      </Button>
    );
  }
  
  if(authStep === "step2"){
      return (
      <>
      {success ? (
        navigate("/home")
      ) : (
        <Container>
        <Col>
          {" "}
          <h1 className="text-center text-info text-black"> Registrera dig!</h1>{" "}
        </Col>
        <Form onSubmit = {handleSubmit}>
                  <Form.Group
                    className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
                    controlId="formBasicName"
                  >
                    <Form.Label>Namn</Form.Label>
                    <Form.Control
                      type="name"
                      autoComplete="off"
                      className="form-control"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      autoComplete="off"
                      className="form-control"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    className="col-md-5 mx-auto col-lg-5 mb-3"
                    controlId="formBasicPassword"
                  >
                    <Form.Label>Lösenord</Form.Label>
                    <Form.Control
                      type="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    className="col-md-5 mx-auto col-lg-5 mb-3"
                    controlId="formBasicPassword"
                  >
                    <Form.Label>Bekräfta</Form.Label>
                    <Form.Control
                      type="password"
                      className="form-control"
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      value={passwordConfirm}
                      required
                    />
                  </Form.Group>
                  <div className="text-center">
                    <Button variant="primary" type="submit">
                      Registrera
                    </Button>
                  </div>
                </Form>
        </Container>
      )}
    </>
  );
}

  return (
    <Container>
      <Col>
        {" "}
        <h1 className="text-center text-info text-black"> Registrera dig!</h1>{" "}
      </Col>
      <Form className="col-md-5 mx-auto col-lg-5 mt-3 mb-3">
        <h3 className="text-center">Steg 1</h3>
        <Form.Label>Registreringskod</Form.Label>
        <Form.Group controlId="textarea">
          <Form.Control
            as="input"
            placeholder="Skriv registreringskoden här.."
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <div className="text-center mx-auto mt-3 ">
          <Button variant="primary" type="submit" onClick={handleClick}>
            Nästa 
          </Button>{' '}
          <Button href="/" variant="secondary"  type="submit">
            Tillbaka
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Register;
