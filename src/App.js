import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/career-paths" element={<ProtectedRoute><CareerPaths /></ProtectedRoute>} />
          <Route path="/mentors" element={<ProtectedRoute><Mentors /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/assessments" element={<ProtectedRoute><AssessmentsHub /></ProtectedRoute>} />
          <Route path="/assessments/quest" element={<ProtectedRoute><AssessmentsQuest /></ProtectedRoute>} />
          <Route path="/assessments/result" element={<ProtectedRoute><AssessmentResult /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
 

export default App;
