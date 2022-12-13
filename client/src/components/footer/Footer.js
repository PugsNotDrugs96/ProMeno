/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from "react";
import Container from "react-bootstrap/Container";
import Contact from "./Contact";
import Card from 'react-bootstrap/Card';
function Footer() {
  return (
      <Container className="pt-1 pb-1">
            <h3 className="pb-3">Kontakt</h3>
        < Contact/>
        <Container>
          <span>Läs mer </span>
        <Card.Link href="/about-us">Om oss</Card.Link>
        </Container>
        <Container className="pt-1 text-center">
          <small className="text-muted">
            © ProMeno, 2022. All rights reserved.
          </small>
        </Container>
      </Container>
  );
}

export default Footer;
