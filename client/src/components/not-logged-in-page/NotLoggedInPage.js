import React from "react";
import Hero from "../hero/Hero";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function NotLoggedInPage() {
  return (
    <>
      <Hero />
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="/login">
          <Button className="btn btn-success btn-lg px-4 gap-3">
            Logga in
          </Button>
        </Link>
        <Link to="/register">
          <Button
            variant="primary"
            className="btn btn-success btn-lg px-4 gap-3"
          >
            Registrera dig
          </Button>
        </Link>
      </div>
    </>
  );
}

export default NotLoggedInPage;
