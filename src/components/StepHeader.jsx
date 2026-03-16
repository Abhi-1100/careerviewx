import React from "react";

const StepHeader = ({ step = 1, totalSteps = 3, title = "", subtitle = "" }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest text-primary uppercase">Step {step} of {totalSteps}</span>
        <div className="flex gap-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1 w-8 rounded-full ${step === i + 1 ? 'bg-primary' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
};

export default StepHeader;
