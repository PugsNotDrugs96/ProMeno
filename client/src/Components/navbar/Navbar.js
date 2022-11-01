import React, { useEffect, useState } from "react";
import "../../styles/Navbar.css";
import {getCategories} from "../../api"

const Navbar = () => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [categories, setCategories] = useState([]);  
  const [mainCategories, setMainCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
    
  const handleClick1 = () => {
    if (toggle2) {
      setToggle2(!toggle2);
    }
    setToggle1(!toggle1);
  };

/*   const handleClick2 = () => {
    if (toggle1) {
      setToggle1(!toggle1);
    }
    setToggle2(!toggle2);
  }; */

     useEffect(() => {
      async function fetchData() {
        const categories = await getCategories();
        for(let i = 0; i < categories.length; i++){
          if(categories[i].parent === 0) {
            mainCategories.push(categories[i].name);
          } else {
            childCategories.push(categories[i].name);
          }
        }
      setCategories(categories);
      console.log(mainCategories.length);
      }
      fetchData();
    }, []) 

/*   async function fetchData(){
    const categories = await getCategories();
    const newThing = categories.map(item =>{
      if(item.parent === 0) {
        setMainCategories((prevState) => {
          return [item.name, ...prevState]
        })
      } else {
        setChildCategories((prevState) => {
          return [item.name, ...prevState]
        })
      }
    })
    console.log(mainCategories.length);
  }

  fetchData(); */

/*   function getMainCategories(){
    let mainCat = [];
    categories.forEach(element => {
      if(element.parent === 0){
        mainCat.push(element.name)
      } else {
        mainCat.push(element.name)
      }
    })
    return mainCat;
  } */

  console.log(categories)

  return (
    <div className="container">
      <div className="navbar navbar-expand-sm">
        <ul className="navbar-nav mx-auto">
        {mainCategories.map((item) => (
          <li className="nav-item category-main">
            <a
              className="nav-link dropdown-toggle mx-auto"
              onClick={handleClick1}
              href="/"
              role="button"
              data-bs-toggle="collapse"
              aria-expanded="false"
            >
              {item}
            </a>
          </li>
        ))}
          {/* <li className="nav-item category-main">
            <a
              className="nav-link dropdown-toggle mx-auto"
              onClick={handleClick1}
              href="/"
              role="button"
              data-bs-toggle="collapse"
              aria-expanded="false"
            >
              Symptom
            </a>
          </li>
          <li className="nav-item category-main">
            <a
              className="nav-link dropdown-toggle mx-auto"
              onClick={handleClick2}
              href="/"
              role="button"
              data-bs-toggle="collapse"
              aria-expanded="false"
            >
              Behandlingar
            </a>
          </li> */}
        </ul>
      </div>
      {toggle1 && (
        <ul className="navbar-nav align-items-center">
          <div className="navbar navbar-expand-sm">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-6">
                <li className="category-second">
                  <a className="category-second" href="/">
                    Symptom 1
                  </a>
                </li>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <li className="category-second">
                  <a className="category-second" href="/">
                    Symptom 2
                  </a>
                </li>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <li className="category-second">
                  <a className="category-second" href="/">
                    Symptom 3
                  </a>
                </li>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <li className="category-second">
                  <a className="category-second" href="/">
                    Symptom 4
                  </a>
                </li>
              </div>
            </div>
          </div>
        </ul>
      )}
      {toggle2 && (
        <ul className="navbar-nav align-items-center">
          <div className="navbar navbar-expand-sm">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-6">
                <li className="category-second">
                  <a className="category-second" href="/">
                    Behandling 1
                  </a>
                </li>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <li className="category-second">
                  <a className="category-second" href="/">
                    Behandling 2
                  </a>
                </li>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <li className="category-second">
                  <a className="category-second" href="/">
                    Behandling 3
                  </a>
                </li>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <li className="category-second">
                  <a className="category-second" href="/">
                    Behandling 4
                  </a>
                </li>
              </div>
            </div>
          </div>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
