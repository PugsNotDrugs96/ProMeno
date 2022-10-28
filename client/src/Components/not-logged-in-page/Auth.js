import React, { useState } from "react";
import Register from "./Register";

function Auth(props) {
  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container col-md-5 mx-auto col-lg-5">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Logga in</h3>
            <div className="text-center">
              Inte registrerad ännu? {" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Registrera här!
              </span>
            </div>
            <div className="form-group mt-3">
              <label>E-post adress</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Ange ditt e-mail"
              />
            </div>
            <div className="form-group mt-3">
              <label>Lösenord</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Ange ditt lösenord"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Skicka
              </button>
            </div>
            <p className="text-center mt-2">
              Glömt <a href="#">lösenord?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container ">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Registrera dig</h3>
          <div className="text-center">
            Redan registrerad?{"  "}
            <span className="link-primary" onClick={changeAuthMode}>
              Logga in
            </span>
          </div>
            <Register/>
        </div>
      </form>
    </div>
  );
}

export default Auth;
