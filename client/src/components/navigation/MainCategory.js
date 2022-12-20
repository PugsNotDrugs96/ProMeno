import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";

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
      <div className="d-grid gap-2">
        {mainCategories.map((item, index) => (
          <Button
          onClick={() => handleClick(item)}
          size="lg"
          className="my-2 py-3">
            {item.name}
          </Button>
        ))}
      </div>
    </Container>
  );
}

export default MainCategory;
