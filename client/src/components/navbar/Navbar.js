import React, { useEffect, useState } from "react";
import "../../styles/Navbar.css"
import ListGroup from "react-bootstrap/ListGroup"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col"
import NavItem from "react-bootstrap/NavItem"
import { getCategories } from "../../api";

const Navbar_bar = () => {
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
    if(toggledCategory === toggledName){
      setToggledCategory("")
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
    })
    setChildOfMain(childOfMainCategories);
  }

  const handleSubCategoryClick = (categoryID) => {
    /* ska implementera funktionskod */
  }

  return (
    <Container>
      <Navbar className="justify-content-center pb-4">
        <ListGroup horizontal text-center>
          {mainCategories.map((item) => (
            <ListGroup.Item className="border-0 cat_item">
              <NavItem
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
            {childOfMain.map(item => (
              <Col 
                onClick={() => handleSubCategoryClick(item.id)}
                role="button"
                className="sub_cat_item"
                md="auto"
              >
                {item.name}
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default Navbar_bar;
