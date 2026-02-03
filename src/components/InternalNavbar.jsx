import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function InternalNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-[#2a2a2a] px-6 md:px-10 py-4 bg-charcoal/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3 text-primary">
        <div className="size-9 flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl text-white shadow-lg shadow-purple-500/30">
          <span className="material-symbols-outlined">rocket_launch</span>
        </div>
        <h2 className="text-white text-lg md:text-xl font-extrabold leading-tight tracking-tight">
          CareerViewX
        </h2>
      </div>
      <nav className="ml-9 hidden md:flex items-center gap-8">
        <a
          className={`text-gray-300 text-sm font-semibold leading-normal transition-colors relative group ${isActive("/dashboard") ? "text-primary" : ""}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/dashboard");
          }}
        >
          Dashboard
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
        </a>
        <a
          className={`text-gray-300 text-sm font-semibold leading-normal transition-colors relative group ${isActive("/assessments") ? "text-primary" : ""}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/assessments");
          }}
        >
          Assessments
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
        </a>
        <a
          className={`text-gray-300 text-sm font-semibold leading-normal transition-colors relative group ${isActive("/career-paths") ? "text-primary" : ""}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/career-paths");
          }}
        >
          Careers
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
        </a>
        <a
          className={`text-gray-300 text-sm font-semibold leading-normal transition-colors relative group ${isActive("/mentors") ? "text-primary" : ""}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/mentors");
          }}
        >
          Mentors
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
        </a>
      </nav>
      <div className="flex flex-1 justify-end gap-6 items-center">
        <div className="flex gap-3 items-center">
          <button className="flex items-center justify-center rounded-lg h-10 w-10 glass-panel hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-xl text-white">
              notifications
            </span>
          </button>
          <button className="flex items-center justify-center rounded-lg h-10 w-10 glass-panel hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-xl text-white">
              account_circle
            </span>
          </button>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/40"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8vASQX_AblTDFjAfIr_ria9CbnDwE9mfYkEu1KeLmDUYdVJX6l3BgNv9dFnJmCUmYAx-lEXLSM5LhrLdUD0FkVFLM9UrF6DcTZ7r-EDa5OiyR-2PJj8Qf4qsDwT3YwiB3W9B3V_A9OWR_pjjNynczntkcxfBDlQQ21WoQOpDANtmiycRk8oHOb7rB5DLKnyknXwGTnbQpm1A_3-OYA0KLYUkhowVUaUlPJmuortDOtT1fZaZVboy0xcj4UXhJ50HJL9CLjrphVRE")',
            }}
          ></div>
        </div>
      </div>
    </header>
  );
}
