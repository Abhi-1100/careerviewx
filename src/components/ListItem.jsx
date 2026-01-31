import React from 'react';

const ListItem = ({
  avatarStyle,
  title,
  subtitle,
  rightIcon = 'chevron_right',
  onClick = () => {},
}) => {
  return (
    <div onClick={onClick} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-border-dark hover:bg-white/10 transition-colors cursor-pointer">
      <div className="h-12 w-12 rounded-lg bg-cover bg-center" style={avatarStyle} />
      <div>
        <p className="font-bold text-sm text-white">{title}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
      <span className="material-symbols-outlined ml-auto text-gray-500">{rightIcon}</span>
    </div>
  );
};

export default ListItem;
