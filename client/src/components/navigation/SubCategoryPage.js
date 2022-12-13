import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../../api/api";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

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
      <Row p-5 xs={12} md={6}>
        <Col md={7}>
          <h1>{category[0].name}</h1>
          <h2>{category[0].description}</h2>
        </Col>
        <Col mx-auto md={5}>
          {childCategories.map((item, index) => (
            <Row>
              <Col>
                <Button
                  className={` mt-5 ${pixels < 576 ? "w-90" : "w-75"} h-75`}
                  onClick={() => handleClick(item.slug)}
                >
                  {item.name}
                </Button>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default SubCategoryPage;
