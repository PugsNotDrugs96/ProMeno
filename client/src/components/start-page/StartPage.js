import React from "react";
import Image from "react-bootstrap/esm/Image";
import heroImg from "../../assets/front-img.jpeg";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

function StartPage() {
  const title = "ProMeno";
  const subtitle =
    "Forskningsstudien om klimakteriet. Få förslag på behandlingar och lära dig vad som egentligen händer i kroppen. Syftet är att undersöka och förbättra levnadsvanor och hälsa hos personer i klimakteriet.";

  return (
    <Container className="content">
      <div className="px-4 text-center">
        <Image
          src={heroImg}
          className="d-block mx-auto mb-4 shadow-md rounded"
          style={{
            width: "50%",
            height: "auto",
            boxShadow: "1px 1px grey",
          }}
        />
        <h1 className="display-5 fw-bold"> {title}</h1>
        <div className="col-lg-7 mx-auto">
          <p className="lead mb-4" style={{ fontSize: "1.30rem" }}>
            {subtitle}
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-center">
            <Button
              type="button"
              className="btn btn-primary btn-lg px-4 gap-3"
              href="/login"
              style={{ width: "18rem" }}
            >
              Logga in
            </Button>
            <Button
              type="button"
              className="btn btn-primary btn-lg px-4 gap-3"
              href="/code"
              style={{ width: "18rem" }}
            >
              Registrera dig
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <Link
            to="/research/:om-studien"
            style={{
              textDecoration: "none",
              fontSize: "1.30rem",
            }}
          >
            Läs mer om studien
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default StartPage;
