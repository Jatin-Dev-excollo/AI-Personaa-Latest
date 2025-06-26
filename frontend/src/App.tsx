import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Discovery from "./pages/Discovery";
import ChatPage from "./pages/ChatPage";
import { mockPersonas } from "./data/mockData";
import type { Persona } from "./types";
import ChatHistoryPage from "./pages/ChatHistoryPage";
import SettingsPage from "./pages/SettingsPage";
import PersonaSelectorPage from "./pages/PersonaSelectorPage";
import ViewPersonaPage from "./pages/ViewPersonaPage";
import AuthPage from "./pages/AuthPage";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import VerifyOtpPage from "./pages/VerifyOtpPage";
// import ResetPasswordPage from "./pages/ResetPasswordPage";
// import TwoFactorAuthPage from "./pages/TwoFactorAuthPage";
import RegisterPage from "./pages/RegisterPage";

// Auth guard for protected routes
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

// Wrapper to use hooks in routed components
const DiscoveryWithNav: React.FC = () => {
  const navigate = useNavigate();
  const handleStartChat = (persona: Persona) => {
    navigate(`/chat/${persona.id}`);
  };
  return <Discovery onStartChat={handleStartChat} />;
};

const ChatPageWithParams: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const persona = mockPersonas.find((p) => p.id === id) || mockPersonas[0];
  return <ChatPage persona={persona} onBack={() => navigate("/")} />;
};

const ViewPersonaPageWithParams: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const persona = mockPersonas.find((p) => p.id === id) || mockPersonas[0];
  return <ViewPersonaPage persona={persona} />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <DiscoveryWithNav />
          </RequireAuth>
        } />
        <Route path="/chat/:id" element={
          <RequireAuth>
            <ChatPageWithParams />
          </RequireAuth>
        } />
        <Route path="/chat-history" element={<ChatHistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/persona-selector" element={<PersonaSelectorPage />} />
        <Route path="/view-persona/:id" element={<ViewPersonaPageWithParams />} />
        {/* Auth routes */}
        {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/2fa" element={<TwoFactorAuthPage />} /> */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
