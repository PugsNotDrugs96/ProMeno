import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import UserContext from "../../UserContext";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import "./Profile.css";

function Profile() {
  const { user } = useContext(UserContext);
  let navigate = useNavigate();
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Avregistrera dig från allt deltagande i vår forskningsstudie.
    </Tooltip>
  );

  return (
    <Container
      style={{ minHeight: "600px", background: "transparent" }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ marginBottom: "2rem" }}>Mina sidor</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          fill="currentColor"
          class="bi bi-person"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
        <h4 style={{ paddingTop: "2rem" }}>Du är inloggad som:</h4>
        <p style={{ color: "#436662", fontWeight: "bold", fontSize: "25px" }}>
          {user}
        </p>
        <Row xs={1} md={1} className="g-3 mt-2">
          <Container style={{ width: "20rem" }}>
            <Button
              variant="primary"
              className="btn btn-success btn-lg mb-4 gap-3"
              style={{ width: "18rem", marginTop: "2rem" }}
              onClick={() => navigate("/change-password")}
            >
              Ändra lösenord
            </Button>
            <OverlayTrigger
              placement="bottom"
              overlay={renderTooltip}
              delay={{ show: 100, hide: 300 }}
            >
              <Button
                type="button"
                variant="secondary"
                className="btn btn-success btn-lg mb-4 gap-3"
                style={{ width: "18rem", marginTop: "0.5rem" }}
                onClick={() => {
                  navigate("/delete-account");
                }}
              >
                Avregistrera dig
              </Button>
            </OverlayTrigger>
          </Container>
        </Row>
      </div>
    </Container>
  );
}

export default Profile;
