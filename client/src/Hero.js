import React from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Logo from "./assets/logo.png";

function Hero() {
  return (
    <div className="container">
      <div className="px-4 py-5 my-5 text-center">
        <Image src={Logo} class="d-block mx-auto mb-4"></Image>
        <h1 className="display-5 fw-bold">Välkommen till ProMeno</h1>
        <h2 className="display-8">Lär dig om din hälsa</h2>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 mt-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Button variant="primary" className="btn btn-primary btn-lg px-4 gap-3">
              Primary
            </Button>
            <Button
              variant="outline-secondary"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Secondary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
