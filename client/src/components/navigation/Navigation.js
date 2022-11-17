import React, { useEffect, useState } from "react";
import "../../styles/Navigation.css";
import ListGroup from "react-bootstrap/ListGroup";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavItem from "react-bootstrap/NavItem";
import { getCategories } from "../../api/api";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [toggledCategory, setToggledCategory] = useState("");
  const [childOfMain, setChildOfMain] = useState("");

  useEffect(() => {
    async function fetchData() {
      const categories = await getCategories();
      setCategories(categories);
    }
    fetchData();
  }, []);

  if (!categories) return null;

  const mainCategories = categories.filter((category) => !category.parent);
  const childCategories = categories.filter((category) => category.parent);

  const handleToggle = (parentID, toggledName) => {
    if (toggledCategory === toggledName) {
      setToggledCategory("");
      setToggle(false);
    } else {
      setToggledCategory(toggledName);
      setToggle(true);
    }

    let childOfMainCategories = [];

    childCategories.forEach((element) => {
      if (element.parent === parentID) {
        childOfMainCategories.push(element);
      }
    });
    setChildOfMain(childOfMainCategories);
  };

  const handleSubCategoryClick = (id) => {
    navigate(`/category/${id}`);
  };

  return (
    <Container>
      <Navbar className="justify-content-center pb-4">
        <ListGroup horizontal text-center>
          {mainCategories.map((item, index) => (
            <ListGroup.Item className="border-0 cat_item" key={index}>
              <NavItem
                className={`on_hover ${
                  item.name === toggledCategory ? "main_cat_selected" : ""
                }`}
                onClick={() => handleToggle(item.id, item.name)}
                href="/"
                role="button"
                data-bs-toggle="collapse"
                aria-expanded="false"
              >
                {item.name}
              </NavItem>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Navbar>
      {toggle && (
        <Container className="justify-content-center">
          <Row className="justify-content-center">
            {childOfMain.map((category, index) => (
              <Col
                onClick={() => handleSubCategoryClick(category.id)}
                role="button"
                key={index}
                className="sub_cat_item on_hover"
                md="auto"
              >
                {category.name}
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
}

export default Navigation;
