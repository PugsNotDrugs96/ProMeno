import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import { getPostById as getPostBySlug } from "../api/api";

function ConsentForm() {
  const [forms, setForms] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const forms = await getPostBySlug("villkor-for-studien");
      setForms(forms);
    }
    fetchData();
  }, []);

  if (!forms) return null;

  return (
    <Container style={{ padding: "5rem" }}>
      <Row>
        {forms.map((form, index) => (
          <Card
            key={index}
            style={{ background: "transparent", border: "none" }}
          >
            <Card.Title
              style={{ fontSize: "30px" }}
              dangerouslySetInnerHTML={{ __html: form.title.rendered }}
            />
            <Card.Body
              style={{ fontSize: "20px", padding: 0, marginTop: "2rem" }}
              dangerouslySetInnerHTML={{ __html: form.content.rendered }}
            />
          </Card>
        ))}
      </Row>
    </Container>
  );
}
export default ConsentForm;
