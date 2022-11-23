import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotLoggedInPage from "../components/not-logged-in-page/NotLoggedInPage";
import ProtectedRoute from "./ProtectedRoute";
import LoggedInPage from "../components/logged-in-page/LoggedInPage";
import Auth from "../components/not-logged-in-page/Auth";
import Register from "../components/not-logged-in-page/Register";
import Profile from "../components/profile/Profile";
import CategoryPage from "../components/post-page/CategoryPage";
import PostPage from "../components/post-page/PostPage";
import ChangePassword from "../components/profile/ChangePassword";
import ResetPassword from "../components/not-logged-in-page/ResetPassword";
import ForgotPassword from "../components/not-logged-in-page/ForgotPassword";
import DeleteAccount from "../components/DeleteAccount";
import BasicLayout from "../layout/BasicLayout";

function Router() {
  return (
    <BrowserRouter>
      <BasicLayout>
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
                <DeleteAccount />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BasicLayout>
    </BrowserRouter>
  );
}

export default Router;
