import React, { useState } from "react";

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
      <div className="container">
      <div className="col-md-5 mx-auto col-lg-5">
        <form className="p-4 p-md-5 border rounded-3 bg-light">
        <h3 className="text-center">Steg 2</h3>
          <div className="form-floating mb-3">
            <input type="email" className="form-control"
            id="e-post" name="e-post" value={message} 
            placeholder="Skriv e-postadress här.."
            onChange={handleChange}/>
            <label for="floatingInput">E-post</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleClick}>Registrera</button>
          <hr className="my-4" />
          <small className="text-muted">Genom att trycka på knappen registrera så godkänner jag villkoren för att delta i studien.</small>
        </form>
      </div>
    </div>
    )
  }
  
  return (
    <div className="container">
      <div className="col-md-5 mx-auto col-lg-5">
        <form className="p-4 p-md-5 border rounded-3 bg-light" >
        <h3 className="text-center">Steg 1</h3>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="regCode" name="regCode" value={message} placeholder="Skriv registreringskoden här.." onChange={handleChange}/>
            <label for="floatingInput">Registreringskod</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleClick}>Nästa</button>
{/*           <hr className="my-4" />
          <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small> */}
        </form>
      </div>
    </div>
  );
}

export default Register;
