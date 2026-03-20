import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getCareerById } from "../Services/api";
import SearchBar from "../components/SearchBar";
import InternalNavbar from "../components/InternalNavbar";
import Footer from "../components/internalfooter";

// Roadmap step icons cycling
const roadmapIcons = [
  "school",
  "menu_book",
  "edit_note",
  "work",
  "trending_up",
  "star",
  "rocket_launch",
  "psychology",
];

export default function CareerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getCareerById(id);
        setCareer(response.data?.career || null);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Career not found. It may have been removed.");
        } else if (err.response?.status === 400) {
          setError("Invalid career link.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCareer();
    window.scrollTo(0, 0);
  }, [id]);

  const displayTitle = career?.title || career?.careerName || "Career";

  /* ========= HEADER (matches design) ========= */
  const renderHeader = () => (

    <InternalNavbar />

  );

  /* ========= FOOTER (matches design) ========= */
  const renderFooter = () => (
    <Footer />
  );

  /* ========= LOADING STATE ========= */
  if (loading) {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark text-white font-display selection:bg-[#8b5cf6]/30">
        {renderHeader()}
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin size-12 border-4 border-[#8b5cf6]/20 border-t-[#8b5cf6] rounded-full"></div>
            <p className="text-[#a094b8] text-sm font-medium">
              Loading career details...
            </p>
          </div>
        </div>
        {renderFooter()}
      </div>
    );
  }

  /* ========= ERROR STATE ========= */
  if (error) {
    return (
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark text-white font-display selection:bg-[#8b5cf6]/30">
        {renderHeader()}
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4 max-w-md text-center">
            <div className="size-16 rounded-full bg-red-500/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-400 text-3xl">
                error
              </span>
            </div>
            <h2 className="text-white text-xl font-bold">{error}</h2>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 bg-[#8b5cf6] text-white text-sm font-bold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-[#8b5cf6]/40"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
        {renderFooter()}
      </div>
    );
  }

  /* ========= MAIN PAGE ========= */
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark text-white font-display selection:bg-[#8b5cf6]/30">
      {renderHeader()}

      <main className="flex flex-1 justify-center py-8">
        <div className="layout-content-container flex flex-col w-full max-w-[1200px] px-4 md:px-10 gap-6">
          {/* ── Breadcrumb ── */}
          <nav className="flex flex-wrap gap-2 text-sm">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-400 font-medium hover:text-[#8b5cf6] transition-colors"
            >
              Home
            </button>
            <span className="text-gray-600 font-medium">/</span>
            <button
              onClick={() => navigate("/career-paths")}
              className="text-gray-400 font-medium hover:text-[#8b5cf6] transition-colors"
            >
              Career Paths
            </button>
            <span className="text-gray-600 font-medium">/</span>
            <span className="text-white font-bold capitalize">
              {displayTitle}
            </span>
          </nav>

          {/* ── Hero Card ── */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 bg-[#161421] p-6 rounded-xl border border-[#2d2845]">
            <div className="flex flex-col gap-3 max-w-2xl">
              {/* Badges */}
              <div className="flex items-center gap-3">
                {career?.category && (
                  <span className="bg-[#8b5cf6]/20 text-[#8b5cf6] text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {career.category}
                  </span>
                )}
                {career?.jobOutlook && (
                  <span className="bg-green-900/30 text-green-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {career.jobOutlook}
                  </span>
                )}
              </div>
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] capitalize">
                {displayTitle}
              </h1>
              <p className="text-gray-400 text-lg font-normal leading-relaxed">
                {career?.description ||
                  career?.shortDescription ||
                  "No description available."}
              </p>
            </div>
            {/* Action buttons */}
            <div className="flex flex-col gap-3 min-w-[200px]">
              <button
                onClick={() => navigate("/mentors")}
                className="w-full flex cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-[#8b5cf6] text-white text-sm font-bold shadow-lg shadow-[#8b5cf6]/40 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined mr-2">
                  person_search
                </span>
                Find a Mentor
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: displayTitle,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="w-full flex cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-[#1c1a2e] text-white text-sm font-bold border border-[#2d2845] hover:bg-[#2d2845] transition-all"
              >
                <span className="material-symbols-outlined mr-2">share</span>
                Share Career Path
              </button>
            </div>
          </div>

          {/* ── 3-Column Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ======== LEFT 2/3 ======== */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* 3 Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Job Growth */}
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-[#161421] border border-[#2d2845]">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm font-medium">
                      Job Growth
                    </p>
                    <span className="material-symbols-outlined text-green-500">
                      trending_up
                    </span>
                  </div>
                  <p className="text-white tracking-light text-2xl font-bold">
                    {career?.jobOutlook || "Growing"}
                  </p>
                  <p className="text-green-500 text-xs font-medium">
                    Next 10 years
                  </p>
                </div>
                {/* Avg Salary */}
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-[#161421] border border-[#2d2845]">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm font-medium">
                      Avg Salary
                    </p>
                    <span className="material-symbols-outlined text-[#8b5cf6]">
                      payments
                    </span>
                  </div>
                  <p className="text-white tracking-light text-2xl font-bold">
                    {career?.averageSalary ||
                      career?.salaryRange ||
                      "Competitive"}
                  </p>
                  <p className="text-green-500 text-xs font-medium">
                    Industry average
                  </p>
                </div>
                {/* Open Roles / Education */}
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-[#161421] border border-[#2d2845]">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm font-medium">
                      {career?.educationRequired ? "Education" : "Open Roles"}
                    </p>
                    <span className="material-symbols-outlined text-blue-400">
                      {career?.educationRequired ? "school" : "work"}
                    </span>
                  </div>
                  <p className="text-white tracking-light text-2xl font-bold">
                    {career?.educationRequired || "Multiple paths"}
                  </p>
                  <p className="text-[#8b5cf6] text-xs font-medium">
                    {career?.educationRequired
                      ? "Recommended path"
                      : "Active listings"}
                  </p>
                </div>
              </div>

              {/* ── Salary Progression Chart ── */}
              <div className="flex flex-col bg-[#161421] rounded-xl border border-[#2d2845] p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white text-lg font-bold">
                    Salary Progression
                  </h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <span className="size-2 bg-[#8b5cf6] rounded-full shadow-[0_0_5px_#8b5cf6]"></span>
                      <span className="text-xs text-gray-400">
                        Current Market
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-2 bg-[#2d2845] rounded-full border border-[#8b5cf6]/40"></span>
                      <span className="text-xs text-gray-400">Avg Base</span>
                    </div>
                  </div>
                </div>
                {/* Bar chart */}
                <div className="relative h-56 w-full flex items-end justify-between gap-6 px-4">
                  {/* Grid lines */}
                  <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none opacity-10">
                    <div className="border-t border-white w-full"></div>
                    <div className="border-t border-white w-full"></div>
                    <div className="border-t border-white w-full"></div>
                    <div className="border-t border-white w-full"></div>
                  </div>
                  {/* Junior */}
                  <div className="w-full bg-[#1c1a2e] rounded-t-lg h-24 relative group">
                    <div
                      className="absolute bottom-0 w-full bg-[#8b5cf6]/40 rounded-t-lg h-16 transition-all group-hover:h-20 border-t-2 border-[#8b5cf6]"
                      style={{
                        boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
                      }}
                    ></div>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      Junior
                    </span>
                  </div>
                  {/* Mid-Level */}
                  <div className="w-full bg-[#1c1a2e] rounded-t-lg h-36 relative group">
                    <div
                      className="absolute bottom-0 w-full bg-[#8b5cf6]/40 rounded-t-lg h-28 transition-all group-hover:h-32 border-t-2 border-[#8b5cf6]"
                      style={{
                        boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
                      }}
                    ></div>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      Mid-Level
                    </span>
                  </div>
                  {/* Senior */}
                  <div className="w-full bg-[#1c1a2e] rounded-t-lg h-48 relative group">
                    <div
                      className="absolute bottom-0 w-full bg-[#8b5cf6]/40 rounded-t-lg h-40 transition-all group-hover:h-44 border-t-2 border-[#8b5cf6]"
                      style={{
                        boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
                      }}
                    ></div>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      Senior
                    </span>
                  </div>
                  {/* Lead */}
                  <div className="w-full bg-[#1c1a2e] rounded-t-lg h-56 relative group">
                    <div
                      className="absolute bottom-0 w-full bg-[#8b5cf6]/40 rounded-t-lg h-[200px] transition-all group-hover:h-[216px] border-t-2 border-[#8b5cf6]"
                      style={{
                        boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
                      }}
                    ></div>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      Lead
                    </span>
                  </div>
                </div>
                {/* Pro tip */}
                <div className="mt-14 p-4 bg-[#1c1a2e] rounded-lg border border-[#8b5cf6]/10">
                  <p className="text-sm text-gray-300">
                    <span className="font-bold text-[#8b5cf6]">Pro Tip:</span>{" "}
                    Specialized skills and certifications can increase your
                    starting salary by up to 15%.
                  </p>
                </div>
              </div>

              {/* ── Key Skills ── */}
              {career?.skillsRequired && career.skillsRequired.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-white text-[22px] font-bold">
                    Key Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {career.skillsRequired.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-[#2d1b4e] text-[#8b5cf6]/90 border border-[#8b5cf6]/20 rounded-full text-sm font-semibold hover:border-[#8b5cf6]/50 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── A Day in the Life (Roadmap) ── */}
              {career?.roadmap && career.roadmap.length > 0 && (
                <div className="flex flex-col bg-[#161421] rounded-xl border border-[#2d2845] overflow-hidden">
                  <h3 className="text-white text-lg font-bold p-6 border-b border-[#2d2845]">
                    A Day in the Life
                  </h3>
                  <div className="flex flex-col">
                    {career.roadmap.map((step, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-4 p-5 hover:bg-[#1c1a2e] transition-colors group ${index > 0 ? "border-t border-[#2d2845]" : ""
                          }`}
                      >
                        <div className="size-10 rounded-lg bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center shrink-0 group-hover:bg-[#8b5cf6] group-hover:text-white transition-all">
                          <span className="material-symbols-outlined">
                            {roadmapIcons[index % roadmapIcons.length]}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-bold">{step}</p>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Step {index + 1} in your career journey.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Important Exams ── */}
              {career?.exams && career.exams.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-white text-[22px] font-bold">
                    Important Exams
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {career.exams.map((exam, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-[#161421] p-4 rounded-xl border border-[#2d2845] hover:border-[#8b5cf6]/30 transition-colors"
                      >
                        <div className="size-8 rounded-lg bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-lg">
                            assignment
                          </span>
                        </div>
                        <p className="text-white text-sm font-medium">{exam}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ======== RIGHT SIDEBAR 1/3 ======== */}
            <div className="flex flex-col gap-6">
              {/* ── Education Roadmap ── */}
              <div className="bg-[#161421] rounded-xl border border-[#2d2845] p-6 shadow-sm">
                <h3 className="text-white text-lg font-bold mb-4">
                  Education Roadmap
                </h3>
                <div className="flex flex-col gap-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#8b5cf6]/20">
                  {/* Step 1 */}
                  <div className="flex gap-4 relative">
                    <div className="size-6 rounded-full bg-[#8b5cf6] border-4 border-[#161421] z-10"></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">
                        {career?.educationRequired || "Bachelor's Degree"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {career?.educationRequired
                          ? "Required qualification"
                          : "Design, Psych, or CS (4 Years)"}
                      </p>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="flex gap-4 relative">
                    <div className="size-6 rounded-full bg-[#8b5cf6] border-4 border-[#161421] z-10"></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">
                        Build Portfolio
                      </p>
                      <p className="text-xs text-gray-400">
                        {career?.exams && career.exams.length > 0
                          ? `Key exams: ${career.exams.slice(0, 2).join(", ")}`
                          : "3-4 case studies (6-12 Months)"}
                      </p>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="flex gap-4 relative">
                    <div className="size-6 rounded-full bg-[#1c1a2e] border-2 border-[#8b5cf6] z-10"></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">
                        Specialized Certs
                      </p>
                      <p className="text-xs text-gray-400">
                        {career?.exams && career.exams.length > 2
                          ? career.exams.slice(2, 4).join(", ") + " (Optional)"
                          : "Industry certifications (Optional)"}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/assessments")}
                  className="w-full mt-6 py-3 text-[#8b5cf6] text-sm font-bold bg-[#8b5cf6]/10 rounded-lg hover:bg-[#8b5cf6]/20 transition-all border border-[#8b5cf6]/20"
                >
                  View Recommended Courses
                </button>
              </div>

              {/* ── Top Mentors ── */}
              <div className="bg-[#161421] rounded-xl border border-[#2d2845] p-6 shadow-sm">
                <h3 className="text-white text-lg font-bold mb-4">
                  Top Mentors
                </h3>
                <div className="flex flex-col gap-4">
                  {/* Mentor 1 */}
                  <div className="flex items-center gap-3 group cursor-pointer">
                    <div
                      className="size-12 rounded-full bg-cover bg-center border border-[#8b5cf6]/20"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBASKzsGbwwhjZWKaOJcAAw9SuE-3MtnwHdvhyj5kOX1gmzXjXi0CdeWAGw1pY9Y0JVtWVBhTZshzZQLQyPCT8Ptf2ZbDbtYQbZJ5-tYZSUJm46fgVMYY87j610W7A6Z_3-Tdujb3t9oOwkpMbY7vS2O-M7VbpTyuKInxxkqvLgNzYFt4MksjrV9R1JhvN3EcLN6nTaXWm8ZdQJMfPiUicGTPw_8ttC1ijTchlNmt0_RabSTQ0MfCbIwC7wEKT5eykS0QzJdoysftk')",
                      }}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white group-hover:text-[#8b5cf6] transition-colors">
                        Sarah Johnson
                      </p>
                      <p className="text-xs text-gray-400">
                        Principal Designer at TechCorp
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/mentors");
                      }}
                      className="size-8 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-[#8b5cf6]/20"
                    >
                      <span className="material-symbols-outlined text-sm">
                        chat
                      </span>
                    </button>
                  </div>
                  {/* Mentor 2 */}
                  <div className="flex items-center gap-3 group cursor-pointer">
                    <div
                      className="size-12 rounded-full bg-cover bg-center border border-[#8b5cf6]/20"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsB2CBPIYOzaX3jaTQkVo70GFhQQH-_72Qj1ZoErJvjpNcnrfH4OljJi0P1nwJ_Rdr3HfZ-R8KodUjfnzRKvEomooTIYJxHO5Q-sXcnBQfuB28nRqmCrw42dQ9r9zpODPxf6sLx574t6AISPA13fQpLRGATfSgOIa4EAEzNpjR8C2m2xAOxmrrUzQJhPdnnAmaThic_iDrCDGK-zbrVIIknxFxWfB4n9U_2pGAc3cimdbkO55NGKjP7y1NjjdxcWNXBKsZo14bZZY')",
                      }}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white group-hover:text-[#8b5cf6] transition-colors">
                        David Chen
                      </p>
                      <p className="text-xs text-gray-400">
                        Senior UX, SocialStream
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/mentors");
                      }}
                      className="size-8 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-[#8b5cf6]/20"
                    >
                      <span className="material-symbols-outlined text-sm">
                        chat
                      </span>
                    </button>
                  </div>
                </div>
                <hr className="my-4 border-[#2d2845]" />
                <button
                  onClick={() => navigate("/mentors")}
                  className="text-[#8b5cf6] text-sm font-bold flex items-center justify-center gap-2 hover:translate-x-1 transition-transform w-full"
                >
                  Browse 50+ Mentors
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>

              {/* ── Related Paths ── */}
              {career?.relatedCareers && career.relatedCareers.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-white text-lg font-bold px-2">
                    Related Paths
                  </h3>
                  {career.relatedCareers.map((related, index) => (
                    <div
                      key={index}
                      onClick={() => navigate("/career-paths")}
                      className="bg-[#161421] p-4 rounded-xl border border-[#2d2845] hover:border-[#8b5cf6]/50 cursor-pointer group transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-white group-hover:text-[#8b5cf6] transition-colors capitalize">
                          {related}
                        </p>
                        <span className="material-symbols-outlined text-gray-600 group-hover:text-[#8b5cf6] transition-colors">
                          chevron_right
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Explore this related career path.
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Top Colleges ── */}
              {career?.topColleges && career.topColleges.length > 0 && (
                <div className="bg-[#161421] rounded-xl border border-[#2d2845] p-6 shadow-sm">
                  <h3 className="text-white text-lg font-bold mb-4">
                    Top Colleges
                  </h3>
                  <div className="flex flex-col gap-3">
                    {career.topColleges.map((college, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 group"
                      >
                        <div className="size-8 rounded-lg bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-lg">
                            school
                          </span>
                        </div>
                        <p className="text-sm text-white font-medium">
                          {college}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {renderFooter()}
    </div>
  );
}
