import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./GoBackBtn.css";

function GoBack() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && (
        <img
          id="back-button"
          src="../images/arrow-left.svg"
          alt="go-back-button"
          onClick={() => navigate(-1)}
        />
      )}
    </>
  );
}

export default GoBack;
