import { useContext } from "react";
import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NotLoggedInPage from "./components/not-logged-in-page/NotLoggedInPage";
import LoggedInPage from "./components/logged-in-page/LoggedInPage";
import Auth from "./components/not-logged-in-page/Auth";
import Register from "./components/not-logged-in-page/Register";
import Profile from "./components/profile/Profile";
import UserContext from "./UserContext";
import ProtectedRoute from "./ProtectedRoute";
import ChangePassword from "./components/profile/ChangePassword";
import CategoryPage from "./components/post-page/CategoryPage";
import PostPage from "./components/post-page/PostPage";
import ForgotPassword from "./components/not-logged-in-page/ForgotPassword";
import ResetPassword from "./components/not-logged-in-page/ResetPassword";
import ConsentForm from "./components/ConsentForm";

function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {user && <Navigation />}
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
                path="/category/:id"
                element={
                  <ProtectedRoute>
                    <CategoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/post/:id"
                element={
                  <ProtectedRoute>
                    <PostPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/change-password"
                element={
                  <ProtectedRoute>
                    <ChangePasswordForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reset-password/:email/:token"
                element={<ResetPassword />}
              />
              <Route
                exact
                path="/forgot-password"
                element={<ForgotPassword />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
