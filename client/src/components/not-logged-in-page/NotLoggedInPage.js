import React from "react";
import Hero from "../Hero/Hero";

function NotLoggedInPage() {
  return <Hero isLoggedIn={false} />;
}

export default NotLoggedInPage;
