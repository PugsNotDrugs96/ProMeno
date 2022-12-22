import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./GoBackBtn.css";

function GoBack() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  return (
    <>
      {location.pathname != "/" && (
        <img
          id="back-button"
          src="../images/arrow-left.svg"
          alt="go-back-button"
          onClick={() => navigate(-1)}
        ></img>
      )}
    </>
  );
}

export default GoBack;
