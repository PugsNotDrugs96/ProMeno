import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NotLoggedInPage from "./components/not-logged-in-page/NotLoggedInPage";
import LoggedInPage from "./components/logged-in-page/LoggerInPage";
import Auth from "./components/not-logged-in-page/Auth";
import Register from "./components/not-logged-in-page/Register";

function App() {
  return (
    <div className="App">
      <Header isLoggedIn={true} />
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<NotLoggedInPage />} />
          <Route path="/home" element={<LoggedInPage />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
