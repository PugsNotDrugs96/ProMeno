import React from "react";
import { useNavigate } from 'react-router-dom';
import "./GoBackBtn.css";

function GoBack() {
    const navigate = useNavigate();
    
    console.log(navigate);
    return (
        <>
            <img
                id="back-button"
                src="../images/arrow-left.svg"
                alt="go-back-button"
                onClick={() => navigate(-1)}
            ></img>
        </>
    )
}

export default GoBack;