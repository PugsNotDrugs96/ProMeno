import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostsByCategory, getCategoryBySlug } from "../../api/api";
import Card from "react-bootstrap/Card";
import cardImg from "../../assets/card-image.png";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

function CategoryPage() {
  const navigate = useNavigate();
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
            <Card
              key={index}
              style={{
                width: "14rem",
                height: "17rem",
                margin: "0.8rem",
                cursor: "pointer",
                backgroundColor: "#ce94ad",
                color: "white",
                borderRadius: "15%",
                marginLeft: "5.5rem",
                border: "none",
              }}
              onClick={() => {
                navigate(`/post/${post.id}`);
              }}
            >
              <Card.Img
                variant="top"
                src={post.better_featured_image?.source_url ?? cardImg}
                style={{
                  width: "100%",
                  maxHeight: "10rem",
                  borderTopLeftRadius: "15%",
                  borderTopRightRadius: "15%",
                }}
              />
              <Card.Body className="text-center">
                <Card.Title
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  style={{ fontSize: "24px" }}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CategoryPage;
