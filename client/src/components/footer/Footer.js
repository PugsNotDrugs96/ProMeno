import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="fixed-bottom" >
        <Container className="pt-1 pb-1">
            <Row>
                <Col xs={6}>
                    <h5 className="pb-3">ProMeno</h5>
                    <p>Lorem ipsum dolor sit...</p>
                </Col>
                <Col>
                    <h5 className="pb-1 text-muted">Info</h5>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="px-0 py-0">
                            <Link to="/">Om oss</Link>  
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0 py-0"> {/* do we need a link? or jsut redirect to email */}
                            <Link to="/">Kontakt</Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <h5 className="pb-1 text-muted">Hjälp</h5> 
                    <ListGroup variant="flush">
                        <ListGroup.Item className="px-0 py-0">
                            <Link to="/">Support</Link>
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0 py-0">
                            <Link to="/">Registrering</Link> {/* info about the registeration,how? what? */}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <Container className="pt-1 text-center">
                <small className="text-muted">© ProMeno, 2022. All rights reserved.</small>
            </Container>
        </Container>
        </div>
    )
}

export default Footer;
