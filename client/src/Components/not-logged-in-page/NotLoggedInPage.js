import React from "react";
import { Link } from "react-router-dom";
import Hero from "../hero/Hero";

function NotLoggedInPage() {
  return (
    <div className="div_Homepage">
      <Hero />
      <Link to="/register" className="login_btn">
        <button type="button" class="btn btn-secondary">
          Registera{" "}
        </button>
      </Link>
      <Link to="/auth" className="singup_btn">
        <button type="button" class="btn btn-primary">
          Logga in
        </button>
      </Link>
    </div>
  );
}

export default NotLoggedInPage;
