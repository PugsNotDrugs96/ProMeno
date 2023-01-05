import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Image } from "react-bootstrap";
import Lotus from "../../assets/lotus.svg";
import UserContext from "../../UserContext";

function Header() {
  const { user, setUser } = useContext(UserContext);
  const logoLink = user ? "./home" : "/";

  return (
    <Navbar id="headnav" className="shadow">
      <Container id="headContainer">
        <Link to={logoLink} className="d-inline-block align-top">
          <Navbar.Brand className="d-inline-block align-top">
            <Image
              className="mb-2"
              alt=""
              src={Lotus}
              width="50px"
              height="50px"
            />
            <span className="fs-5">ProMeno</span>
          </Navbar.Brand>
        </Link>

        {user && (
          <div className="text-end">
            <div className="btn-group">
              <button
                type="button"
                className="btn login-button dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  id="profile-logo"
                  src="../images/person.svg"
                  alt="profile-logo"
                  width="30px"
                ></img>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/Profile">
                    Mina sidor
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => {
                      localStorage.removeItem("key");
                      setUser(null);
                    }}
                    to="/"
                  >
                    Logga ut
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
