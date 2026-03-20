import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ListItem = ({
  avatarStyle,
  title,
  subtitle,
  rightIcon = 'chevron_right',
  onClick = () => { },
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div onClick={onClick} className={`flex items-center gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${isDarkMode ? 'bg-white/5 border-border-dark hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
      <div className="h-12 w-12 rounded-lg bg-cover bg-center" style={avatarStyle} />
      <div>
        <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-charcoal'}`}>{title}</p>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>{subtitle}</p>
      </div>
      <span className={`material-symbols-outlined ml-auto ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>{rightIcon}</span>
    </div>
  );
};

export default ListItem;
