import React from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Logo from "../assets/logo.jpeg";
import "./Hero.css";

function Hero() {
  return (
    <div className="background pt-4">
      <div class="container">
        <div className="px-4 py-4 my-5 text-center">
          <Image
            src={Logo}
            className="d-block mx-auto mb-4e shadow-lg rounded mb-5"
          ></Image>
          <h1 className="display-5 fw-bold">Välkommen till ProMeno</h1>
          <h2 className="display-8">Din app om klimakteriet</h2>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Button
                variant="success"
                className="btn btn-success btn-lg px-4 gap-3"
              >
                Om oss
              </Button>
              <Button
                variant="outline-secondary"
                className="btn btn-outline-secondary btn-lg px-4"
              >
                Länkar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
