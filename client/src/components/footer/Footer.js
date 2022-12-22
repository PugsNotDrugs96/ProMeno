import React from "react";
import Container from "react-bootstrap/Container";
import Contact from "./Contact";
import Card from "react-bootstrap/Card";
import "./Footer.css";
function Footer() {
  return (
    <div className="continer">
      <Container>
        <h3>Kontakt</h3>
        <Contact />
        <h5>
          Läs mer<Card.Link href="/about-us"> Om oss</Card.Link>
        </h5>
        <Container className="text-center">
          <small className="text-muted">
            © ProMeno, 2022. All rights reserved.
          </small>
        </Container>
      </Container>
    </div>
  );
}

export default Footer;
