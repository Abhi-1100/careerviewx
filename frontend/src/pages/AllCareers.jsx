import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllCareers } from "../Services/api";
import { ThemeContext } from "../context/ThemeContext";
import { getCurrentUser } from "../utils/auth";
import { useAuth } from "../contexts/AuthContext";
import SearchBar from "../components/SearchBar";

import dashboard_i0 from "../assets/dashboard_i0.png";
import dashboard_i1 from "../assets/dashboard_i1.png";

// Domain color/icon map
const domainMeta = {
  engineering: { icon: "engineering",       color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  it:          { icon: "computer",           color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
  medical:     { icon: "health_and_safety",  color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  design:      { icon: "draw",              color: "#f59e0b", bg: "rgba(245,158,11,0.12)"  },
  business:    { icon: "business_center",   color: "#ef4444", bg: "rgba(239,68,68,0.12)"   },
  government:  { icon: "account_balance",   color: "#6366f1", bg: "rgba(99,102,241,0.12)"  },
  general:     { icon: "work",              color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
};

function getDomainMeta(career) {
  const key = (career.category || career.careerName || "").toLowerCase().trim();
  for (const [domain, meta] of Object.entries(domainMeta)) {
    if (key.includes(domain)) return meta;
  }
  return domainMeta.general;
}

export default function AllCareers() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const isActive = (path) => location.pathname === path;

  const [user, setUser] = useState(null);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setUser(getCurrentUser()); }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getAllCareers();
        setCareers(res.data?.careers || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load careers. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = () => { auth.logout(); navigate("/login"); };

  const filtered = careers.filter((c) => {
    const q = search.toLowerCase();
    return (
      !q ||
      (c.title || "").toLowerCase().includes(q) ||
      (c.careerName || "").toLowerCase().includes(q) ||
      (c.category || "").toLowerCase().includes(q) ||
      (c.shortDescription || "").toLowerCase().includes(q)
    );
  });

  /* ── Sidebar nav items ── */
  const navItems = [
    { path: "/dashboard",    label: "Dashboard",    icon: "dashboard" },
    { path: "/career-paths", label: "Career Paths", icon: "explore" },
    { path: "/assessments",  label: "Assessments",  icon: "quiz" },
    { path: "/mentors",      label: "Mentors",       icon: "groups" },
    { path: "/settings",     label: "Settings",      icon: "settings" },
  ];

  return (
    <div className={`flex h-screen ${isDarkMode ? "bg-background-dark text-white" : "bg-surface-light text-charcoal"} font-display overflow-hidden transition-colors duration-300`}>

      {/* ── Sidebar ── */}
      <aside className={`w-64 flex-shrink-0 border-r hidden lg:flex flex-col ${isDarkMode ? "border-[#2d264a] bg-[#140f26]" : "border-border-light bg-sidebar-light"}`}>
        <div className="p-6 flex flex-col h-full justify-between">
          <div className="flex flex-col gap-8">
            {/* Logo */}
            <div className={`flex items-center gap-3 ${isDarkMode ? "text-[#8b5cf6]" : "text-primary"}`}>
              <img src="/logo.png" alt="CareerviewX Logo" className="size-9 rounded-xl shadow-lg shadow-purple-500/30" />
              <h2 className={`text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-charcoal"}`}>CareerviewX</h2>
            </div>

            {/* Profile */}
            <div
              className={`flex gap-3 items-center p-2 rounded-xl cursor-pointer border ${isDarkMode ? "bg-[#1a142e]/50 border-[#2d264a]/50" : "bg-white border-border-light"}`}
              onClick={() => navigate("/profile")}
            >
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-10" style={{ backgroundImage: `url(${dashboard_i0})` }} />
              <div className="flex flex-col overflow-hidden">
                <h1 className={`text-sm font-semibold truncate ${isDarkMode ? "text-white" : "text-charcoal"}`}>{user?.name || "User"}</h1>
                <p className={`text-xs ${isDarkMode ? "text-[#a094b8]" : "text-slate-500"}`}>{user?.email || "Career Explorer"}</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all ${
                    isActive(item.path)
                      ? isDarkMode ? "bg-white/5 text-white" : "bg-slate-100 text-charcoal"
                      : isDarkMode ? "text-[#a094b8] hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-charcoal hover:bg-slate-100"
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <p className="text-sm font-medium">{item.label}</p>
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <span className="material-symbols-outlined">logout</span>
                <p className="text-sm font-medium">Logout</p>
              </button>
            </nav>
          </div>

          {/* Premium card */}
          <div className={`${isDarkMode ? "bg-gradient-to-br from-[#8b5cf6]/20 to-transparent border-[#8b5cf6]/30" : "bg-gradient-to-br from-primary/10 to-transparent border-primary/20"} p-4 rounded-xl border relative overflow-hidden group`}>
            <div className={`absolute -right-4 -top-4 size-16 rounded-full blur-2xl transition-all ${isDarkMode ? "bg-[#8b5cf6]/10 group-hover:bg-[#8b5cf6]/20" : "bg-primary/10 group-hover:bg-primary/20"}`} />
            <p className={`text-xs font-bold mb-2 relative z-10 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Unlock Premium</p>
            <p className={`text-[10px] mb-4 leading-relaxed relative z-10 ${isDarkMode ? "text-[#a094b8]" : "text-slate-600"}`}>Get unlimited mentor sessions and advanced skill tracking.</p>
            <button className={`w-full py-2 text-white text-xs font-bold rounded-lg transition-all shadow-lg ${isDarkMode ? "bg-[#8b5cf6] hover:bg-[#8b5cf6]/90 shadow-[#8b5cf6]/20" : "bg-primary hover:bg-primary/90 shadow-primary/20"}`}>Upgrade Now</button>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">

        {/* Header */}
        <header className={`sticky top-0 z-30 flex items-center gap-4 border-b backdrop-blur-xl px-4 sm:px-6 md:px-8 py-4 transition-colors duration-300 ${isDarkMode ? "bg-background-dark/80 border-[#2d264a]" : "bg-surface-light/80 border-border-light"}`}>
          <div className="flex items-center gap-6 flex-1">
            <SearchBar />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center size-10 rounded-xl border transition-all ${isDarkMode ? "bg-[#1a142e] border-[#2d264a] text-[#a094b8] hover:text-white hover:bg-white/5" : "bg-white border-border-light text-slate-500 hover:text-charcoal hover:bg-slate-50"}`}
            >
              <span className="material-symbols-outlined text-[22px]">{isDarkMode ? "light_mode" : "dark_mode"}</span>
            </button>
            <div className={`h-6 w-px ${isDarkMode ? "bg-[#2d264a]" : "bg-border-light"}`} />
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/profile")}>
              <div
                className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 transition-all ${isDarkMode ? "border-[#8b5cf6]/30 group-hover:border-[#8b5cf6]" : "border-primary/30 group-hover:border-primary"}`}
                style={{ backgroundImage: `url(${dashboard_i1})` }}
              />
            </div>
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setMenuOpen(true)}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? "text-white hover:bg-white/10" : "text-charcoal hover:bg-slate-100"}`}
              >
                <span className="material-symbols-outlined text-2xl">menu</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto w-full space-y-8">

          {/* Page title + search */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <button
                  onClick={() => navigate("/dashboard")}
                  className={`text-sm font-medium transition-colors ${isDarkMode ? "text-[#a094b8] hover:text-white" : "text-slate-500 hover:text-charcoal"}`}
                >
                  Dashboard
                </button>
                <span className={isDarkMode ? "text-[#2d264a]" : "text-slate-300"}>/</span>
                <span className={`text-sm font-bold ${isDarkMode ? "text-[#8b5cf6]" : "text-primary"}`}>All Careers</span>
              </div>
              <h1 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                Explore <span className={isDarkMode ? "text-[#8b5cf6]" : "text-primary"}>All Careers</span>
              </h1>
              <p className={`text-sm mt-1 ${isDarkMode ? "text-[#a094b8]" : "text-slate-500"}`}>
                {loading ? "Loading careers..." : `${filtered.length} career${filtered.length !== 1 ? "s" : ""} available`}
              </p>
            </div>
            {/* Live search */}
            <div className={`relative flex items-center rounded-xl border px-4 py-2.5 gap-2 w-full sm:w-72 transition-all ${isDarkMode ? "bg-[#1a142e] border-[#2d264a] focus-within:border-[#8b5cf6]/50" : "bg-white border-border-light focus-within:border-primary/40"}`}>
              <span className={`material-symbols-outlined text-[20px] ${isDarkMode ? "text-[#a094b8]" : "text-slate-400"}`}>search</span>
              <input
                type="text"
                placeholder="Search careers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`flex-1 bg-transparent text-sm outline-none ${isDarkMode ? "text-white placeholder:text-[#a094b8]" : "text-charcoal placeholder:text-slate-400"}`}
              />
              {search && (
                <button onClick={() => setSearch("")} className={`material-symbols-outlined text-[18px] ${isDarkMode ? "text-[#a094b8] hover:text-white" : "text-slate-400 hover:text-charcoal"}`}>close</button>
              )}
            </div>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`p-6 rounded-2xl border animate-pulse ${isDarkMode ? "bg-[#1a142e] border-[#2d264a]" : "bg-white border-border-light"}`}>
                  <div className={`w-12 h-12 rounded-xl mb-5 ${isDarkMode ? "bg-[#2d264a]" : "bg-slate-100"}`} />
                  <div className={`h-5 w-3/4 rounded mb-3 ${isDarkMode ? "bg-[#2d264a]" : "bg-slate-100"}`} />
                  <div className={`h-3 w-full rounded mb-2 ${isDarkMode ? "bg-[#2d264a]" : "bg-slate-100"}`} />
                  <div className={`h-3 w-5/6 rounded mb-5 ${isDarkMode ? "bg-[#2d264a]" : "bg-slate-100"}`} />
                  <div className={`h-8 w-1/2 rounded-lg ${isDarkMode ? "bg-[#2d264a]" : "bg-slate-100"}`} />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className={`size-16 rounded-full flex items-center justify-center ${isDarkMode ? "bg-red-500/10" : "bg-red-50"}`}>
                <span className="material-symbols-outlined text-red-400 text-3xl">error</span>
              </div>
              <p className={`font-bold text-lg ${isDarkMode ? "text-white" : "text-charcoal"}`}>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className={`px-5 py-2.5 text-white text-sm font-bold rounded-xl ${isDarkMode ? "bg-[#8b5cf6]" : "bg-primary"}`}
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty search */}
          {!loading && !error && filtered.length === 0 && (
            <div className={`flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed ${isDarkMode ? "border-[#2d264a]" : "border-border-light"}`}>
              <span className={`material-symbols-outlined text-5xl mb-4 ${isDarkMode ? "text-[#2d264a]" : "text-slate-300"}`}>search_off</span>
              <p className={`font-bold text-lg ${isDarkMode ? "text-white" : "text-charcoal"}`}>No careers match "{search}"</p>
              <p className={`text-sm mt-1 ${isDarkMode ? "text-[#a094b8]" : "text-slate-500"}`}>Try a different keyword.</p>
              <button onClick={() => setSearch("")} className={`mt-4 text-sm font-bold ${isDarkMode ? "text-[#8b5cf6]" : "text-primary"}`}>Clear search</button>
            </div>
          )}

          {/* Career grid */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((career) => {
                const meta = getDomainMeta(career);
                const title = career.title || (career.careerName
                  ? career.careerName.charAt(0).toUpperCase() + career.careerName.slice(1)
                  : "Career");
                const desc = career.shortDescription || "Explore this career path and discover what it takes to succeed.";

                return (
                  <div
                    key={career._id}
                    onClick={() => navigate(`/career/${career._id}`)}
                    className={`group p-6 rounded-2xl border card-elevation cursor-pointer transition-all hover:scale-[1.02] ${isDarkMode ? "bg-[#1a142e] border-[#2d264a] hover:border-[#8b5cf6]/40" : "bg-white border-border-light hover:border-primary/30"}`}
                  >
                    {/* Icon + category badge */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: meta.bg, color: meta.color }}
                      >
                        <span className="material-symbols-outlined text-[26px]">{meta.icon}</span>
                      </div>
                      {career.category && (
                        <span
                          className="px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider border"
                          style={{ backgroundColor: `${meta.color}18`, color: meta.color, borderColor: `${meta.color}30` }}
                        >
                          {career.category}
                        </span>
                      )}
                    </div>

                    {/* Title + description */}
                    <h3 className={`font-bold text-lg mb-2 group-hover:text-[${meta.color}] transition-colors ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                      {title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-5 line-clamp-2 ${isDarkMode ? "text-[#a094b8]" : "text-slate-500"}`}>
                      {desc}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm font-bold flex items-center gap-1 transition-all group-hover:gap-2"
                        style={{ color: meta.color }}
                      >
                        View Career Path
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <aside className={`absolute right-0 top-0 h-full w-72 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col ${isDarkMode ? "bg-[#140f26] border-l border-[#2d264a]" : "bg-sidebar-light border-l border-border-light"}`}>
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <div className={`flex items-center gap-3 ${isDarkMode ? "text-[#8b5cf6]" : "text-primary"}`}>
                  <img src="/logo.png" alt="CareerviewX Logo" className="size-8 rounded-lg" />
                  <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-charcoal"}`}>CareerviewX</h2>
                </div>
                <button onClick={() => setMenuOpen(false)} className={`p-2 rounded-lg ${isDarkMode ? "text-white/70 hover:bg-white/10" : "text-slate-500 hover:bg-slate-100"}`}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <nav className="flex flex-col gap-1.5 flex-1">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setMenuOpen(false); }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive(item.path)
                        ? isDarkMode ? "bg-[#8b5cf6]/10 text-white border-l-2 border-[#8b5cf6]" : "bg-primary/10 text-primary border-l-2 border-primary"
                        : isDarkMode ? "text-[#a094b8] hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-primary hover:bg-slate-100"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    <p className="text-sm font-medium">{item.label}</p>
                  </button>
                ))}
              </nav>
              <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 mt-auto">
                <span className="material-symbols-outlined">logout</span>
                <p className="text-sm font-medium">Logout</p>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
