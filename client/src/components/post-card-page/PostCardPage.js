import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostsByCategory, getCategoryBySlug } from "../../api/api";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import PostCard from "./PostCard";

function PostCardPage() {
  const params = useParams();
  const { slug } = params;

  const [posts, setPosts] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const category = await getCategoryBySlug(slug);
      const posts = await getPostsByCategory(slug);
      setPosts(posts);
      setCategory(category);
    }
    fetchData();
  }, [slug]);

  if (!posts || !category) return null;

  return (
    <Container
      style={{ padding: "3rem", minHeight: "600px", background: "transparent" }}
    >
      <h1 style={{ paddingBottom: "1rem", textAlign: "center" }}>
        {category.name}
      </h1>
      {category.description && (
        <Container
          style={{
            textAlign: "center",
            maxWidth: "500px",
            background: "transparent",
            fontSize: "20px",
            marginBottom: "2rem",
          }}
        >
          <p>{category.description}</p>
        </Container>
      )}
      <Row xs={1} md={2} className="g-3">
        {posts.map((post, index) => (
          <Col key={index} className="d-flex">
            <PostCard index={index} post={post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PostCardPage;
