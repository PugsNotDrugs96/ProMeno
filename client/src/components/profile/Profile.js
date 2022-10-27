import React from "react";
import Button from 'react-bootstrap/Button';

function Profile() {
    const userEmail = "user@email.com";

    return (
        <div className="px-4 py-4 my-5 text-center">
            <h2 className="fw-bold">Profil</h2>
            <h4 className="fw-light fst-italic mb-5">{userEmail}</h4>
            <div className="d-grid gap-2">
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