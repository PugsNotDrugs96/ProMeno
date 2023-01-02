import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../../api/api";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import ErrorAlert from "../ErrorAlert";

function SubCategoryPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { mainCategorySlug } = params;
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const categories = await getCategories();
        setCategories(categories);
        setLoading(false);
      } catch (err) {
        console.warn(err);
        setError(true);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <ErrorAlert type="categories" />;
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

  if (!categories) return null;

  const category = categories.filter(
    (category) => category.slug === mainCategorySlug
  );
  const childCategories = categories.filter(
    (categories) => categories.parent === category[0].id
  );

  const handleClick = (subCategorySlug) => {
    navigate(`/${mainCategorySlug}/${subCategorySlug}`);
  };

  return (
    <Container className="content">
      <Row>
        <Col>
          <div className="text-center">
            <h1 className="display-8 fw-bold">{category[0].name}</h1>
            <h5>{category[0].description}</h5>
          </div>
        </Col>
        <Col md={5}>
          <div className="d-grid gap-2">
            {childCategories.map((item, index) => (
              <Button
                key={index}
                onClick={() => handleClick(item.slug)}
                size="lg"
                className="my-2 py-3"
              >
                {item.name}
              </Button>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SubCategoryPage;
