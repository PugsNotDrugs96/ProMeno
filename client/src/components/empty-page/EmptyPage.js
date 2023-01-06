import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";

function EmptyPage() {
  return (
    <Container className="postContainer py-4">
      <Col>
        <h1 className="text-center text-info text-black mt-40">
          Den här sidan är inte tillgänglig
        </h1>
      </Col>

      <div className="text-center mt-3">
        Länken kan vara trasig eller så är den inte längre giltig
      </div>

      <div className="text-center mt-5">
        <Link to="/home">
          <Button
            className="btn btn-success btn-lg mb-4 gap-3"
            style={{ width: "18rem" }}
            variant="primary"
            type="submit"
          >
            Tillbaka till startsidan
          </Button>
        </Link>
      </div>
    </Container>
  );
}
export default EmptyPage;
