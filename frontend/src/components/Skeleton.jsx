import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

/* ═══════════════════════════════════════════════════
   SHARED SHIMMER STYLES — injected once per page
═══════════════════════════════════════════════════ */
const SHIMMER_CSS = `
  @keyframes cvx-shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  .cvx-skel {
    border-radius: 8px;
    background-size: 600px 100%;
    animation: cvx-shimmer 1.6s ease-in-out infinite;
  }
  .cvx-skel-dark {
    background-image: linear-gradient(
      90deg,
      #20152b 0px,
      #2d1f40 150px,
      #3a2854 250px,
      #2d1f40 350px,
      #20152b 500px
    );
  }
  .cvx-skel-light {
    background-image: linear-gradient(
      90deg,
      #e8e4ef 0px,
      #f0eaf8 150px,
      #f6f2fc 250px,
      #f0eaf8 350px,
      #e8e4ef 500px
    );
  }
`;

/** Inline-inject the shimmer CSS exactly once (idempotent) */
function useShimmerCSS() {
  if (typeof document !== "undefined" && !document.getElementById("cvx-skel-css")) {
    const style = document.createElement("style");
    style.id = "cvx-skel-css";
    style.textContent = SHIMMER_CSS;
    document.head.appendChild(style);
  }
}

/** Single shimmer block — the atomic building block */
export function Shim({ className = "", style = {}, isDark }) {
  useShimmerCSS();
  return (
    <div
      className={`cvx-skel ${isDark ? "cvx-skel-dark" : "cvx-skel-light"} ${className}`}
      style={style}
    />
  );
}

/* ═══════════════════════════════════════════════════
   CAREER CARD SKELETON  (AllCareers grid)
═══════════════════════════════════════════════════ */
export function CareerCardSkeleton({ count = 6 }) {
  const { isDarkMode } = useContext(ThemeContext);
  const s = isDarkMode;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`p-6 rounded-2xl border ${s ? "bg-[#1a142e] border-[#2d264a]" : "bg-white border-slate-200"}`}
          style={{ animationDelay: `${i * 0.07}s` }}
        >
          {/* Icon block + badge row */}
          <div className="flex items-start justify-between mb-5">
            <Shim isDark={s} style={{ width: 48, height: 48, borderRadius: 12 }} />
            <Shim isDark={s} style={{ width: 60, height: 20, borderRadius: 6 }} />
          </div>
          {/* Title */}
          <Shim isDark={s} className="mb-3" style={{ width: "72%", height: 20, borderRadius: 8 }} />
          {/* Description lines */}
          <Shim isDark={s} className="mb-2" style={{ width: "100%", height: 12, borderRadius: 6 }} />
          <Shim isDark={s} className="mb-5" style={{ width: "85%", height: 12, borderRadius: 6 }} />
          {/* CTA */}
          <Shim isDark={s} style={{ width: "55%", height: 14, borderRadius: 6 }} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CAREER PAGE SKELETON  (CareerPage detail)
═══════════════════════════════════════════════════ */
export function CareerPageSkeleton() {
  const { isDarkMode } = useContext(ThemeContext);
  const s = isDarkMode;
  const card = s ? "bg-[#161421] border-[#2d2845]" : "bg-white border-slate-200";

  return (
    <div className="flex flex-col w-full max-w-[1200px] px-4 md:px-10 gap-6 py-8 mx-auto">
      {/* Breadcrumb */}
      <div className="flex gap-2 items-center">
        <Shim isDark={s} style={{ width: 60, height: 14, borderRadius: 6 }} />
        <Shim isDark={s} style={{ width: 8, height: 14, borderRadius: 4 }} />
        <Shim isDark={s} style={{ width: 80, height: 14, borderRadius: 6 }} />
        <Shim isDark={s} style={{ width: 8, height: 14, borderRadius: 4 }} />
        <Shim isDark={s} style={{ width: 120, height: 14, borderRadius: 6 }} />
      </div>

      {/* Hero card */}
      <div className={`rounded-xl border p-6 ${card}`}>
        <div className="flex flex-col lg:flex-row gap-6 justify-between">
          <div className="flex flex-col gap-4 max-w-2xl flex-1">
            <div className="flex gap-2">
              <Shim isDark={s} style={{ width: 80, height: 22, borderRadius: 6 }} />
              <Shim isDark={s} style={{ width: 100, height: 22, borderRadius: 6 }} />
            </div>
            <Shim isDark={s} style={{ width: "70%", height: 42, borderRadius: 10 }} />
            <Shim isDark={s} style={{ width: "100%", height: 14, borderRadius: 6 }} />
            <Shim isDark={s} style={{ width: "90%", height: 14, borderRadius: 6 }} />
            <Shim isDark={s} style={{ width: "75%", height: 14, borderRadius: 6 }} />
          </div>
          <div className="flex flex-col gap-3 min-w-[200px]">
            <Shim isDark={s} style={{ width: "100%", height: 48, borderRadius: 10 }} />
            <Shim isDark={s} style={{ width: "100%", height: 48, borderRadius: 10 }} />
          </div>
        </div>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2/3 */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`rounded-xl border p-6 flex flex-col gap-3 ${card}`}>
                <div className="flex justify-between">
                  <Shim isDark={s} style={{ width: 80, height: 14, borderRadius: 6 }} />
                  <Shim isDark={s} style={{ width: 24, height: 24, borderRadius: 6 }} />
                </div>
                <Shim isDark={s} style={{ width: "60%", height: 28, borderRadius: 8 }} />
                <Shim isDark={s} style={{ width: "45%", height: 12, borderRadius: 6 }} />
              </div>
            ))}
          </div>

          {/* Chart placeholder */}
          <div className={`rounded-xl border p-6 ${card}`}>
            <div className="flex justify-between mb-6">
              <Shim isDark={s} style={{ width: 160, height: 24, borderRadius: 8 }} />
              <Shim isDark={s} style={{ width: 120, height: 16, borderRadius: 6 }} />
            </div>
            <Shim isDark={s} style={{ width: "100%", height: 180, borderRadius: 10 }} />
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-4">
            <Shim isDark={s} style={{ width: 120, height: 26, borderRadius: 8 }} />
            <div className="flex flex-wrap gap-3">
              {[100, 80, 120, 90, 110, 95].map((w, i) => (
                <Shim key={i} isDark={s} style={{ width: w, height: 36, borderRadius: 999 }} />
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className={`rounded-xl border overflow-hidden ${card}`}>
            <div className={`p-6 border-b ${s ? "border-[#2d2845]" : "border-slate-100"}`}>
              <Shim isDark={s} style={{ width: 180, height: 22, borderRadius: 8 }} />
            </div>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`flex gap-4 p-5 ${i > 0 ? (s ? "border-t border-[#2d2845]" : "border-t border-slate-100") : ""}`}>
                <Shim isDark={s} style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0 }} />
                <div className="flex-1 flex flex-col gap-2">
                  <Shim isDark={s} style={{ width: "55%", height: 16, borderRadius: 6 }} />
                  <Shim isDark={s} style={{ width: "80%", height: 12, borderRadius: 6 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-6">
          {/* Education roadmap */}
          <div className={`rounded-xl border p-6 ${card}`}>
            <Shim isDark={s} className="mb-5" style={{ width: 160, height: 22, borderRadius: 8 }} />
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-4 mb-5">
                <Shim isDark={s} style={{ width: 24, height: 24, borderRadius: 999, flexShrink: 0 }} />
                <div className="flex-1 flex flex-col gap-2">
                  <Shim isDark={s} style={{ width: "70%", height: 14, borderRadius: 6 }} />
                  <Shim isDark={s} style={{ width: "90%", height: 12, borderRadius: 6 }} />
                </div>
              </div>
            ))}
            <Shim isDark={s} style={{ width: "100%", height: 40, borderRadius: 10 }} />
          </div>

          {/* Top mentors */}
          <div className={`rounded-xl border p-6 ${card}`}>
            <Shim isDark={s} className="mb-5" style={{ width: 120, height: 22, borderRadius: 8 }} />
            {[0, 1].map((i) => (
              <div key={i} className="flex gap-3 mb-4">
                <Shim isDark={s} style={{ width: 48, height: 48, borderRadius: 999, flexShrink: 0 }} />
                <div className="flex-1 flex flex-col gap-2">
                  <Shim isDark={s} style={{ width: "65%", height: 14, borderRadius: 6 }} />
                  <Shim isDark={s} style={{ width: "90%", height: 12, borderRadius: 6 }} />
                </div>
                <Shim isDark={s} style={{ width: 32, height: 32, borderRadius: 999, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DASHBOARD CARD SKELETON  (Top Career Matches)
═══════════════════════════════════════════════════ */
export function DashboardCardSkeleton({ count = 2 }) {
  const { isDarkMode } = useContext(ThemeContext);
  const s = isDarkMode;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`p-6 rounded-2xl border ${s ? "bg-[#1a142e] border-[#2d264a]" : "bg-white border-border-light"}`}
        >
          {/* Icon */}
          <Shim isDark={s} className="mb-6" style={{ width: 48, height: 48, borderRadius: 12 }} />
          {/* Title */}
          <Shim isDark={s} className="mb-3" style={{ width: "66%", height: 20, borderRadius: 8 }} />
          {/* Description */}
          <Shim isDark={s} className="mb-2" style={{ width: "100%", height: 12, borderRadius: 6 }} />
          <Shim isDark={s} style={{ width: "80%", height: 12, borderRadius: 6 }} />
          {/* Match bar */}
          <div className="mt-4 flex gap-2 items-center">
            <Shim isDark={s} style={{ flex: 1, height: 8, borderRadius: 999 }} />
            <Shim isDark={s} style={{ width: 40, height: 14, borderRadius: 6 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MENTOR CARD SKELETON  (MentorMarketplace)
═══════════════════════════════════════════════════ */
export function MentorCardSkeleton({ count = 6 }) {
  const { isDarkMode } = useContext(ThemeContext);
  const s = isDarkMode;
  const cardBg = s ? "#0f0824" : "#ffffff";
  const border = s ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 20,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            background: cardBg,
            border: `1px solid ${border}`,
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          {/* Thumbnail placeholder */}
          <Shim isDark={s} style={{ width: "100%", aspectRatio: "16/9", borderRadius: 0 }} />
          {/* Card body */}
          <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Avatar + name row */}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <Shim isDark={s} style={{ width: 50, height: 50, borderRadius: 12, flexShrink: 0 }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                <Shim isDark={s} style={{ width: "65%", height: 16, borderRadius: 6 }} />
                <Shim isDark={s} style={{ width: "90%", height: 12, borderRadius: 6 }} />
                <Shim isDark={s} style={{ width: "45%", height: 11, borderRadius: 6 }} />
              </div>
            </div>
            {/* Tags row */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <Shim isDark={s} style={{ width: 80, height: 24, borderRadius: 6 }} />
              <Shim isDark={s} style={{ width: 70, height: 24, borderRadius: 6 }} />
              <Shim isDark={s} style={{ width: 90, height: 24, borderRadius: 6 }} />
            </div>
            {/* Footer */}
            <div style={{ borderTop: `1px dashed ${border}`, paddingTop: 12, display: "flex", justifyContent: "flex-end" }}>
              <Shim isDark={s} style={{ width: 120, height: 38, borderRadius: 10 }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ASSESSMENTS HUB SKELETON
═══════════════════════════════════════════════════ */
export function AssessmentCardSkeleton({ count = 6 }) {
  const { isDarkMode } = useContext(ThemeContext);
  const s = isDarkMode;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`p-6 rounded-2xl border flex flex-col gap-4 ${s ? "bg-[#1a142e] border-[#2d264a]" : "bg-white border-slate-200"}`}>
          <div className="flex gap-3 items-center">
            <Shim isDark={s} style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0 }} />
            <div className="flex-1 flex flex-col gap-2">
              <Shim isDark={s} style={{ width: "75%", height: 16, borderRadius: 6 }} />
              <Shim isDark={s} style={{ width: "55%", height: 12, borderRadius: 6 }} />
            </div>
          </div>
          <Shim isDark={s} style={{ width: "100%", height: 12, borderRadius: 6 }} />
          <Shim isDark={s} style={{ width: "80%", height: 12, borderRadius: 6 }} />
          <div className="flex gap-2 mt-auto pt-2">
            <Shim isDark={s} style={{ width: 60, height: 22, borderRadius: 999 }} />
            <Shim isDark={s} style={{ width: 70, height: 22, borderRadius: 999 }} />
          </div>
          <Shim isDark={s} style={{ width: "100%", height: 40, borderRadius: 10 }} />
        </div>
      ))}
    </div>
  );
}
