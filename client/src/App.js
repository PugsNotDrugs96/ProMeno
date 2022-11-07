import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NotLoggedInPage from "./components/not-logged-in-page/NotLoggedInPage";
import LoggedInPage from "./components/logged-in-page/LoggedInPage";
import Auth from "./components/not-logged-in-page/Auth";
import Register from "./components/not-logged-in-page/Register";
import Profile from "./components/profile/Profile";
import Content from "./components/logged-in-page/Content";

function App() {
  return (
    <div className="App">
      <Header isLoggedIn={true} />
      <Navbar />
      <div className="background">
        <div className="container shadow">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NotLoggedInPage />} />
              <Route path="/home" element={<LoggedInPage />} /> {/*man ska inte kunna gå in på inloggat läge direkt från URL */}
              <Route path="/Auth" element={<Auth />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Content" element={<Content />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
