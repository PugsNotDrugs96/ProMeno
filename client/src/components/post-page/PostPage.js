import "./PostPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostBySlug } from "../../api/api";
import { Container, Alert, Spinner } from "react-bootstrap";

function PostPage() {
  const params = useParams();
  const slug = params.slug;
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const post = await getPostBySlug(slug);
        console.log(post);
        setPost(post);
        setLoading(false);
      } catch (err) {
        console.warn(err);
        setError(true);
      }
    }
    fetchData();
  }, [slug]);

  if (error) {
    return (
      <Container className="postContainer py-4">
        <Alert
          variant="light"
          style={{
            background: "transparent",
            border: "none",
            padding: "5rem",
            fontSize: "26pt",
          }}
        >
          Sidan kunde inte hittas
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Spinner
        style={{
          margin: "5rem",
        }}
        animation="border"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (!post) return null;

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

export default PostPage;
