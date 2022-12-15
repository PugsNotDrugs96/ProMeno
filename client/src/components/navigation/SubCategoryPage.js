import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../../api/api";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import Breadcrumbs from "./Breadcrumbs.js";

function SubCategoryPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { mainCategorySlug } = params;
  const [categories, setCategories] = useState(null);
  var pixels = window.innerWidth;

  useEffect(() => {
    async function fetchData() {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchData();
  }, []);

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
    <Container>
      <Breadcrumbs />
      <Row>
        <Col>
          <Container className="text-center">
            <h1 className="display-8 fw-bold">{category[0].name}</h1>
            <p>{category[0].description}</p>
          </Container>
        </Col>
        <Col md={5}>
          <div className="d-grid gap-2">
            {childCategories.map((item, index) => (
              <Button
                onClick={() => handleClick(item.slug)}
                size="lg"
                className="my-2 py-3">
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
