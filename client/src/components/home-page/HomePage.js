import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Hero from "../hero/Hero";
import MainCategory from "../categories/MainCategory";

const HomePage = () => {
  return (
    <Container className="content">
      <Row>
        <Col>
          <Hero />
        </Col>
        <Col md={5}>
          <MainCategory />
        </Col>
      </Row>
    </Container>
  );
};
export default HomePage;
