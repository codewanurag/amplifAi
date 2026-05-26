import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./layouts/AppShell";
import LandingPage from "./pages/LandingPage";
import { ForgotPasswordPage, LoginPage, SignupPage } from "./pages/AuthPages";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import {
  CaptionGeneratorPage,
  HashtagGeneratorPage,
  IdeaGeneratorPage,
  RepurposePage,
  ScriptGeneratorPage,
  ViralityAnalyzerPage,
} from "./pages/StudioPages";
import { AnalyticsPage, BestTimePage, CalendarPage, InsightsPage, TrendsPage } from "./pages/IntelligencePages";
import { BrandMemoryPage, DraftWorkspacePage, PlatformPreviewPage, RoastContentPage, SettingsPage } from "./pages/WorkspacePages";
import { useAuth } from "./context/AuthContext";
import { LoadingState } from "./components/ui";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="mx-auto max-w-lg p-8"><LoadingState /></div>;
  return user ? children : <Navigate replace to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/app" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="ideas" element={<IdeaGeneratorPage />} />
        <Route path="scripts" element={<ScriptGeneratorPage />} />
        <Route path="repurpose" element={<RepurposePage />} />
        <Route path="captions" element={<CaptionGeneratorPage />} />
        <Route path="hashtags" element={<HashtagGeneratorPage />} />
        <Route path="virality" element={<ViralityAnalyzerPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="trends" element={<TrendsPage />} />
        <Route path="best-time" element={<BestTimePage />} />
        <Route path="previews" element={<PlatformPreviewPage />} />
        <Route path="drafts" element={<DraftWorkspacePage />} />
        <Route path="brand" element={<BrandMemoryPage />} />
        <Route path="roast" element={<RoastContentPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
