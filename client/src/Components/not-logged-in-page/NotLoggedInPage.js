import React from "react";
import Hero from "../hero/Hero";

function NotLoggedInPage() {
  return <Hero isLoggedIn={false} />;
}

export default NotLoggedInPage;
