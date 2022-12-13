import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext } from "react";
import React from "react";
import Navbar from "react-bootstrap/esm/Navbar"
import Container from "react-bootstrap/esm/Container"
import Image from "react-bootstrap/esm/Image"
import Lotus from "../assets/lotus.svg"

function Header() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand
            href="/"
            className="d-inline-block align-top">
            <Image
              alt=""
              src={Lotus}
              width="50px"
              height="50px"
            />{' '}
            ProMeno
          </Navbar.Brand>

          {user && (
            <div className="text-end">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn login-button btn-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img id="profile-logo" src="../images/person.svg" alt="profile-logo"></img>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/Profile">
                      Profil
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => {
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
    </>
  );
}

export default Header;
