import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContextComponent } from "./contexts/authContext";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import GuestErrorPage from "./pages/GuestErrorPage";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ActivateAccountPage from "./pages/ActivateAccountPage";
import CreateQuizPage from "./pages/CreateQuizPage";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import About from "./pages/About";

function App() {
  return (
    <div className="App">
      <Toaster />
      <AuthContextComponent>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/activate-account/:userId"
            element={<ActivateAccountPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={<ProtectedRoute Component={ProfilePage} />}
          />
          <Route
            path="/create-quiz"
            element={<ProtectedRoute Component={CreateQuizPage} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/guest-error" element={<GuestErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </AuthContextComponent>
    </div>
  );
}

export default App;
