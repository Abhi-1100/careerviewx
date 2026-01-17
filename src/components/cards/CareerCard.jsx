const CareerCard = ({ icon, name, salary, growth, demand, chartPoints }) => {
  const isPositive = growth.startsWith("+");

  return (
    <div
      className="
      bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 hover:bg-slate-800/40 transition-all duration-300 text-slate-100

    "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            isPositive
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {growth}
        </span>
      </div>

      {/* Title */}
      <h4 className="mt-4 text-sm font-semibold leading-tight">{name}</h4>

      {/* Salary */}
      <p className="text-lg font-bold mt-1">{salary}</p>

      {/* Demand */}
      <p className="text-xs text-white/60 mt-1">Demand: {demand}</p>

      {/* Chart */}
      <svg className="w-full h-10 mt-4">
        <polyline
          points={chartPoints}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default CareerCard;
