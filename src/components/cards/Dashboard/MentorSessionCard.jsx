import React from "react";

const MentorSessionCard = ({
  mentorName,
  mentorTitle,
  sessionTime,
  imageUrl,
  isAvailable = false,
  actionButtonLabel = "Join",
  onActionClick,
}) => {
  return (
    <div className="flex items-center gap-4 group cursor-pointer p-2 -m-2 rounded-xl hover:bg-white/5 transition-all">
      <div className="relative">
        <div
          className={`size-12 bg-center bg-cover rounded-xl shadow-lg ${
            !isAvailable ? "grayscale group-hover:grayscale-0" : ""
          } transition-all`}
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
        {isAvailable && (
          <div className="absolute -bottom-1 -right-1 size-4 bg-[#10b981] border-2 border-[#1a142e] rounded-full"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-white truncate">{mentorName}</h4>
        <p className="text-[11px] text-[#a094b8] truncate">{mentorTitle}</p>
        <p
          className={`text-[11px] font-semibold mt-1 ${
            isAvailable ? "text-[#8b5cf6]" : "text-[#a094b8]"
          }`}
        >
          {sessionTime}
        </p>
      </div>

      <button
        onClick={onActionClick}
        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
          isAvailable
            ? "bg-[#8b5cf6] hover:bg-[#8b5cf6]/90 text-white shadow-lg shadow-[#8b5cf6]/20"
            : "bg-[#2d264a] text-white hover:bg-white/10"
        }`}
      >
        {actionButtonLabel}
      </button>
    </div>
  );
};

export default MentorSessionCard;
