import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../api/api";
import LoginContext from "../../UserContext";
import { useNavigate } from "react-router-dom";

function Auth() {
  const { setUser } = useContext(LoginContext);
  let navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      if (response.status === 200) {
        setUser(email, password);
        setEmail("");
        setPassword("");
        setSuccess(true);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Inget svar från servern");
      } else if (err.response?.status === 400) {
        setErrMsg("Fel e-postadress eller lösenord, försök igen.");
      } else if (err.response?.status === 401) {
        setErrMsg("Inte autentiserad");
      } else {
        setErrMsg("Inloggning lyckades inte");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        navigate("/home")
      ) : (
        <div className="container ">
          <div className="col-md-5 mx-auto col-lg-5">
            <form
              onSubmit={handleSubmit}
              className="p-4 p-md-5 border rounded-3 bg-light"
            >
              <h3 className="text-center">Logga in</h3>
              <div className="text-center">
                Inte registrerad ännu?{" "}
                <Link to="/register" className="link-primary">
                  Registrera här!
                </Link>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  ref={userRef}
                  autoComplete="off"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <label htmlFor="floatingInput">E-post</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
                <label htmlFor="floatingInput">Lösenord</label>
              </div>
              <button className="w-100 btn btn-lg btn-primary">Logga in</button>
              <p className="text-center mt-2">
                Glömt <Link to="/">lösenord?</Link>
              </p>
              <p
                ref={errRef}
                className={
                  errMsg ? "errmsg text-danger text-center mt-2" : "offscreen"
                }
                aria-live="assertive"
              >
                {errMsg}
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Auth;
