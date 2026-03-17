import React from 'react';

const InfoRow = ({ title, subtitle, right, variant = 'default' }) => {
  const leftBorder = variant === 'primary' ? 'border-l-2 border-primary' : 'border-l-2 border-border-dark';
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg bg-white/5 ${leftBorder}`}>
      <div>
        <p className="text-sm font-bold text-white">{title}</p>
        {subtitle && <p className="text-[10px] text-gray-400">{subtitle}</p>}
      </div>
      <div className="text-right">{right}</div>
    </div>
  );
};

export default InfoRow;
