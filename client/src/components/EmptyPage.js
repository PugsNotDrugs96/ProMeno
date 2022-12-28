import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image";
import brokenImage from "../assets/icons8-broken-heart-50.png";

function EmptyPage() {
  return (
    <Container>
      <Col>
        <Image src={brokenImage} />
        <h1 className="text-center text-info text-black mt-40">
          Den här sidan är inte tillgänglig
        </h1>
      </Col>

      <div className="text-center mt-3">
        Länken kan vara trasig eller så är den inte längre giltig
      </div>
      <div className="text-center mt-5">
        <Button
          className="btn btn-success btn-lg mb-4 gap-3"
          style={{ width: "18rem" }}
          href="/"
          variant="primary"
          type="submit"
        >
          Tillbaka till startsidan
        </Button>
      </div>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
}
export default EmptyPage;
