import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./layout.css";
import UserContext from "../UserContext";
import Header from "../components/header/Header";
import Navigation from "../components/navigation/Navigation";

/**
 * Takes care of overall layout and base structure for every page
 */
function BasicLayout({ children }) {
  const { user } = useContext(UserContext);

  return (
    <div className="App">
      <Header />
      {user && <Navigation />}
      <div className="background">
        <div className="container shadow">{children}</div>
      </div>
    </div>
  );
}

export default BasicLayout;
