import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Container, Button, Spinner } from "react-bootstrap";

function MainCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const categories = await getCategories();
      setCategories(categories);
      setLoading(false);
    }
    fetchData();
  }, []);

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

  const mainCategories = categories.filter((category) => !category.parent);

  const handleClick = (item) => {
    navigate(`/${item.slug}`);
  };

  return (
    <Container>
      <div className="d-grid gap-2">
        {mainCategories.map((item, index) => (
          <Button
            key={index}
            onClick={() => handleClick(item)}
            size="lg"
            className="my-2 py-3"
          >
            {item.name}
          </Button>
        ))}
      </div>
    </Container>
  );
}

export default MainCategory;
