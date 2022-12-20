import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import "./Hero.css";
import UserContext from "./../../UserContext";

function Hero() {
  const { user } = useContext(UserContext);
  const title = user ? "ProMeno" : "Välkommen till ProMeno";
  const subtitle = user
    ? "Lär dig om klimakteriet"
    : "Forskningsstudie om klimakteriet";

  return (
    <Container className="content text-center">
      <h1 className="display-8 fw-bold">{title}</h1>
      <h2>{subtitle}</h2>
      {!user ? (
        <div className="welcomeBody">
          <p className="lead my-4">
            Forskningsstudien ProMeno handlar om levnadsvanor och hälsa hos
            kvinnor i klimakteriet. Studien är en del av ett forskningsprojekt
            vid Malmö Universitet där syftet är att utvärdera användningen av
            ett digitalt hjälpmedel, mHealth, som stöd vid klimakteriebesvär hos
            kvinnor i Sverige.
          </p>
          <p>
            ProMeno är ett digitalt stöd i form av en applikation som är tänkt
            att hjälpa kvinnor i klimakteriet att hitta relevant information om
            symtom kopplade till klimakteriebesvär samt ge förslag på
            behandling. Information kommer att samlas in genom formulär som
            skickas ut med regelbunden intervall för att så småningom kunna
            utvärdera effekten av användning.
          </p>
          <p>
            Deltagarna kommer att delas in i tre grupper beroende på när de ska
            få tillgång till applikationen. En grupp kommer få tillgång direkt,
            en grupp kommer att få tillgång efter 3 månader och en efter 6
            månader. Det kommer vara helt kostnadsfritt. Deltagare rekryteras på
            promeno.se under januari-februari 2023.
          </p>
        </div>
      ) : (
        <div className="mainCatBody">
          <p>
            ProMeno är ett digitalt stöd i form av en applikation som är tänkt
            att hjälpa kvinnor i klimakteriet att hitta relevant information om
            symtom kopplade till klimakteriebesvär samt ge förslag på
            behandling. Information kommer att samlas in genom formulär som
            skickas ut med regelbunden intervall för att så småningom kunna
            utvärdera effekten av användning.
          </p>
        </div>
      )}
    </Container>
  );
}

export default Hero;
