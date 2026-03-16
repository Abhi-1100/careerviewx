import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Mentors from "./pages/Mentors";
import CareerPaths from "./pages/CareerPaths";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import AssessmentsQuest from "./pages/Assessments";
import AssessmentsHub from "./pages/AssessmentsHub";
import AssessmentResult from "./pages/AssessmentResult";
import NotFound from "./pages/NotFound";

function App() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-charcoal text-white" : "bg-surface-light text-charcoal"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/career-paths" element={<CareerPaths />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/assessments" element={<AssessmentsHub />} />
          <Route path="/assessments/quest" element={<AssessmentsQuest />} />
          <Route path="/assessments/result" element={<AssessmentResult />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
