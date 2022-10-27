import React from "react";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import "./Profile.css";

function Profile() {
    const userEmail = "user@email.com";
    const renderTooltip = (props) => (<Tooltip id="button-tooltip" {...props}>
        Det här går inte att ångra!
    </Tooltip>);

    return (
        <div className="pt-5 pb-4 mt-3 text-center">
            <h2 className="fw-bold">Profil</h2>
            <h4 className="fw-light fst-italic mb-5">{userEmail}</h4>
            <div className="d-grid gap-3 profileContainer">
                <Button variant="primary" size="lg">
                    Ändra lösenord
                </Button>
                <OverlayTrigger 
                    placement="bottom" 
                    overlay={renderTooltip}
                    delay={{ show: 100, hide: 300 }}>
                    <Button variant="secondary" size="lg">
                        Avregistrera från studie
                    </Button>
                </OverlayTrigger>
            </div>
        </div>
    );
}

export default Profile