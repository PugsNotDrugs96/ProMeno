import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { getCategories } from "../api";

/*
This is an example class to render many categories from WP
*/
const Category = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchData();
  }, []);

  if (!categories) return null;

  return (
    <Container>
      {categories.map((category, index) => (
        <Card key={index}>
          <p>{category.id}</p>
          <p>{category.name}</p>
        </Card>
      ))}
    </Container>
  );
};
export default Category;
