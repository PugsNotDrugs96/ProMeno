import { Link } from "react-router-dom";
import LoginContext from "../../UserContext";
import React, { useContext, useRef, useEffect, useState } from "react";
import { changePassword } from "../../api/api";
import { useNavigate } from "react-router-dom";

const ChangePasswordForm = () => {
  const { user } = useContext(LoginContext);
  let navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [oldPassword, setOldPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [oldPassword, password1, password2]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setErrMsg("Lösenorden matchar inte");
      errRef.current.focus();
    } else {
      try {
        const response = await changePassword(user, oldPassword, password1);
        console.log(response);
        if (response.status === 200) {
          setOldPassword("");
          setPassword1("");
          setPassword2("");
          setSuccess(true);
        }
      } catch (err) {
        if (!err?.response) {
          setErrMsg("Inget svar från servern");
        } else if (err.response?.status === 400) {
          setErrMsg("Gammalt lösenord stämmer inte");
        } else {
          setErrMsg("Byte av lösenord lyckades inte");
        }
        errRef.current.focus();
      }
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [password1, password2, oldPassword]);

  return (
    <>
      {success ? (
        navigate("/profile")
      ) : (
        <div className="container ">
          <div className="col-md-5 mx-auto col-lg-5">
            <form
              onSubmit={handleSubmit}
              className="p-4 p-md-5 border rounded-3 bg-light"
            >
              <h3 className="text-center">Ändra lösenord</h3>
              <div className="text-center"></div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  id="old-password"
                  ref={userRef}
                  className="form-control"
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <label htmlFor="floatingInput">Gammalt lösenord</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  id="new-password1"
                  className="form-control"
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                />
                <label htmlFor="floatingInput">Nytt lösenord</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  id="new-password2"
                  className="form-control"
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
                <label htmlFor="floatingInput">Bekräfta nytt lösenord</label>
              </div>
              <button className="w-100 btn btn-lg btn-primary">
                Byt lösenord
              </button>
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
};

export default ChangePasswordForm;
