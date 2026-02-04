const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

/** Fallback career news when API key is missing, 401, or request fails (e.g. CORS) */
const FALLBACK_CAREER_NEWS = {
  articles: [
    {
      title: "How to Build a Strong Career in Tech in 2025",
      description: "Practical steps to upskill, network, and land roles in software, data, and product. Learn what hiring managers look for and how to stand out.",
      url: "https://www.linkedin.com/pulse/how-build-strong-career-tech-2025",
      urlToImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    },
    {
      title: "Remote Work and Career Growth: What's Changing",
      description: "Remote and hybrid work are reshaping career paths. Here’s how to grow your career when you’re not in the office every day.",
      url: "https://www.linkedin.com/pulse/remote-work-career-growth",
      urlToImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    },
    {
      title: "Placement Prep: Ace Your Campus Interviews",
      description: "Tips from recruiters and past placement toppers on how to prepare for aptitude tests, GD, and technical interviews.",
      url: "https://www.linkedin.com/pulse/placement-prep-ace-your-campus-interviews",
      urlToImage: "https://images.unsplash.com/photo-1523240795612-9a05468c4e9e?w=800&q=80",
    },
    {
      title: "Career Pivots: Switching Industries Successfully",
      description: "Thinking of changing industries? How to position your experience, fill skill gaps, and make a smooth transition.",
      url: "https://www.linkedin.com/pulse/career-pivots-switching-industries",
      urlToImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    },
  ],
};

export const fetchCareerNews = async () => {
  if (!API_KEY || API_KEY === "undefined") {
    console.warn("REACT_APP_NEWS_API_KEY is missing. Using fallback career news. Add it to .env (copy from api.env).");
    return FALLBACK_CAREER_NEWS;
  }

  const url = `https://newsapi.org/v2/everything?q=career+OR+jobs+OR+placement&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("NewsAPI 401: Invalid or missing API key, or browser blocked. Using fallback career news.");
        return FALLBACK_CAREER_NEWS;
      }
      throw new Error(data?.message || "Failed to fetch career news");
    }

    if (data?.status === "error") {
      console.warn("NewsAPI error:", data?.message || data?.code, "- Using fallback career news.");
      return FALLBACK_CAREER_NEWS;
    }

    if (Array.isArray(data?.articles) && data.articles.length > 0) {
      return data;
    }

    return FALLBACK_CAREER_NEWS;
  } catch (err) {
    console.warn("Career news fetch failed:", err?.message || err, "- Using fallback career news.");
    return FALLBACK_CAREER_NEWS;
  }
};
