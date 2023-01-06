import React from "react";
import Container from "react-bootstrap/esm/Container";
import "./hero.css";
import Image from "react-bootstrap/esm/Image";
import heroImg from "../../assets/heroImg.jpeg";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <Container className="text-center">
      <h1 className="display-8 fw-bold">Välkommen till ProMeno</h1>
      <div className="welcomeBody">
        <p className="lead my-4">
          Här kan du utforska olika symptom och behandlingar kopplade till
          klimakteriet. Du kan även hitta forskning och lära dig mer om vad som
          händer i kroppen.
        </p>
        <div style={{ marginBottom: "2rem" }}>
          <Link
            to="/research/om-studien"
            style={{
              textDecoration: "none",
              fontSize: "1.30rem",
            }}
          >
            Läs mer om studien
          </Link>
        </div>
        <Image
          src={heroImg}
          className="d-block mx-auto mb-4 rounded"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
    </Container>
  );
}

export default Hero;
