import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "Careers", path: "/dashboard" },
    { label: "Resources", path: "/resources" },
    { label: "Assessments", path: "/assessments" },
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
          ? "border-[#2a2a2a] bg-charcoal/90"
          : "border-border-light bg-surface-light/90"
          }`}
      >
        {/* Logo */}
        <div
          className={`flex items-center gap-2 sm:gap-3 cursor-pointer ${isDarkMode ? "text-primary" : "text-primary"}`}
          onClick={() => navigate("/")}
        >
          <img src="/logo.png" alt="CareerviewX Logo" className="size-8 sm:size-9 rounded-xl" />
          <h2
            className={`text-base sm:text-lg md:text-xl font-extrabold leading-tight tracking-tight ${isDarkMode ? "text-white" : "text-charcoal"
              }`}
          >
            CareerviewX
          </h2>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-end gap-6 lg:gap-8 items-center">
          <nav className="flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                className={`text-sm font-semibold leading-normal transition-colors relative group bg-transparent border-0 cursor-pointer ${isDarkMode
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
          <div className="flex items-center gap-3">
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
            <button
              className={`flex min-w-[90px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-9 px-4 border transition-all text-sm ${isDarkMode
                ? "border-purple-500 text-purple-400 hover:bg-purple-500/10"
                : "border-primary text-primary hover:bg-primary/10"
                }`}
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              className={`flex min-w-[90px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-9 px-4 text-white text-sm font-bold shadow-lg transition-all ${isDarkMode
                ? "bg-gradient-to-r from-purple-600 to-purple-700 shadow-purple-500/30 hover:brightness-110"
                : "bg-gradient-to-r from-primary to-purple-600 shadow-primary/30 hover:opacity-90"
                }`}
            >
              Join Free
            </button>
          </div>
        </div>

        {/* Mobile Right Side Controls */}
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
          {/* Hamburger Button */}
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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMenuOpen(false)}
        style={{ backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.4)" }}
      />

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
          } ${isDarkMode ? "bg-[#13131a]" : "bg-white"}`}
      >
        {/* Menu Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${isDarkMode ? "border-white/10" : "border-charcoal/10"
            }`}
        >
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="CareerviewX Logo" className="size-8 rounded-xl" />
            <span
              className={`font-extrabold text-base ${isDarkMode ? "text-white" : "text-charcoal"}`}
            >
              CareerviewX
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
              className={`text-left px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${isDarkMode
                ? "text-gray-300 hover:text-white hover:bg-white/8"
                : "text-gray-700 hover:text-charcoal hover:bg-slate-100"
                }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div
          className={`px-4 py-6 border-t flex flex-col gap-3 ${isDarkMode ? "border-white/10" : "border-charcoal/10"
            }`}
        >
          <button
            className={`w-full h-11 rounded-xl border font-semibold text-sm transition-all ${isDarkMode
              ? "border-purple-500 text-purple-400 hover:bg-purple-500/10"
              : "border-primary text-primary hover:bg-primary/10"
              }`}
            onClick={() => {
              navigate("/login");
              setMenuOpen(false);
            }}
          >
            Log In
          </button>
          <button
            className={`w-full h-11 rounded-xl text-white font-bold text-sm shadow-lg transition-all ${isDarkMode
              ? "bg-gradient-to-r from-purple-600 to-purple-700 shadow-purple-500/30 hover:brightness-110"
              : "bg-gradient-to-r from-primary to-purple-600 shadow-primary/30 hover:opacity-90"
              }`}
          >
            Join Free
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
