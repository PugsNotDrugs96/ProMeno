import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import UserContext from "../../UserContext";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { getUsersName } from "../../api/api";
import "./Profile.css";

function Profile() {
  const { user } = useContext(UserContext);
  const [name, setName] = useState(null);
  let navigate = useNavigate();
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Avregistrera dig från allt deltagande i vår forskningsstudie.
    </Tooltip>
  );

  useEffect(() => {
    async function fetchData() {
      const name = await getUsersName();
      const str = name.data;
      const arr = str.split(" ");

      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
      const str2 = arr.join(" ");
      setName(str2);
    }
    fetchData();
  }, [user]);

  return (
    <Container className="content" style={{ textAlign: "center" }}>
      <h1 className="fw-bold" style={{ marginBottom: "2rem" }}>
        Mina sidor
      </h1>
      <img
        id="person-circle"
        src="../images/person-circle.svg"
        alt="profile-logo"
        width="60px"
      ></img>
      <h4 style={{ paddingTop: "2rem" }}>Du är inloggad som:</h4>
      <p style={{ color: "#436662", fontWeight: "bold", fontSize: "25px" }}>
        {name}
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
    </Container>
  );
}

export default Profile;
