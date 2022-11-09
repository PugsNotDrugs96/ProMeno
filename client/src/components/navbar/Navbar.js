import React, { useContext, useEffect, useState } from "react";
import "../../styles/Navbar.css";
import { getCategories } from "../../api/api";
import UserContext from "../../UserContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(UserContext);
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

  return (
    <>
      {user ? (
        <div className="container">
          <div className="navbar navbar-expand-sm">
            <ul className="navbar-nav mx-auto">
              {mainCategories.map((item) => (
                <li className="nav-item category-main">
                  <a
                    className="nav-link dropdown-toggle mx-auto"
                    onClick={() => handleToggle(item.id, item.name)}
                    href="/"
                    role="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {toggle && (
            <ul className="navbar-nav align-items-center">
              <div className="navbar navbar-expand-sm">
                <div className="row">
                  {childOfMain.map((element) => (
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <li className="category-second">
                        <Link
                          className="dropdown-item"
                          to={`/category/${element.id}`}
                        >
                          {element.name}
                        </Link>
                      </li>
                    </div>
                  ))}
                </div>
              </div>
            </ul>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
