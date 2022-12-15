import "./ConsentForm.css";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { getPostBySlug } from "../../api/api";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Spinner from "react-bootstrap/Spinner";

function ConsentForm() {
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const form = await getPostBySlug("villkor-for-studien");
      setForm(form);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (!form) return null;

  if (!form.title) {
    <Alert severity="error">
      <AlertTitle>Sidan kunde inte hittas</AlertTitle>
      Något gick fel, försök igen
    </Alert>;
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <Card
          style={{
            background: "transparent",
            border: "none",
          }}
        >
          <Card.Title
            className="title"
            dangerouslySetInnerHTML={{ __html: form.title.rendered }}
          />
          <Card.Body
            className="body"
            dangerouslySetInnerHTML={{ __html: form.content.rendered }}
          />
        </Card>
      )}
    </React.Fragment>
  );
}
export default ConsentForm;
