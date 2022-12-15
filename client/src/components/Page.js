import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getPostBySlug } from "../api/api";
import Container from "react-bootstrap/esm/Container";
import "./post-page/PostPage.css";

function Page() {
  const params = useParams();
  const { slug } = params;

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const post = await getPostBySlug(slug);
      setPost(post);
      setIsLoading(false);
    }
    fetchData();
  }, [slug]);

  if (!post)
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

  return (
    <React.Fragment>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
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
      )}
    </React.Fragment>
  );
}
export default Page;
