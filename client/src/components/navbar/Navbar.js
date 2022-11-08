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
    <div className="container">
      <Navbar className="justify-content-center">
        <ListGroup horizontal text-center>
          {mainCategories.map((item) => (
            <ListGroup.Item className="border-0">
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
        <Container>
          <Navbar className="justify-content-center">
            <ListGroup horizontal text-center className="justify-content-center">
            <Row>
                {childOfMain.map(item => (
                  <Col xs={6} md={4} lg={3}>
                  <ListGroup.Item size="xl" className="border-0 sub_cat_item">
                    <NavItem 
                      onClick={() => handleSubCategoryClick(item.id)}
                      role="button"
                    >
                      {item.name}
                    </NavItem>
                  </ListGroup.Item>
                  </Col>
                ))}
            </Row>
            </ListGroup>
          </Navbar>
        </Container>
      )}
    </div>
  );
};

export default Navbar_bar;
