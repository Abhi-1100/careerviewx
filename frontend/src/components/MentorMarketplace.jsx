// "use client" — Next.js App Router compatible (also works in React CRA)
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";

import { ThemeContext } from "../context/ThemeContext";
import { MentorCardSkeleton } from "./Skeleton";

/* ─────────────────────────────────────────────────────────────
   COLOUR PALETTE & DESIGN TOKENS
───────────────────────────────────────────────────────────── */
const getC = (isDarkMode) => ({
  bg: isDarkMode ? "#080614" : "#f8fafc",
  card: isDarkMode ? "#0f0824" : "#ffffff",
  cardHover: isDarkMode ? "#1a1040" : "#f1f5f9",
  primary: "#7c3aed",
  primaryLight: isDarkMode ? "#a78bfa" : "#6d28d9",
  border: isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)",
  muted: isDarkMode ? "#9ca3af" : "#64748b",
  gold: "#f59e0b",
  white: isDarkMode ? "#ffffff" : "#0f172a",
  surface: isDarkMode ? "#150d30" : "#ffffff",
  heroGradientEnd: isDarkMode ? "#1a0a3a" : "#f3e8ff",
  textGradientStart: isDarkMode ? "#ffffff" : "#3b0764",
  textGradientEnd: isDarkMode ? "#a78bfa" : "#7c3aed",
  buttonBgOff: isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
  divider: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
});

/* ─────────────────────────────────────────────────────────────
   SAMPLE MENTOR DATA  (8 mentors)
───────────────────────────────────────────────────────────── */
const MENTOR_DATA = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Senior UX Designer",
    company: "Google",
    rating: 4.9,
    reviews: 214,
    price: 75,
    tags: ["UX Design", "Portfolios"],
    category: "Product Design",
    experience: "Senior (8+ yrs)",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format",
    videoId: "U3oljUZQtCk",
    videoSource: "youtube",
    previewMp4: null,
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Staff Engineer",
    company: "Meta",
    rating: 4.8,
    reviews: 187,
    price: 120,
    tags: ["System Design", "Interviews"],
    category: "Engineering",
    experience: "Senior (8+ yrs)",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format",
    videoId: "b5XNNg_k6oQ",
    videoSource: "youtube",
    previewMp4: null,
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Product Manager",
    company: "Airbnb",
    rating: 4.7,
    reviews: 128,
    price: 90,
    tags: ["Product Strategy", "Roadmaps"],
    category: "Management",
    experience: "Mid (4-7 yrs)",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&auto=format",
    videoId: "kwveytaynAs",
    videoSource: "youtube",
    previewMp4: null,
  },
  {
    id: 4,
    name: "Alex Rivera",
    role: "Frontend Architect",
    company: "Shopify",
    rating: 4.9,
    reviews: 302,
    price: 100,
    tags: ["React", "Performance"],
    category: "Engineering",
    experience: "Senior (8+ yrs)",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&auto=format",
    videoId: "Tef1e9FiSR0",
    videoSource: "youtube",
    previewMp4: null,
  },
  {
    id: 5,
    name: "Emma Watson",
    role: "Design Lead",
    company: "Figma",
    rating: 5.0,
    reviews: 89,
    price: 150,
    tags: ["Design Systems", "Figma"],
    category: "Product Design",
    experience: "Senior (8+ yrs)",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&auto=format",
    videoId: "rS3J7TJRbWg",
    videoSource: "youtube",
    previewMp4: null,
  },
  {
    id: 6,
    name: "James Okafor",
    role: "ML Engineer",
    company: "OpenAI",
    rating: 4.6,
    reviews: 55,
    price: 60,
    tags: ["Machine Learning", "Python"],
    category: "Engineering",
    experience: "Mid (4-7 yrs)",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format",
    videoId: "8_Bx7HRo_ms",
    videoSource: "youtube",
    previewMp4: null,
  },
  {
    id: 7,
    name: "Lena Park",
    role: "Engineering Manager",
    company: "Stripe",
    rating: 4.8,
    reviews: 143,
    price: 110,
    tags: ["Leadership", "Career Growth"],
    category: "Management",
    experience: "Senior (8+ yrs)",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&auto=format",
    videoId: "8NFUEHqzYoo",
    videoSource: "youtube",
    previewMp4: null,
  },
  {
    id: 8,
    name: "Noah Williams",
    role: "Junior Designer",
    company: "Notion",
    rating: 4.4,
    reviews: 31,
    price: 40,
    tags: ["UI Design", "Branding"],
    category: "Product Design",
    experience: "Entry (1-3 yrs)",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=120&h=120&fit=crop&auto=format",
    videoId: "UNGenNCw9N4",
    videoSource: "youtube",
    previewMp4: null,
  },
];

const CATEGORIES = ["ALL TECH", "Product Design", "Engineering", "Management"];
const INDUSTRIES = ["Technology", "Finance", "Design", "Marketing", "Healthcare"];
const EXPERIENCES = ["Entry (1-3 yrs)", "Mid (4-7 yrs)", "Senior (8+ yrs)"];
const PER_PAGE = 6;

/* ─────────────────────────────────────────────────────────────
   STARS COMPONENT
───────────────────────────────────────────────────────────── */
export function Stars({ rating }) {
  const { isDarkMode } = useContext(ThemeContext);
  const C = getC(isDarkMode);
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half);
        return (
          <svg
            key={i}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={filled ? C.gold : "none"}
            stroke={C.gold}
            strokeWidth="2"
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        );
      })}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   CHECKBOX COMPONENT
───────────────────────────────────────────────────────────── */
export function Checkbox({ label, checked, onChange }) {
  const { isDarkMode } = useContext(ThemeContext);
  const C = getC(isDarkMode);
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <span
        onClick={onChange}
        style={{
          width: 18,
          height: 18,
          borderRadius: 5,
          border: `2px solid ${checked ? C.primary : "rgba(255,255,255,0.25)"}`,
          background: checked ? C.primary : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.2s",
          cursor: "pointer",
        }}
      >
        {checked && (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <polyline
              points="2,6 5,9 10,3"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span style={{ color: C.muted, fontSize: 13, lineHeight: 1 }}>{label}</span>
    </label>
  );
}

/* ─────────────────────────────────────────────────────────────
   RADIO COMPONENT
───────────────────────────────────────────────────────────── */
export function Radio({ label, checked, onChange }) {
  const { isDarkMode } = useContext(ThemeContext);
  const C = getC(isDarkMode);
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <span
        onClick={onChange}
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: `2px solid ${checked ? C.primary : "rgba(255,255,255,0.25)"}`,
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.2s",
          cursor: "pointer",
        }}
      >
        {checked && (
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: C.primary,
            }}
          />
        )}
      </span>
      <span style={{ color: C.muted, fontSize: 13, lineHeight: 1 }}>{label}</span>
    </label>
  );
}

/* ─────────────────────────────────────────────────────────────
   VIDEO MODAL  (Feature 3)
───────────────────────────────────────────────────────────── */
export function VideoModal({ mentor, onClose }) {
  const { isDarkMode } = useContext(ThemeContext);
  const C = getC(isDarkMode);

  useEffect(() => {
    if (!mentor) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mentor, onClose]);

  if (!mentor) return null;

  const embedUrl =
    mentor.videoSource === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${mentor.videoId}?autoplay=1&rel=0&modestbranding=1`
      : `https://player.vimeo.com/video/${mentor.videoId}?autoplay=1&muted=1&title=0&byline=0`;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(4,2,16,0.88)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        animation: "mmFade 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 20,
          width: "100%",
          maxWidth: 780,
          overflow: "hidden",
          animation: "mmUp 0.3s ease",
          boxShadow: `0 30px 80px rgba(124,58,237,0.35)`,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 22px",
            borderBottom: `1px solid ${C.border}`,
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img
              src={mentor.avatar}
              alt={mentor.name}
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                objectFit: "cover",
                border: `2px solid ${C.primary}`,
              }}
            />
            <div>
              <p
                style={{
                  color: C.white,
                  fontWeight: 700,
                  fontSize: 16,
                  margin: 0,
                  fontFamily: "Syne, sans-serif",
                }}
              >
                {mentor.name}
              </p>
              <p style={{ color: C.muted, fontSize: 12, margin: 0 }}>
                {mentor.role} @ {mentor.company}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: C.buttonBgOff,
              border: "none",
              borderRadius: 10,
              width: 36,
              height: 36,
              color: C.muted,
              fontSize: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = C.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = C.muted;
            }}
          >
            ✕
          </button>
        </div>

        {/* 16:9 iframe embed */}
        <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000" }}>
          <iframe
            src={embedUrl}
            title={`${mentor.name} intro video`}
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "16px 22px",
            borderTop: `1px solid ${C.border}`,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={onClose}
              style={{
                background: C.buttonBgOff,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                color: C.muted,
                fontSize: 14,
                fontWeight: 600,
                padding: "10px 20px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
            >
              Close
            </button>
            <button
              style={{
                background: `linear-gradient(135deg, ${C.primary}, #5b21b6)`,
                border: "none",
                borderRadius: 10,
                color: C.white,
                fontSize: 14,
                fontWeight: 700,
                padding: "10px 22px",
                cursor: "pointer",
                boxShadow: `0 4px 18px rgba(124,58,237,0.4)`,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Book Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MENTOR CARD  (Features 1 & 2)
───────────────────────────────────────────────────────────── */
export function MentorCard({ mentor, onOpenModal }) {
  const { isDarkMode } = useContext(ThemeContext);
  const C = getC(isDarkMode);

  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const thumbUrl =
    mentor.videoSource === "youtube"
      ? `https://img.youtube.com/vi/${mentor.videoId}/hqdefault.jpg`
      : mentor.thumbnailUrl || `https://img.youtube.com/vi/${mentor.videoId}/hqdefault.jpg`;

  const onMouseEnter = useCallback(() => {
    setHovered(true);
    if (!mentor.previewMp4) return;
    timerRef.current = setTimeout(() => {
      const vid = videoRef.current;
      if (vid) {
        vid.currentTime = 0;
        vid.play().catch(() => { });
        setVideoPlaying(true);
      }
    }, 300);
  }, [mentor.previewMp4]);

  const onMouseLeave = useCallback(() => {
    setHovered(false);
    clearTimeout(timerRef.current);
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
    setVideoPlaying(false);
  }, []);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        background: hovered ? C.cardHover : C.card,
        border: `1px solid ${hovered ? `rgba(124,58,237,0.45)` : C.border}`,
        borderRadius: 18,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        boxShadow: hovered
          ? "0 20px 60px rgba(124,58,237,0.2)"
          : "0 4px 20px rgba(0,0,0,0.3)",
        cursor: "default",
      }}
    >
      {/* ── Thumbnail Area ── */}
      <div
        onClick={() => onOpenModal(mentor)}
        style={{
          position: "relative",
          aspectRatio: "16/9",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Static thumbnail */}
        <img
          src={thumbUrl}
          alt={`${mentor.name} intro`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: videoPlaying ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Video preview (Feature 2) */}
        {mentor.previewMp4 ? (
          <video
            ref={videoRef}
            src={mentor.previewMp4}
            muted
            playsInline
            loop
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: videoPlaying ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />
        ) : (
          /* Purple gradient fallback when no MP4 */
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, #1a0540, #3b1180, #0f0824)`,
              opacity: hovered ? 1 : 0,
              animation: hovered ? "mmPulse 1.6s ease-in-out infinite alternate" : "none",
              transition: "opacity 0.4s",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Dark overlay for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(8,6,20,0.75) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        {/* ▶ INTRO VIDEO pill (top-left) */}
        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "rgba(8,6,20,0.75)",
            backdropFilter: "blur(6px)",
            border: `1px solid rgba(124,58,237,0.5)`,
            color: C.primaryLight,
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.08em",
            padding: "4px 10px",
            borderRadius: 99,
          }}
        >
          ▶ INTRO VIDEO
        </span>

        {/* YouTube/Vimeo badge (top-right) */}
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background:
              mentor.videoSource === "youtube"
                ? "rgba(255,0,0,0.85)"
                : "rgba(26,183,234,0.85)",
            backdropFilter: "blur(4px)",
            color: "#fff",
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: "0.05em",
            padding: "3px 8px",
            borderRadius: 6,
          }}
        >
          {mentor.videoSource === "youtube" ? "YouTube" : "Vimeo"}
        </span>

        {/* Play button overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hovered && !videoPlaying ? 1 : 0,
            transition: "opacity 0.3s",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: `rgba(124,58,237,0.9)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 0 12px rgba(124,58,237,0.2)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {/* Avatar + name row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <img
            src={mentor.avatar}
            alt={mentor.name}
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              objectFit: "cover",
              border: `2px solid rgba(124,58,237,0.35)`,
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h3
                style={{
                  color: hovered ? C.primaryLight : C.white,
                  fontWeight: 800,
                  fontSize: 16,
                  margin: 0,
                  fontFamily: "Syne, sans-serif",
                  transition: "color 0.25s",
                }}
              >
                {mentor.name}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Stars rating={mentor.rating} />
                <span style={{ color: C.white, fontSize: 12, fontWeight: 700 }}>
                  {mentor.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <p style={{ color: C.muted, fontSize: 12, margin: "3px 0 0", fontFamily: "DM Sans, sans-serif" }}>
              {mentor.role} @ {mentor.company}
            </p>
            <p style={{ color: "rgba(156,163,175,0.6)", fontSize: 11, margin: "2px 0 0" }}>
              {mentor.reviews} reviews
            </p>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {mentor.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "rgba(124,58,237,0.12)",
                border: `1px solid rgba(124,58,237,0.25)`,
                color: C.primaryLight,
                fontSize: 10,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: 6,
                letterSpacing: "0.03em",
              }}
            >
              {tag}
            </span>
          ))}
          <span
            style={{
              background: C.buttonBgOff,
              border: `1px solid ${C.border}`,
              color: C.muted,
              fontSize: 10,
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            {mentor.experience}
          </span>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            borderTop: `1px dashed ${C.divider}`,
            paddingTop: 14,
            marginTop: "auto",
          }}
        >
          <button
            onClick={() => onOpenModal(mentor)}
            style={{
              background: `linear-gradient(135deg, ${C.primary}, #5b21b6)`,
              border: "none",
              borderRadius: 10,
              color: C.white,
              fontSize: 13,
              fontWeight: 700,
              padding: "10px 18px",
              cursor: "pointer",
              boxShadow: `0 4px 16px rgba(124,58,237,0.35)`,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Book Session
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MENTOR MARKETPLACE  (main page component)
───────────────────────────────────────────────────────────── */
export default function MentorMarketplace() {
  const { isDarkMode } = useContext(ThemeContext);
  const C = getC(isDarkMode);

  const [initialLoading, setInitialLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL TECH");
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [sortMode, setSortMode] = useState("Trending");
  const [modalMentor, setModalMentor] = useState(null);
  const [page, setPage] = useState(1);

  const toggleIndustry = (ind) =>
    setSelectedIndustries((prev) =>
      prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind]
    );

  const filtered = useMemo(() => {
    let list = [...MENTOR_DATA];
    if (activeCategory !== "ALL TECH")
      list = list.filter((m) => m.category === activeCategory);
    if (selectedExperience)
      list = list.filter((m) => m.experience === selectedExperience);
    if (sortMode === "Trending") list.sort((a, b) => b.reviews - a.reviews);
    else list.sort((a, b) => b.id - a.id);
    return list;
  }, [activeCategory, selectedExperience, sortMode]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleClearFilters = () => {
    setSelectedIndustries([]);
    setSelectedExperience("");
    setActiveCategory("ALL TECH");
    setPage(1);
  };

  // Brief skeleton on first mount for a polished feel
  useEffect(() => {
    const t = setTimeout(() => setInitialLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (initialLoading) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, padding: "40px 20px" }}>
        <div className="max-w-[1380px] mx-auto">
          <MentorCardSkeleton count={6} isDark={isDarkMode} />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Global Style Tag ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes mmFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes mmUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mmPulse {
          from { opacity: 0.5; }
          to   { opacity: 1; }
        }

      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: C.bg,
          fontFamily: "DM Sans, sans-serif",
          color: C.white,
        }}
      >
        <div
          className="max-w-[1380px] mx-auto px-5 py-8 flex flex-col lg:flex-row gap-7 items-start"
        >
          {/* ════════════════════════
              SIDEBAR FILTERS
          ════════════════════════ */}
          <aside
            className="w-full lg:w-[248px] shrink-0 lg:sticky lg:top-[88px] rounded-[18px] p-[22px_18px] flex flex-col gap-6"
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ margin: 0, fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 17 }}>
                Filters
              </h2>
              <button
                onClick={handleClearFilters}
                style={{
                  background: "none",
                  border: "none",
                  color: C.primaryLight,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Clear All
              </button>
            </div>

            {/* Industry */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
                <span style={{ fontWeight: 700, fontSize: 13 }}>Industry</span>
              </div>
              {INDUSTRIES.map((ind) => (
                <Checkbox
                  key={ind}
                  label={ind}
                  checked={selectedIndustries.includes(ind)}
                  onChange={() => { toggleIndustry(ind); setPage(1); }}
                />
              ))}
            </div>

            {/* Experience */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                <span style={{ fontWeight: 700, fontSize: 13 }}>Experience</span>
              </div>
              <Radio
                label="Any"
                checked={selectedExperience === ""}
                onChange={() => { setSelectedExperience(""); setPage(1); }}
              />
              {EXPERIENCES.map((exp) => (
                <Radio
                  key={exp}
                  label={exp}
                  checked={selectedExperience === exp}
                  onChange={() => { setSelectedExperience(exp); setPage(1); }}
                />
              ))}
            </div>

            {/* Apply button */}
            <button
              style={{
                background: `linear-gradient(135deg, ${C.primary}, #5b21b6)`,
                border: "none",
                borderRadius: 12,
                color: C.white,
                fontWeight: 700,
                fontSize: 14,
                padding: "13px",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Apply Filters
            </button>
          </aside>

          {/* ════════════════════════
              MAIN CONTENT
          ════════════════════════ */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
            {/* Hero header */}
            <div
              className="rounded-[18px] p-5 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-4"
              style={{
                background: `linear-gradient(135deg, ${C.card}, ${C.heroGradientEnd})`,
                border: `1px solid rgba(124,58,237,0.2)`,
              }}
            >
              <div>
                <h1
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(24px, 4vw, 38px)",
                    margin: 0,
                    color: isDarkMode ? "#ffffff" : "#1e1b4b",
                    lineHeight: 1.15,
                    lineHeight: 1.15,
                  }}
                >
                  Find your ideal mentor
                </h1>
                <p style={{ color: C.muted, fontSize: 15, margin: "10px 0 0", maxWidth: 460 }}>
                  Connect with 1,200+ experts across industries to accelerate your career with personalized guidance.
                </p>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {["Trending", "New Arrivals"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => { setSortMode(mode); setPage(1); }}
                    style={{
                      background:
                        sortMode === mode
                          ? `linear-gradient(135deg, ${C.primary}, #5b21b6)`
                          : C.buttonBgOff,
                      border: `1px solid ${sortMode === mode ? C.primary : C.border}`,
                      borderRadius: 10,
                      color: C.white,
                      fontWeight: 700,
                      fontSize: 13,
                      padding: "10px 20px",
                      cursor: "pointer",
                      boxShadow: sortMode === mode ? "0 4px 16px rgba(124,58,237,0.35)" : "none",
                      transition: "all 0.2s",
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Category tabs */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setPage(1); }}
                  style={{
                    background:
                      activeCategory === cat
                        ? "rgba(124,58,237,0.2)"
                        : C.buttonBgOff,
                    border: `1px solid ${activeCategory === cat ? "rgba(124,58,237,0.5)" : C.border}`,
                    borderRadius: 99,
                    color: activeCategory === cat ? C.primaryLight : C.muted,
                    fontWeight: 700,
                    fontSize: 11,
                    padding: "9px 18px",
                    cursor: "pointer",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span style={{ marginLeft: 6, fontSize: 12 }}>✕</span>
                  )}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>
              Showing{" "}
              <span style={{ color: C.primaryLight, fontWeight: 700 }}>
                {filtered.length}
              </span>{" "}
              mentor{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "ALL TECH" ? ` in ${activeCategory}` : ""}
            </p>

            {/* Mentor cards grid */}
            {paged.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: C.muted,
                  background: C.card,
                  borderRadius: 18,
                  border: `1px solid ${C.border}`,
                }}
              >
                <p style={{ fontSize: 36, margin: "0 0 12px" }}>🔍</p>
                <p style={{ fontWeight: 700, fontSize: 17, color: C.white, margin: "0 0 8px" }}>
                  No mentors found
                </p>
                <p style={{ margin: 0 }}>Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {paged.map((mentor) => (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    onOpenModal={setModalMentor}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "20px 0 8px",
                }}
              >
                <PaginationBtn
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ‹
                </PaginationBtn>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <PaginationBtn
                    key={n}
                    active={n === page}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </PaginationBtn>
                ))}
                <PaginationBtn
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  ›
                </PaginationBtn>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VIDEO MODAL */}
      <VideoModal mentor={modalMentor} onClose={() => setModalMentor(null)} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGINATION BUTTON (internal helper)
───────────────────────────────────────────────────────────── */
function PaginationBtn({ children, onClick, active, disabled }) {
  const { isDarkMode } = useContext(ThemeContext);
  const C = getC(isDarkMode);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 38,
        height: 38,
        borderRadius: 10,
        border: `1px solid ${active ? C.primary : C.border}`,
        background: active
          ? `linear-gradient(135deg, ${C.primary}, #5b21b6)`
          : C.buttonBgOff,
        color: active ? C.white : C.muted,
        fontWeight: 700,
        fontSize: 15,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
}
