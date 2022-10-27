import React from "react";
import Hero from "../hero/Hero";
import Content from "./Content";

const LoggedInPage = () => {
  return (
    <>
      <Hero isLoggedIn={true} />
      <Content />
    </>
  );
};
export default LoggedInPage;