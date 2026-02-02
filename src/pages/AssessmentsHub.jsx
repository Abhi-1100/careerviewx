import React from "react";
import { useNavigate } from "react-router-dom";
import InternalNavbar from "../components/InternalNavbar";

export default function AssessmentsHub() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <InternalNavbar />

      <main className="flex-1 px-4 lg:px-40 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex flex-col gap-6">
            <div className="glass-panel p-6 rounded-xl glow-violet">
              <div className="flex flex-col mb-6">
                <h1 className="text-white text-lg font-bold">Quick Stats</h1>
                <p className="text-primary text-xs font-semibold uppercase tracking-wider mt-1">Activity Tracking</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-white text-3xl font-extrabold">12</p>
                  <p className="text-white/50 text-xs font-medium uppercase tracking-tight leading-normal">Assessments Taken</p>
                </div>
                <div className="flex flex-col gap-1 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-primary text-3xl font-extrabold">Tech</p>
                  <p className="text-primary/70 text-xs font-medium uppercase tracking-tight leading-normal">Top Interest</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-8">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 cursor-pointer transition-all" onClick={() => navigate('/dashboard')}>
                  <span className="material-symbols-outlined text-lg">grid_view</span>
                  <p className="text-sm font-medium">Overview</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white shadow-lg shadow-primary/20 cursor-pointer" onClick={() => navigate('/assessments')}>
                  <span className="material-symbols-outlined text-lg">history</span>
                  <p className="text-sm font-semibold">Assessment Hub</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 cursor-pointer transition-all" onClick={() => navigate('/career-paths')}>
                  <span className="material-symbols-outlined text-lg">star</span>
                  <p className="text-sm font-medium">Recommendations</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 cursor-pointer transition-all" onClick={() => navigate('/settings')}>
                  <span className="material-symbols-outlined text-lg">settings</span>
                  <p className="text-sm font-medium">Preferences</p>
                </div>
              </div>
              <button className="mt-8 w-full flex items-center justify-center gap-2 rounded-lg h-11 bg-white/5 border border-white/10 text-white hover:bg-white/10 text-sm font-bold transition-all">
                <span className="material-symbols-outlined text-lg">download</span>
                <span>Export Data</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="@container">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="flex min-h-[320px] lg:min-h-[400px] flex-col gap-6 items-start justify-end p-8 lg:p-12 relative z-10">
                  <div className="flex flex-col gap-4 max-w-2xl">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-widest text-white mb-2">
                      Personalized Guidance
                    </div>
                    <h1 className="text-white text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight">Unlock Your <br /><span className="text-primary-light">Future Potential</span></h1>
                    <p className="text-white/80 text-base lg:text-lg font-medium leading-relaxed max-w-lg">Take our scientifically-backed assessments to discover the career path that fits your personality and skills perfectly.</p>
                  </div>
                  <button onClick={() => navigate('/assessments/quest')} className="mt-4 flex items-center justify-center gap-3 rounded-xl h-14 px-8 bg-primary text-white text-base font-bold shadow-2xl shadow-primary/40 hover:scale-[1.02] transition-transform active:scale-95">
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
                <h2 className="text-white text-2xl font-bold tracking-tight">Your Assessment History</h2>
                <div className="flex gap-2">
                  <button className="glass-panel p-2 rounded-lg text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined">filter_list</span></button>
                  <button className="glass-panel p-2 rounded-lg text-white/60 hover:text-white transition-colors"><span className="material-symbols-outlined">sort</span></button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="glass-panel p-5 rounded-xl flex flex-wrap lg:flex-nowrap items-center gap-6 group hover:bg-white/5 transition-all">
                  <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-2 border-2 border-primary/40 rounded-sm border-dashed"></div>
                    <span className="material-symbols-outlined text-primary text-3xl">analytics</span>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="text-white text-lg font-bold group-hover:text-primary transition-colors">Comprehensive Career Aptitude</h3>
                    <p className="text-white/40 text-sm flex items-center gap-2 mt-1"><span className="material-symbols-outlined text-sm">calendar_month</span> Oct 24, 2023</p>
                  </div>
                  <div className="flex flex-col gap-1 items-start lg:items-center min-w-[140px]">
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Top Match</p>
                    <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Software Engineer</span>
                  </div>
                  <div className="flex flex-col gap-1 items-start lg:items-center min-w-[120px]">
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Compatibility</p>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-[94%] bg-primary"></div></div>
                      <span className="text-white font-bold text-sm">94%</span>
                    </div>
                  </div>
                  <button className="flex-shrink-0 w-full lg:w-auto px-6 py-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-bold hover:bg-primary hover:text-white transition-all">View Full Report</button>
                </div>

                <div className="glass-panel p-5 rounded-xl flex flex-wrap lg:flex-nowrap items-center gap-6 group hover:bg-white/5 transition-all">
                  <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined text-white/30 text-3xl">psychology</span></div>
                  <div className="flex-1 min-w-[200px]"><h3 className="text-white text-lg font-bold group-hover:text-primary transition-colors">Personality &amp; Leadership Style</h3><p className="text-white/40 text-sm flex items-center gap-2 mt-1"><span className="material-symbols-outlined text-sm">calendar_month</span> Sep 12, 2023</p></div>
                  <div className="flex flex-col gap-1 items-start lg:items-center min-w-[140px]"><p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Top Match</p><span className="text-white font-bold bg-white/10 px-3 py-1 rounded-full border border-white/10">Product Manager</span></div>
                  <div className="flex flex-col gap-1 items-start lg:items-center min-w-[120px]"><p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Compatibility</p><div className="flex items-center gap-2"><div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-[82%] bg-white/40"></div></div><span className="text-white font-bold text-sm">82%</span></div></div>
                  <button className="flex-shrink-0 w-full lg:w-auto px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm font-bold hover:bg-primary hover:text-white hover:border-primary transition-all">View Full Report</button>
                </div>

                <div className="glass-panel p-5 rounded-xl flex flex-wrap lg:flex-nowrap items-center gap-6 group hover:bg-white/5 transition-all">
                  <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined text-white/30 text-3xl">architecture</span></div>
                  <div className="flex-1 min-w-[200px]"><h3 className="text-white text-lg font-bold group-hover:text-primary transition-colors">Design Thinking &amp; Creativity</h3><p className="text-white/40 text-sm flex items-center gap-2 mt-1"><span className="material-symbols-outlined text-sm">calendar_month</span> Aug 05, 2023</p></div>
                  <div className="flex flex-col gap-1 items-start lg:items-center min-w-[140px]"><p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Top Match</p><span className="text-white font-bold bg-white/10 px-3 py-1 rounded-full border border-white/10">UI/UX Designer</span></div>
                  <div className="flex flex-col gap-1 items-start lg:items-center min-w-[120px]"><p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Compatibility</p><div className="flex items-center gap-2"><div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-[89%] bg-white/40"></div></div><span className="text-white font-bold text-sm">89%</span></div></div>
                  <button className="flex-shrink-0 w-full lg:w-auto px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm font-bold hover:bg-primary hover:text-white hover:border-primary transition-all">View Full Report</button>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button className="text-primary hover:text-primary/80 text-sm font-bold flex items-center gap-2 px-6 py-2 rounded-full border border-primary/20 hover:bg-primary/5 transition-all">Load older assessments <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span></button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
