import React from "react";
import { useNavigate } from "react-router-dom";
import "./goBackBtn.css";
import Icon from "../../assets/arrow-left.svg";

function GoBack() {
  const navigate = useNavigate();

  return (
    <img
      id="back-button"
      src={Icon}
      alt="go-back-button"
      onClick={() => navigate(-1)}
    />
  );
}

export default GoBack;
