import React from "react";
import InternalNavbar from "../components/InternalNavbar";
import Footer from "../components/internalfooter";
import { useNavigate } from "react-router-dom";
import MentorMarketplace from "../components/MentorMarketplace";

const Mentors = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#080614",
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
            color: "#9ca3af",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            padding: 0,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
        >
          Home
        </button>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2">
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
