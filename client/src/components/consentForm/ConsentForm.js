import "./ConsentForm.css";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { getPostBySlug } from "../../api/api";
import { Spinner } from "react-bootstrap";
import ErrorAlert from "../ErrorAlert";

function ConsentForm() {
  const [form, setForm] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const form = await getPostBySlug("villkor-for-studien");
        setForm(form);
        setLoading(false);
      } catch (err) {
        console.warn(err);
        setError(err);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <ErrorAlert type="article" />;
  }

  if (loading) {
    return (
      <Spinner
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
        }}
        animation="border"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (!form) return null;

  return (
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
  );
}
export default ConsentForm;
