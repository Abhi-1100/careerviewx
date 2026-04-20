import React, { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import InternalNavbar from "../components/InternalNavbar";
import Footer from "../components/internalfooter";
import { getProfile, getCareerPaths, getCareerByName } from "../Services/api";
import { useNavigate } from "react-router-dom";

/* ─── helper: color palette for career domains ─── */
const domainColors = {
  engineering: { bg: "#3b82f6", glow: "rgba(59,130,246,0.35)" },
  it: { bg: "#8b5cf6", glow: "rgba(139,92,246,0.35)" },
  medical: { bg: "#10b981", glow: "rgba(16,185,129,0.35)" },
  design: { bg: "#f59e0b", glow: "rgba(245,158,11,0.35)" },
  business: { bg: "#ef4444", glow: "rgba(239,68,68,0.35)" },
  government: { bg: "#6366f1", glow: "rgba(99,102,241,0.35)" },
  default: { bg: "#8b5cf6", glow: "rgba(139,92,246,0.35)" },
};

const domainIcons = {
  engineering: "precision_manufacturing",
  it: "terminal",
  medical: "health_and_safety",
  design: "palette",
  business: "trending_up",
  government: "account_balance",
  default: "work",
};

const getDomainKey = (name = "") => {
  const lower = name.toLowerCase();
  for (const key of Object.keys(domainColors)) {
    if (key !== "default" && lower.includes(key)) return key;
  }
  return "default";
};

/* ─── Detail Popup ─── */
const DetailPopup = ({ career, position, onClose, isDarkMode, navigate }) => {
  const popupRef = useRef(null);
  const domainKey = getDomainKey(career.stream || career.careerName);
  const color = domainColors[domainKey] || domainColors.default;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const dateStr = career.addedDate
    ? new Date(career.addedDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={popupRef}
        className={`relative z-10 w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden animate-popup-in ${
          isDarkMode
            ? "bg-[#1a142e] border-[#2d264a]"
            : "bg-white border-slate-200"
        }`}
        style={{ animation: "popupIn 0.3s cubic-bezier(0.16,1,0.3,1)" }}
      >
        {/* Color bar */}
        <div className="h-1.5 w-full" style={{ background: color.bg }} />

        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="size-12 rounded-xl flex items-center justify-center"
                style={{ background: `${color.bg}20` }}
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ color: color.bg }}
                >
                  {domainIcons[domainKey] || domainIcons.default}
                </span>
              </div>
              <div>
                <h3
                  className={`text-lg font-bold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {career.careerName}
                </h3>
                <p
                  className={`text-xs font-medium ${
                    isDarkMode ? "text-[#a094b8]" : "text-slate-500"
                  }`}
                >
                  {career.stream || "General"} Stream
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`size-8 rounded-lg flex items-center justify-center transition-colors ${
                isDarkMode
                  ? "hover:bg-white/10 text-white/60"
                  : "hover:bg-slate-100 text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Match Gauge */}
          {career.matchPercentage && (
            <div
              className={`rounded-xl p-4 ${
                isDarkMode ? "bg-white/5" : "bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    isDarkMode ? "text-[#a094b8]" : "text-slate-500"
                  }`}
                >
                  Match Score
                </span>
                <span
                  className="text-2xl font-black"
                  style={{ color: color.bg }}
                >
                  {career.matchPercentage}%
                </span>
              </div>
              <div
                className={`h-2.5 w-full rounded-full overflow-hidden ${
                  isDarkMode ? "bg-white/10" : "bg-slate-200"
                }`}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${career.matchPercentage}%`,
                    background: `linear-gradient(90deg, ${color.bg}, ${color.bg}cc)`,
                    boxShadow: `0 0 12px ${color.glow}`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`rounded-xl p-3 ${
                isDarkMode ? "bg-white/5" : "bg-slate-50"
              }`}
            >
              <span
                className={`material-symbols-outlined text-lg mb-1 block ${
                  isDarkMode ? "text-[#a094b8]" : "text-slate-400"
                }`}
              >
                school
              </span>
              <p
                className={`text-[11px] font-medium ${
                  isDarkMode ? "text-[#a094b8]" : "text-slate-500"
                }`}
              >
                Education
              </p>
              <p
                className={`text-sm font-bold ${
                  isDarkMode ? "text-white" : "text-slate-800"
                }`}
              >
                {career.education || "Not specified"}
              </p>
            </div>
            <div
              className={`rounded-xl p-3 ${
                isDarkMode ? "bg-white/5" : "bg-slate-50"
              }`}
            >
              <span
                className={`material-symbols-outlined text-lg mb-1 block ${
                  isDarkMode ? "text-[#a094b8]" : "text-slate-400"
                }`}
              >
                calendar_today
              </span>
              <p
                className={`text-[11px] font-medium ${
                  isDarkMode ? "text-[#a094b8]" : "text-slate-500"
                }`}
              >
                Added On
              </p>
              <p
                className={`text-sm font-bold ${
                  isDarkMode ? "text-white" : "text-slate-800"
                }`}
              >
                {dateStr}
              </p>
            </div>
          </div>

          {/* Skills to learn (if we have enriched data) */}
          {career.skillsToLearn && career.skillsToLearn.length > 0 && (
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isDarkMode ? "text-[#a094b8]" : "text-slate-500"
                }`}
              >
                Skills to Learn
              </p>
              <div className="flex flex-wrap gap-2">
                {career.skillsToLearn.map((skill, i) => (
                  <span
                    key={i}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      isDarkMode
                        ? "bg-white/10 text-white/80"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Why It Fits */}
          {career.whyItFits && (
            <div
              className={`rounded-xl p-4 border-l-4 ${
                isDarkMode ? "bg-white/5" : "bg-slate-50"
              }`}
              style={{ borderLeftColor: color.bg }}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                  isDarkMode ? "text-[#a094b8]" : "text-slate-500"
                }`}
              >
                Why It Fits
              </p>
              <p
                className={`text-sm leading-relaxed ${
                  isDarkMode ? "text-white/80" : "text-slate-700"
                }`}
              >
                {career.whyItFits}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {career.careerId && (
              <button
                onClick={() => navigate(`/career/${career.careerId}`)}
                className="flex-1 py-3 text-white text-sm font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
                style={{
                  background: color.bg,
                  boxShadow: `0 4px 15px ${color.glow}`,
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">
                    open_in_new
                  </span>
                  View Full Details
                </span>
              </button>
            )}
            <button
              onClick={onClose}
              className={`${
                career.careerId ? "" : "flex-1"
              } px-5 py-3 text-sm font-bold rounded-xl border transition-all ${
                isDarkMode
                  ? "border-[#2d264a] text-white/70 hover:bg-white/5"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Timeline Node ─── */
const TimelineNode = ({
  isFirst,
  isLast,
  isEducation,
  data,
  index,
  totalCount,
  isDarkMode,
  onClick,
  isActive,
}) => {
  const domainKey = isEducation
    ? "default"
    : getDomainKey(data.stream || data.careerName);
  const color = domainColors[domainKey] || domainColors.default;
  const icon = isEducation
    ? "school"
    : domainIcons[domainKey] || domainIcons.default;

  return (
    <div className="relative flex items-start gap-0 group">
      {/* Left: node & connector line */}
      <div className="flex flex-col items-center flex-shrink-0 w-16">
        {/* Node circle */}
        <button
          onClick={onClick}
          disabled={isEducation}
          className={`relative z-10 size-14 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${
            isEducation
              ? "cursor-default"
              : "cursor-pointer hover:scale-110 hover:shadow-xl"
          } ${isActive ? "scale-110" : ""}`}
          style={{
            background: isEducation
              ? isDarkMode
                ? "linear-gradient(135deg, #8b5cf6, #6d28d9)"
                : "linear-gradient(135deg, #8b5cf6, #7c3aed)"
              : isDarkMode
              ? `${color.bg}15`
              : `${color.bg}10`,
            borderColor: isEducation
              ? "transparent"
              : isActive
              ? color.bg
              : isDarkMode
              ? `${color.bg}40`
              : `${color.bg}30`,
            boxShadow: isActive
              ? `0 0 20px ${color.glow}, 0 0 40px ${color.glow}`
              : isEducation
              ? `0 4px 15px rgba(139,92,246,0.3)`
              : "none",
          }}
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{
              color: isEducation ? "#fff" : color.bg,
            }}
          >
            {icon}
          </span>

          {/* Pulse ring on education node */}
          {isEducation && (
            <span
              className="absolute inset-0 rounded-2xl animate-ping-slow"
              style={{
                border: "2px solid rgba(139,92,246,0.4)",
              }}
            />
          )}
        </button>

        {/* Connector line */}
        {!isLast && (
          <div className="relative w-0.5 flex-1 min-h-[80px]">
            <div
              className="absolute inset-0 w-full rounded-full"
              style={{
                background: isDarkMode
                  ? `linear-gradient(180deg, ${color.bg}60, ${color.bg}20)`
                  : `linear-gradient(180deg, ${color.bg}40, ${color.bg}15)`,
              }}
            />
            {/* Animated dot traveling down the line */}
            <div
              className="absolute left-1/2 -translate-x-1/2 size-1.5 rounded-full animate-travel-down"
              style={{
                background: color.bg,
                boxShadow: `0 0 6px ${color.glow}`,
                animationDelay: `${index * 0.3}s`,
              }}
            />
          </div>
        )}
      </div>

      {/* Right: content card */}
      <div
        className={`flex-1 ml-4 mb-6 rounded-2xl border p-5 transition-all duration-300 ${
          isEducation
            ? isDarkMode
              ? "bg-gradient-to-r from-[#8b5cf6]/10 to-transparent border-[#8b5cf6]/30"
              : "bg-gradient-to-r from-purple-50 to-white border-purple-200"
            : isDarkMode
            ? "bg-[#1a142e]/80 border-[#2d264a] hover:border-opacity-80 hover:bg-[#1a142e]"
            : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
        } ${!isEducation ? "cursor-pointer" : ""} ${
          isActive
            ? isDarkMode
              ? "ring-1 ring-offset-0"
              : "ring-1 ring-offset-0"
            : ""
        }`}
        style={
          isActive
            ? {
                ringColor: color.bg,
                borderColor: color.bg,
              }
            : {}
        }
        onClick={!isEducation ? onClick : undefined}
      >
        {/* Label badge */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
            style={{
              background: isEducation
                ? isDarkMode
                  ? "rgba(139,92,246,0.2)"
                  : "rgba(139,92,246,0.1)"
                : `${color.bg}15`,
              color: isEducation ? "#8b5cf6" : color.bg,
            }}
          >
            {isEducation ? "📍 Current Level" : `🎯 Career Match #${index}`}
          </span>

          {!isEducation && data.matchPercentage && (
            <span
              className="text-xs font-black px-2 py-0.5 rounded-lg"
              style={{
                background: `${color.bg}15`,
                color: color.bg,
              }}
            >
              {data.matchPercentage}%
            </span>
          )}
        </div>

        {/* Title and subtitle */}
        <h3
          className={`text-lg font-bold mb-1 ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}
        >
          {isEducation
            ? `${data.education || "Student"}${
                data.stream ? ` — ${data.stream}` : ""
              }`
            : data.careerName}
        </h3>

        <p
          className={`text-sm leading-relaxed ${
            isDarkMode ? "text-[#a094b8]" : "text-slate-500"
          }`}
        >
          {isEducation
            ? "This is your starting point. Your education forms the foundation of your career journey."
            : `${data.stream || "Career"} stream • Added ${
                data.addedDate
                  ? new Date(data.addedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "recently"
              }`}
        </p>

        {!isEducation && (
          <div className="flex items-center gap-2 mt-3">
            <span
              className="text-xs font-semibold flex items-center gap-1"
              style={{ color: color.bg }}
            >
              <span className="material-symbols-outlined text-sm">
                touch_app
              </span>
              Click for details
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Main Page ─── */
const CareerPaths = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [careerPaths, setCareerPaths] = useState([]);
  const [enrichedCareers, setEnrichedCareers] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const profileRes = await getProfile();
        const userData = profileRes.data;
        setUser(userData);

        // Try to get career paths
        const pathsRes = await getCareerPaths();
        const paths = pathsRes.data?.careerPaths || userData?.careerPaths || [];
        setCareerPaths(paths);

        // Enrich with career details from DB
        const enriched = {};
        await Promise.all(
          paths.map(async (path) => {
            try {
              const res = await getCareerByName(path.careerName);
              if (res.data?.career) {
                enriched[path.careerName] = res.data.career;
              }
            } catch (e) {
              // Career not found in DB, no enrichment
            }
          })
        );
        setEnrichedCareers(enriched);
      } catch (err) {
        console.error("Failed to load career path data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleNodeClick = (career, index) => {
    const enriched = enrichedCareers[career.careerName];
    setSelectedCareer({
      ...career,
      careerId: enriched?._id || null,
      skillsToLearn: enriched?.skillsNeeded || enriched?.skills || [],
      whyItFits: enriched?.shortDescription || enriched?.description?.slice(0, 200) || null,
    });
    setActiveIndex(index);
  };

  return (
    <div
      className={`min-h-screen font-display flex flex-col transition-colors duration-300 ${
        isDarkMode
          ? "bg-background-dark text-white"
          : "bg-surface-light text-charcoal"
      }`}
    >
      <InternalNavbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div>
              <h1
                className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                  isDarkMode ? "text-white" : "text-charcoal"
                }`}
              >
                Career{" "}
                <span className={isDarkMode ? "text-[#8b5cf6]" : "text-primary"}>
                  Timeline
                </span>
              </h1>
              <p
                className={`text-base mt-2 ${
                  isDarkMode ? "text-[#a094b8]" : "text-slate-500"
                }`}
              >
                Your journey from education to career — visualized as a
                timeline.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                  isDarkMode
                    ? "bg-[#8b5cf6]/15 text-[#8b5cf6]"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {careerPaths.length} Career
                {careerPaths.length !== 1 ? "s" : ""} Saved
              </span>
            </div>
          </div>

          {/* Decorative gradient line */}
          <div
            className="h-1 w-24 rounded-full"
            style={{
              background: isDarkMode
                ? "linear-gradient(90deg, #8b5cf6, #6d28d9, transparent)"
                : "linear-gradient(90deg, #8b5cf6, #a78bfa, transparent)",
            }}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
            <p
              className={`text-sm ${
                isDarkMode ? "text-[#a094b8]" : "text-slate-500"
              }`}
            >
              Loading your career timeline...
            </p>
          </div>
        )}

        {/* Timeline */}
        {!loading && (
          <div className="relative">
            {/* Education Node (first) */}
            <TimelineNode
              isFirst={true}
              isLast={careerPaths.length === 0}
              isEducation={true}
              data={{
                education: user?.education || "Student",
                stream: user?.stream || "",
              }}
              index={0}
              totalCount={careerPaths.length + 1}
              isDarkMode={isDarkMode}
              onClick={() => {}}
              isActive={false}
            />

            {/* Career Path Nodes */}
            {careerPaths.length > 0 ? (
              careerPaths.map((career, idx) => (
                <TimelineNode
                  key={idx}
                  isFirst={false}
                  isLast={idx === careerPaths.length - 1}
                  isEducation={false}
                  data={career}
                  index={idx + 1}
                  totalCount={careerPaths.length + 1}
                  isDarkMode={isDarkMode}
                  onClick={() => handleNodeClick(career, idx + 1)}
                  isActive={activeIndex === idx + 1}
                />
              ))
            ) : (
              /* Empty State */
              <div
                className={`mt-4 flex flex-col items-center justify-center py-16 px-8 rounded-2xl border border-dashed text-center ${
                  isDarkMode
                    ? "border-[#2d264a] bg-[#1a142e]/40"
                    : "border-slate-300 bg-slate-50"
                }`}
              >
                <div
                  className={`size-20 rounded-2xl flex items-center justify-center mb-6 ${
                    isDarkMode ? "bg-[#8b5cf6]/10" : "bg-primary/10"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-4xl ${
                      isDarkMode ? "text-[#8b5cf6]" : "text-primary"
                    }`}
                  >
                    explore
                  </span>
                </div>
                <h3
                  className={`font-bold text-xl mb-2 ${
                    isDarkMode ? "text-white" : "text-charcoal"
                  }`}
                >
                  No Career Paths Yet
                </h3>
                <p
                  className={`text-sm mb-6 max-w-sm ${
                    isDarkMode ? "text-[#a094b8]" : "text-slate-500"
                  }`}
                >
                  Take an AI assessment to discover careers that match your
                  skills and interests, then add them to build your timeline.
                </p>
                <button
                  onClick={() => navigate("/assessments")}
                  className={`flex items-center gap-2 px-6 py-3 text-white text-sm font-bold rounded-xl transition-all shadow-lg ${
                    isDarkMode
                      ? "bg-[#8b5cf6] hover:bg-[#8b5cf6]/90 shadow-[#8b5cf6]/30"
                      : "bg-primary hover:bg-primary/90 shadow-primary/20"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    quiz
                  </span>
                  Take Assessment
                </button>
              </div>
            )}

            {/* Journey Summary (if paths exist) */}
            {careerPaths.length > 0 && (
              <div
                className={`mt-8 rounded-2xl border p-6 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-[#8b5cf6]/10 to-transparent border-[#8b5cf6]/20"
                    : "bg-gradient-to-br from-purple-50 to-white border-purple-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`size-10 rounded-xl flex items-center justify-center ${
                      isDarkMode ? "bg-[#8b5cf6]/20" : "bg-primary/10"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-xl ${
                        isDarkMode ? "text-[#8b5cf6]" : "text-primary"
                      }`}
                    >
                      insights
                    </span>
                  </div>
                  <h3
                    className={`font-bold text-lg ${
                      isDarkMode ? "text-white" : "text-charcoal"
                    }`}
                  >
                    Journey Summary
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div
                    className={`rounded-xl p-4 text-center ${
                      isDarkMode ? "bg-white/5" : "bg-white"
                    }`}
                  >
                    <p
                      className={`text-2xl font-black ${
                        isDarkMode ? "text-[#8b5cf6]" : "text-primary"
                      }`}
                    >
                      {careerPaths.length}
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        isDarkMode ? "text-[#a094b8]" : "text-slate-500"
                      }`}
                    >
                      Career Goals
                    </p>
                  </div>
                  <div
                    className={`rounded-xl p-4 text-center ${
                      isDarkMode ? "bg-white/5" : "bg-white"
                    }`}
                  >
                    <p
                      className={`text-2xl font-black ${
                        isDarkMode ? "text-[#10b981]" : "text-emerald-600"
                      }`}
                    >
                      {careerPaths.filter((c) => c.matchPercentage >= 80)
                        .length}
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        isDarkMode ? "text-[#a094b8]" : "text-slate-500"
                      }`}
                    >
                      Strong Matches
                    </p>
                  </div>
                  <div
                    className={`rounded-xl p-4 text-center ${
                      isDarkMode ? "bg-white/5" : "bg-white"
                    }`}
                  >
                    <p
                      className={`text-2xl font-black ${
                        isDarkMode ? "text-[#f59e0b]" : "text-amber-600"
                      }`}
                    >
                      {Math.round(
                        careerPaths.reduce(
                          (sum, c) => sum + (c.matchPercentage || 0),
                          0
                        ) / careerPaths.length
                      )}
                      %
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        isDarkMode ? "text-[#a094b8]" : "text-slate-500"
                      }`}
                    >
                      Avg Match
                    </p>
                  </div>
                  <div
                    className={`rounded-xl p-4 text-center ${
                      isDarkMode ? "bg-white/5" : "bg-white"
                    }`}
                  >
                    <p
                      className={`text-2xl font-black ${
                        isDarkMode ? "text-[#3b82f6]" : "text-blue-600"
                      }`}
                    >
                      {[...new Set(careerPaths.map((c) => c.stream))].filter(
                        Boolean
                      ).length || 1}
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        isDarkMode ? "text-[#a094b8]" : "text-slate-500"
                      }`}
                    >
                      Streams
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/assessments")}
                  className={`mt-5 w-full py-3 text-sm font-bold rounded-xl border border-dashed transition-all ${
                    isDarkMode
                      ? "border-[#8b5cf6]/40 text-[#8b5cf6] bg-[#8b5cf6]/5 hover:bg-[#8b5cf6]/10"
                      : "border-primary/30 text-primary bg-primary/5 hover:bg-primary/10"
                  }`}
                >
                  + Discover More Career Matches
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Detail Popup */}
      {selectedCareer && (
        <DetailPopup
          career={selectedCareer}
          onClose={() => {
            setSelectedCareer(null);
            setActiveIndex(null);
          }}
          isDarkMode={isDarkMode}
          navigate={navigate}
        />
      )}

      <Footer />

      {/* Inline Animations */}
      <style>{`
        @keyframes popupIn {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes pingSlow {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          70% {
            transform: scale(1.3);
            opacity: 0;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }

        .animate-ping-slow {
          animation: pingSlow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes travelDown {
          0% {
            top: 0;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        .animate-travel-down {
          animation: travelDown 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CareerPaths;
