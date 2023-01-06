import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Container, Button, Spinner } from "react-bootstrap";
import ErrorAlert from "../error-alert/ErrorAlert";

function MainCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
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
          position: "fixed",
          top: "40%",
          left: "65%",
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
            style={{ width: "100%" }}
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
