import React, { useEffect, useState } from "react";
import "../../styles/Navbar.css";
import { getCategories } from "../../api";

const Navbar = () => {
  const [categories, setCategories] = useState([]);

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

  console.log(mainCategories);

  return (
    <div className="container">
      <div className="navbar navbar-expand-sm">
        <ul className="navbar-nav mx-auto">
          {mainCategories.map((item) => (
            <li className="nav-item category-main">
              <a
                className="nav-link dropdown-toggle mx-auto"
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
    </div>
  );
};

export default Navbar;
