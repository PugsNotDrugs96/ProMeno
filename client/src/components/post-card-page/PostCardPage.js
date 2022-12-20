import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostsByCategory, getCategoryBySlug } from "../../api/api";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import PostCard from "./PostCard";
import Breadcrumbs from "../navigation/Breadcrumbs.js";

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

  console.log(posts);

  if (!posts || !subCategory) return null;

  return (
    <Container>
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
              <Col>
                <PostCard
                  index={index}
                  post={post}
                  mainCategorySlug={params.mainCategorySlug}
                  subCategorySlug={params.subCategorySlug}
                />
              </Col>
            ))}
            <Col><div className="fillerCol"></div></Col>
            <Col><div className="fillerCol"></div></Col>
          </Row>
        </Col>
      </Container>
  );
}

export default PostCardPage;
