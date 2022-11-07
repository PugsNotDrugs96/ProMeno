import React from "react";
import { useState, useEffect } from "react";
import { getPostById } from "../../api";
import Card from "react-bootstrap/Card";
import "./Content.css";

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
    <>
      <Card className="border-0 pt-4">
        <Card.Title
          dangerouslySetInnerHTML={{ __html: startPost.title.rendered }}
          className="display-5 text-center pb-2 lead"
        />
        <Card.Body
          dangerouslySetInnerHTML={{ __html: startPost.content.rendered }}
        />
      </Card>
    </>
  );
}

export default Content;
