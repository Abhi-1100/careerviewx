import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import InternalNavbar from "../components/InternalNavbar";
import Footer from "../components/Home/Footer";
import { ThemeContext } from "../context/ThemeContext";

export default function AssessmentsHub() {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen font-display flex flex-col transition-colors duration-300 ${isDarkMode ? "bg-background-dark text-white" : "bg-surface-light text-charcoal"}`}>
      <InternalNavbar />

      <main className="flex-1 px-4 lg:px-40 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex flex-col gap-6">
            <div className={`p-6 rounded-xl glow-violet transition-colors duration-300 ${isDarkMode ? "glass-panel" : "bg-white border border-border-light shadow-sm"}`}>
              <div className="flex flex-col mb-6">
                <h1 className={`text-lg font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Quick Stats</h1>
                <p className="text-primary text-xs font-semibold uppercase tracking-wider mt-1">Activity Tracking</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className={`flex flex-col gap-1 p-4 rounded-lg border transition-colors duration-300 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-100 border-border-light"}`}>
                  <p className={`text-3xl font-extrabold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>12</p>
                  <p className={`text-xs font-medium uppercase tracking-tight leading-normal transition-colors duration-300 ${isDarkMode ? "text-white/50" : "text-slate-600"}`}>Assessments Taken</p>
                </div>
                <div className={`flex flex-col gap-1 p-4 rounded-lg border transition-colors duration-300 ${isDarkMode ? "bg-primary/10 border-primary/20" : "bg-primary/10 border-primary/20"}`}>
                  <p className="text-primary text-3xl font-extrabold">Tech</p>
                  <p className={`text-xs font-medium uppercase tracking-tight leading-normal transition-colors duration-300 ${isDarkMode ? "text-primary/70" : "text-primary/80"}`}>Top Interest</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-8">
                <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${isDarkMode ? "text-white/70 hover:bg-white/5" : "text-slate-600 hover:bg-slate-100"}`} onClick={() => navigate('/dashboard')}>
                  <span className="material-symbols-outlined text-lg">grid_view</span>
                  <p className="text-sm font-medium">Overview</p>
                </div>
                <div className={`flex items-center gap-3 px-3 py-2 rounded-lg text-white shadow-lg cursor-pointer transition-colors duration-300 ${isDarkMode ? "bg-primary shadow-primary/20" : "bg-primary shadow-primary/20"}`} onClick={() => navigate('/assessments')}>
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
              <button className={`mt-8 w-full flex items-center justify-center gap-2 rounded-lg h-11 text-sm font-bold transition-all ${isDarkMode ? "bg-white/5 border border-white/10 text-white hover:bg-white/10" : "bg-slate-100 border border-border-light text-charcoal hover:bg-slate-200"}`}>
                <span className="material-symbols-outlined text-lg">download</span>
                <span>Export Data</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="@container">
              <div className="relative overflow-hidden rounded-2xl">
                <div className={`flex min-h-[320px] lg:min-h-[400px] flex-col gap-6 items-start justify-end p-8 lg:p-12 relative z-10 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-white"}`}>
                  <div className="flex flex-col gap-4 max-w-2xl">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full backdrop-blur-md border text-xs font-bold uppercase tracking-widest mb-2 transition-colors duration-300 ${isDarkMode ? "bg-white/20 border-white/30 text-white" : "bg-white/20 border-white/30 text-white"}`}>
                      Personalized Guidance
                    </div>
                    <h1 className="text-white text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight">Unlock Your <br /><span className="text-primary-light">Future Potential</span></h1>
                    <p className="text-white/80 text-base lg:text-lg font-medium leading-relaxed max-w-lg">Take our scientifically-backed assessments to discover the career path that fits your personality and skills perfectly.</p>
                  </div>
                  <button onClick={() => navigate('/assessments/quest')} className={`mt-4 flex items-center justify-center gap-3 rounded-xl h-14 px-8 bg-primary text-base font-bold shadow-2xl shadow-primary/40 hover:scale-[1.02] transition-all active:scale-95 ${isDarkMode ? "text-white" : "text-charcoal"}`}>
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
                <h2 className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Your Assessment History</h2>
                <div className="flex gap-2">
                  <button className={`p-2 rounded-lg transition-colors duration-300 ${isDarkMode ? "glass-panel text-white/60 hover:text-white" : "border border-border-light text-slate-600 hover:text-charcoal"}`}><span className="material-symbols-outlined">filter_list</span></button>
                  <button className={`p-2 rounded-lg transition-colors duration-300 ${isDarkMode ? "glass-panel text-white/60 hover:text-white" : "border border-border-light text-slate-600 hover:text-charcoal"}`}><span className="material-symbols-outlined">sort</span></button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className={`p-5 rounded-xl flex flex-wrap lg:flex-nowrap items-center gap-6 group transition-all ${isDarkMode ? "glass-panel hover:bg-white/5" : "bg-white border border-border-light hover:shadow-md"}`}>
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-primary/20" : "bg-primary/10"}`}>
                    <div className={`absolute inset-2 border-2 rounded-sm border-dashed transition-colors duration-300 ${isDarkMode ? "border-primary/40" : "border-primary/30"}`}></div>
                    <span className="material-symbols-outlined text-primary text-3xl">analytics</span>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <h3 className={`text-lg font-bold group-hover:text-primary transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Comprehensive Career Aptitude</h3>
                    <p className={`text-sm flex items-center gap-2 mt-1 transition-colors duration-300 ${isDarkMode ? "text-white/40" : "text-slate-600"}`}><span className="material-symbols-outlined text-sm">calendar_month</span> Oct 24, 2023</p>
                  </div>
                  <div className="flex flex-col gap-1 items-start lg:items-center min-w-[140px]">
                    <p className={`text-[10px] uppercase font-bold tracking-widest transition-colors duration-300 ${isDarkMode ? "text-white/40" : "text-slate-600"}`}>Top Match</p>
                    <span className={`font-bold px-3 py-1 rounded-full border transition-colors duration-300 ${isDarkMode ? "text-primary bg-primary/10 border-primary/20" : "text-primary bg-primary/10 border-primary/20"}`}>Software Engineer</span>
                  </div>
                  <div className="flex flex-col gap-1 items-start lg:items-center min-w-[120px]">
                    <p className={`text-[10px] uppercase font-bold tracking-widest transition-colors duration-300 ${isDarkMode ? "text-white/40" : "text-slate-600"}`}>Compatibility</p>
                    <div className="flex items-center gap-2">
                      <div className={`h-1.5 w-24 rounded-full overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`}><div className="h-full w-[94%] bg-primary"></div></div>
                      <span className={`font-bold text-sm transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>94%</span>
                    </div>
                  </div>
                  <button className={`flex-shrink-0 w-full lg:w-auto px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${isDarkMode ? "bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-white" : "bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-white"}`}>View Full Report</button>
                </div>

                <div className={`p-5 rounded-xl flex flex-wrap lg:flex-nowrap items-center gap-6 group transition-all ${isDarkMode ? "glass-panel hover:bg-white/5" : "bg-white border border-border-light hover:shadow-md"}`}>
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isDarkMode ? "bg-white/5" : "bg-slate-100"}`}><span className={`material-symbols-outlined text-3xl transition-colors duration-300 ${isDarkMode ? "text-white/30" : "text-slate-400"}`}>psychology</span></div>
                  <div className="flex-1 min-w-[200px]"><h3 className={`text-lg font-bold group-hover:text-primary transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Personality &amp; Leadership Style</h3><p className={`text-sm flex items-center gap-2 mt-1 transition-colors duration-300 ${isDarkMode ? "text-white/40" : "text-slate-600"}`}><span className="material-symbols-outlined text-sm">calendar_month</span> Sep 12, 2023</p></div>
                  <div className="flex flex-col gap-1 items-start lg:items-center min-w-[140px]"><p className={`text-[10px] uppercase font-bold tracking-widest transition-colors duration-300 ${isDarkMode ? "text-white/40" : "text-slate-600"}`}>Top Match</p><span className={`font-bold px-3 py-1 rounded-full border transition-colors duration-300 ${isDarkMode ? "text-white bg-white/10 border-white/10" : "text-charcoal bg-slate-100 border-border-light"}`}>Product Manager</span></div>
                  <div className="flex flex-col gap-1 items-start lg:items-center min-w-[120px]"><p className={`text-[10px] uppercase font-bold tracking-widest transition-colors duration-300 ${isDarkMode ? "text-white/40" : "text-slate-600"}`}>Compatibility</p><div className="flex items-center gap-2"><div className={`h-1.5 w-24 rounded-full overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`}><div className={`h-full w-[82%] transition-colors duration-300 ${isDarkMode ? "bg-white/40" : "bg-slate-400"}`}></div></div><span className={`font-bold text-sm transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>82%</span></div></div>
                  <button className={`flex-shrink-0 w-full lg:w-auto px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${isDarkMode ? "bg-white/5 border border-white/10 text-white/60 hover:bg-primary hover:text-white hover:border-primary" : "bg-slate-100 border border-border-light text-slate-600 hover:bg-primary hover:text-white"}`}>View Full Report</button>
                </div>

                <div className={`p-5 rounded-xl flex flex-wrap lg:flex-nowrap items-center gap-6 group transition-all ${isDarkMode ? "glass-panel hover:bg-white/5" : "bg-white border border-border-light hover:shadow-md"}`}>
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${isDarkMode ? "bg-white/5" : "bg-slate-100"}`}><span className={`material-symbols-outlined text-3xl transition-colors duration-300 ${isDarkMode ? "text-white/30" : "text-slate-400"}`}>architecture</span></div>
                  <div className="flex-1 min-w-[200px]"><h3 className={`text-lg font-bold group-hover:text-primary transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Design Thinking &amp; Creativity</h3><p className={`text-sm flex items-center gap-2 mt-1 transition-colors duration-300 ${isDarkMode ? "text-white/40" : "text-slate-600"}`}><span className="material-symbols-outlined text-sm">calendar_month</span> Aug 05, 2023</p></div>
                  <div className="flex flex-col gap-1 items-start lg:items-center min-w-[140px]"><p className={`text-[10px] uppercase font-bold tracking-widest transition-colors duration-300 ${isDarkMode ? "text-white/40" : "text-slate-600"}`}>Top Match</p><span className={`font-bold px-3 py-1 rounded-full border transition-colors duration-300 ${isDarkMode ? "text-white bg-white/10 border-white/10" : "text-charcoal bg-slate-100 border-border-light"}`}>UI/UX Designer</span></div>
                  <div className="flex flex-col gap-1 items-start lg:items-center min-w-[120px]"><p className={`text-[10px] uppercase font-bold tracking-widest transition-colors duration-300 ${isDarkMode ? "text-white/40" : "text-slate-600"}`}>Compatibility</p><div className="flex items-center gap-2"><div className={`h-1.5 w-24 rounded-full overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`}><div className={`h-full w-[89%] transition-colors duration-300 ${isDarkMode ? "bg-white/40" : "bg-slate-400"}`}></div></div><span className={`font-bold text-sm transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>89%</span></div></div>
                  <button className={`flex-shrink-0 w-full lg:w-auto px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${isDarkMode ? "bg-white/5 border border-white/10 text-white/60 hover:bg-primary hover:text-white hover:border-primary" : "bg-slate-100 border border-border-light text-slate-600 hover:bg-primary hover:text-white"}`}>View Full Report</button>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button className={`text-sm font-bold flex items-center gap-2 px-6 py-2 rounded-full border transition-all ${isDarkMode ? "text-primary border-primary/20 hover:bg-primary/5" : "text-primary border-primary/20 hover:bg-primary/5"}`}>Load older assessments <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span></button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
