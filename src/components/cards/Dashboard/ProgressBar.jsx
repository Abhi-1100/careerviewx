import React from "react";

const ProgressBar = ({ label, value, color = "#8b5cf6" }) => {
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-2 uppercase font-bold tracking-wide text-[#a094b8]">
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div className="w-full h-2 bg-[#2d264a] rounded-full overflow-hidden">
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
