import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignedOutPage from "../components/signed-out-page/SignedOutPage";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../components/homePage/HomePage";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Profile from "../components/profile/Profile";
import CategoryPage from "../components/post-page/CategoryPage";
import PostPage from "../components/post-page/PostPage";
import ChangePassword from "../components/profile/ChangePassword";
import ResetPassword from "../components/login/ResetPassword";
import ForgotPassword from "../components/login/ForgotPassword";
import RemoveAccount from "../components/profile/RemoveAccount";
import BasicLayout from "../layout/BasicLayout";
import AboutUs from "../components/footer/AboutUs"

function Router() {
  return (
    <BrowserRouter>
      <BasicLayout>
        <Routes>
          <Route path="/" element={<SignedOutPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:slug"
            element={
              <ProtectedRoute>
                <CategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:slug"
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
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password/:email/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/delete-account"
            element={
              <ProtectedRoute>
                <RemoveAccount />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BasicLayout>
    </BrowserRouter>
  );
}

export default Router;
