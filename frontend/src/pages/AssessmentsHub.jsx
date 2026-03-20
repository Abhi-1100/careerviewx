import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InternalNavbar from "../components/InternalNavbar";
import { getAssessmentHistory } from "../Services/api";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/internalfooter";

const careerIconMap = {
  engineering: { icon: "engineering", color: "text-orange-400", bg: "bg-orange-400/10" },
  it: { icon: "code", color: "text-blue-400", bg: "bg-blue-400/10" },
  medical: { icon: "health_and_safety", color: "text-green-400", bg: "bg-green-400/10" },
  design: { icon: "palette", color: "text-pink-400", bg: "bg-pink-400/10" },
  business: { icon: "analytics", color: "text-primary", bg: "bg-primary/10" },
  government: { icon: "gavel", color: "text-yellow-400", bg: "bg-yellow-400/10" },
};

const careerLabelMap = {
  engineering: "Engineer",
  it: "IT Professional",
  medical: "Medical Professional",
  design: "UX / UI Designer",
  business: "Business Analyst",
  government: "Government Officer",
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AssessmentsHub() {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getAssessmentHistory();
        if (res.data.success) {
          setHistory(res.data.history);
        }
      } catch (err) {
        console.error("Failed to fetch assessment history:", err);
      } finally {
        setLoadingHistory(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className={`min-h-screen font-display flex flex-col transition-colors duration-300 ${isDarkMode ? "bg-background-dark text-white" : "bg-surface-light text-charcoal"}`}>
      <InternalNavbar />

      <main className="flex-1 px-4 lg:px-40 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex flex-col gap-6">
            <div className={`p-6 rounded-xl ${isDarkMode ? "glow-violet glass-panel" : "bg-white border border-border-light shadow-lg"}`}>
              <div className="flex flex-col mb-6">
                <h1 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-charcoal"}`}>Quick Stats</h1>
                <p className="text-primary text-xs font-semibold uppercase tracking-wider mt-1">Activity Tracking</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className={`flex flex-col gap-1 p-4 rounded-lg ${isDarkMode ? "bg-white/5 border border-white/10" : "bg-slate-50 border border-slate-200"}`}>
                  <p className={`text-3xl font-extrabold ${isDarkMode ? "text-white" : "text-charcoal"}`}>{history.length}</p>
                  <p className={`text-xs font-medium uppercase tracking-tight leading-normal ${isDarkMode ? "text-white/50" : "text-slate-500"}`}>Assessments Taken</p>
                </div>
                <div className="flex flex-col gap-1 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-primary text-3xl font-extrabold">Tech</p>
                  <p className="text-primary/70 text-xs font-medium uppercase tracking-tight leading-normal">Top Interest</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-8">
                <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${isDarkMode ? "text-white/70 hover:bg-white/5" : "text-slate-600 hover:bg-slate-100"}`} onClick={() => navigate('/dashboard')}>
                  <span className="material-symbols-outlined text-lg">grid_view</span>
                  <p className="text-sm font-medium">Overview</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white shadow-lg cursor-pointer bg-primary shadow-primary/20" onClick={() => navigate('/assessments')}>
                  <span className="material-symbols-outlined text-lg">history</span>
                  <p className="text-sm font-semibold">Assessment Hub</p>
                </div>
                <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${isDarkMode ? "text-white/70 hover:bg-white/5" : "text-slate-600 hover:bg-slate-100"}`} onClick={() => navigate('/career-paths')}>
                  <span className="material-symbols-outlined text-lg">star</span>
                  <p className="text-sm font-medium">Recommendations</p>
                </div>
                <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${isDarkMode ? "text-white/70 hover:bg-white/5" : "text-slate-600 hover:bg-slate-100"}`} onClick={() => navigate('/settings')}>
                  <span className="material-symbols-outlined text-lg">settings</span>
                  <p className="text-sm font-medium">Preferences</p>
                </div>
              </div>
              <button className={`mt-8 w-full flex items-center justify-center gap-2 rounded-lg h-11 text-sm font-bold ${isDarkMode ? "bg-white/5 border border-white/10 text-white hover:bg-white/10" : "bg-slate-100 border border-slate-200 text-charcoal hover:bg-slate-200"}`}>
                <span className="material-symbols-outlined text-lg">download</span>
                <span>Export Data</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="@container">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="flex min-h-[320px] lg:min-h-[400px] flex-col gap-6 items-start justify-end p-8 lg:p-12 relative z-10 text-white">
                  <div className="flex flex-col gap-4 max-w-2xl">
                    <div className="inline-flex items-center px-3 py-1 rounded-full backdrop-blur-md border text-xs font-bold uppercase tracking-widest mb-2 bg-white/20 border-white/30 text-white">
                      Personalized Guidance
                    </div>
                    <h1 className="text-white text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight">Unlock Your <br /><span className="text-primary-light">Future Potential</span></h1>
                    <p className="text-white/80 text-base lg:text-lg font-medium leading-relaxed max-w-lg">Take our scientifically-backed assessments to discover the career path that fits your personality and skills perfectly.</p>
                  </div>
                  <button onClick={() => navigate('/assessments/quest')} className="mt-4 flex items-center justify-center gap-3 rounded-xl h-14 px-8 bg-primary text-base font-bold shadow-2xl shadow-primary/40 hover:scale-[1.02] transition-all active:scale-95 text-charcoal">
                    <span className="material-symbols-outlined">add_task</span>
                    <span>Start New Assessment</span>
                  </button>
                </div>
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary via-[#151022] to-[#2e2249]"></div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/20 to-transparent opacity-50 blur-3xl pointer-events-none"></div>
                <div className="absolute -top-24 -left-24 h-64 w-64 bg-primary/30 rounded-full blur-[100px] pointer-events-none"></div>
              </div>
            </div>

            {/* Assessment History Section */}
            <section>
              <div className="flex items-center justify-between mb-6 px-2">
                <h2 className={`text-2xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-charcoal"}`}>Your Assessment History</h2>
              </div>

              {loadingHistory ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
              ) : history.length === 0 ? (
                <div className={`p-10 rounded-xl flex flex-col items-center justify-center gap-4 text-center ${isDarkMode ? "glass-panel" : "bg-white border border-border-light shadow-sm"}`}>
                  <span className={`material-symbols-outlined text-5xl ${isDarkMode ? "text-white/20" : "text-slate-300"}`}>history</span>
                  <p className={`text-base ${isDarkMode ? "text-white/50" : "text-slate-500"}`}>No assessments taken yet.</p>
                  <button onClick={() => navigate('/assessments/quest')} className="mt-2 px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all">
                    Take Your First Assessment
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {history.slice(0, visibleCount).map((item, index) => {
                    const key = item.recommendedCareer?.toLowerCase() || "business";
                    const meta = careerIconMap[key] || careerIconMap.business;
                    const label = careerLabelMap[key] || item.recommendedCareer;
                    const match = item.matchPercentage || 85;
                    const isLatest = index === 0;
                    return (
                      <div key={item._id || index} className={`p-5 rounded-xl flex flex-wrap lg:flex-nowrap items-center gap-6 group transition-all ${isDarkMode ? "glass-panel hover:bg-white/5" : "bg-white border border-border-light shadow-sm hover:bg-slate-50"} ${isLatest ? "border border-primary/30" : ""}`}>
                        <div className={`w-16 h-16 rounded-lg ${meta.bg} flex items-center justify-center flex-shrink-0 relative overflow-hidden`}>
                          {isLatest && <div className="absolute inset-2 border-2 border-primary/40 rounded-sm border-dashed"></div>}
                          <span className={`material-symbols-outlined ${meta.color} text-3xl`}>{meta.icon}</span>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                          <div className="flex items-center gap-2">
                            <h3 className={`text-lg font-bold group-hover:text-primary transition-colors capitalize ${isDarkMode ? "text-white" : "text-charcoal"}`}>{key} Assessment</h3>
                            {isLatest && <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full border border-primary/30">Latest</span>}
                          </div>
                          <p className={`text-sm flex items-center gap-2 mt-1 ${isDarkMode ? "text-white/40" : "text-slate-500"}`}>
                            <span className="material-symbols-outlined text-sm">calendar_month</span>
                            {formatDate(item.takenAt)}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 items-start lg:items-center min-w-[140px]">
                          <p className={`text-[10px] uppercase font-bold tracking-widest ${isDarkMode ? "text-white/40" : "text-slate-500"}`}>Top Match</p>
                          <span className={`font-bold px-3 py-1 rounded-full border text-sm ${isLatest ? "text-primary bg-primary/10 border-primary/20" : isDarkMode ? "text-white bg-white/10 border-white/10" : "text-charcoal bg-slate-100 border-slate-200"}`}>{label}</span>
                        </div>
                        <div className="flex flex-col gap-1 items-start lg:items-center min-w-[120px]">
                          <p className={`text-[10px] uppercase font-bold tracking-widest ${isDarkMode ? "text-white/40" : "text-slate-500"}`}>Compatibility</p>
                          <div className="flex items-center gap-2">
                            <div className={`h-1.5 w-24 rounded-full overflow-hidden ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`}>
                              <div className={`h-full ${isLatest ? "bg-primary" : isDarkMode ? "bg-white/40" : "bg-slate-400"}`} style={{ width: `${match}%` }}></div>
                            </div>
                            <span className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-charcoal"}`}>{match}%</span>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate("/career-result", { state: { recommendedCareer: item.recommendedCareer, scores: item.scores } })}
                          className={`flex-shrink-0 w-full lg:w-auto px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${isLatest
                            ? "bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-white"
                            : "bg-white/5 border border-white/10 text-white/60 hover:bg-primary hover:text-white hover:border-primary"
                            }`}
                        >
                          View Report
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {history.length > visibleCount && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setVisibleCount(v => v + 5)}
                    className="text-primary hover:text-primary/80 text-sm font-bold flex items-center gap-2 px-6 py-2 rounded-full border border-primary/20 hover:bg-primary/5 transition-all"
                  >
                    Load older assessments <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
