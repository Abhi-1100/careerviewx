import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const LoadingScreen = ({ message = "Loading your career experience...", fullScreen = true }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`
        ${fullScreen ? "min-h-screen" : "h-full min-h-[280px]"}
        relative flex items-center justify-center overflow-hidden
        ${isDarkMode ? "bg-[#191022]" : "bg-surface-light"}
        animate-[fadeIn_0.4s_ease_both]
      `}
      style={{ animation: "cvx-fadein 0.4s ease both" }}
    >
      {/* Background glow blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(140,43,238,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.12) 0%, transparent 45%)",
        }}
      />

      {/* Card */}
      <div
        className={`
          relative z-10 rounded-2xl px-10 py-8 text-center backdrop-blur-sm border
          ${isDarkMode
            ? "bg-[#20152b]/80 border-[#2d264a] text-white shadow-[0_0_40px_rgba(140,43,238,0.08)]"
            : "bg-white/80 border-border-light text-charcoal shadow-xl"
          }
        `}
        style={{ animation: "cvx-slideup 0.5s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        {/* Spinner rings */}
        <div className="relative mx-auto mb-6 h-[72px] w-[72px]">
          {/* Outer static ring */}
          <span className="absolute inset-0 rounded-full border-2 border-[rgba(140,43,238,0.2)]" />
          {/* Purple spinning ring */}
          <span
            className="absolute inset-[4px] rounded-full border-[3px] border-transparent animate-spin"
            style={{ borderTopColor: "#8c2bee", borderRightColor: "rgba(140,43,238,0.35)", animationDuration: "1.3s" }}
          />
          {/* Blue counter-spin */}
          <span
            className="absolute inset-[10px] rounded-full border-2 border-transparent animate-spin"
            style={{ borderBottomColor: "#3b82f6", borderLeftColor: "rgba(59,130,246,0.3)", animationDuration: "2s", animationDirection: "reverse" }}
          />
          {/* Logo */}
          <img
            src="/logo.png"
            alt="CareerviewX"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-lg"
            style={{ filter: "drop-shadow(0 0 8px rgba(140,43,238,0.5))" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        {/* Text */}
        <p className="font-display text-base md:text-lg font-semibold mb-1">{message}</p>
        <p className={`text-sm mb-5 ${isDarkMode ? "text-[#b4a6be]" : "text-slate-500"}`}>
          Preparing insights for your next move…
        </p>

        {/* Shimmer progress bar */}
        <div
          className="mx-auto h-[3px] w-[180px] rounded-full overflow-hidden"
          style={{ background: "rgba(140,43,238,0.15)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #8c2bee, #c899ff, #3b82f6)",
              backgroundSize: "200% 100%",
              boxShadow: "0 0 10px rgba(140,43,238,0.6)",
              animation: "cvx-bar 1.8s ease-in-out infinite, cvx-shimmer 2.4s linear infinite",
            }}
          />
        </div>

        {/* Pulse dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {[0, 0.2, 0.4].map((delay, i) => (
            <span
              key={i}
              className="inline-block w-[5px] h-[5px] rounded-full"
              style={{
                background: "rgba(140,43,238,0.5)",
                animation: `cvx-dot 1.2s ease-in-out ${delay}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Inline keyframes injection */}
      <style>{`
        @keyframes cvx-fadein  { from{opacity:0} to{opacity:1} }
        @keyframes cvx-slideup { from{opacity:0;transform:translateY(16px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes cvx-bar     { 0%{transform:translateX(-100%) scaleX(0.6)} 50%{transform:translateX(0) scaleX(1)} 100%{transform:translateX(100%) scaleX(0.6)} }
        @keyframes cvx-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes cvx-dot     { 0%,80%,100%{transform:scale(1);opacity:0.4} 40%{transform:scale(1.6);opacity:1;background:#8c2bee} }
      `}</style>
    </div>
  );
};

export default LoadingScreen;

