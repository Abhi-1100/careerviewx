import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function InternalNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Assessments", path: "/assessments" },
    { label: "Careers", path: "/career-paths" },
    { label: "Mentors", path: "/mentors" },
  ];

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`flex items-center justify-between whitespace-nowrap border-b px-4 sm:px-6 md:px-10 py-3 md:py-4 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300 ${isDarkMode
          ? "border-[#2a2a2a] bg-charcoal/80"
          : "border-border-light bg-surface-light/80"
          }`}
      >
        {/* Logo */}
        <div
          className={`flex items-center gap-2 sm:gap-3 cursor-pointer ${isDarkMode ? "text-primary" : "text-primary"}`}
          onClick={() => navigate("/")}
        >
          <div
            className={`size-8 sm:size-9 flex items-center justify-center rounded-xl text-white shadow-lg shadow-purple-500/30 ${isDarkMode
              ? "bg-gradient-to-br from-purple-600 to-purple-700"
              : "bg-gradient-to-br from-purple-500 to-purple-600"
              }`}
          >
            <span className="material-symbols-outlined text-base sm:text-xl">rocket_launch</span>
          </div>
          <h2
            className={`text-base sm:text-lg md:text-xl font-extrabold leading-tight tracking-tight ${isDarkMode ? "text-white" : "text-charcoal"
              }`}
          >
            CareerPath
          </h2>
        </div>

        {/* Desktop Nav */}
        <nav className="ml-6 lg:ml-9 hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              className={`text-sm font-semibold leading-normal transition-colors relative group bg-transparent border-0 cursor-pointer ${isActive(link.path)
                ? "text-primary"
                : isDarkMode
                  ? "text-gray-300 hover:text-purple-400"
                  : "text-gray-600 hover:text-primary"
                }`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Desktop Right Controls */}
        <div className="hidden md:flex flex-1 justify-end gap-3 items-center">
          <button
            className={`flex items-center justify-center rounded-lg h-10 w-10 transition-colors ${isDarkMode
              ? "glass-panel hover:bg-white/10"
              : "border border-border-light hover:bg-slate-100"
              }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${isDarkMode ? "text-white" : "text-charcoal"
                }`}
            >
              notifications
            </span>
          </button>
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center rounded-lg h-10 w-10 transition-colors ${isDarkMode
              ? "glass-panel hover:bg-white/10"
              : "border border-border-light hover:bg-slate-100"
              }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${isDarkMode ? "text-white" : "text-charcoal"
                }`}
            >
              {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <button
            className={`flex items-center justify-center rounded-lg h-10 w-10 transition-colors ${isDarkMode
              ? "glass-panel hover:bg-white/10"
              : "border border-border-light hover:bg-slate-100"
              }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${isDarkMode ? "text-white" : "text-charcoal"
                }`}
            >
              account_circle
            </span>
          </button>
          <div
            className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 cursor-pointer hover:opacity-80 transition-opacity ${isDarkMode ? "border-primary/40" : "border-primary/30"
              }`}
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8vASQX_AblTDFjAfIr_ria9CbnDwE9mfYkEu1KeLmDUYdVJX6l3BgNv9dFnJmCUmYAx-lEXLSM5LhrLdUD0FkVFLM9UrF6DcTZ7r-EDa5OiyR-2PJj8Qf4qsDwT3YwiB3W9B3V_A9OWR_pjjNynczntkcxfBDlQQ21WoQOpDANtmiycRk8oHOb7rB5DLKnyknXwGTnbQpm1A_3-OYA0KLYUkhowVUaUlPJmuortDOtT1fZaZVboy0xcj4UXhJ50HJL9CLjrphVRE")',
            }}
            onClick={() => navigate('/profile')}
          ></div>
        </div>

        {/* Mobile Right Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center rounded-lg h-9 w-9 transition-colors ${isDarkMode
              ? "glass-panel hover:bg-white/10"
              : "border border-border-light hover:bg-slate-100"
              }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${isDarkMode ? "text-white" : "text-charcoal"
                }`}
            >
              {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className={`flex flex-col justify-center items-center w-9 h-9 rounded-lg gap-1.5 transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-slate-100"
              }`}
          >
            <span
              className={`block w-5 h-0.5 transition-all duration-300 origin-center ${isDarkMode ? "bg-white" : "bg-charcoal"
                } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${isDarkMode ? "bg-white" : "bg-charcoal"
                } ${menuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-5 h-0.5 transition-all duration-300 origin-center ${isDarkMode ? "bg-white" : "bg-charcoal"
                } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMenuOpen(false)}
        style={{ backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.4)" }}
      />

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
          } ${isDarkMode ? "bg-[#13131a]" : "bg-white"}`}
      >
        {/* Drawer Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${isDarkMode ? "border-white/10" : "border-charcoal/10"
            }`}
        >
          <div className="flex items-center gap-2">
            <div className="size-8 flex items-center justify-center rounded-xl text-white bg-gradient-to-br from-purple-600 to-purple-700">
              <span className="material-symbols-outlined text-base">rocket_launch</span>
            </div>
            <span
              className={`font-extrabold text-base ${isDarkMode ? "text-white" : "text-charcoal"}`}
            >
              CareerPath
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className={`flex items-center justify-center w-8 h-8 rounded-lg ${isDarkMode ? "hover:bg-white/10 text-white" : "hover:bg-slate-100 text-charcoal"
              }`}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.path)}
              className={`text-left px-4 py-3 rounded-xl font-semibold text-sm transition-colors w-full ${isActive(link.path)
                ? "text-primary bg-primary/10"
                : isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-white/8"
                  : "text-gray-700 hover:text-charcoal hover:bg-slate-100"
                }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Bottom Controls */}
        <div
          className={`px-4 py-5 border-t flex items-center justify-between ${isDarkMode ? "border-white/10" : "border-charcoal/10"
            }`}
        >
          <div className="flex items-center gap-2">
            <button
              className={`flex items-center justify-center rounded-lg h-9 w-9 transition-colors ${isDarkMode
                ? "glass-panel hover:bg-white/10"
                : "border border-border-light hover:bg-slate-100"
                }`}
            >
              <span
                className={`material-symbols-outlined text-xl ${isDarkMode ? "text-white" : "text-charcoal"
                  }`}
              >
                notifications
              </span>
            </button>
            <button
              className={`flex items-center justify-center rounded-lg h-9 w-9 transition-colors ${isDarkMode
                ? "glass-panel hover:bg-white/10"
                : "border border-border-light hover:bg-slate-100"
                }`}
            >
              <span
                className={`material-symbols-outlined text-xl ${isDarkMode ? "text-white" : "text-charcoal"
                  }`}
              >
                account_circle
              </span>
            </button>
          </div>
          <div
            className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 cursor-pointer hover:opacity-80 transition-opacity ${isDarkMode ? "border-primary/40" : "border-primary/30"
              }`}
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8vASQX_AblTDFjAfIr_ria9CbnDwE9mfYkEu1KeLmDUYdVJX6l3BgNv9dFnJmCUmYAx-lEXLSM5LhrLdUD0FkVFLM9UrF6DcTZ7r-EDa5OiyR-2PJj8Qf4qsDwT3YwiB3W9B3V_A9OWR_pjjNynczntkcxfBDlQQ21WoQOpDANtmiycRk8oHOb7rB5DLKnyknXwGTnbQpm1A_3-OYA0KLYUkhowVUaUlPJmuortDOtT1fZaZVboy0xcj4UXhJ50HJL9CLjrphVRE")',
            }}
            onClick={() => { navigate('/profile'); setMenuOpen(false); }}
          ></div>
        </div>
      </div>
    </>
  );
}
