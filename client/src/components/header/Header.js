import { Link } from "react-router-dom";
import UserContext from "../../UserContext";
import { useContext } from "react";
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Lotus from "../../assets/lotus.svg";

function Header() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <Navbar>
        <Container>
          <Link to="/home" className="d-inline-block align-top">
            <Navbar.Brand className="d-inline-block align-top">
              <Image alt="" src={Lotus} width="50px" height="50px" /> ProMeno
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
                  ></img>
                </button>
                <ul className="dropdown-menu">
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
