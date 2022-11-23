import "../../styles/Header.css";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";
import { useContext } from "react";
import React from "react";

function Header() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-1 border-bottom">
        <Link
          to="/home"
          className="d-flex align-items-center col-md-3 mb-2 text-dark text-decoration-none"
        >
          <svg
            xmlnsXlink="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-heart-pulse-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.475 9C2.702 10.84 4.779 12.871 8 15c3.221-2.129 5.298-4.16 6.525-6H12a.5.5 0 0 1-.464-.314l-1.457-3.642-1.598 5.593a.5.5 0 0 1-.945.049L5.889 6.568l-1.473 2.21A.5.5 0 0 1 4 9H1.475ZM.879 8C-2.426 1.68 4.41-2 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C11.59-2 18.426 1.68 15.12 8h-2.783l-1.874-4.686a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.88Z"
            />
          </svg>
          <span className="fs-4 m-2">ProMeno</span>
        </Link>
        {!user && (
          <div className="text-end">
            <button type="button" className="btn btn-outline-primary me-2">
              Logga in
            </button>
            <button type="button" className="btn btn-primary">
              Registrera
            </button>
          </div>
        )}
        {user && (
          <div className="text-end">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Konto
                <img src="../images/person.svg" alt="profile-logo"></img>
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
      </header>
    </div>
  );
}

export default Header;
