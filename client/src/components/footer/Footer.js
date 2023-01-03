import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Figure from "react-bootstrap/Figure";
import researchers from "./researchers.json";
import MarieImg from "../../assets/marie.jpg";
import EvaImg from "../../assets/eva.jpg";

function Footer() {
  return (
    <Container
      className="footer"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <h3
        className="text-center"
        style={{ marginTop: "1rem", marginBottom: "2rem" }}
      >
        Ansvariga forskare
      </h3>
      <CardGroup>
        {researchers.map((researcher) => (
          <Card
            style={{
              alignItems: "center",
              justifyContent: "center",
              border: "none",
            }}
          >
            <Figure.Image
              className="rounded-circle"
              width={145}
              alt="researcher image"
              src={researcher.name === "Marie Karlsson" ? MarieImg : EvaImg}
            />
            <Card.Body>
              <Card.Title
                className="text-center"
                style={{
                  color: "#2b8578",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
                src={researcher.name === "Marie Karlsson" ? MarieImg : EvaImg}
              >
                {researcher.name}
              </Card.Title>
              <Card.Text
                className="text-center"
                style={{ marginTop: "1rem", color: "grey" }}
              >
                {researcher.descriptions.map((description) => (
                  <p>{description}</p>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
    </Container>
  );
}

export default Footer;
