import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./Category.css";

function MainCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  var pixels = window.innerWidth;

  useEffect(() => {
    async function fetchData() {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchData();
  }, []);

  if (!categories) return null;

  const mainCategories = categories.filter((category) => !category.parent);

  const handleClick = (item) => {
    navigate(`/${item.slug}`);
  };

  return (
    <Container>
      <Row>
        {mainCategories.map((item, index) => (
          <Col>
            <Button 
            onClick={() => handleClick(item)}
            size="lg"
            className="test"
            >
              {item.name}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>

    /*
    <div>
      {mainCategories.map((item, index) => (
        <Row>
          <Col style={{ position: "relative" }}>
            <Button
              className={`mx-5 mt-4 h-75 ${pixels < 576 ? "w-90" : "w-75"}`}
              align="center"
              onClick={() => handleClick(item)}
            >
              {item.name}
            </Button>
          </Col>
        </Row>
      ))}
    </div>*/
  );
}

export default MainCategory;
