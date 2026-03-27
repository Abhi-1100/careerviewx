import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/InternalNavbar"
import Footer from "../components/internalfooter";
import { ThemeContext } from "../context/ThemeContext";

// Career details mapping based on backend categories
const careerDetails = {
  engineering: {
    title: "Software Engineer",
    level: "Senior Level Potential",
    matchPercentage: 92,
    description: "You excel at logical problem-solving and systematic thinking. This career leverages your analytical abilities and attention to detail in building complex systems.",
    skills: ["System Design", "Algorithms", "Problem Solving"],
    salaryRange: "$90k - $140k",
    marketDemand: "Very High",
    growthRate: "+15% growth",
    skillsToSharpen: "Advanced System Architecture",
    reasons: [
      {
        icon: "build",
        title: "Logical Problem Solving",
        description: "Your high scores in logical reasoning make you a natural fit for engineering challenges."
      },
      {
        icon: "schema",
        title: "System Thinking",
        description: "You demonstrated strong ability to break down complex problems into manageable components."
      },
      {
        icon: "code",
        title: "Technical Aptitude",
        description: "Your responses show genuine interest and capability in technical domains."
      }
    ],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop"
  },
  it: {
    title: "IT Professional",
    level: "Senior Level Potential",
    matchPercentage: 89,
    description: "You possess strong analytical and technical skills. This career path offers you the opportunity to manage complex technological infrastructure and drive digital transformation.",
    skills: ["Network Management", "Data Security", "Cloud Architecture"],
    salaryRange: "$85k - $135k",
    marketDemand: "High",
    growthRate: "+14% growth",
    skillsToSharpen: "Cloud Computing",
    reasons: [
      {
        icon: "cloud",
        title: "Technical Infrastructure",
        description: "Your analytical mindset is perfect for designing and maintaining robust IT systems."
      },
      {
        icon: "security",
        title: "Security Mindset",
        description: "You scored highly in systematic thinking, crucial for cybersecurity and data protection."
      },
      {
        icon: "trending_up",
        title: "Growth Potential",
        description: "The IT sector offers excellent growth prospects and emerging opportunities in emerging technologies."
      }
    ],
    image: "https://images.unsplash.com/photo-1553877905-d0306ba7371c?w=500&h=500&fit=crop"
  },
  medical: {
    title: "Medical Professional",
    level: "Senior Level Potential",
    matchPercentage: 88,
    description: "Your biological and scientific knowledge combined with your detail-oriented approach makes you an excellent fit for medical careers.",
    skills: ["Diagnostic Skills", "Patient Care", "Research"],
    salaryRange: "$95k - $180k",
    marketDemand: "Very High",
    growthRate: "+12% growth",
    skillsToSharpen: "Advanced Clinical Practice",
    reasons: [
      {
        icon: "health_and_safety",
        title: "Scientific Foundation",
        description: "Your strong biological knowledge provides an excellent foundation for medical practice."
      },
      {
        icon: "favorite",
        title: "Empathy & Care",
        description: "Your responses indicate genuine concern for helping others, essential in healthcare."
      },
      {
        icon: "science",
        title: "Research Capability",
        description: "You demonstrated analytical skills perfect for medical research and innovation."
      }
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=500&fit=crop"
  },
  design: {
    title: "UX/UI Designer",
    level: "Senior Level Potential",
    matchPercentage: 94,
    description: "You possess a rare blend of analytical thinking and creative empathy. Your responses indicate a strong natural aptitude for solving complex user problems and designing intuitive digital experiences.",
    skills: ["User Research", "Wireframing", "Visual Design"],
    salaryRange: "$85k - $140k",
    marketDemand: "High",
    growthRate: "+12% growth",
    skillsToSharpen: "Interaction Design",
    reasons: [
      {
        icon: "groups",
        title: "User Empathy",
        description: "Your high emotional intelligence score translates perfectly to understanding user frustrations and needs."
      },
      {
        icon: "lightbulb",
        title: "Visual Problem Solving",
        description: "You scored in the top 5% for spatial reasoning and pattern recognition in complex interfaces."
      },
      {
        icon: "palette",
        title: "Creative Expression",
        description: "Your interest in creativity ensures you can bring innovative solutions to design challenges."
      }
    ],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop"
  },
  business: {
    title: "Business Analyst",
    level: "Senior Level Potential",
    matchPercentage: 87,
    description: "You demonstrate strong strategic thinking and business acumen. Your analytical and communication skills make you ideal for driving business growth and innovation.",
    skills: ["Business Strategy", "Data Analysis", "Project Management"],
    salaryRange: "$80k - $130k",
    marketDemand: "High",
    growthRate: "+10% growth",
    skillsToSharpen: "Advanced Analytics",
    reasons: [
      {
        icon: "trending_up",
        title: "Strategic Thinking",
        description: "Your ability to see the bigger picture makes you excellent at business strategy and planning."
      },
      {
        icon: "calculate",
        title: "Data-Driven Decision Making",
        description: "You scored highly in analytical skills, perfect for business intelligence and analytics."
      },
      {
        icon: "handshake",
        title: "Leadership Potential",
        description: "Your communication skills and business sense position you well for leadership roles."
      }
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
  },
  government: {
    title: "Civil Services Officer",
    level: "Senior Level Potential",
    matchPercentage: 85,
    description: "Your commitment to public service and analytical mindset make you well-suited for government and policy roles where you can make meaningful societal impact.",
    skills: ["Public Policy", "Administration", "Leadership"],
    salaryRange: "$75k - $120k",
    marketDemand: "Stable",
    growthRate: "+5% growth",
    skillsToSharpen: "Policy Analysis",
    reasons: [
      {
        icon: "gavel",
        title: "Policy Understanding",
        description: "Your analytical skills are perfect for understanding and implementing government policies."
      },
      {
        icon: "groups",
        title: "Public Service Mindset",
        description: "Your responses reflect commitment to public welfare and societal improvement."
      },
      {
        icon: "shield",
        title: "Integrity & Ethics",
        description: "Your strong ethical foundation makes you ideal for roles of public trust and responsibility."
      }
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
  }
};

export default function AssessmentResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  // Get career name from location state
  const careerName = location.state?.recommendedCareer || "design";
  const scores = location.state?.scores || {};

  // Get career details based on name
  const recommendedCareer = careerDetails[careerName] || careerDetails.design;

  const handleRetakeQuiz = () => {
    navigate("/assessments");
  };

  const handleJobOpenings = () => {
    // Navigate to job openings or careers page
    navigate("/careers");
  };

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    try {
      // Add PDF download logic here
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen font-display transition-colors duration-300 ${isDarkMode ? "bg-background-dark text-white" : "bg-surface-light text-charcoal"}`}>
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase rounded-full mb-4">Assessment Complete</span>
          <h1 className={`text-5xl md:text-7xl font-black mb-4 tracking-tighter ${isDarkMode ? "text-white" : "text-charcoal"}`} style={{ textShadow: "0 0 20px rgba(140, 43, 238, 0.4)" }}>MATCH FOUND!</h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>We analyzed your skills, interests, and personality. Here's your perfect professional alignment.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Hero Match Card */}
          <div className={`lg:col-span-7 rounded-xl border p-8 shadow-2xl relative overflow-hidden ${isDarkMode ? "bg-surface-dark border-primary/10" : "bg-white border-slate-200"}`}>
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32 ${isDarkMode ? "bg-primary/5" : "bg-primary/10"}`}></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Career Image with Progress Overlay */}
              <div className="relative">
                <div className="size-48 md:size-64 rounded-xl overflow-hidden border-4 border-primary/20 shadow-lg">
                  <img
                    className="w-full h-full object-cover"
                    alt={recommendedCareer.title}
                    src={recommendedCareer.image}
                  />
                </div>
                {/* Circular Progress Overlay */}
                <div className={`absolute -bottom-6 -right-6 border-4 size-24 rounded-full flex items-center justify-center ${isDarkMode ? "bg-background-dark border-surface-dark" : "bg-white border-slate-50 shadow-md"}`}>
                  <div className="relative size-full flex items-center justify-center">
                    <svg className="size-20 transform -rotate-90">
                      <circle className={isDarkMode ? "text-slate-800" : "text-slate-200"} cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="6"></circle>
                      <circle
                        className="text-primary"
                        cx="40"
                        cy="40"
                        fill="transparent"
                        r="34"
                        stroke="currentColor"
                        strokeDasharray="213.6"
                        strokeDashoffset={213.6 - (recommendedCareer.matchPercentage / 100 * 213.6)}
                        strokeWidth="6"
                      ></circle>
                    </svg>
                    <span className={`absolute text-xl font-bold ${isDarkMode ? "text-white" : "text-charcoal"}`}>{recommendedCareer.matchPercentage}%</span>
                  </div>
                </div>
              </div>

              {/* Career Details */}
              <div className="flex-1 text-center md:text-left">
                <h2 className={`text-3xl md:text-5xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-charcoal"}`}>{recommendedCareer.title}</h2>
                <p className="text-primary font-semibold text-lg mb-4">{recommendedCareer.level}</p>
                <p className={`leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {recommendedCareer.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
                  {recommendedCareer.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`rounded-xl border p-6 ${isDarkMode ? "bg-surface-dark border-primary/10" : "bg-white border-slate-200 shadow-xl"}`}>
              <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                <span className="material-symbols-outlined text-primary">analytics</span>
                Why it's a great fit
              </h3>
              <div className="space-y-6">
                {recommendedCareer.reasons.map((reason, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">{reason.icon}</span>
                    </div>
                    <div>
                      <h4 className={`font-bold ${isDarkMode ? "text-white" : "text-charcoal"}`}>{reason.title}</h4>
                      <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleJobOpenings}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined">work</span>
                View Job Openings
              </button>
              <button
                onClick={handleRetakeQuiz}
                className="w-full border-2 border-primary/30 hover:border-primary/60 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined">refresh</span>
                Retake Quiz
              </button>
              <div className="flex items-center justify-between px-2 pt-2">
                <button className="text-sm font-medium text-slate-500 hover:text-primary flex items-center gap-1 transition-colors">
                  <span className="material-symbols-outlined text-sm">share</span>
                  Share Results
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="text-sm font-medium text-slate-500 hover:text-primary flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`border p-5 rounded-lg ${isDarkMode ? "bg-surface-dark/50 border-primary/10" : "bg-white border-slate-200 shadow-md"}`}>
            <h5 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Salary Expectation</h5>
            <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-charcoal"}`}>{recommendedCareer.salaryRange}</p>
            <p className={`text-xs ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Based on your experience level</p>
          </div>
          <div className={`border p-5 rounded-lg ${isDarkMode ? "bg-surface-dark/50 border-primary/10" : "bg-white border-slate-200 shadow-md"}`}>
            <h5 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Market Demand</h5>
            <div className="flex items-center gap-2">
              <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-charcoal"}`}>{recommendedCareer.marketDemand}</p>
              <span className="bg-green-500/20 text-green-500 px-2 py-0.5 rounded text-[10px] font-bold">{recommendedCareer.growthRate} growth</span>
            </div>
            <p className={`text-xs ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Industry projection for 2024-2026</p>
          </div>
          <div className={`border p-5 rounded-lg ${isDarkMode ? "bg-surface-dark/50 border-primary/10" : "bg-white border-slate-200 shadow-md"}`}>
            <h5 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Skills to Sharpen</h5>
            <div className="flex gap-1 mt-1">
              <span className="material-symbols-outlined text-primary text-sm">star</span>
              <span className="material-symbols-outlined text-primary text-sm">star</span>
              <span className="material-symbols-outlined text-primary text-sm">star</span>
              <span className={`material-symbols-outlined text-sm ${isDarkMode ? "text-slate-700" : "text-slate-300"}`}>star</span>
              <span className={`material-symbols-outlined text-sm ${isDarkMode ? "text-slate-700" : "text-slate-300"}`}>star</span>
            </div>
            <p className={`text-xs mt-2 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Recommended: {recommendedCareer.skillsToSharpen}</p>
          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
}
