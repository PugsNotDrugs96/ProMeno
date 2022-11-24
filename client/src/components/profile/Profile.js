import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import UserContext from "../../UserContext";
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
    <div className="py-5 text-center">
      <h1 className="fw-bold">Profil</h1>
      <h4 className="fw-light fst-italic mb-5">{user}</h4>
      <div className="pt-4 d-grid gap-3 profileContainer">
        <Button
          variant="primary"
          size="lg"
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
            size="lg"
            onClick={() => {
              navigate("/delete-account");
            }}
          >
            Radera ditt konto
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  );
}

export default Profile;
