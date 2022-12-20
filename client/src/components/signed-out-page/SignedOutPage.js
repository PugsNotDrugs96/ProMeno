import React from "react";
import "./signedOutPage.css";
import Image from "react-bootstrap/esm/Image";
import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/front-img.jpeg";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

function SignedOutPage() {
  const navigate = useNavigate();
  const slug = "om-studien";
  const title = "ProMeno";
  const subtitle = "Vår forskningsstudie om klimakteriet";

  const handleClick = () => {
    navigate(`/page/${slug}`);
  };

  return (
    <Container className="content text-center">
      <h1 className="display-8 fw-normal">{title}</h1>
      <h2 className="display-12 m-4 fw-light">{subtitle}</h2>
      <Image
        src={heroImg}
        className="d-block mx-auto mb-4 shadow-md rounded"
        style={{ width: "330px", height: "auto", boxShadow: "1px 1px grey" }}
      />
      <Button
        onClick={handleClick}
        className="btn btn-success btn-lg mb-4 gap-3"
        style={{ width: "18rem" }}
      >
        Läs mer om studien
      </Button>
      <div className="col-lg-10 mx-auto">
        <p className="lead mb-5">
          ProMeno är en del av ett forskningsprojekt vid Malmö universitet där
          syftet är att undersöka och förbättra levnadsvanor och hälsa hos
          personer i klimakteriet.
        </p>
        <p className="lead mb-5">
          Det här är ett digitalt stöd i form av en applikation som är tänkt att
          hjälpa personer i klimakteriet att hitta relevant information om
          symtom kopplade till klimakteriebesvär. Du kan även få förslag på
          behandlingar och lära dig vad som egentligen händer i kroppen under
          klimakteriet.
        </p>
        <div
          className="d-grid gap-2 d-sm-flex d-flex flex-column justify-content-sm-center mb-4"
          style={{ alignItems: "center" }}
        >
          <Button
            href="/login"
            className="btn btn-success btn-lg gap-3"
            style={{ width: "18rem" }}
          >
            Logga in
          </Button>
          <Button
            href="/register"
            className="btn btn-success btn-lg gap-3"
            style={{ width: "18rem", marginTop: "1rem" }}
          >
            Registrera dig
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default SignedOutPage;
