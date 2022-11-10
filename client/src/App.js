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
import { UserProvider } from "./UserContext";
import ProtectedRoute from "./ProtectedRoute";
import ChangePasswordForm from "./components/profile/ChangePasswordForm";
import CategoryPage from "./components/post-page/CategoryPage";
import PostPage from "./components/post-page/PostPage";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <Header />
          <Navigation />
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
