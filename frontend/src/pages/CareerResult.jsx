import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addCareerPath, searchCareers } from "../Services/api";
import InternalNavbar from "../components/InternalNavbar";
import Footer from "../components/internalfooter";
import { ThemeContext } from "../context/ThemeContext";

// Color palette for career cards — each card gets a unique accent
const cardAccents = [
  { bg: "bg-violet-500", light: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20", bar: "bg-gradient-to-r from-violet-600 to-violet-400" },
  { bg: "bg-blue-500", light: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", bar: "bg-gradient-to-r from-blue-600 to-blue-400" },
  { bg: "bg-emerald-500", light: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", bar: "bg-gradient-to-r from-emerald-600 to-emerald-400" },
  { bg: "bg-amber-500", light: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", bar: "bg-gradient-to-r from-amber-600 to-amber-400" },
  { bg: "bg-rose-500", light: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", bar: "bg-gradient-to-r from-rose-600 to-rose-400" },
];

// Stream icon mapping
const streamIcons = {
  science: "science",
  commerce: "account_balance",
  arts: "palette",
  technology: "code",
  medical: "health_and_safety",
  engineering: "engineering",
  default: "school",
};

const getStreamIcon = (stream) => {
  if (!stream) return streamIcons.default;
  const key = stream.toLowerCase();
  return streamIcons[key] || streamIcons.default;
};

const CareerResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
  const [addingCareer, setAddingCareer] = useState(null); // track which career is being added

  const { summary, careers, allQnA } = location.state || {};

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 2500);
  };

  // Add career to profile's career path
  const handleAddToCareerPath = async (career) => {
    try {
      setAddingCareer(career.title);
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : {};

      const careerPathData = {
        careerName: career.title,
        education: user.education || "12th",
        stream: career.stream || user.stream || "",
        matchPercentage: career.matchPercent,
      };

      const response = await addCareerPath(careerPathData);

      if (response.data.success) {
        // Update localStorage with latest career paths
        user.careerPaths = response.data.careerPaths;
        localStorage.setItem("user", JSON.stringify(user));
        showToast(`${career.title} added to your career path!`, "success");
      } else {
        showToast(response.data.message || "Failed to add career path.", "error");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        showToast(error.response.data.message || `${career.title} is already in your career path!`, "error");
      } else if (error.response?.status === 401) {
        showToast("Session expired. Please log in again.", "error");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        showToast("Failed to add career path. Please try again.", "error");
      }
    } finally {
      setAddingCareer(null);
    }
  };

  // Navigate to career detail page — try to find in DB, otherwise go to all-careers
  const handleMoreInfo = async (career) => {
    try {
      // Search for the career by title in DB
      const response = await searchCareers(career.title);
      if (response.data.success && response.data.careers && response.data.careers.length > 0) {
        // Found matching career in DB — navigate to its detail page
        const dbCareer = response.data.careers[0];
        navigate(`/career/${dbCareer._id}`);
      } else {
        // Not found in DB — go to all careers page with search pre-filled
        navigate("/all-careers");
      }
    } catch {
      navigate("/all-careers");
    }
  };

  // If no data, redirect
  if (!careers || !Array.isArray(careers) || careers.length === 0) {
    return (
      <div
        className={`min-h-screen font-display transition-colors duration-300 ${
          isDarkMode
            ? "bg-background-dark text-white"
            : "bg-surface-light text-charcoal"
        }`}
      >
        <InternalNavbar />
        <main className="flex flex-1 justify-center items-center py-12 px-4 min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-red-400 text-3xl">
                error
              </span>
            </div>
            <p
              className={`text-lg font-bold mb-2 ${
                isDarkMode ? "text-white" : "text-charcoal"
              }`}
            >
              No results found
            </p>
            <p
              className={`text-sm mb-6 ${
                isDarkMode ? "text-white/50" : "text-slate-500"
              }`}
            >
              Please complete the assessment first to see your career matches.
            </p>
            <button
              onClick={() => navigate("/assessments/quest")}
              className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Take Assessment
            </button>
          </div>
        </main>
      </div>
    );
  }

  const topCareer = careers[0];

  return (
    <div
      className={`min-h-screen font-display transition-colors duration-300 ${
        isDarkMode
          ? "bg-background-dark text-white"
          : "bg-surface-light text-charcoal"
      }`}
    >
      <InternalNavbar />

      {/* Toast Notification */}
      {toast.visible && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-xl shadow-2xl text-sm font-semibold transition-all animate-bounce ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : toast.type === "error"
              ? "bg-red-600 text-white"
              : "bg-primary text-white"
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {toast.type === "success"
              ? "check_circle"
              : toast.type === "error"
              ? "error"
              : "info"}
          </span>
          {toast.message}
        </div>
      )}

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase rounded-full mb-4">
            <span className="material-symbols-outlined text-sm">
              auto_awesome
            </span>
            AI Analysis Complete
          </span>
          <h1
            className={`text-4xl md:text-6xl font-black mb-4 tracking-tighter ${
              isDarkMode ? "text-white" : "text-charcoal"
            }`}
            style={{
              textShadow: isDarkMode
                ? "0 0 30px rgba(140, 43, 238, 0.3)"
                : "none",
            }}
          >
            Your Career Matches
          </h1>
        </div>

        {/* Top Match Hero Card */}
        <div
          className={`relative rounded-2xl p-6 md:p-8 mb-8 overflow-hidden border ${
            isDarkMode
              ? "bg-[#1a142e]/80 border-primary/20"
              : "bg-white border-primary/10 shadow-xl"
          }`}
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">
                #1 TOP MATCH
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isDarkMode
                    ? "bg-white/10 text-white/70"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <span className="material-symbols-outlined text-xs mr-1 align-middle">
                  {getStreamIcon(topCareer.stream)}
                </span>
                {topCareer.stream}
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <h2
                  className={`text-3xl md:text-4xl font-black mb-3 ${
                    isDarkMode ? "text-white" : "text-charcoal"
                  }`}
                >
                  {topCareer.title}
                </h2>
                <p
                  className={`text-sm md:text-base leading-relaxed max-w-2xl ${
                    isDarkMode ? "text-white/60" : "text-slate-500"
                  }`}
                >
                  {topCareer.whyItFits}
                </p>
              </div>

              {/* Match percentage circle */}
              <div className="flex-shrink-0">
                <div
                  className={`relative w-28 h-28 rounded-full flex items-center justify-center ${
                    isDarkMode ? "bg-[#1a142e]" : "bg-slate-50"
                  }`}
                >
                  <svg
                    className="absolute inset-0 w-full h-full transform -rotate-90"
                    viewBox="0 0 112 112"
                  >
                    <circle
                      cx="56"
                      cy="56"
                      fill="transparent"
                      r="48"
                      stroke={isDarkMode ? "#2d2d4e" : "#e2e8f0"}
                      strokeWidth="8"
                    ></circle>
                    <circle
                      cx="56"
                      cy="56"
                      fill="transparent"
                      r="48"
                      stroke="#8c2bee"
                      strokeDasharray={2 * Math.PI * 48}
                      strokeDashoffset={
                        2 * Math.PI * 48 -
                        (topCareer.matchPercent / 100) * 2 * Math.PI * 48
                      }
                      strokeWidth="8"
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    ></circle>
                  </svg>
                  <span
                    className={`relative z-10 text-2xl font-black ${
                      isDarkMode ? "text-white" : "text-charcoal"
                    }`}
                  >
                    {topCareer.matchPercent}%
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons — Add to Career Path & More Info */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => handleAddToCareerPath(topCareer)}
                disabled={addingCareer === topCareer.title}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {addingCareer === topCareer.title ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">add_circle</span>
                    Add to Career Path
                  </>
                )}
              </button>
              <button
                onClick={() => handleMoreInfo(topCareer)}
                className={`flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-xl border transition-all active:scale-95 ${
                  isDarkMode
                    ? "border-primary/30 text-white hover:border-primary/60 hover:bg-primary/10"
                    : "border-primary/20 text-primary hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                <span className="material-symbols-outlined text-lg">info</span>
                More Info
              </button>
            </div>

            {/* Skills and Colleges for top match */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div
                className={`rounded-xl p-4 ${
                  isDarkMode
                    ? "bg-white/5 border border-white/5"
                    : "bg-slate-50 border border-slate-100"
                }`}
              >
                <h4
                  className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                    isDarkMode ? "text-white/40" : "text-slate-400"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    build
                  </span>
                  Skills to Learn
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(topCareer.skillsToLearn || []).map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className={`rounded-xl p-4 ${
                  isDarkMode
                    ? "bg-white/5 border border-white/5"
                    : "bg-slate-50 border border-slate-100"
                }`}
              >
                <h4
                  className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                    isDarkMode ? "text-white/40" : "text-slate-400"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    school
                  </span>
                  Suggested Colleges
                </h4>
                <div className="flex flex-col gap-1.5">
                  {(topCareer.topColleges || []).map((college, i) => (
                    <span
                      key={i}
                      className={`text-xs font-medium flex items-center gap-2 ${
                        isDarkMode ? "text-white/60" : "text-slate-600"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                      {college}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Career Cards */}
        <div className="mb-6">
          <h3
            className={`text-lg font-bold mb-4 flex items-center gap-2 ${
              isDarkMode ? "text-white/60" : "text-slate-500"
            }`}
          >
            <span className="material-symbols-outlined text-xl">
              format_list_numbered
            </span>
            Other Matches
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {careers.slice(1).map((career, index) => {
            const accent = cardAccents[(index + 1) % cardAccents.length];

            return (
              <div
                key={index}
                className={`rounded-xl p-5 md:p-6 border transition-all hover:scale-[1.01] ${
                  isDarkMode
                    ? "bg-[#1a142e]/60 border-white/5 hover:border-white/10"
                    : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${accent.light} ${accent.text} border ${accent.border}`}
                      >
                        #{index + 2} Match
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isDarkMode
                            ? "bg-white/10 text-white/50"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {career.stream}
                      </span>
                    </div>
                    <h3
                      className={`text-lg font-bold ${
                        isDarkMode ? "text-white" : "text-charcoal"
                      }`}
                    >
                      {career.title}
                    </h3>
                  </div>

                  {/* Match percent */}
                  <div className={`text-right flex-shrink-0 ml-4`}>
                    <span className={`text-2xl font-black ${accent.text}`}>
                      {career.matchPercent}%
                    </span>
                  </div>
                </div>

                {/* Match bar */}
                <div
                  className={`rounded-full h-2 overflow-hidden mb-4 ${
                    isDarkMode ? "bg-white/10" : "bg-slate-100"
                  }`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${accent.bar}`}
                    style={{ width: `${career.matchPercent}%` }}
                  ></div>
                </div>

                {/* Why it fits */}
                <p
                  className={`text-xs leading-relaxed mb-4 ${
                    isDarkMode ? "text-white/50" : "text-slate-500"
                  }`}
                >
                  {career.whyItFits}
                </p>

                {/* Skills */}
                <div className="mb-3">
                  <p
                    className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
                      isDarkMode ? "text-white/30" : "text-slate-400"
                    }`}
                  >
                    Skills to Learn
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(career.skillsToLearn || []).map((skill, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 rounded text-[10px] font-semibold ${
                          isDarkMode
                            ? "bg-white/5 text-white/60 border border-white/5"
                            : "bg-slate-50 text-slate-600 border border-slate-100"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Colleges */}
                <div className="mb-4">
                  <p
                    className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
                      isDarkMode ? "text-white/30" : "text-slate-400"
                    }`}
                  >
                    Top Colleges
                  </p>
                  <div className="flex flex-col gap-1">
                    {(career.topColleges || []).map((college, i) => (
                      <span
                        key={i}
                        className={`text-[11px] font-medium flex items-center gap-1.5 ${
                          isDarkMode ? "text-white/40" : "text-slate-500"
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full flex-shrink-0 ${accent.bg}`}
                        ></span>
                        {college}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card action buttons */}
                <div className="flex gap-2 pt-3 border-t border-white/5">
                  <button
                    onClick={() => handleAddToCareerPath(career)}
                    disabled={addingCareer === career.title}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-bold transition-all active:scale-95 disabled:opacity-60 ${
                      isDarkMode
                        ? "bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white"
                        : "bg-primary/10 border border-primary/15 text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    {addingCareer === career.title ? (
                      <>
                        <span className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin"></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-sm">add_circle</span>
                        Add to Path
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleMoreInfo(career)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                      isDarkMode
                        ? "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                        : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">info</span>
                    More Info
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/assessments/quest")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">refresh</span>
            Retake Assessment
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all border ${
              isDarkMode
                ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate("/assessments")}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all border ${
              isDarkMode
                ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
            }`}
          >
            <span className="material-symbols-outlined">history</span>
            Assessment Hub
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p
            className={`text-xs ${
              isDarkMode ? "text-white/20" : "text-slate-400"
            }`}
          >
            These recommendations are generated by AI based on your responses
            and should be used as a starting point for career exploration, not as
            definitive career decisions.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CareerResult;
