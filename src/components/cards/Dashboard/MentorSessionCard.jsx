import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const MentorSessionCard = ({
  mentorName,
  mentorTitle,
  sessionTime,
  imageUrl,
  isAvailable = false,
  actionButtonLabel = "Join",
  onActionClick,
}) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`flex items-center gap-4 group cursor-pointer p-2 -m-2 rounded-xl transition-all ${isDarkMode ? "hover:bg-white/5" : "hover:bg-slate-100"}`}>
      <div className="relative">
        <div
          className={`size-12 bg-center bg-cover rounded-xl shadow-lg ${
            !isAvailable ? "grayscale group-hover:grayscale-0" : ""
          } transition-all`}
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
        {isAvailable && (
          <div className={`absolute -bottom-1 -right-1 size-4 bg-[#10b981] border-2 rounded-full ${isDarkMode ? "border-[#1a142e]" : "border-white"}`}></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-bold truncate ${isDarkMode ? "text-white" : "text-charcoal"}`}>{mentorName}</h4>
        <p className={`text-[11px] truncate ${isDarkMode ? "text-[#a094b8]" : "text-slate-500"}`}>{mentorTitle}</p>
        <p
          className={`text-[11px] font-semibold mt-1 ${
            isAvailable
              ? isDarkMode ? "text-[#8b5cf6]" : "text-primary"
              : isDarkMode ? "text-[#a094b8]" : "text-slate-500"
          }`}
        >
          {sessionTime}
        </p>
      </div>

      <button
        onClick={onActionClick}
        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
          isAvailable
            ? isDarkMode
              ? "bg-[#8b5cf6] hover:bg-[#8b5cf6]/90 text-white shadow-lg shadow-[#8b5cf6]/20"
              : "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            : isDarkMode
              ? "bg-[#2d264a] text-white hover:bg-white/10"
              : "bg-slate-200 text-charcoal hover:bg-slate-300"
        }`}
      >
        {actionButtonLabel}
      </button>
    </div>
  );
};

export default MentorSessionCard;
