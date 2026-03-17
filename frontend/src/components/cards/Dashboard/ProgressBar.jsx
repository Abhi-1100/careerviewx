import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const ProgressBar = ({ label, value, color = "#8b5cf6" }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div>
      <div className={`flex justify-between text-[11px] mb-2 uppercase font-bold tracking-wide ${isDarkMode ? "text-[#a094b8]" : "text-slate-500"}`}>
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-[#2d264a]" : "bg-slate-200"}`}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            backgroundColor: color,
            boxShadow: `0_0_10px_${color}40`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
