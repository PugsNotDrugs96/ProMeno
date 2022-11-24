import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { getPostBySlug } from "../../api/api";

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
    <>
      {forms.map((form, index) => (
        <Card key={index} style={{ background: "transparent", border: "none" }}>
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
    </>
  );
}
export default ConsentForm;
