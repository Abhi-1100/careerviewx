import React, { useState } from "react";
import {
  Search,
  Bell,
  Home,
  Clock,
  BookOpen,
  Settings,
  TrendingUp,
  Users,
  Plus,
  ArrowRight,
} from "lucide-react";
import { careerPathsData, trendingCareers } from "../data/careerData";

import CareerCard from "../components/cards/CareerCard";

export default function CareerGuidanceDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-violate-900 to-slate-900">
      {/* Sidebar */}
      <div className="w-20 bg-slate-900/50 backdrop-blur-sm border-r border-slate-700/50 flex flex-col items-center py-6 space-y-8">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
          <span className="text-white font-bold text-xl">CG</span>
        </div>

        <div className="flex-1 flex flex-col space-y-6">
          <button className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center hover:bg-purple-500/30 transition">
            <Home size={24} />
          </button>
          <button className="w-12 h-12 rounded-xl text-slate-400 flex items-center justify-center hover:bg-slate-800/50 transition">
            <Clock size={24} />
          </button>
          <button className="w-12 h-12 rounded-xl text-slate-400 flex items-center justify-center hover:bg-slate-800/50 transition">
            <BookOpen size={24} />
          </button>
        </div>

        <button className="w-12 h-12 rounded-xl text-slate-400 flex items-center justify-center hover:bg-slate-800/50 transition">
          <Settings size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/30">
          <div className="flex items-center space-x-4">
            <button className="text-slate-400 hover:text-white transition">
              <ArrowRight size={24} className="rotate-180" />
            </button>
            <h1 className="text-2xl font-bold text-white">Home</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search careers, skills..."
                className="w-80 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2 pl-10 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition"
              />
              <Search
                className="absolute left-3 top-2.5 text-slate-400"
                size={20}
              />
            </div>
            <button className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full cursor-pointer hover:scale-110 transition"></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Hero Section & Chart */}
          <div className="grid grid-cols-2 gap-6">
            {/* Hero Card */}
            <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-3xl p-8 relative overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
              <div className="relative z-10">
                <div className="text-purple-200 text-sm font-medium mb-2 tracking-wider">
                  CAREER PATH FINDER
                </div>
                <h2 className="text-4xl font-bold text-white mb-3 leading-tight">
                  Find Your Perfect Career Match
                </h2>
                <p className="text-purple-100 mb-6 leading-relaxed">
                  Take our AI-powered assessment to discover careers aligned
                  with your skills and interests.
                </p>
                <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition transform hover:scale-105 shadow-lg">
                  Start Assessment
                </button>
              </div>
              <div className="absolute right-0 top-0 opacity-20">
                <div className="w-64 h-64 bg-white rounded-full blur-3xl"></div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <div className="w-48 h-48 bg-white rounded-full blur-2xl"></div>
              </div>
            </div>

            {/* Skills Progress Chart */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 hover:bg-slate-800/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-slate-400 text-sm mb-1">YOUR SKILLS</div>
                  <div className="text-white font-bold text-xl">
                    Progress Overview
                  </div>
                </div>
                <div className="flex space-x-2">
                  {["1D", "1W", "1M"].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setSelectedTimeframe(tf)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                        selectedTimeframe === tf
                          ? "bg-purple-500 text-white shadow-lg shadow-purple-500/50"
                          : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-48 relative">
                <svg className="w-full h-full" viewBox="0 0 400 150">
                  <defs>
                    <linearGradient
                      id="grad1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#a855f7", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#ec4899", stopOpacity: 1 }}
                      />
                    </linearGradient>
                    <linearGradient
                      id="grad2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#06b6d4", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
                      />
                    </linearGradient>
                  </defs>

                  <polyline
                    points="0,100 50,80 100,90 150,60 200,70 250,40 300,50 350,30 400,20"
                    fill="none"
                    stroke="url(#grad1)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="0,120 50,110 100,100 150,90 200,100 250,80 300,70 350,60 400,40"
                    fill="none"
                    stroke="url(#grad2)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-500 px-2">
                  <span>0k</span>
                  <span>10k</span>
                  <span>20k</span>
                  <span>30k</span>
                  <span>40k</span>
                  <span>50k</span>
                </div>
              </div>
            </div>
          </div>
          {/* Career Cards Trending */}
          <div className="relative">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-xl font-bold text-white">
      Explore Career Paths
    </h3>
    <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition">
      View All →
    </button>
  </div>

  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
    {careerPathsData.map((career, idx) => (
      <CareerCard
        key={idx}
        icon={career.icon}
        name={career.name}
        salary={career.salary}
        growth={career.growth}
        demand={career.demand}
        color={career.color}
        chartPoints={career.chartPoints}
      />
    ))}
  </div>
</div>


          {/* Bottom Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Skills Overview */}
            <div className="col-span-2 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  Skills Assessment
                </h3>
                <select className="bg-slate-700/50 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-purple-500 transition cursor-pointer">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Daily</option>
                </select>
              </div>

              <div className="h-64 relative">
                <svg className="w-full h-full" viewBox="0 0 600 200">
                  <defs>
                    <linearGradient
                      id="purple"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#a855f7", stopOpacity: 0.8 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#a855f7", stopOpacity: 0.1 }}
                      />
                    </linearGradient>
                    <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop
                        offset="0%"
                        style={{ stopColor: "#3b82f6", stopOpacity: 0.8 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#3b82f6", stopOpacity: 0.1 }}
                      />
                    </linearGradient>
                  </defs>

                  <polyline
                    points="0,150 100,120 150,100 200,80 250,60 300,90 350,70 400,50 450,80 500,60 550,40 600,30"
                    fill="url(#purple)"
                    stroke="#a855f7"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <polyline
                    points="0,180 100,170 150,160 200,140 250,150 300,120 350,130 400,110 450,100 500,90 550,80 600,70"
                    fill="url(#blue)"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-500">
                  <span>50k</span>
                  <span>40k</span>
                  <span>30k</span>
                  <span>20k</span>
                  <span>10k</span>
                  <span>0k</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Trending */}
            <div className="space-y-6">
              {/* Quick Connect */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-4">
                  Quick Connect
                </h3>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full cursor-pointer hover:scale-110 transition"></div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full cursor-pointer hover:scale-110 transition"></div>
                  <button className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition">
                    <Plus size={20} />
                  </button>
                </div>

                <div className="mb-4">
                  <label className="text-slate-400 text-sm mb-2 block">
                    Session Time:
                  </label>
                  <div className="bg-slate-700/30 rounded-xl px-4 py-3 text-white font-bold text-xl border border-slate-600/50">
                    30 min
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/30">
                  <Users size={18} />
                  <span>Book Mentor</span>
                </button>
              </div>

              {/* Trending Careers */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-4">
                  Trending Careers
                </h3>

                <div className="space-y-3">
                  {trendingCareers.map((career, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm hover:bg-slate-700/30 p-2 rounded-lg transition cursor-pointer"
                    >
                      <div className="flex-1">
                        <div className="text-white font-medium">
                          {career.name}
                        </div>
                        <div className="text-slate-500 text-xs">
                          {career.lastSalary}
                        </div>
                      </div>
                      <div
                        className={`font-medium ${career.up ? "text-green-400" : "text-red-400"} flex items-center space-x-1`}
                      >
                        <span>{career.change}</span>
                        <TrendingUp
                          size={12}
                          className={career.up ? "" : "rotate-180"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
