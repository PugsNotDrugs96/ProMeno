import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext";
import {Button, Container, Form, Col, FloatingLabel} from 'react-bootstrap';
import { registerUser } from "../../api/api";
import { useNavigate } from "react-router-dom";


const initialState = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: ""
};

function Register() {
  const { setUser } = useContext(UserContext);
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [authStep, setAuthMode] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [newUser, setNewUser] = useState(initialState)
  const [success, setSuccess] = useState(false);
  const passVerification = {
    isLenthy: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpclChr: false,
    confirmPass: false,
  };
  const [passwordError, setPasswordError] = useState(passVerification)


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

    useEffect(() => {}, [newUser]);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setNewUser({ ...newUser, [name]: value });
  
      if (name === "password") {
        const isLenthy = value.length > 8;
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpclChr = /[!,?,@,#,$,%,&]/.test(value);
  
        setPasswordError({
          ...passwordError,
          isLenthy,
          hasUpper,
          hasLower,
          hasNumber,
          hasSpclChr,
        });
      }
///Ser till så att alla lösenord kriterier är godkända innan knappen blir klickbar (funkar inte)?
      if(name === "confirmPass"){ 
        setPasswordError({
          ...passwordError,
          confirmPass: newUser.password === value
        })
      }
    };

    console.log(newUser)

  
  const handleClick = (event) => {
    setMessage(event.target.value);
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
                  <FloatingLabel
                    className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
                    controlId="floatingInput"
                    label="Namn"
                  >
                    <Form.Control
                      type="name"
                      name="name"
                      autoComplete="off"
                      className="form-control"
                      value={newUser.name}
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
                    controlId="floatingInput"
                    label="Email address"
                  >
                    <Form.Control
                      type="email"
                      autoComplete="off"
                      className="form-control"
                      name="email"
                      value={newUser.email}
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
                    controlId="floatingPassword"
                    label="Password"
                  >
                    <Form.Control
                      type="password"
                      name="password"
                      className="form-control"
                      value={newUser.password}
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
                    controlId="floatingPassword"
                    label="Bekräfta"
                  >
                    <Form.Control
                      type="password"
                      className="form-control"
                      name="passwordConfirm"
                      value={newUser.passwordConfirm}
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                  
                  {/*Disable funktionen bör göra så att knappen inte är klickbar, fungerar inte. Vet inte varför */}
                  <div className="text-center">
                    <Button variant="primary" type="submit" className="col-md-5 mx-auto col-lg-5 mb-3" disable={Object.values(passwordError).includes(false)}> 
                      Registrera
                    </Button>
                  </div>
                 
                  <hr className="col-md-5 mx-auto col-lg-5 mb-3"></hr>
                  <Form.Group
                    className="col-md-5 mx-auto col-lg-5 mb-3"
                    controlId="formControll"
                  >
                  <ul>
                    <li className={passwordError.isLenthy ? "text-success" : "text-danger"}> Minst 8 karaktärer </li>
                    <li className={passwordError.hasUpper ? "text-success" : "text-danger"}>Minst en storbokstav</li>
                    <li className={passwordError.hasLower ? "text-success" : "text-danger"}>Minst en liten bokstav</li>
                    <li className={passwordError.hasNumber ? "text-success" : "text-danger"}>Minst en siffra</li>
                    <li className={passwordError.hasSpclChr ? "text-success" : "text-danger"}>Minst en av specialtecken e.x ! ? @ #</li>
                  </ul>
                  </Form.Group>
                  
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
      <Form>
        <h3 className="text-center">Steg 1</h3>
        <FloatingLabel
                    className="col-md-5 mx-auto col-lg-5 mt-3 mb-3"
                    controlId="floatingInput"
                    label="Registeringskod"
                  >
          <Form.Control
            as="input"
            placeholder="Skriv registreringskoden här.."
            onChange={handleClick}
          ></Form.Control>
        </FloatingLabel>
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
