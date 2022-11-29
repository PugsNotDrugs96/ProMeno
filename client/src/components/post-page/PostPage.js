import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostBySlug } from "../../api/api";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";

function PostPage() {
  const params = useParams();
  const slug = params.slug;

  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const post = await getPostBySlug(slug);
      setPost(post);
    }
    fetchData();
  }, [slug]);

  if (!post) return null;

  return (
    <Container style={{ padding: "5rem", background: "transparent" }}>
      <Card style={{ background: "transparent", border: "none" }}>
        <Card.Title
          style={{ fontSize: "30px" }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <Card.Body
          style={{ fontSize: "20px", padding: 0, marginTop: "2rem" }}
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </Card>
    </Container>
  );
}

export default PostPage;
