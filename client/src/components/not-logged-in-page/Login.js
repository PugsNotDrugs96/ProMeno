import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import LoggedInPage from "../logged-in-page/LoggedInPage";
import AuthContext from "../../context/AuthProvider";
import axios from "../api/axios";

function Login() {
  const LOGIN_URL = "/auth";
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false); //when this is true, we should navigate to logged-in-page.

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Inget svar från servern");
      } else if (err.response?.status === 400) {
        setErrMsg("Fel uppgifter");
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
        <LoggedInPage />
      ) : (
        <div className="container ">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
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
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
                <label for="floatingInput">E-post</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
                <label for="floatingInput">Lösenord</label>
              </div>
              <button className="w-100 btn btn-lg btn-primary">Logga in</button>
              {/*  <p className="text-center mt-2">
              Glömt <a href="#">lösenord?</a>
            </p> */}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
