import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./GoBackBtn.css";
import Icon from "../../assets/arrow-left.svg";

function GoBack() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && (
        <img
          id="back-button"
          src={Icon}
          alt="go-back-button"
          onClick={() => navigate(-1)}
        />
      )}
    </>
  );
}

export default GoBack;
