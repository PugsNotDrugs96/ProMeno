import React from "react";
import Button from 'react-bootstrap/Button';
import "./Profile.css";

function Profile() {
    const userEmail = "user@email.com";

    return (
        <div className="pt-5 pb-4 mt-3 text-center">
            <h2 className="fw-bold">Profil</h2>
            <h4 className="fw-light fst-italic mb-5">{userEmail}</h4>
            <div className="d-grid gap-3 profileContainer">
                <Button variant="primary" size="lg">
                    Ändra lösenord
                </Button>
                <Button variant="secondary" size="lg">
                    Avregistrera från studie
                </Button>
            </div>
        </div>
    );
}

export default Profile