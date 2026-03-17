import React from "react";

const OptionCard = ({
  value,
  title,
  desc,
  icon,
  selected = false,
  onSelect = () => {},
  inputType = "button",
  name,
}) => {
  const baseRadio = selected
    ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(134,85,246,0.12)]"
    : "border-white/5";

  if (inputType === "radio") {
    return (
      <label className={`flex items-center gap-4 rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${baseRadio}`}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={selected}
          onChange={() => onSelect(value)}
          className="h-5 w-5 border-2 border-white/20 bg-transparent text-transparent checked:border-primary focus:outline-none focus:ring-0"
        />
        <div className="flex grow flex-col">
          <p className="text-white text-base font-bold tracking-tight">{title}</p>
          <p className="text-white/40 text-xs mt-0.5">{desc}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
          <span className="material-symbols-outlined text-white/30">{icon}</span>
        </div>
      </label>
    );
  }

  // button style for stream selection
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`group w-full flex items-center justify-between p-4 rounded-xl text-left transition ${
        selected
          ? "border border-primary bg-primary/10 shadow-[0_6px_20px_rgba(134,85,246,0.12)]"
          : "border border-white/5 bg-white/5 hover:border-primary hover:bg-primary/5"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`size-10 flex items-center justify-center rounded-lg transition-colors ${
            selected ? "bg-primary/20" : "bg-white/5"
          }`}
        >
          <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">{icon}</span>
        </div>

        <div>
          <span className="block text-sm font-semibold">{title}</span>
          <span className="block text-xs text-gray-500">{desc}</span>
        </div>
      </div>

      <span className="material-symbols-outlined text-gray-600 group-hover:text-primary text-lg">chevron_right</span>
    </button>
  );
};

export default OptionCard;
