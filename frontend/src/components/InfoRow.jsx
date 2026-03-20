import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const InfoRow = ({ title, subtitle, right, variant = 'default' }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const leftBorder = variant === 'primary' ? 'border-l-2 border-primary' : `border-l-2 ${isDarkMode ? 'border-border-dark' : 'border-slate-300'}`;
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${leftBorder} ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
      <div>
        <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-charcoal'}`}>{title}</p>
        {subtitle && <p className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{subtitle}</p>}
      </div>
      <div className="text-right">{right}</div>
    </div>
  );
};

export default InfoRow;
