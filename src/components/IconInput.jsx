import React from 'react';

const IconInput = ({ iconLeft, rightElement, inputProps }) => {
  return (
    <div className="relative group">
      {iconLeft && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 group-focus-within:text-primary">{iconLeft}</span>
      )}
      <input
        {...inputProps}
        className={`w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-600 ${inputProps.className || ''}`}
      />
      {rightElement && <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightElement}</div>}
    </div>
  );
};

export default IconInput;
