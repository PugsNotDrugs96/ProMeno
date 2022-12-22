import "bootstrap/dist/css/bootstrap.min.css";
import "./layout.css";
import Container from "react-bootstrap/esm/Container";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import GoBackBtn from "../components/navigation/GoBackBtn";
import Breadcrumbs from "../components/navigation/Breadcrumbs";

/**
 * Takes care of overall layout and base structure for every page
 */
function BasicLayout({ children }) {
  return (
    <>
      <Header />
      <div className="background">
        <Container className="contentContainer shadow">
          <Breadcrumbs />
          <GoBackBtn />
          {children}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default BasicLayout;
