import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom"

function Breadcrumbs({parentName, childName}) {
    const location = useLocation().pathname;
    const pathnames = location.split("/").filter(x => x);

    return(
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Hem</Breadcrumb.Item>
                {parentName.length > 0 ? (
                    <Breadcrumb.Item>{parentName}</Breadcrumb.Item>
                ) : (
                    <></>
                )}
                {childName.length > 0 ? (
                    <Breadcrumb.Item>{childName}</Breadcrumb.Item>
                ) : (
                    <></>
                )}
                {(childName.length > 0) && (pathnames[0] === "post") ? (
                    <Breadcrumb.Item active>{pathnames[1]}</Breadcrumb.Item>
                ) : (
                    <></>
                )}
            </Breadcrumb>
        </Container>
    )
}

export default Breadcrumbs;