import React from "react";

const SectionHeader = ({ title, showViewAll = true, onViewAll }) => {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-white text-2xl font-bold tracking-tight">{title}</h2>
      {showViewAll && (
        <a
          onClick={onViewAll}
          className="text-[#8b5cf6] text-sm font-semibold hover:text-[#8b5cf6]/80 transition-colors cursor-pointer"
        >
          View All
        </a>
      )}
    </div>
  );
};

export default SectionHeader;
