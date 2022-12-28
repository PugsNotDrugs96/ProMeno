import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getPostBySlug } from "../../api/api";
import Container from "react-bootstrap/esm/Container";
import "../post-page/PostPage.css";

function AboutUsPage() {
  const slug = "om-studien";

  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const post = await getPostBySlug(slug);
      setPost(post);
    }
    fetchData();
  }, []);

  if (!post) return null;

  if (!post.title) {
    return (
      <Alert
        severity="error"
        style={{
          background: "transparent",
          paddingTop: "6rem",
          marginLeft: "2rem",
        }}
      >
        <AlertTitle style={{ fontSize: "1.5rem" }}>
          Sidan kunde inte hittas
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <Container className="postContainer py-4">
      <h1
        className="postTitle py-3 text-center"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <p
        className="postBody px-5"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </Container>
  );
}
export default AboutUsPage;
