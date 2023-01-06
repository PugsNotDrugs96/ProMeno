import "bootstrap/dist/css/bootstrap.min.css";
import "./layout.css";
import Container from "react-bootstrap/esm/Container";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import GoBackBtn from "../components/navigation/go-back-btn/GoBackBtn";
import { useLocation } from "react-router-dom";

/**
 * Takes care of overall layout and base structure for every page
 */
function BasicLayout({ children }) {
  const path = useLocation().pathname;
  const showBackBtn = path !== "/home" && path !== "/";

  return (
    <>
      <Header />
      <div className="background">
        <Container className="contentContainer">
          {showBackBtn && <GoBackBtn />}
          {children}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default BasicLayout;
