import Navbar from "./Components/navbar/Navbar";
import Header from "./Components/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NotLoggedInPage from "./Components/not-logged-in-page/NotLoggedInPage";
import LoggedInPage from "./Components/logged-in-page/LoggedInPage";
import Auth from "./Components/not-logged-in-page/Auth";
import Register from "./Components/not-logged-in-page/Register";

function App() {
  return (
    <div className="App">
      <Header isLoggedIn={true} />
      <Navbar />
      <div className="background pt-2 shadow">
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NotLoggedInPage />} />
              <Route path="/home" element={<LoggedInPage />} /> {/*man ska inte kunna gå in på inloggat läge direkt från URL */}
              <Route path="/Auth" element={<Auth />} />
              <Route path="/Register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
