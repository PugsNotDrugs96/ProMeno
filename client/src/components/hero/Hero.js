import React from "react";
import Container from "react-bootstrap/esm/Container";
import "./Hero.css";
import Image from "react-bootstrap/esm/Image";
import heroImg from "../../assets/heroImg.jpeg";

function Hero() {
  return (
    <Container className="text-center">
      <h1 className="display-8 fw-bold">Välkommen till ProMeno</h1>
      <div className="welcomeBody">
        <p className="lead my-4">
          Här kan du utforska olika symptom och behandlingar kopplade till
          klimakteriet. Du kan även hitta forskning och lära dig mer om vad vad
          händer i kroppen.
        </p>
        <Image
          src={heroImg}
          className="d-block mx-auto mb-4 shadow-md rounded"
          style={{
            width: "300px",
            height: "auto",
            boxShadow: "1px 1px grey",
          }}
        />
      </div>
    </Container>
  );
}

export default Hero;
