import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Hero from "../hero/Hero";
import MainCategory from "../navigation/MainCategory";
import UserContext from "./../../UserContext";

const HomePage = () => {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <Row p-5 xs={12} md={6}>
        <Col md={7}>
          <Hero />
        </Col>
        <Col mx-auto md={5}>
          {user && (
            <MainCategory />
          )}
        </Col>
      </Row>
    </Container>
  )
};
export default HomePage;
