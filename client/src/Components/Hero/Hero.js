import React from "react";
import Image from "react-bootstrap/Image";
import Logo from "../../assets/logo.jpeg";
import "./Hero.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="px-4 py-4 my-5 text-center">
      <Image
        src={Logo}
        className="d-block mx-auto mb-4e shadow-lg rounded mb-5"
      ></Image>
      <h1 className="display-5 fw-bold">Välkommen till ProMeno</h1>
      <h2 className="display-8">Din kunskapssida om klimakteriet</h2>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="/auth" className="singup_btn">
          <Button className="btn btn-primary btn-lg px-4 gap-3">
            Logga in
          </Button>
        </Link>
        <Link to="/register" className="login_btn">
          <Button variant="primary" className="btn btn-secondary btn-lg px-4">
            Registrera
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
