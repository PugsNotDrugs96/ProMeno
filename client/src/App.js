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
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Header isLoggedIn={true} />
          <Navbar />
          <div className="background">
            <div className="container shadow">
              <Routes>
                <Route path="/" element={<NotLoggedInPage />} />
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <LoggedInPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Auth />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
