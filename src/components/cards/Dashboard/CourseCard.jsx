import React from "react";

const CourseCard = ({ imageUrl, title, platform, duration, isPopular = false }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl aspect-video mb-3 border border-[#2d264a] card-elevation">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 z-10"></div>
        <div
          className="w-full h-full bg-center bg-cover transform group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
        {isPopular && (
          <div className="absolute bottom-3 left-3 z-20">
            <span className="px-2 py-0.5 bg-[#8b5cf6] text-[9px] font-bold text-white rounded uppercase">
              Popular
            </span>
          </div>
        )}
      </div>
      <h4 className="text-white font-semibold text-sm group-hover:text-[#8b5cf6] transition-colors">
        {title}
      </h4>
      <p className="text-[#a094b8] text-xs mt-1 flex items-center gap-1.5">
        <span className="material-symbols-outlined text-[14px]">school</span>
        {platform} • {duration}
      </p>
    </div>
  );
};

export default CourseCard;
