import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostsByCategory, getCategoryBySlug } from "../../api/api";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import PostCard from "./PostCard";
import Breadcrumbs from "../navigation/Breadcrumbs.js";
import ErrorAlert from "../ErrorAlert";

function PostCardPage() {
  const params = useParams();
  const { subCategorySlug } = params;
  const [posts, setPosts] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const category = await getCategoryBySlug(subCategorySlug);
        const posts = await getPostsByCategory(subCategorySlug);
        setPosts(posts);
        setSubCategory(category);
        setLoading(false);
      } catch (err) {
        console.warn(err);
        setError(true);
      }
    }
    fetchData();
  }, [subCategorySlug]);

  if (error) {
    return <ErrorAlert type="article" />;
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

  if (!posts || !subCategory) return null;

  return (
    <Container className="content">
      <Breadcrumbs />
      <Col className="subColBody">
        <div className="text-center">
          <h1 className="display-8 fw-bold">{subCategory.name}</h1>
          <h5>{subCategory.description}</h5>
        </div>
      </Col>
      <Col className="subColBody">
        <Row align="center">
          {posts.map((post, index) => (
            <Col key={index}>
              <PostCard
                post={post}
                mainCategorySlug={params.mainCategorySlug}
                subCategorySlug={params.subCategorySlug}
              />
            </Col>
          ))}
          <Col>
            <div className="fillerCol"></div>
          </Col>
          <Col>
            <div className="fillerCol"></div>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default PostCardPage;
