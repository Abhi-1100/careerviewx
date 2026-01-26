import React from "react";
import ProgressBar from "./ProgressBar";

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
}) => {
  return (
    <div className="bg-[#1a142e] p-6 rounded-2xl border border-[#2d264a] card-elevation hover:border-opacity-50 transition-all"
      style={{ "--hover-color": borderHoverColor }}>
      <style>{`
        .hover\\:border-opacity-50:hover {
          border-color: var(--hover-color);
        }
      `}</style>
      
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[32px]"
          style={{ backgroundColor: `${skillColor}20`, color: skillColor }}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider border"
          style={{
            backgroundColor: `${matchColor}20`,
            color: matchColor,
            borderColor: `${matchColor}30`,
          }}>
          {matchPercentage}% {matchLabel}
        </span>
      </div>

      <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
      <p className="text-[#a094b8] text-sm mb-6 leading-relaxed">{description}</p>

      <div className="space-y-4">
        <ProgressBar
          label={skillLabel}
          value={skillPercentage}
          color={skillColor}
        />
      </div>
    </div>
  );
};

export default CareerMatchCard;
