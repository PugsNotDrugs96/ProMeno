import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import "./Breadcrumbs.css";

function Breadcrumbs() {
    const location = useLocation().pathname;
    const pathnames = location.split("/").filter(x => x);

    function handleTitle(path) {
        let words = path.split("-");

        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            words[i] = word.charAt(0).toUpperCase() + word.slice(1);
        }
        return words.join(" ");
    }

    return(
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item active>Startsida</Breadcrumb.Item>
                {pathnames.map((path) => (
                    <Breadcrumb.Item active>
                        {handleTitle(path)}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </Container>
    )
}

export default Breadcrumbs;