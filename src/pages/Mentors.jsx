import React, { useContext } from "react";
import InternalNavbar from "../components/InternalNavbar";
import Footer from "../components/Home/Footer";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Mentors = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div className={`mentors-page min-h-screen transition-colors duration-300 flex flex-col ${isDarkMode ? "bg-background-dark text-white" : "bg-surface-light text-charcoal"}`}>
      <InternalNavbar />

      <main className="flex-1 flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full px-4 lg:px-10 py-8 gap-8">
        <aside className="w-full lg:w-64 flex flex-col gap-6 shrink-0">
          <div className={`rounded-xl border p-6 flex flex-col gap-8 h-fit lg:sticky lg:top-24 transition-colors duration-300 ${isDarkMode ? "bg-card-dark border-border-dark" : "bg-white border-border-light"}`}>
            <div className="flex items-center justify-between">
              <h1 className={`text-lg font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Filters</h1>
              <button className="text-primary text-xs font-bold uppercase tracking-wider hover:text-primary-hover">Clear All</button>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className={`flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                  <span className="material-symbols-outlined text-xl text-primary">work</span>
                  <p className="text-sm font-bold">Industry</p>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input defaultChecked className={`rounded text-primary focus:ring-primary transition-all ${isDarkMode ? "border-border-dark bg-input-dark focus:ring-offset-background-dark" : "border-border-light bg-white focus:ring-offset-surface-light"}`} type="checkbox" />
                    <span className={`text-sm transition-colors duration-300 group-hover:font-semibold ${isDarkMode ? "text-gray-400 group-hover:text-white" : "text-slate-600 group-hover:text-charcoal"}`}>Technology</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className={`rounded text-primary focus:ring-primary transition-all ${isDarkMode ? "border-border-dark bg-input-dark focus:ring-offset-background-dark" : "border-border-light bg-white focus:ring-offset-surface-light"}`} type="checkbox" />
                    <span className={`text-sm transition-colors duration-300 group-hover:font-semibold ${isDarkMode ? "text-gray-400 group-hover:text-white" : "text-slate-600 group-hover:text-charcoal"}`}>Finance</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className={`rounded text-primary focus:ring-primary transition-all ${isDarkMode ? "border-border-dark bg-input-dark focus:ring-offset-background-dark" : "border-border-light bg-white focus:ring-offset-surface-light"}`} type="checkbox" />
                    <span className={`text-sm transition-colors duration-300 group-hover:font-semibold ${isDarkMode ? "text-gray-400 group-hover:text-white" : "text-slate-600 group-hover:text-charcoal"}`}>Design</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className={`rounded text-primary focus:ring-primary transition-all ${isDarkMode ? "border-border-dark bg-input-dark focus:ring-offset-background-dark" : "border-border-light bg-white focus:ring-offset-surface-light"}`} type="checkbox" />
                    <span className={`text-sm transition-colors duration-300 group-hover:font-semibold ${isDarkMode ? "text-gray-400 group-hover:text-white" : "text-slate-600 group-hover:text-charcoal"}`}>Marketing</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className={`flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                  <span className="material-symbols-outlined text-xl text-primary">trending_up</span>
                  <p className="text-sm font-bold">Experience</p>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className={`text-primary focus:ring-primary transition-all ${isDarkMode ? "border-border-dark bg-input-dark focus:ring-offset-background-dark" : "border-border-light bg-white focus:ring-offset-surface-light"}`} name="exp" type="radio" />
                    <span className={`text-sm transition-colors duration-300 group-hover:font-semibold ${isDarkMode ? "text-gray-400 group-hover:text-white" : "text-slate-600 group-hover:text-charcoal"}`}>Entry (1-3 yrs)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input defaultChecked className={`text-primary focus:ring-primary transition-all ${isDarkMode ? "border-border-dark bg-input-dark focus:ring-offset-background-dark" : "border-border-light bg-white focus:ring-offset-surface-light"}`} name="exp" type="radio" />
                    <span className={`text-sm transition-colors duration-300 group-hover:font-semibold ${isDarkMode ? "text-gray-400 group-hover:text-white" : "text-slate-600 group-hover:text-charcoal"}`}>Mid (4-7 yrs)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className={`text-primary focus:ring-primary transition-all ${isDarkMode ? "border-border-dark bg-input-dark focus:ring-offset-background-dark" : "border-border-light bg-white focus:ring-offset-surface-light"}`} name="exp" type="radio" />
                    <span className={`text-sm transition-colors duration-300 group-hover:font-semibold ${isDarkMode ? "text-gray-400 group-hover:text-white" : "text-slate-600 group-hover:text-charcoal"}`}>Senior (8+ yrs)</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className={`flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                  <span className="material-symbols-outlined text-xl text-primary">payments</span>
                  <p className="text-sm font-bold">Price Range</p>
                </div>
                <input className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary transition-colors duration-300 ${isDarkMode ? "bg-input-dark" : "bg-slate-200"}`} type="range" />
                <div className={`flex justify-between text-[10px] font-bold uppercase transition-colors duration-300 ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>
                  <span>$0</span>
                  <span>$200+</span>
                </div>
              </div>
            </div>
            <button className="w-full flex items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">
              Apply Filters
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col gap-6">
          <nav className="flex flex-wrap items-center gap-2">
            <a
              className={`text-sm font-medium transition-colors dur-300 hover:text-primary ${isDarkMode ? "text-gray-500" : "text-slate-600"}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/dashboard");
              }}
            >
              Home
            </a>
            <span className={`material-symbols-outlined text-sm transition-colors duration-300 ${isDarkMode ? "text-gray-600" : "text-slate-400"}`}>chevron_right</span>
            <span className="text-primary text-sm font-semibold">Mentor Marketplace</span>
          </nav>

          <div className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-6 p-8 rounded-xl border transition-colors duration-300 ${isDarkMode ? "bg-card-dark border-border-dark" : "bg-white border-border-light"}`}>
            <div className="flex flex-col gap-3">
              <p className={`text-4xl font-black leading-tight tracking-[-0.033em] transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Find your ideal mentor</p>
              <p className={`text-base font-normal max-w-lg transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>Connect with 1,200+ experts across industries to accelerate your career path with personalized guidance.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className={`flex items-center justify-center overflow-hidden rounded-lg h-11 px-6 text-sm font-bold transition-colors duration-300 ${isDarkMode ? "bg-input-dark text-white hover:bg-border-dark" : "bg-slate-100 text-charcoal hover:bg-slate-200"}`}>Trending</button>
              <button className="flex items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-all">New Arrivals</button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full border px-5 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isDarkMode ? "bg-primary/20 border-primary/30 text-primary" : "bg-primary/10 border-primary/20 text-primary"}`}>All Tech <span className="material-symbols-outlined text-base">close</span></button>
            <button className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full border px-5 text-xs font-bold uppercase tracking-wider transition-colors duration-300 hover:border-primary ${isDarkMode ? "bg-card-dark border-border-dark text-white" : "bg-white border-border-light text-charcoal"}`}>Product Design <span className={`material-symbols-outlined text-base transition-colors duration-300 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>expand_more</span></button>
            <button className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full border px-5 text-xs font-bold uppercase tracking-wider transition-colors duration-300 hover:border-primary ${isDarkMode ? "bg-card-dark border-border-dark text-white" : "bg-white border-border-light text-charcoal"}`}>Engineering <span className={`material-symbols-outlined text-base transition-colors duration-300 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>expand_more</span></button>
            <button className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full border px-5 text-xs font-bold uppercase tracking-wider transition-colors duration-300 hover:border-primary ${isDarkMode ? "bg-card-dark border-border-dark text-white" : "bg-white border-border-light text-charcoal"}`}>Management <span className={`material-symbols-outlined text-base transition-colors duration-300 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>expand_more</span></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Repeat card examples - kept static to match design */}
            <div className={`rounded-xl border p-6 flex flex-col gap-6 transition-all duration-300 group relative overflow-hidden ${isDarkMode ? "bg-card-dark border-border-dark hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10" : "bg-white border-border-light hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"}`}>
              <div className="flex items-start gap-4">
                <div className={`size-16 rounded-xl bg-center bg-cover border-2 transition-colors duration-300 ${isDarkMode ? "border-primary/20" : "border-primary/20"}`} style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBbRvQFEZhhuLMCh3UlYIqMpIJDKEkLtGHbc0tvCGJRVRd3ESnjpkwIi0arspkpz6yYONUdkhrjVAqaHu1bGbT48wbJjitw_dPyu6_p10A9iLB_LpxZMXJizUha_dkOERZmzAATvCnaMZnZ3dVUr4uL8IJ10cXzLHCc4c5D7Ovoj8qAy4l9zN1_fO0gpWa4qW2T6ge2H_v9q-szHR3ZKUcO3qxRo7Uo5MX7kJjYH-fThTEXYULqkCRwlkPYN2lpWOHigkaxfD-7Wjo")'}}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-bold text-lg transition-colors duration-300 group-hover:text-primary ${isDarkMode ? "text-white" : "text-charcoal"}`}>Sarah Jenkins</h3>
                    <div className="flex items-center gap-1 text-amber-500"><span className="material-symbols-outlined text-lg fill-1">star</span><span className={`text-sm font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>4.9</span></div>
                  </div>
                  <p className={`text-xs font-medium transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>Senior UX Designer @ Google</p>
                  <div className="mt-3 flex flex-wrap gap-1.5"><span className={`px-2.5 py-1 rounded text-[10px] font-bold transition-colors duration-300 ${isDarkMode ? "bg-input-dark text-gray-300 border border-border-dark/50" : "bg-slate-100 text-slate-600 border border-border-light"}`}>UX Design</span><span className={`px-2.5 py-1 rounded text-[10px] font-bold transition-colors duration-300 ${isDarkMode ? "bg-input-dark text-gray-300 border border-border-dark/50" : "bg-slate-100 text-slate-600 border border-border-light"}`}>Portfolios</span></div>
                </div>
              </div>
              <div className={`border-t border-dashed pt-5 flex items-center justify-between transition-colors duration-300 ${isDarkMode ? "border-border-dark" : "border-border-light"}`}>
                <div className="flex flex-col">
                  <span className={`text-[10px] font-bold uppercase tracking-tighter transition-colors duration-300 ${isDarkMode ? "text-gray-500" : "text-slate-600"}`}>Starting at</span>
                  <span className={`text-xl font-black transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>$75<small className={`text-xs font-normal transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>/hr</small></span>
                </div>
                <button className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">Book Session</button>
              </div>
            </div>

            {/* Additional static cards copied from design omitted for brevity - you can duplicate above structure as needed */}
          </div>

          <div className="flex items-center justify-center gap-4 py-12">
            <button className={`flex items-center justify-center rounded-lg h-10 w-10 transition-colors duration-300 ${isDarkMode ? "bg-card-dark border border-border-dark text-white hover:border-primary" : "bg-white border border-border-light text-charcoal hover:border-primary"}`}><span className="material-symbols-outlined">chevron_left</span></button>
            <div className="flex items-center gap-2">
              <button className="h-10 w-10 rounded-lg bg-primary text-white font-bold">1</button>
              <button className={`h-10 w-10 rounded-lg border font-bold transition-colors duration-300 ${isDarkMode ? "bg-card-dark border-border-dark text-white hover:border-primary" : "bg-white border-border-light text-charcoal hover:border-primary"}`}>2</button>
              <button className={`h-10 w-10 rounded-lg border font-bold transition-colors duration-300 ${isDarkMode ? "bg-card-dark border-border-dark text-white hover:border-primary" : "bg-white border-border-light text-charcoal hover:border-primary"}`}>3</button>
              <span className={`px-2 font-black transition-colors duration-300 ${isDarkMode ? "text-gray-600" : "text-slate-400"}`}>...</span>
              <button className={`h-10 w-10 rounded-lg border font-bold transition-colors duration-300 ${isDarkMode ? "bg-card-dark border-border-dark text-white hover:border-primary" : "bg-white border-border-light text-charcoal hover:border-primary"}`}>24</button>
            </div>
            <button className={`flex items-center justify-center rounded-lg h-10 w-10 transition-colors duration-300 ${isDarkMode ? "bg-card-dark border border-border-dark text-white hover:border-primary" : "bg-white border border-border-light text-charcoal hover:border-primary"}`}><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Mentors;
