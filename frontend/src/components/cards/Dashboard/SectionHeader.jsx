import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const SectionHeader = ({ title, showViewAll = true, onViewAll }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className={`text-2xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-charcoal"}`}>{title}</h2>
      {showViewAll && (
        <button
          onClick={onViewAll}
          className={`text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 p-0 ${isDarkMode ? "text-[#8b5cf6]" : "text-primary"}`}
        >
          View All
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
