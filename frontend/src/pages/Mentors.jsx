import React, { useContext } from "react";
import InternalNavbar from "../components/InternalNavbar";
import Footer from "../components/internalfooter";
import { useNavigate } from "react-router-dom";
import MentorMarketplace from "../components/MentorMarketplace";
import { ThemeContext } from "../context/ThemeContext";

const Mentors = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen flex flex-col ${isDarkMode ? "bg-background-dark text-white" : "bg-surface-light text-charcoal"}`}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <InternalNavbar />

      {/* Breadcrumb */}
      <nav
        style={{
          maxWidth: 1380,
          margin: "0 auto",
          width: "100%",
          padding: "16px 20px 0",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "none",
            border: "none",
            color: isDarkMode ? "#9ca3af" : "#64748b",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            padding: 0,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
          onMouseLeave={(e) => (e.currentTarget.style.color = isDarkMode ? "#9ca3af" : "#64748b")}
        >
          Home
        </button>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? "#4b5563" : "#94a3b8"} strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span style={{ color: "#7c3aed", fontSize: 13, fontWeight: 600 }}>
          Mentor Marketplace
        </span>
      </nav>

      <main style={{ flex: 1 }}>
        <MentorMarketplace />
      </main>

      <Footer />
    </div>
  );
};

export default Mentors;
