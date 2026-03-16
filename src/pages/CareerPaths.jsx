import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import InternalNavbar from "../components/InternalNavbar";
import Footer from "../components/Home/Footer";

const CareerPaths = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen font-display flex flex-col transition-colors duration-300 ${isDarkMode ? "bg-[#0f0a1e] text-white" : "bg-surface-light text-charcoal"}`}>
      <InternalNavbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className={`max-w-3xl p-12 rounded-2xl border transition-colors duration-300 ${isDarkMode ? "bg-[#121018]/60 border-[#2d264a]" : "bg-white border-border-light shadow-sm"}`}>
          <h1 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-charcoal"}`}>Career Paths</h1>
          <p className={`transition-colors duration-300 ${isDarkMode ? "text-[#a094b8]" : "text-slate-600"}`}>This is a placeholder for the Career Paths page. You can add content or replace it with the final design.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CareerPaths;
