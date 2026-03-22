import React, { useContext } from "react";
import ProgressBar from "./ProgressBar";
import { ThemeContext } from "../../../context/ThemeContext";

const CareerMatchCard = ({
  icon,
  title,
  description,
  matchPercentage,
  matchLabel = "Match",
  skillLabel = "Skill Alignment",
  skillPercentage,
  matchColor = "#10b981",
  skillColor = "#8b5cf6",
  borderHoverColor = "#8b5cf6",
  onClick,
}) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`p-6 rounded-2xl border card-elevation hover:border-opacity-50 transition-all ${isDarkMode ? "bg-[#1a142e] border-[#2d264a]" : "bg-white border-border-light"} ${onClick ? "cursor-pointer hover:scale-[1.01]" : ""}`}
      style={{ "--hover-color": borderHoverColor }}
      onClick={onClick}
    >
      <style>{`
        .hover\\:border-opacity-50:hover {
          border-color: var(--hover-color);
        }
      `}</style>

      <div className="flex justify-between items-start mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-[32px]"
          style={{ backgroundColor: `${skillColor}20`, color: skillColor }}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span
          className="px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider border"
          style={{
            backgroundColor: `${matchColor}20`,
            color: matchColor,
            borderColor: `${matchColor}30`,
          }}
        >
          {matchPercentage}% {matchLabel}
        </span>
      </div>

      <h3 className={`font-bold text-xl mb-2 ${isDarkMode ? "text-white" : "text-charcoal"}`}>
        {title}
      </h3>
      <p className={`text-sm mb-6 leading-relaxed ${isDarkMode ? "text-[#a094b8]" : "text-slate-500"}`}>
        {description}
      </p>

      <div className="space-y-4">
        <ProgressBar label={skillLabel} value={skillPercentage} color={skillColor} />
      </div>
    </div>
  );
};

export default CareerMatchCard;
