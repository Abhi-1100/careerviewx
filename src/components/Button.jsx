import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }) => {
  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]',
    ghost: 'bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium rounded-xl py-3 px-4',
    card: 'w-full mt-6 py-2 bg-card-dark border border-border-dark text-xs font-bold uppercase tracking-widest text-gray-300 rounded hover:bg-white/5 transition-colors',
    smallGhost: 'text-primary text-sm font-medium hover:text-primary/80 transition-all',
  };

  const classes = `${variants[variant] || ''} ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;
