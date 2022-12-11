import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

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
    <div>
      {mainCategories.map((item, index) => (
        <Row>
          <Col>
            <Button
              className={` mt-5 ${pixels < 576 ? "w-90" : "w-75"} h-75`}
              onClick={() => handleClick(item)}
            >
              {item.name}
            </Button>
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default MainCategory;
