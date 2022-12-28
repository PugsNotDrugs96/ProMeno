/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from "react";
import Container from "react-bootstrap/Container";
import Contact from "./Contact";
import "./Footer.css";

function Footer() {
  return (
    <div className="continer">
      <Container className="footer">
        <h3>Om oss</h3>
        <Contact />
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
