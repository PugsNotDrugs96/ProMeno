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
import { UserProvider } from "./UserContext";
import ProtectedRoute from "./ProtectedRoute";
import ChangePasswordForm from "./components/profile/ChangePasswordForm";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
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
                <Route
                  path="/password/change"
                  element={
                    <ProtectedRoute>
                      <ChangePasswordForm />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
