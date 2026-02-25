import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCareerByName, addCareerPath } from "../Services/api";
import InternalNavbar from "../components/InternalNavbar";

// Career image mapping
const careerImages = {
  engineering: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop",
  it: "https://images.unsplash.com/photo-1553877905-d0306ba7371c?w=500&h=500&fit=crop",
  medical: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=500&fit=crop",
  design: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
  business: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
  government: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
};

// Career level and match percentage
const careerMetadata = {
  engineering: { level: "Senior Level Potential", match: 92 },
  it: { level: "Senior Level Potential", match: 89 },
  medical: { level: "Senior Level Potential", match: 88 },
  design: { level: "Senior Level Potential", match: 94 },
  business: { level: "Senior Level Potential", match: 87 },
  government: { level: "Senior Level Potential", match: 85 }
};

// Career Roadmaps
const careerRoadmaps = {
  engineering: [
    "Complete 12th with PCM (Physics, Chemistry, Mathematics)",
    "Crack JEE Main / Advanced or relevant entrance exam",
    "Pursue B.Tech / B.E in chosen engineering branch",
    "Complete internships and hands-on projects during undergraduate",
    "Obtain industry certifications in specialized domains",
    "Join as Graduate Engineer Trainee (GET) in a company",
    "Specialize in a domain (Civil, Mechanical, Software, etc.)",
    "Progress to Senior Engineer or pursue M.Tech / MBA"
  ],
  it: [
    "Complete 12th with PCM or Commerce with Computers",
    "Pursue B.Tech / BCA / BSc in Computer Science or IT",
    "Learn core programming languages (Python, Java, JavaScript)",
    "Build real-world projects and an online portfolio",
    "Obtain certifications (AWS, Azure, Google Cloud, etc.)",
    "Join as Junior Developer, IT Analyst, or QA Engineer",
    "Specialize in Cloud, AI/ML, Cybersecurity, or DevOps",
    "Progress to Senior Developer, Architect, or Tech Lead"
  ],
  medical: [
    "Complete 12th with PCB (Physics, Chemistry, Biology)",
    "Crack NEET UG entrance examination",
    "Complete MBBS degree (5.5 years including internship)",
    "Register with the Medical Council of India (MCI)",
    "Pursue MD / MS specialization (3 years)",
    "Complete residency in your chosen specialty",
    "Join a hospital or establish your own practice",
    "Progress to Senior Consultant or pursue academic research"
  ],
  design: [
    "Complete 12th from any stream",
    "Pursue Bachelor's in Design, Fine Arts, or related field",
    "Master design tools — Figma, Adobe XD, Sketch",
    "Build a strong portfolio with real user-centric projects",
    "Complete internships at design studios or tech companies",
    "Join as Junior UX / UI Designer or Product Designer",
    "Specialize in UX Research, Interaction Design, or Motion",
    "Progress to Senior Designer, UX Lead, or Design Director"
  ],
  business: [
    "Complete 12th (Commerce is preferred but not mandatory)",
    "Pursue Bachelor's in Commerce, Economics, or other field",
    "Gain 2–3 years of work experience in industry",
    "Take CAT or similar entrance exam for MBA",
    "Complete MBA (2 years) from premiere institutes",
    "Join as Management Trainee in corporations",
    "Specialize in Finance, Marketing, HR, Operations, etc.",
    "Progress to senior positions or start own venture"
  ],
  government: [
    "Complete 12th from any recognized board",
    "Pursue Bachelor's degree in any discipline",
    "Prepare rigorously for UPSC / State PSC examinations",
    "Clear Prelims and Mains written examinations",
    "Appear for Personality Test (Interview round)",
    "Complete foundation training at LBSNAA or equivalent",
    "Join as IAS / IPS / IFS or other Group A Services officer",
    "Progress to senior administrative and policy-making roles"
  ]
};

// Career fit reasons
const careerReasons = {
  engineering: [
    { icon: "build", title: "Logical Problem Solving", description: "Your high scores in logical reasoning make you a natural fit for engineering challenges." },
    { icon: "schema", title: "System Thinking", description: "You demonstrated strong ability to break down complex problems into manageable components." },
    { icon: "code", title: "Technical Aptitude", description: "Your responses show genuine interest and capability in technical domains." }
  ],
  it: [
    { icon: "cloud", title: "Technical Infrastructure", description: "Your analytical mindset is perfect for designing and maintaining robust IT systems." },
    { icon: "security", title: "Security Mindset", description: "You scored highly in systematic thinking, crucial for cybersecurity and data protection." },
    { icon: "trending_up", title: "Growth Potential", description: "The IT sector offers excellent growth prospects and emerging opportunities." }
  ],
  medical: [
    { icon: "health_and_safety", title: "Scientific Foundation", description: "Your strong biological knowledge provides an excellent foundation for medical practice." },
    { icon: "favorite", title: "Empathy & Care", description: "Your responses indicate genuine concern for helping others, essential in healthcare." },
    { icon: "science", title: "Research Capability", description: "You demonstrated analytical skills perfect for medical research and innovation." }
  ],
  design: [
    { icon: "groups", title: "User Empathy", description: "Your high emotional intelligence score translates perfectly to understanding user frustrations." },
    { icon: "lightbulb", title: "Visual Problem Solving", description: "You scored in the top 5% for spatial reasoning and pattern recognition in interfaces." },
    { icon: "palette", title: "Creative Expression", description: "Your interest in creativity ensures you can bring innovative solutions to design." }
  ],
  business: [
    { icon: "trending_up", title: "Strategic Thinking", description: "Your ability to see the bigger picture makes you excellent at business strategy." },
    { icon: "calculate", title: "Data-Driven Decisions", description: "You scored highly in analytical skills, perfect for business intelligence." },
    { icon: "handshake", title: "Leadership Potential", description: "Your communication skills position you well for leadership roles." }
  ],
  government: [
    { icon: "gavel", title: "Policy Understanding", description: "Your analytical skills are perfect for understanding and implementing government policies." },
    { icon: "groups", title: "Public Service Mindset", description: "Your responses reflect commitment to public welfare and societal improvement." },
    { icon: "shield", title: "Integrity & Ethics", description: "Your strong ethical foundation makes you ideal for roles of public trust." }
  ]
};

const CareerResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendedCareer, scores } = location.state || {};
  
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!recommendedCareer) {
      setError("No career recommendation found. Please complete the assessment first.");
      setLoading(false);
      return;
    }

    const fetchCareerDetails = async () => {
      try {
        setLoading(true);
        const response = await getCareerByName(recommendedCareer);
        
        if (response.data.success) {
          setCareer(response.data.career);
          setError(null);
        } else {
          setError("Failed to load career details. Please try again.");
        }
      } catch (err) {
        console.error("Error fetching career:", err);
        setError("Error loading career details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCareerDetails();
  }, [recommendedCareer]);

  const handleRetakeQuiz = () => {
    navigate("/assessments/quest");
  };

  const handleAddToCareerPath = async () => {
    try {
      // Get current user data
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        alert('Please log in to add career paths.');
        navigate("/login");
        return;
      }

      const user = JSON.parse(userStr);
      
      // Prepare career path data
      const careerPathData = {
        careerName: career.careerName,
        education: user.education || "12th",
        stream: user.stream || "",
        matchPercentage: metadata.match
      };

      // Save to backend
      const response = await addCareerPath(careerPathData);
      
      if (response.data.success) {
        // Update localStorage with latest career paths
        user.careerPaths = response.data.careerPaths;
        localStorage.setItem('user', JSON.stringify(user));
        
        alert(`${career.careerName} has been added to your career path!`);
        navigate("/profile");
      } else {
        alert(response.data.message || 'Failed to add career path.');
      }
    } catch (error) {
      console.error('Error adding career path:', error);
      
      if (error.response?.status === 400) {
        alert(error.response.data.message || `${career.careerName} is already in your career path!`);
      } else if (error.response?.status === 401) {
        alert('Session expired. Please log in again.');
        navigate("/login");
      } else {
        alert('Failed to add career path. Please try again.');
      }
    }
  };

  const handleDownloadPDF = () => {
    alert("PDF download feature coming soon!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark text-white font-display">
        <InternalNavbar />
        <main className="flex flex-1 justify-center items-center py-12 px-4 h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="text-white text-lg">Loading your career match...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="min-h-screen bg-background-dark text-white font-display">
        <InternalNavbar />
        <main className="flex flex-1 justify-center items-center py-12 px-4 h-screen">
          <div className="text-center">
            <p className="text-red-400 text-lg">{error || "Career not found"}</p>
            <button
              onClick={() => navigate("/assessments")}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
            >
              Take Assessment Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  const careerKey = recommendedCareer.toLowerCase();
  const metadata = careerMetadata[careerKey] || { level: "Senior Level Potential", match: 85 };
  const imageUrl = careerImages[careerKey] || careerImages.design;
  const reasons = careerReasons[careerKey] || careerReasons.design;
  const roadmap = careerRoadmaps[careerKey] || careerRoadmaps.business;

  return (
    <div className="min-h-screen bg-background-dark text-white font-display">
      <InternalNavbar />

      {/* Header Navigation */}
      

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase rounded-full mb-4">Assessment Complete</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter" style={{ textShadow: "0 0 20px rgba(140, 43, 238, 0.4)" }}>MATCH FOUND!</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">We've analyzed your skills, interests, and personality. Here's your perfect professional alignment.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Hero Match Card */}
          <div className="lg:col-span-7 bg-surface-dark rounded-xl border border-primary/10 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Career Image with Progress Overlay */}
              <div className="relative shrink-0">
                <div className="size-48 md:size-56 rounded-xl overflow-hidden border-4 border-primary/20 shadow-lg">
                  <img 
                    className="w-full h-full object-cover" 
                    alt={career.careerName}
                    src={imageUrl}
                  />
                </div>
                {/* Circular Progress Overlay — bottom-right, overlapping image */}
                <div className="absolute -bottom-5 -right-5 bg-[#1a1a2e] border-4 border-[#1a1a2e] size-20 rounded-full flex items-center justify-center shadow-lg">
                  <div className="relative size-full flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" fill="transparent" r="32" stroke="#2d2d4e" strokeWidth="6"></circle>
                      <circle 
                        cx="40" 
                        cy="40" 
                        fill="transparent" 
                        r="32" 
                        stroke="#8c2bee"
                        strokeDasharray="201.1" 
                        strokeDashoffset={201.1 - (metadata.match / 100 * 201.1)}
                        strokeWidth="6"
                        strokeLinecap="round"
                      ></circle>
                    </svg>
                    <span className="relative z-10 text-sm font-bold text-white">{metadata.match}%</span>
                  </div>
                </div>
              </div>

              {/* Career Details */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 capitalize">{career.careerName}</h2>
                <p className="text-primary font-semibold text-lg mb-4">{metadata.level}</p>
                <p className="text-slate-400 leading-relaxed">
                  {career.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
                  {career.skillsRequired.slice(0, 3).map((skill, index) => (
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
            <div className="bg-surface-dark rounded-xl border border-primary/10 p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Why it's a great fit
              </h3>
              <div className="space-y-6">
                {reasons.map((reason, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">{reason.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{reason.title}</h4>
                      <p className="text-sm text-slate-400">{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleAddToCareerPath}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Add to Career Path
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
          <div className="bg-surface-dark/50 border border-primary/10 p-5 rounded-lg">
            <h5 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Salary Range</h5>
            <p className="text-2xl font-bold text-white">{career.averageSalary || "$70k - $120k"}</p>
            <p className="text-xs text-slate-500">Based on your experience level</p>
          </div>
          <div className="bg-surface-dark/50 border border-primary/10 p-5 rounded-lg">
            <h5 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Job Market</h5>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-white">High Demand</p>
              <span className="bg-green-500/20 text-green-500 px-2 py-0.5 rounded text-[10px] font-bold">+10% growth</span>
            </div>
            <p className="text-xs text-slate-500">Industry projection for 2024-2026</p>
          </div>
          <div className="bg-surface-dark/50 border border-primary/10 p-5 rounded-lg">
            <h5 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Top Skills</h5>
            <div className="flex gap-1 mt-1">
              <span className="material-symbols-outlined text-primary text-sm">star</span>
              <span className="material-symbols-outlined text-primary text-sm">star</span>
              <span className="material-symbols-outlined text-primary text-sm">star</span>
              <span className="material-symbols-outlined text-primary text-sm">star</span>
              <span className="material-symbols-outlined text-slate-700 text-sm">star</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Top rated in industry</p>
          </div>
        </div>

        {/* Skills & Roadmap Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills */}
          <div className="bg-surface-dark rounded-xl border border-primary/10 p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">manage_accounts</span>
              Essential Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {career.skillsRequired.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-primary/20 border border-primary/50 text-primary rounded-full text-sm font-medium hover:bg-primary/30 transition-all"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="bg-surface-dark rounded-xl border border-primary/10 p-8">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">alt_route</span>
              Career Roadmap
            </h2>
            <div className="space-y-5">
              {roadmap.map((step, index) => (
                <div key={index} className="flex items-center gap-5">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/15 border border-primary/60 flex items-center justify-center text-primary font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-white text-[15px] leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 px-6 text-center border-t border-primary/5">
        <p className="text-slate-500 text-xs font-medium">© 2024 CareerViewX. Empowering careers with data-driven insights.</p>
      </footer>

    </div>
  );
};

export default CareerResult;
