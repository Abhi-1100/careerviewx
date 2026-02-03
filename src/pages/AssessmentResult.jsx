import React from "react";
import Navbar from "../components/InternalNavbar"


export default function AssessmentResult() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-display">
      <Navbar/>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="text-center mb-16 relative">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10"></div>
          <span className="text-primary font-semibold tracking-widest uppercase text-xs">Analysis Finalized</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Your Career Intelligence Report</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">We've synchronized your behavioral patterns with industry benchmarks to identify your optimal career trajectory.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-6 space-y-8">
            <div className="bg-card-dark border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <span className="material-symbols-outlined text-6xl text-primary">hub</span>
              </div>

              <div className="relative w-72 h-72 md:w-[400px] md:h-[400px]">
                {/* SVG ring visual */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-slate-800" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="2"></circle>
                  <circle cx="50" cy="50" fill="transparent" r="45" stroke="url(#gradient-95)" strokeDasharray="282.7" strokeDashoffset="14" strokeLinecap="round" strokeWidth="8"></circle>
                  <circle className="text-slate-800" cx="50" cy="50" fill="transparent" r="35" stroke="currentColor" strokeWidth="2"></circle>
                  <circle cx="50" cy="50" fill="transparent" r="35" stroke="url(#gradient-88)" strokeDasharray="219.9" strokeDashoffset="26.4" strokeLinecap="round" strokeWidth="8"></circle>
                  <circle className="text-slate-800" cx="50" cy="50" fill="transparent" r="25" stroke="currentColor" strokeWidth="2"></circle>
                  <circle cx="50" cy="50" fill="transparent" r="25" stroke="url(#gradient-75)" strokeDasharray="157" strokeDashoffset="39.2" strokeLinecap="round" strokeWidth="8"></circle>
                  <defs>
                    <linearGradient id="gradient-95" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6"></stop>
                      <stop offset="100%" stopColor="#c084fc"></stop>
                    </linearGradient>
                    <linearGradient id="gradient-88" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#7c3aed"></stop>
                      <stop offset="100%" stopColor="#8b5cf6"></stop>
                    </linearGradient>
                    <linearGradient id="gradient-75" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#6d28d9"></stop>
                      <stop offset="100%" stopColor="#7c3aed"></stop>
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-5xl font-bold">95<span className="text-2xl text-primary font-light">%</span></span>
                  <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">Match Accuracy</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 w-full text-center">
                <div>
                  <div className="text-sm font-semibold text-slate-300">Data Science</div>
                  <div className="text-xs text-primary font-bold">95%</div>
                </div>
                <div className="border-x border-slate-800">
                  <div className="text-sm font-semibold text-slate-300">Engineering</div>
                  <div className="text-xs text-primary font-bold">88%</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-300">Architecture</div>
                  <div className="text-xs text-primary font-bold">75%</div>
                </div>
              </div>
            </div>

            <div className="bg-card-dark border border-slate-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">route</span>
                <h2 className="text-xl font-bold">Personalized Career Roadmap</h2>
              </div>

              <div className="space-y-6 relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-800"></div>

                <div className="relative flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center z-10 shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">Enrol in Advanced Python for Data Science</h4>
                    <p className="text-sm text-slate-400 mt-1">Strengthen your technical foundation by completing the "Python for Analytics" certification this month.</p>
                  </div>
                </div>

                <div className="relative flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center z-10 shrink-0">
                    <span className="text-slate-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">Build a Portfolio Project</h4>
                    <p className="text-sm text-slate-400 mt-1">Apply your analytical skills to a real-world dataset. Focus on visualization and insight communication.</p>
                  </div>
                </div>

                <div className="relative flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center z-10 shrink-0">
                    <span className="text-slate-400 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">Network with Industry Mentors</h4>
                    <p className="text-sm text-slate-400 mt-1">Join the FuturePath Alumni network and schedule two 15-minute coffee chats with Senior Data Scientists.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 bg-card-dark rounded-2xl border border-slate-800 shadow-xl ring-1 ring-primary/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">analytics</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Data Scientist</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-bold tracking-wider uppercase">95% Match</span>
                      <span className="material-icons text-primary text-sm">verified</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Avg. Salary</div>
                  <div className="text-lg font-bold text-emerald-400">$124,000</div>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-4">You excel at identifying patterns within noise. This career leverages your mathematical precision and curiosity.</p>

              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-500 uppercase">Key Skills Required</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs border border-slate-700">Machine Learning</span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs border border-slate-700">Statistical Modeling</span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs border border-slate-700">SQL/NoSQL</span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs border border-slate-700">Big Data</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card-dark rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">code</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-200">Software Engineer</h3>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold tracking-wider uppercase">88% Match</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Avg. Salary</div>
                  <div className="text-lg font-bold text-emerald-400/80">$112,000</div>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-4">Your logical workflow and ability to break down complex problems into atomic parts is highly valuable here.</p>

              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-500 uppercase">Key Skills Required</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs border border-slate-700">System Design</span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs border border-slate-700">Algorithms</span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs border border-slate-700">Git/DevOps</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card-dark rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">architecture</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-200">Architect</h3>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold tracking-wider uppercase">75% Match</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Avg. Salary</div>
                  <div className="text-lg font-bold text-emerald-400/80">$88,000</div>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-4">Your spatial reasoning and aesthetic sense suggest a natural talent for physical structure design.</p>

              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-500 uppercase">Key Skills Required</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs border border-slate-700">AutoCAD</span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs border border-slate-700">3D Modeling</span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs border border-slate-700">Urban Planning</span>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">psychology</span>
                <h2 className="text-lg font-bold">Strengths Analysis</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-300">Analytical</span>
                    <span className="text-sm font-bold text-primary">98%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `98%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-300">Creative Synthesis</span>
                    <span className="text-sm font-bold text-primary">84%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-primary/70 h-2 rounded-full" style={{ width: `84%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-300">Empathetic Leadership</span>
                    <span className="text-sm font-bold text-primary">76%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-primary/40 h-2 rounded-full" style={{ width: `76%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="group p-8 rounded-2xl bg-primary text-white relative overflow-hidden transition-all hover:ring-4 hover:ring-primary/30">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4">Unlock Full Potential</h2>
              <p className="text-white/80 mb-8 max-w-sm">Access a detailed roadmap for Data Science including university rankings, online courses, and networking tools.</p>
              <button className="bg-white text-primary font-bold py-3 px-8 rounded-lg flex items-center gap-2 hover:bg-slate-100 transition-colors">
                Explore Career Path
                <span className="material-icons text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
          </div>

          <div className="p-8 rounded-2xl bg-card-dark border border-slate-800 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Export Full Results</h2>
              <p className="text-slate-400 mb-8">Download your complete 24-page cognitive profile and career compatibility PDF report.</p>
            </div>
            <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 border border-slate-700 transition-colors">
              <span className="material-icons text-sm">file_download</span>
              Download PDF Report
            </button>
          </div>
        </section>

        <section className="bg-slate-900/40 rounded-3xl p-8 border border-slate-800/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">info</span>
                Methodology &amp; Verification
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">Our proprietary AI model compared your responses against 5,000+ industry professional profiles and psychological benchmarks. We prioritized long-term fulfillment and growth potential in your specific region.</p>
            </div>

            <div className="flex gap-4">
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-primary">120+</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Data Points</div>
              </div>
              <div className="h-10 w-[1px] bg-slate-800 self-center"></div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-primary">92%</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Relatability</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-20 py-12 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-sm">© 2024 FuturePath Career Intelligence. Empowering the next generation of leaders.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a className="text-xs text-slate-600 hover:text-primary transition-colors" href="#">Privacy Framework</a>
          <a className="text-xs text-slate-600 hover:text-primary transition-colors" href="#">Terms of Analysis</a>
          <a className="text-xs text-slate-600 hover:text-primary transition-colors" href="#">Support</a>
        </div>
      </footer>

    </div>
  );
}
