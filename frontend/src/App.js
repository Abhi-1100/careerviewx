import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import LoadingScreen from "./components/LoadingScreen";

import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Mentors = lazy(() => import("./pages/Mentors"));
const CareerPaths = lazy(() => import("./pages/CareerPaths"));
const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(() => import("./pages/Profile"));
const Assessment = lazy(() => import("./pages/Assessment"));
const AssessmentsHub = lazy(() => import("./pages/AssessmentsHub"));
const CareerResult = lazy(() => import("./pages/CareerResult"));
const CareerPage = lazy(() => import("./pages/CareerPage"));
const AllCareers = lazy(() => import("./pages/AllCareers"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-background-dark text-slate-100" : "bg-background-light text-slate-900"}`}>
        <Suspense fallback={<LoadingScreen message="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/career-paths" element={<ProtectedRoute><CareerPaths /></ProtectedRoute>} />
            <Route path="/mentors" element={<ProtectedRoute><Mentors /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/assessments" element={<ProtectedRoute><AssessmentsHub /></ProtectedRoute>} />
            <Route path="/assessments/quest" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
            <Route path="/assessments/result" element={<ProtectedRoute><CareerResult /></ProtectedRoute>} />
            <Route path="/career/:id" element={<ProtectedRoute><CareerPage /></ProtectedRoute>} />
            <Route path="/all-careers" element={<ProtectedRoute><AllCareers /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}


export default App;
