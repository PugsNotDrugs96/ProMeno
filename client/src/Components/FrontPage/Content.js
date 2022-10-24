import React from "react";
import { useState, useEffect } from "react";
import { getPostById } from "../../api";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

function Content() {
  const [startPost, setStartPost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const startPost = await getPostById(1);
      setStartPost(startPost);
    }
    fetchData();
  }, []);

  if (!startPost) return null;

  return (
    <Container className="container pt-5 pb-5">
      <Card className="border-0">
        <Card.Title
          dangerouslySetInnerHTML={{ __html: startPost.title.rendered }}
          className="display-5 text-center pb-2 lead"
        />
        <Card.Body
          dangerouslySetInnerHTML={{ __html: startPost.content.rendered }}
          className="text-left"
        />
      </Card>
    </Container>
  );
}

export default Content;
