import "./postPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostBySlug } from "../../api/api";
import { Container, Spinner } from "react-bootstrap";
import ErrorAlert from "../error-alert/ErrorAlert";
import Breadcrumbs from "../navigation/breadcrumbs/Breadcrumbs";

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

  if (!post) return null;

  return (
    <Container className="postContainer py-4">
      <Breadcrumbs />
      <h1
        className="postTitle py-3 text-center mt-5"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <p
        className="postBody px-3 lead mb-4"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </Container>
  );
}

export default PostPage;
