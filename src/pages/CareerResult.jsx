import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCareerByName } from "../Services/api";
import InternalNavbar from "../components/InternalNavbar";

const CareerResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendedCareer } = location.state || {};
  
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!recommendedCareer) {
      setError("No career recommendation found. Please complete the assessment first.");
      setLoading(false);
      return;
    }

    const fetchCareerDetails = async () => {
      try {
        setLoading(true);
        const response = await getCareerByName(recommendedCareer);
        
        if (response.data.success) {
          setCareer(response.data.career);
          setError(null);
        } else {
          setError("Failed to load career details. Please try again.");
        }
      } catch (err) {
        console.error("Error fetching career:", err);
        setError("Error loading career details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCareerDetails();
  }, [recommendedCareer]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark text-white font-display">
        <InternalNavbar />
        <main className="flex flex-1 justify-center items-center py-12 px-4 h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="text-white text-lg">Loading career details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="min-h-screen bg-background-dark text-white font-display">
        <InternalNavbar />
        <main className="flex flex-1 justify-center items-center py-12 px-4 h-screen">
          <div className="text-center">
            <p className="text-red-400 text-lg">{error || "Career not found"}</p>
            <button
              onClick={() => navigate("/assessments")}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
            >
              Take Assessment Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <InternalNavbar />

      <main className="flex flex-1 justify-center py-12 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="layout-content-container flex flex-col max-w-4xl flex-1 gap-6">
          {/* Hero Section */}
          <div className="glass-card rounded-xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 capitalize relative z-10">
              {career.careerName}
            </h1>
            <p className="text-[#a59cba] text-lg md:text-xl leading-relaxed relative z-10">
              {career.description}
            </p>

            <button className="mt-8 px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all relative z-10">
              <span className="material-symbols-outlined inline mr-2 text-xl">event</span>
              Book Mentor Session
            </button>
          </div>

          {/* Skills Section */}
          <div className="glass-card rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">manage_accounts</span>
              Skills Required
            </h2>
            <div className="flex flex-wrap gap-3">
              {career.skillsRequired.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-primary/20 border border-primary/50 text-primary rounded-full text-sm font-medium hover:bg-primary/30 transition-all"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap Section */}
          <div className="glass-card rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">route</span>
              Career Roadmap
            </h2>
            <div className="space-y-4">
              {career.roadmap.map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-grow pt-1">
                    <p className="text-white text-base leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Entrance Exams Section */}
            <div className="glass-card rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">school</span>
                Entrance Exams
              </h2>
              <ul className="space-y-3">
                {career.exams.map((exam, index) => (
                  <li key={index} className="flex items-center gap-3 text-[#a59cba]">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    <span>{exam}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Salary Range Section */}
            <div className="glass-card rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">currency_rupee</span>
                Salary Range
              </h2>
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 text-center">
                <p className="text-primary text-3xl font-bold mb-2">{career.salaryRange}</p>
                <p className="text-[#a59cba] text-sm">Expected salary range with experience</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => navigate("/assessments")}
              className="flex-1 px-6 py-3 bg-[#2d2839] text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
            >
              <span className="material-symbols-outlined inline mr-2">restart_alt</span>
              Take Assessment Again
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all"
            >
              <span className="material-symbols-outlined inline mr-2">arrow_forward</span>
              Go to Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareerResult;
