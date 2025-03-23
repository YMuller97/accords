import "./styles/App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import Conversation from "./components/Conversation/Conversation";
import RegisterForm from "./components/Register/RegisterForm";
import { Routes, Route, useParams, Navigate, useLocation } from "react-router-dom";
import ProfileForm from "./pages/Profile/ProfileForm";
import VisitedProfile from "./pages/VisitedProfile/VisitedProfile";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import CGU from "./pages/CGU/CGU";
import PolConfidentialite from "./pages/PolConfidentialite/PolConfidentialite";
import PolCookies from "./pages/PolCookies/PolCookies";

const ProfileComponentWrapper = () => {
  const { userId } = useParams();
  return <VisitedProfile userId={userId} />;
};

const ProtectedRoute = ({ children }) => {
  const { isLogged } = useContext(AuthContext);
  const location = useLocation();
  
  if (!isLogged) {
    // Rediriger vers la page d'accueil tout en mémorisant d'où on vient
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return children;
};

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/conditions-generales" element={<CGU />} />
        <Route path="/politique-de-confidentialite" element={<PolConfidentialite />} />
        <Route path="/politique-des-cookies" element={<PolCookies />} />
        <Route path="/msg" element={
          <ProtectedRoute>
            <Conversation />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profileForm" element={
          <ProtectedRoute>
            <ProfileForm />
          </ProtectedRoute>
        } />
        <Route path="/profil/:userId" element={<ProfileComponentWrapper />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
