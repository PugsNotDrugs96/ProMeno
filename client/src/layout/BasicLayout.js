import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./layout.css";
import UserContext from "../UserContext";
import Container from "react-bootstrap/esm/Container";
import Header from "./Header";
import Footer from "../components/footer/Footer";

/**
 * Takes care of overall layout and base structure for every page
 */
function BasicLayout({ children }) {
  const { user } = useContext(UserContext);

  return (
    <>
      <Header />
      <div className="background">
        <Container className="contentContainer shadow">{children}</Container>
      </div>
      <Footer />
    </>
  );
}

export default BasicLayout;
