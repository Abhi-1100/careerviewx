import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const LoadingScreen = ({ message = "Loading your career experience...", fullScreen = true }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`
        ${fullScreen ? "min-h-screen" : "h-full min-h-[280px]"}
        relative flex items-center justify-center overflow-hidden
        ${isDarkMode ? "bg-surface-dark" : "bg-surface-light"}
      `}
    >
      <div
        className={`
          absolute inset-0
          ${isDarkMode ? "opacity-60" : "opacity-90"}
          bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.22),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.16),transparent_42%)]
        `}
      />

      <div
        className={`
          relative z-10 rounded-2xl border px-8 py-7 text-center shadow-2xl backdrop-blur-sm
          ${isDarkMode ? "border-border-dark bg-panel-dark/80 text-white" : "border-border-light bg-card-white/80 text-charcoal"}
        `}
      >
        <div className="relative mx-auto mb-5 h-20 w-20">
          <span className="absolute inset-0 rounded-full border-4 border-primary/30" />
          <span className="absolute inset-1 rounded-full border-4 border-transparent border-t-primary animate-spin" />
          <span className="absolute inset-3 rounded-full border-2 border-transparent border-r-accent-blue animate-spin [animation-direction:reverse] [animation-duration:1.3s]" />
          <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary">rocket_launch</span>
        </div>

        <p className="font-display text-base md:text-lg">{message}</p>
        <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
          Preparing insights for your next move...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
