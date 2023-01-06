import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignedOutPage from "../components/signed-out-page/SignedOutPage";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../components/homePage/HomePage";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Profile from "../components/profile/Profile";
import PostPage from "../components/post-page/PostPage";
import ChangePassword from "../components/form/ChangePassword";
import ResetPassword from "../components/form/ResetPassword";
import ForgotPassword from "../components/form/ForgotPassword";
import RemoveAccount from "../components/removeAccount/RemoveAccount";
import BasicLayout from "../layout/BasicLayout";
import PostCardPage from "../components/post-card-page/PostCardPage";
import SubCategoryPage from "../components/categories/SubCategoryPage";
import CodeValidatorForm from "../components/register/CodeValidatorForm";
import ScrollToTop from "../components/helpers/ScrollToTop";

function Router() {
  return (
    <BrowserRouter>
      <BasicLayout>
        <ScrollToTop />
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
          <Route path="/code" element={<CodeValidatorForm />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:mainCategorySlug/:subCategorySlug"
            element={
              <ProtectedRoute>
                <PostCardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:mainCategorySlug"
            element={
              <ProtectedRoute>
                <SubCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:mainCategorySlug/:subCategorySlug/:slug"
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
          <Route exact path="/research/:slug" element={<PostPage />} />
        </Routes>
      </BasicLayout>
    </BrowserRouter>
  );
}

export default Router;
