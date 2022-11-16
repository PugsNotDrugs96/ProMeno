import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostsByCategory } from "../../api/api";
import Card from "react-bootstrap/Card";
import cardImg from "../../assets/card-image.png";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";

function CategoryPage() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const posts = await getPostsByCategory(id);
      setPosts(posts);
    }
    fetchData();
  }, [id]);

  if (!posts) return null;

  return (
    <Container>
      <Row>
        {posts.map((post, index) => (
          <Card
            key={index}
            style={{
              width: "14rem",
              margin: "0.8rem",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(`/post/${post.id}`);
            }}
          >
            <Card.Img variant="top" src={cardImg} />
            <Card.Body>
              <Card.Title
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <Card.Text>Beginning of post</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}

export default CategoryPage;