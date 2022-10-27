import React from "react";
import Image from "react-bootstrap/Image";
import Logo from "../../assets/logo.jpeg";
import "./Hero.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Hero(props) {
  const isLoggedIn = props.isLoggedIn;
  const title = isLoggedIn ? "ProMeno" : "Välkommen till ProMeno";
  const subtitle = isLoggedIn
    ? "Appen om klimakteriet"
    : "Forskningsstudie om klimakteriet";

  return (
    <div className="py-5 text-center">
      <Image
        src={Logo}
        className="d-block mx-auto shadow-lg rounded mb-4"
      ></Image>
      <h1 className="display-5 fw-bold">{title}</h1>
      <h2 className="display-8">{subtitle}</h2>
      {!isLoggedIn && (
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-5 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      )}{" "}
      <></>
      {!isLoggedIn && (
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/auth">
            <Button className="btn btn-success btn-lg px-4 gap-3">
              Logga in
            </Button>
          </Link>
          <Link to="/register">
            <Button
              variant="primary"
              className="btn btn-success btn-lg px-4 gap-3"
            >
              Registrera dig
            </Button>
          </Link>
        </div>
      )}
      <></>
    </div>
  );
}

export default Hero;
