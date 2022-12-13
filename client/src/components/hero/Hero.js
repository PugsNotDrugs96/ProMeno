import React, { useContext } from "react";
import "./Hero.css";
import UserContext from "./../../UserContext";
import Image from "react-bootstrap/esm/Image";
import heroImg from "../../assets/front-img.jpeg";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

function Hero() {
  const { user } = useContext(UserContext);
  const title = user ? "ProMeno" : "Välkommen till ProMeno";
  const subtitle = user
    ? "Lär dig om klimakteriet"
    : "Vår forskningsstudie om klimakteriet";

  return (
    <div className="pt-5 text-center hero">
      <h1 className="display-8 fw-bold">{title}</h1>
      <h2 className="display-12 m-4">{subtitle}</h2>
      <div className="d-grid gap-2 d-sm-flex d-flex flex-column justify-content-sm-center mb-4">
        <Link to="/login">
          <Button className="btn btn-success btn-lg" style={{ width: "13rem" }}>
            Logga in
          </Button>
        </Link>
        <Link to="/register">
          <Button
            className="btn btn-success btn-lg px-4 gap-3"
            style={{ width: "13rem" }}
          >
            Registrera dig
          </Button>
        </Link>
      </div>
      <Image
        src={heroImg}
        className="d-block mx-auto mb-4 shadow-xs rounded"
        style={{ width: "350px", height: "auto" }}
      />

      {!user && (
        <div className="col-lg-6 mx-auto" style={{ marginLeft: "2rem" }}>
          <p className="lead mb-5">
            Här kan du hitta relevant information om symtom kopplade till
            klimakteriebesvär. Du kan även få förslag på behandlingar och lära
            dig vad som egentligen händer i kroppen.
          </p>
          <p className="lead mb-5">
            ProMeno är en del av ett forskningsprojekt vid Malmö universitet där
            syftet är att undersöka och förbättra levnadsvanor och hälsa hos
            personer i klimakteriet.
          </p>
          <Button
            className="btn btn-success btn-lg"
            style={{ width: "13rem", height: "3.5rem" }}
          >
            Läs mer om studien
          </Button>
        </div>
      )}
    </div>
  );
}

export default Hero;
