import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostsByCategory, getCategoryBySlug } from "../../api/api";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import PostCard from "./PostCard";

function PostCardPage() {
  const params = useParams();
  const { subCategorySlug } = params;

  const [posts, setPosts] = useState(null);
  const [subCategory, setSubCategory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const category = await getCategoryBySlug(subCategorySlug);
      const posts = await getPostsByCategory(subCategorySlug);
      setPosts(posts);
      setSubCategory(category);
    }
    fetchData();
  }, [subCategorySlug]);

  if (!posts || !subCategory) return null;

  return (
    <Container
      style={{ padding: "3rem", minHeight: "600px", background: "transparent" }}
    >
      <h1 style={{ paddingBottom: "1rem", textAlign: "center" }}>
        {subCategory.name}
      </h1>
      {subCategory.description && (
        <Container
          style={{
            maxWidth: "500px",
            background: "transparent",
            fontSize: "20px",
            marginBottom: "2rem",
          }}
        >
          <p>{subCategory.description}</p>
        </Container>
      )}
      <Row xs={1} md={2} className="g-3">
        {posts.map((post, index) => (
          <Col key={index} className="d-flex">
            <PostCard
              index={index}
              post={post}
              mainCategorySlug={params.mainCategorySlug}
              subCategorySlug={params.subCategorySlug}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PostCardPage;
