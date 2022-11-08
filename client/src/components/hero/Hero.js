import React, { useContext } from "react";
import Image from "react-bootstrap/Image";
import Logo from "../../assets/logo.jpeg";
import "./Hero.css";
import UserContext from "./../../UserContext";

function Hero() {
  const { user } = useContext(UserContext);
  const title = user ? "ProMeno" : "Välkommen till ProMeno";
  const subtitle = user
    ? "lär dig om klimakteriet"
    : "forskningsstudie om klimakteriet";

  return (
    <div className="py-5 text-center">
      <Image
        src={Logo}
        className="d-block mx-auto shadow-lg rounded mb-4"
      ></Image>
      <h1 className="display-5 fw-bold">{title}</h1>
      <h2 className="display-8">{subtitle}</h2>
      {!user && (
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-5 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      )}
    </div>
  );
}

export default Hero;
