import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import Logo from "../../assets/logo.jpeg";
import "./Hero.css";
import UserContext from "./../../UserContext";
import MainCategory from "../navigation/MainCategory";

function Hero() {
  const { user } = useContext(UserContext);
  const title = user ? "ProMeno" : "Välkommen till ProMeno";
  const subtitle = user
    ? "Lär dig om klimakteriet"
    : "Forskningsstudie om klimakteriet";

  return (
    <Container>
      <Row>
        <Col md={7}>
              <div className="py-5 text-center hero">
                <Image
                  src={Logo}
                  className="d-block mx-auto shadow-lg rounded mb-4"
                ></Image>
                <h1 className="display-8 fw-bold">{title}</h1>
                <h2 className="display-12">{subtitle}</h2>
                {!user && (
                  <div className="col-lg-6 mx-auto">
                    <p className="lead mb-5 mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                )}
              </div>
        </Col>
        <Col md={5}>
          <div className="py-2 mx-auto">
            <MainCategory />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Hero;
