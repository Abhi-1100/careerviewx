import React from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import { useNavigate } from "react-router-dom";

const Mentors = () => {
  const navigate = useNavigate();
  return (
    <div className="mentors-page">
      <Navbar />

      <main className="flex-1 flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full px-4 lg:px-10 py-8 gap-8">
        <aside className="w-full lg:w-64 flex flex-col gap-6 shrink-0">
          <div className="bg-card-dark rounded-xl border border-border-dark p-6 flex flex-col gap-8 h-fit lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h1 className="text-white text-lg font-bold">Filters</h1>
              <button className="text-primary text-xs font-bold uppercase tracking-wider hover:text-primary-hover">Clear All</button>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-xl text-primary">work</span>
                  <p className="text-sm font-bold">Industry</p>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input defaultChecked className="rounded border-border-dark bg-input-dark text-primary focus:ring-primary focus:ring-offset-background-dark size-4 transition-all" type="checkbox" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Technology</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="rounded border-border-dark bg-input-dark text-primary focus:ring-primary focus:ring-offset-background-dark size-4 transition-all" type="checkbox" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Finance</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="rounded border-border-dark bg-input-dark text-primary focus:ring-primary focus:ring-offset-background-dark size-4 transition-all" type="checkbox" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Design</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="rounded border-border-dark bg-input-dark text-primary focus:ring-primary focus:ring-offset-background-dark size-4 transition-all" type="checkbox" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Marketing</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-xl text-primary">trending_up</span>
                  <p className="text-sm font-bold">Experience</p>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="border-border-dark bg-input-dark text-primary focus:ring-primary focus:ring-offset-background-dark size-4 transition-all" name="exp" type="radio" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Entry (1-3 yrs)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input defaultChecked className="border-border-dark bg-input-dark text-primary focus:ring-primary focus:ring-offset-background-dark size-4 transition-all" name="exp" type="radio" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Mid (4-7 yrs)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="border-border-dark bg-input-dark text-primary focus:ring-primary focus:ring-offset-background-dark size-4 transition-all" name="exp" type="radio" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Senior (8+ yrs)</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-xl text-primary">payments</span>
                  <p className="text-sm font-bold">Price Range</p>
                </div>
                <input className="w-full h-2 bg-input-dark rounded-lg appearance-none cursor-pointer accent-primary" type="range" />
                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
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
              className="text-gray-500 text-sm font-medium hover:text-primary transition-colors"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/dashboard");
              }}
            >
              Home
            </a>
            <span className="material-symbols-outlined text-gray-600 text-sm">chevron_right</span>
            <span className="text-white text-sm font-semibold">Mentor Marketplace</span>
          </nav>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-card-dark p-8 rounded-xl border border-border-dark">
            <div className="flex flex-col gap-3">
              <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">Find your ideal mentor</p>
              <p className="text-gray-400 text-base font-normal max-w-lg">Connect with 1,200+ experts across industries to accelerate your career path with personalized guidance.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-input-dark text-white text-sm font-bold hover:bg-border-dark transition-all">Trending</button>
              <button className="flex items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-all">New Arrivals</button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/20 border border-primary/30 px-5 text-primary text-xs font-bold uppercase tracking-wider">All Tech <span className="material-symbols-outlined text-base">close</span></button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-card-dark border border-border-dark px-5 text-white text-xs font-bold uppercase tracking-wider hover:border-primary transition-all">Product Design <span className="material-symbols-outlined text-base text-gray-500">expand_more</span></button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-card-dark border border-border-dark px-5 text-white text-xs font-bold uppercase tracking-wider hover:border-primary transition-all">Engineering <span className="material-symbols-outlined text-base text-gray-500">expand_more</span></button>
            <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-card-dark border border-border-dark px-5 text-white text-xs font-bold uppercase tracking-wider hover:border-primary transition-all">Management <span className="material-symbols-outlined text-base text-gray-500">expand_more</span></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Repeat card examples - kept static to match design */}
            <div className="bg-card-dark rounded-xl border border-border-dark p-6 flex flex-col gap-6 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all group relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="size-16 rounded-xl bg-center bg-cover border-2 border-primary/20" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBbRvQFEZhhuLMCh3UlYIqMpIJDKEkLtGHbc0tvCGJRVRd3ESnjpkwIi0arspkpz6yYONUdkhrjVAqaHu1bGbT48wbJjitw_dPyu6_p10A9iLB_LpxZMXJizUha_dkOERZmzAATvCnaMZnZ3dVUr4uL8IJ10cXzLHCc4c5D7Ovoj8qAy4l9zN1_fO0gpWa4qW2T6ge2H_v9q-szHR3ZKUcO3qxRo7Uo5MX7kJjYH-fThTEXYULqkCRwlkPYN2lpWOHigkaxfD-7Wjo")'}}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors">Sarah Jenkins</h3>
                    <div className="flex items-center gap-1 text-amber-500"><span className="material-symbols-outlined text-lg fill-1">star</span><span className="text-sm font-bold text-white">4.9</span></div>
                  </div>
                  <p className="text-xs font-medium text-gray-400 mt-0.5">Senior UX Designer @ Google</p>
                  <div className="mt-3 flex flex-wrap gap-1.5"><span className="px-2.5 py-1 bg-input-dark rounded text-[10px] font-bold text-gray-300 border border-border-dark/50">UX Design</span><span className="px-2.5 py-1 bg-input-dark rounded text-[10px] font-bold text-gray-300 border border-border-dark/50">Portfolios</span></div>
                </div>
              </div>
              <div className="border-t border-dashed border-border-dark pt-5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Starting at</span>
                  <span className="text-xl font-black text-white">$75<small className="text-xs font-normal text-gray-400">/hr</small></span>
                </div>
                <button className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">Book Session</button>
              </div>
            </div>

            {/* Additional static cards copied from design omitted for brevity - you can duplicate above structure as needed */}
          </div>

          <div className="flex items-center justify-center gap-4 py-12">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-card-dark border border-border-dark text-white hover:border-primary transition-all"><span className="material-symbols-outlined">chevron_left</span></button>
            <div className="flex items-center gap-2">
              <button className="h-10 w-10 rounded-lg bg-primary text-white font-bold">1</button>
              <button className="h-10 w-10 rounded-lg bg-card-dark border border-border-dark text-white hover:border-primary transition-all font-bold">2</button>
              <button className="h-10 w-10 rounded-lg bg-card-dark border border-border-dark text-white hover:border-primary transition-all font-bold">3</button>
              <span className="text-gray-600 px-2 font-black">...</span>
              <button className="h-10 w-10 rounded-lg bg-card-dark border border-border-dark text-white hover:border-primary transition-all font-bold">24</button>
            </div>
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-card-dark border border-border-dark text-white hover:border-primary transition-all"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Mentors;
