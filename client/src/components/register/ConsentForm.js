import "./ConsentForm.css";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { getPostBySlug } from "../../api/api";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function ConsentForm() {
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const form = await getPostBySlug("villkor-for-studien");
      setForm(form);
    }
    fetchData();
  }, []);

  if (!form)
    return (
      <Alert severity="error">
        <AlertTitle>Sidan kunde inte hittas</AlertTitle>
        Något gick fel, försök igen
      </Alert>
    );

  return (
    <Card
      style={{ background: "transparent", border: "none", margin: "0 2rem" }}
    >
      <Card.Title
        className="title"
        style={{ fontSize: "30px" }}
        dangerouslySetInnerHTML={{ __html: form.title.rendered }}
      />
      <Card.Body
        className="body"
        style={{ fontSize: "20px", padding: 0, marginTop: "2rem" }}
        dangerouslySetInnerHTML={{ __html: form.content.rendered }}
      />
    </Card>
  );
}
export default ConsentForm;
